import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { StatusCodes } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { IAction } from '@/types/store.type';


export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: IUserReg) => {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/user/register`, userData);
        if (response.status == StatusCodes.CREATED) {
            const data: { accessToken: string } = response.data;
            localStorage.setItem('token', data.accessToken);
            return jwtDecode(data.accessToken);
        } else {
            localStorage.clear();
            throw new Error('Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData: IUserLog) => {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/user/login`, userData);
        if (response.status == StatusCodes.CREATED) {
            const data: { accessToken: string } = response.data;
            localStorage.setItem('token', data.accessToken);
            return jwtDecode(data.accessToken);
        } else {
            localStorage.clear();
            throw new Error('Login failed');
        }
    }
);

export const verifyUser = createAsyncThunk(
    'user/verifyUser',
    async (token: string) => {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/user/verify-email`, { verificationToken: token });
        const data = response.data.user;
        localStorage.setItem('token', response.data.token);
        const user = { _id: data._id, email: data.email, name: data.name, verified: data.isVerified };
        return user;
    }
)

const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state: IUserState, action: { payload: any, type: any }) => {
            state.user = jwtDecode(action.payload);
        },
        exit: (state: IUserState) => {
            state.loading = null;
            state.error = null;
            state.user = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyUser.fulfilled, (state: IUserState, action: IAction) => {
                state.user = action.payload
                state.loading = false;
                state.error = false;
            })
            .addCase(registerUser.pending, (state: IUserState) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state: IUserState, action: IAction) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state: IUserState) => {
                state.loading = false;
                state.error = true
            })
            .addCase(loginUser.pending, (state: IUserState) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state: IUserState, action: IAction) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state: IUserState) => {
                state.loading = false;
                state.error = true
            });
    },
});

export const { initUser, exit } = userSlice.actions;
export default userSlice.reducer;
