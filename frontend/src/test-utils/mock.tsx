import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { AppStore, RootState } from "../store";
import eventReducer from "../store/slices/event";
import giftReducer from "../store/slices/gift";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: { event: eventReducer, gift: giftReducer },
    preloadedState,
    middleware: [thunk] as [ThunkMiddleware]
  });
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = getMockStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>
      <BrowserRouter>  {/* 이부분 커스텀한것 주의!*/}
        {children}
      </BrowserRouter>
    </Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}