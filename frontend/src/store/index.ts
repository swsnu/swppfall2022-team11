import { configureStore } from "@reduxjs/toolkit"
import eventReducer from "./slices/event"

export const store = configureStore({
    reducer: {
        event: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;