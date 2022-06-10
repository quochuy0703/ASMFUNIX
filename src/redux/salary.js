import * as ActionTypes from "./ActionTypes";

export const Salary = (
  state = { isLoading: true, errMess: null, salary: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SALARY:
      return { ...state, salary: action.payload };
    case ActionTypes.SALARY_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.SALARY_FAILED:
      return { ...state, errMess: action.payload };
    default:
      return state;
  }
};
