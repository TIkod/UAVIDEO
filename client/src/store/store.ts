import { AnyAction, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user.slice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const rootReducer = combineReducers({
    auth: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
