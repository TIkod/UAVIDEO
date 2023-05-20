import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user.slice';
import videoUserReducer from './features/video.user.slice';

export const rootReducer = combineReducers({
    auth: userReducer,
    videoAuth: videoUserReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
