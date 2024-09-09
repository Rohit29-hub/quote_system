import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { sendRequestToServer } from "../../common_service/api";
import { questionDataInitialState, questionType } from "../../types/service";

type ArgsType = {
    endpoint: string,
    data: string[]
}

// async thunk for fetching all the question from server and save them into store
export const fetchQuestions = createAsyncThunk('questions/fetch', async ({ endpoint, data }: ArgsType, { rejectWithValue }) => {
    try {
        const body = { serviceIds: data };
        const res = await sendRequestToServer(endpoint, "POST", body);
        return res?.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

const initialState: questionDataInitialState = {
    questions_data: [], // hold the question.
    question_step_count: 0, // track the question count
    total_question_length: 0, // total question length
    question_history: [], // track the history of the questions
    current_question: null, // track the current question
    isLoading: false, // hold loading state
    error: null, // hold error
    dependent_questions_data: [] // To track nested next_questions
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        previousQuestion: (state) => {
            console.log(current(state.question_history));
            if (!state.current_question?.depends_on_question_id) {
                state.question_step_count -= 1;
            }
            state.current_question = state.question_history.pop()!;
        },
        nextQuestion: (state, action: PayloadAction<any>) => {
            const { answer, question_type } = action.payload;
            state.question_history.push(state.current_question!);

            if (question_type == "radio" && answer == "Yes") {
                state.dependent_questions_data = [...state.current_question!.next_questions];
            }

            if (state.dependent_questions_data.length > 0) {
                if (state.dependent_questions_data.length > 0) {
                    state.current_question = state.dependent_questions_data.shift()!;
                }
            } else {
                state.question_step_count += 1;
                if (state.question_step_count < state.questions_data.length) {
                    state.current_question = state.questions_data[state.question_step_count];
                } else {
                    state.current_question = null
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.isLoading = false;

            // Filter out dependent questions initially
            const independentQuestions = action.payload.flatMap((service: { questions: questionType[] }) =>
                service.questions.filter(q => !q.depends_on_question_id)
            );

            state.questions_data = independentQuestions;
            state.total_question_length = independentQuestions.length;

            if (state.total_question_length !== 0) {
                state.current_question = state.questions_data[0]; // Set the first independent question
                state.question_step_count = 0; // Reset the step count
            }
        })
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const { previousQuestion, nextQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;