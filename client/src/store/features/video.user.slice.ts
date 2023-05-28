import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IVideoData, IVideoUserState } from '@/types/video.user.type';
import axios, { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { IAction } from '@/types/store.type';
import { IVideo } from '@/types/video.user.type'

export const loadVideos = createAsyncThunk('videoUser/loadVideos', async (payload: { userID: string, count: number, offset: number }) => {
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/user/${payload.userID}?сount=${payload.count}&offset=${payload.offset}`)
    if (response.status === StatusCodes.OK) {
        return response.data;
    } else {
        throw new Error('Failed authentification');
    }
});

export const addVideo = createAsyncThunk('videoUser/addVideo', async (videoData: IVideoData) => {
    const formData: FormData = new FormData();
    formData.append('name', videoData.name)
    formData.append('description', videoData.description)
    formData.append('user', videoData.user)
    formData.append('picture', videoData.picture)
    formData.append('video', videoData.video)
    videoData.tags.split(' ').forEach((tag: string) => {
        formData.append('tags[]', tag);
    })
    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/videos`, formData, {
        headers: { 'Content-Type': "multipart/form-data" }
    });
    if (response.status === StatusCodes.CREATED) {
        return response.data;
    } else {
        throw new Error('Failed');
    }
})

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
            .addCase(loadVideos.fulfilled, (state: IVideoUserState, action: IAction) => {
                state.videos = action.payload;
            })
            .addCase(addVideo.pending, (state: IVideoUserState) => {
                state.loading = true;
            })
            .addCase(addVideo.fulfilled, (state: IVideoUserState, action: IAction) => {
                state.loading = false;
                state.error = false;
                const video: IVideo = {
                    _id: action.payload._id,
                    name: action.payload.name,
                    description: action.payload.description,
                    videoPath: action.payload.videoPath,
                    picturePath: action.payload.picturePath,
                    user: action.payload.user,
                    likeCount: action.payload.likeCount,
                    tags: action.payload.tags,
                    comments: action.payload.comments,
                    viewCount: action.payload.viewCount
                }
                state.videos.push(video);
            })
            .addCase(addVideo.rejected, (state: IVideoUserState) => {
                state.loading = false;
                state.error = true
            })
    },
});

export default videoUserSlice.reducer;
