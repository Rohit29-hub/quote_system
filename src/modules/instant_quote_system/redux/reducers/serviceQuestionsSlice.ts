import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendRequestToServer } from "../../common_service/api";
import { questionDataInitialState, questionType } from "../../types/service";

type ArgsType = {
    endpoint: string,
    data: string[]
}

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
    questions_data: [],
    question_step_count: 0,
    total_question_length: 0,
    current_question: null,
    isLoading: false,
    error: null
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        previousQuestion: (state) => {
            state.current_question = state.questions_data[--state.question_step_count];
        },
        nextQuestion: (state, action: PayloadAction<any>) => {
            if (action.payload.question_type == "radio" && action.payload.answer === "Yes") {
                const current_q = state.questions_data.find(data => data._id === action.payload.question_id);
                if (current_q?.next_question_id) {
                    const nextQuestion = state.questions_data.find(data => data._id === current_q.next_question_id);
                    if (nextQuestion) {
                        state.current_question = nextQuestion;
                        ++state.question_step_count;
                    }
                }
            } else {
                state.current_question = state.questions_data[++state.question_step_count];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.questions_data = action.payload.flatMap((service: { questions: questionType[] }) => service.questions);
            action.payload.forEach((data: { questions: questionType[] }) => state.total_question_length += data.questions.length)
            if (state.total_question_length != 0) {
                state.current_question = state.questions_data[0];
            }
        })
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const { previousQuestion, nextQuestion } = questionsSlice.actions
export default questionsSlice.reducer;