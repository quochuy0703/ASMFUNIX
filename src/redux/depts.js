import * as ActionTypes from "./ActionTypes";

export const Depts = (
  state = { isLoading: true, errMess: null, depts: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        depts: action.payload,
      };
    case ActionTypes.DEPT_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.DEPT_FAILED:
      return { ...state, errMess: action.payload };
    default:
      return state;
  }
};
