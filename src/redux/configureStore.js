import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import { Depts } from "./depts";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ staffs: Staffs, depts: Depts }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
