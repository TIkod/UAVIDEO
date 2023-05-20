import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IVideoUserState } from '@/types/video.user.type';
import axios, { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { IAction } from '@/types/store.type';


export const loadVideos = createAsyncThunk('videoUser/loadVideos', async (payload: { userID: string, count: number, offset: number }) => {
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/user/${payload.userID}?сount=${payload.count}&offset=${payload.offset}`)
    if (response.status === StatusCodes.OK) {
        return response.data;
    } else {
        throw new Error('Failed authentification');
    }
});


const initialState: IVideoUserState = {
    videos: [],
    loading: null,
    error: null,
};

const videoUserSlice = createSlice({
    name: 'videoUser',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadVideos.pending, (state: IVideoUserState) => {
                state.loading = true;
            })
            .addCase(loadVideos.fulfilled, (state: IVideoUserState, action: IAction) => {
                state.loading = false;
                state.error = false;
                state.videos = action.payload;
            })
            .addCase(loadVideos.rejected, (state: IVideoUserState) => {
                state.loading = false;
                state.error = true
            })
    },
});

export default videoUserSlice.reducer;
