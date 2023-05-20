import { rootReducer } from "@/store/store";
import { AnyAction, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";

export type IAction = PayloadAction<any, string, {
    arg: any
    requestId?: string;
    requestStatus?: "fulfilled";
}, never>

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
