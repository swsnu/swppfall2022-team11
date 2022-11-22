import { configureStore, ThunkMiddleware } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import eventReducer from "./slices/event"
import giftReducer from "./slices/gift"

export const store = configureStore({
    reducer: {
        event: eventReducer,
        gift: giftReducer,
    },

    // 이거 Date가 serializable 하지 않다고 에러 떠서 넣었습니다. 참고 부탁드립니다. by 민준
    middleware: [thunk] as [ThunkMiddleware]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;