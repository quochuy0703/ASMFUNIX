import * as ActionTypes from "./ActionTypes";

export const StaffsOfDept = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS_DEPT:
      return { ...state, staffs: action.payload, isLoading: false };
    case ActionTypes.STAFFS_DEPT_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.STAFFS_DEPTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
