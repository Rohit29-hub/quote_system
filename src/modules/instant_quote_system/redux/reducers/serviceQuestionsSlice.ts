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
            
        },
        nextQuestion: (state, action: PayloadAction<any>) => {
            const {answer, question_type } = action.payload;
            state.question_history.push(state.current_question!);

            if(question_type == "radio" && answer == "Yes"){
                state.dependent_questions_data = [...state.current_question!.next_questions];
            }

            if (state.dependent_questions_data.length > 0) {
                if(state.dependent_questions_data.length > 0){
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


/**
 * 
 * 
 * const questions = [
                {
                    "_id": "66d9a88da080c053a6f114a9",
                    "service_id": "66d96e888e8f7383faacd17f",
                    "question_text": "Do you have Storm Windows?",
                    "question_service_type": "Window Cleaning Service",
                    "question_answer_type": "radio",
                    "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/45bb0394-5993-4e3e-afe0-cfede2bab4db",
                    "question_description": "If all of your windows are storm-type windows, then you will only fill out this area. We count storm windows separate from regular 'pane counts'.",
                    "question_options": [
                        {
                            "question_label": "Yes",
                            "_id": "66d9a88da080c053a6f114aa"
                        },
                        {
                            "question_label": "No",
                            "_id": "66d9a88da080c053a6f114ab"
                        }
                    ],
                    "minQuantity": 0,
                    "maxQuantity": 10,
                    "createdAt": "2024-09-05T12:48:13.995Z",
                    "updatedAt": "2024-09-08T08:03:28.398Z",
                    "__v": 1,
                    "depends_on_question_id": "",
                    "next_questions": [
                        {
                            "_id": "66dd5a506d1032141ac52383",
                            "service_id": "66d96e888e8f7383faacd17f",
                            "question_text": "How many Storm Windows do you have?",
                            "question_service_type": "Window Cleaning Service",
                            "question_answer_type": "image_quantity_input_field",
                            "next_questions": [],
                            "depends_on_question_id": "66d9a88da080c053a6f114a9",
                            "question_description": null,
                            "question_options": [
                                {
                                    "question_value": 0,
                                    "question_label": "Storm Window",
                                    "_id": "66dd5a506d1032141ac52384",
                                    "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/45bb0394-5993-4e3e-afe0-cfede2bab4db"
                                }
                            ],
                            "createdAt": "2024-09-08T08:03:28.078Z",
                            "updatedAt": "2024-09-08T08:03:28.078Z",
                            "__v": 0,
                            "question_image": null
                        }
                    ]
                },
                {
                    "next_questions": [],
                    "depends_on_question_id": "",
                    "_id": "66d9a9dacf5061227612fb5d",
                    "service_id": "66d96e888e8f7383faacd17f",
                    "question_text": "Number Of Window Panes",
                    "question_service_type": "Window Cleaning Service",
                    "question_answer_type": "image_quantity_input_field",
                    "question_image": null,
                    "question_description": null,
                    "question_options": [
                        {
                            "question_value": 0,
                            "question_label": "Regular Panes",
                            "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/3ca453f2-98e8-47a6-9df2-b2fb7ba42588",
                            "_id": "66d9a9dacf5061227612fb5e"
                        },
                        {
                            "question_value": 0,
                            "question_label": "Small 'French' Panes",
                            "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/63b3ec23-9b15-47c8-b138-2e2d5cfd8841",
                            "_id": "66d9a9dacf5061227612fb5f"
                        },
                        {
                            "question_value": 0,
                            "question_label": "Screens",
                            "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/55fb4d4d-e0ec-4cb7-b286-2f950a80cd5a",
                            "_id": "66d9a9dacf5061227612fb60"
                        }
                    ],
                    "minQuantity": 0,
                    "maxQuantity": 10,
                    "createdAt": "2024-09-05T12:53:46.623Z",
                    "updatedAt": "2024-09-05T12:53:46.623Z",
                    "__v": 0
                },
                {
                    "next_questions": [],
                    "depends_on_question_id": "",
                    "_id": "66d9a9e8cf5061227612fb64",
                    "service_id": "66d96e888e8f7383faacd17f",
                    "question_text": "Number Of Skylights",
                    "question_service_type": "Window Cleaning Service",
                    "question_answer_type": "image_quantity_input_field",
                    "question_image": null,
                    "question_description": null,
                    "question_options": [
                        {
                            "question_value": 0,
                            "question_label": "Skylights",
                            "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/146a4515-88cb-46f5-8483-adb35ca12a4f",
                            "_id": "66d9a9e8cf5061227612fb65"
                        }
                    ],
                    "minQuantity": 0,
                    "maxQuantity": 10,
                    "createdAt": "2024-09-05T12:54:00.599Z",
                    "updatedAt": "2024-09-05T12:54:00.599Z",
                    "__v": 0
                },
                {
                    "next_questions": [],
                    "depends_on_question_id": "",
                    "_id": "66d9a9f8cf5061227612fb69",
                    "service_id": "66d96e888e8f7383faacd17f",
                    "question_text": "How many stories is the home/building we are cleaning windows for?",
                    "question_service_type": "Window Cleaning Service",
                    "question_answer_type": "select",
                    "question_image": null,
                    "question_description": null,
                    "question_options": [
                        {
                            "question_value": "1",
                            "question_label": "1",
                            "_id": "66d9a9f8cf5061227612fb6a"
                        },
                        {
                            "question_value": "2",
                            "question_label": "2",
                            "_id": "66d9a9f8cf5061227612fb6b"
                        },
                        {
                            "question_value": "3",
                            "question_label": "3",
                            "_id": "66d9a9f8cf5061227612fb6c"
                        },
                        {
                            "question_value": "4",
                            "question_label": "4",
                            "_id": "66d9a9f8cf5061227612fb6d"
                        },
                        {
                            "question_value": "5",
                            "question_label": "5",
                            "_id": "66d9a9f8cf5061227612fb6e"
                        },
                        {
                            "question_value": "6",
                            "question_label": "6",
                            "_id": "66d9a9f8cf5061227612fb6f"
                        },
                        {
                            "question_value": "7",
                            "question_label": "7",
                            "_id": "66d9a9f8cf5061227612fb70"
                        },
                        {
                            "question_value": "8",
                            "question_label": "8",
                            "_id": "66d9a9f8cf5061227612fb71"
                        },
                        {
                            "question_value": "more",
                            "question_label": "More than 8",
                            "_id": "66d9a9f8cf5061227612fb72"
                        }
                    ],
                    "minQuantity": 0,
                    "maxQuantity": 10,
                    "createdAt": "2024-09-05T12:54:16.385Z",
                    "updatedAt": "2024-09-05T12:54:16.385Z",
                    "__v": 0
                },
                {
                    "_id": "66dd5a506d1032141ac52383",
                    "service_id": "66d96e888e8f7383faacd17f",
                    "question_text": "How many Storm Windows do you have?",
                    "question_service_type": "Window Cleaning Service",
                    "question_answer_type": "image_quantity_input_field",
                    "next_questions": [],
                    "depends_on_question_id": "66d9a88da080c053a6f114a9",
                    "question_description": null,
                    "question_options": [
                        {
                            "question_value": 0,
                            "question_label": "Storm Window",
                            "_id": "66dd5a506d1032141ac52384",
                            "question_image": "https://s3.amazonaws.com/module-builder/ModuleImageLibrary/45bb0394-5993-4e3e-afe0-cfede2bab4db"
                        }
                    ],
                    "createdAt": "2024-09-08T08:03:28.078Z",
                    "updatedAt": "2024-09-08T08:03:28.078Z",
                    "__v": 0,
                    "question_image": null
                }
            ]
let questionIndex = 0;
let currentQuestion = questions[questionIndex];
let questionHistory = []; // To store the history of answered questions

function updateCurrentQuestion(answerType, answerValue) {
    // Save the current question to history before moving to the next
    questionHistory.push(currentQuestion);

    if (currentQuestion.next_questions.length > 0) {
        // Move to the first next question
        currentQuestion = currentQuestion.next_questions[0];
    } else {
        // If no more next_questions, move to the next question in the main array
        questionIndex += 1;
        if (questionIndex < questions.length) {
            currentQuestion = questions[questionIndex];
        } else {
            console.log("No more questions");
            return;
        }
    }

    console.log("Next Question:", currentQuestion.question_text);
}

function goToPreviousQuestion() {
    // Check if we have a history of answered questions
    if (questionHistory.length > 0) {
        currentQuestion = questionHistory.pop(); // Get the last answered question
        console.log("Previous Question:", currentQuestion.question_text);
    } else {
        console.log("No previous questions");
    }
}

console.log('Current Question: ', currentQuestion.question_text);

// Example calls
updateCurrentQuestion("radio", "yes"); // Call 1: Answering first question
updateCurrentQuestion("select", "yes"); // Call 2: Should go to the next main question
goToPreviousQuestion(); // Call 3: Should go back to the previous question
updateCurrentQuestion("image_quantity_input_field", "yes"); // Call 4
goToPreviousQuestion(); // Call 5: Should go back to the previous question
goToPreviousQuestion(); // Call 6: Should go back further

 */