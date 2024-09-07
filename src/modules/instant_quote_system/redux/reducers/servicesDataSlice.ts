import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendRequestToServer } from "../../common_service/api";
import { serviceDataInitialState, serviceDataType } from "../../types/service";

export const fetchServiceData = createAsyncThunk('servicesData/fetch', async (endpoint: string, { rejectWithValue }) => {
    try {
        const data = await sendRequestToServer(endpoint, "GET");
        return data?.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

const initialState: serviceDataInitialState = {
    services_data: null,
    isLoading: false,
    error: null,
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchServiceData.pending, (state) => {
            state.isLoading = true,
                state.error = null;
        }),
            builder.addCase(fetchServiceData.fulfilled, (state, action: PayloadAction<serviceDataType[]>) => {
                state.isLoading = false,
                    state.services_data = action.payload;
            }),
            builder.addCase(fetchServiceData.rejected, (state, action) => {
                state.isLoading = false,
                state.error = action.payload
            })
    }
})

export default servicesSlice.reducer;