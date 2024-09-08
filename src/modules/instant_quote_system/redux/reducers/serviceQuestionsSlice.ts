import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendRequestToServer } from "../../common_service/api";
import { questionDataInitialState, questionType } from "../../types/service";
import { answerType } from "../../types/usertype";

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
    questions_data: [], // Initialize as an empty array
    question_step_count: 0,
    total_question_length: 0,
    current_question: null,
    isLoading: false,
    error: null,
    next_questions_stack: [] // To track nested next questions
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        previousQuestion: (state) => {
            if (state.question_step_count > 0) {
                state.current_question = state.questions_data[--state.question_step_count];
            }
        },
        nextQuestion: (state, action: PayloadAction<any>) => {
            const { question_id, question_answer, question_type } = action.payload;

            // Find the current question
            const current_q = state.questions_data.find(data => data._id === question_id);
            if (!current_q) return; // Ensure current question exists
            console.log(state.questions_data);
            // Handle radio question with "Yes" answer
            if (question_type === "radio" && question_answer === "Yes") {
                if (current_q.next_questions && current_q.next_questions.length > 0) {
                    const nextQuestion = current_q.next_questions.shift(); // Get and remove the first question from the array
                    if (nextQuestion) {
                        const nextQuestionId = nextQuestion._id;
                        const nextQuestionData = state.questions_data.find(data => data._id === nextQuestionId);

                        if (nextQuestionData) {
                            state.current_question = nextQuestionData;
                            state.next_questions_stack.push(nextQuestionId); // Track the nested question stack
                        }
                    }
                }
            } else {
                // Handle when no nested questions are left or the answer is "No"
                if (state.next_questions_stack.length > 0) {
                    // Clear stack if all nested questions are asked
                    state.next_questions_stack = [];
                }

                // Move to the next main question if available
                if (state.question_step_count < state.questions_data.length - 1) {
                    state.current_question = state.questions_data[++state.question_step_count];
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
