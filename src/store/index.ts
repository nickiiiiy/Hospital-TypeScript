import { applyMiddleware, createStore } from "redux";
import { ThunkMiddleware } from "redux-thunk";
import rootReducer from "./reducers";

export const store: ReturnType<typeof createStore> = createStore(
  rootReducer,
  applyMiddleware(ThunkMiddleware)
);

export default store;
