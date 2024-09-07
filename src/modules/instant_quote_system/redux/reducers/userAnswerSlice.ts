import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { aboutProjectType, answerDataInitialStateType, argsDataType, userType } from "../../types/usertype";
import { sendRequestToServer } from "../../common_service/api";

export const fetchInstantQuote = createAsyncThunk('fetchInstantQuote/fetch', async (data: argsDataType, { rejectWithValue }) => {
    try {
        const res = await sendRequestToServer(data.endpoint, "POST", data);
        return res?.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

const initialState: answerDataInitialStateType = {
    step_count: 0,
    user_info: null,
    additional_message: '',
    aboutProjectData: {
        hear_about_us: '',
        project_type: 'Residential',
        selected_home: '',
        company_name: '',
        building_size: ''
    },
    selectedServices: [],
    question_answers: [],
    quote_data: {
        isLoading: false,
        isError: false,
        data: null
    }
}

const userAnswerSlice = createSlice({
    name: 'user_answer',
    initialState,
    reducers: {
        incrementStep: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload) {
                state.step_count = action.payload;
            } else {
                state.step_count++;
            }
        },
        decrementStep: (state) => {
            state.step_count--;
        },
        addQuestionAnswer: (state, action: PayloadAction<any>) => {
            if (state.question_answers === null) {
                state.question_answers = [action.payload];
            } else {
                state.question_answers.push(action.payload);
            }
        },
        addUsersInfo: (state, action: PayloadAction<userType>) => {
            state.user_info = action.payload;
        },
        addAdditionalMessage: (state, action: PayloadAction<string>) => {
            state.additional_message = action.payload;
        },
        updateAboutProjectData(state, action: PayloadAction<Partial<aboutProjectType>>) {
            state.aboutProjectData = {
                ...state.aboutProjectData,
                ...action.payload
            };
        },
        handleSelectedService: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.selectedServices.includes(id)) {
                state.selectedServices = state.selectedServices.filter((service_id) => service_id != id);
            } else {
                state.selectedServices.push(id);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInstantQuote.pending, (state) => {
            state.quote_data.isLoading = true;
        });
        builder.addCase(fetchInstantQuote.fulfilled, (state, action) => {
            state.quote_data.isLoading = false;
            state.quote_data.data = action.payload;
        });
        builder.addCase(fetchInstantQuote.rejected, (state, action) => {
            console.log(action.payload);
            state.quote_data.isLoading = false;
            state.quote_data.isError = true
        })
    }
})

export const {
    incrementStep,
    decrementStep,
    addQuestionAnswer,
    addUsersInfo,
    handleSelectedService,
    updateAboutProjectData,
    addAdditionalMessage
} = userAnswerSlice.actions;

export default userAnswerSlice.reducer;