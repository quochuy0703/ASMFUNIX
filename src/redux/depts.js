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
    case ActionTypes.UPDATE_DEPT: {
      let newDepts = [...state.depts];
      let index = newDepts.findIndex(
        (item) => item.id === action.payload.departmentId
      );
      newDepts[index].numberOfStaff++;
      return {
        ...state,
        isLoading: false,
        errMess: null,
        depts: [...newDepts],
      };
    }
    case ActionTypes.UPDATE_DEPT_2: {
      let newDepts = [...state.depts];
      let index = newDepts.findIndex(
        (item) => item.id === action.payload.new.departmentId
      );
      newDepts[index].numberOfStaff++;

      index = newDepts.findIndex(
        (item) => item.id === action.payload.old.departmentId
      );
      newDepts[index].numberOfStaff--;
      return {
        ...state,
        isLoading: false,
        errMess: null,
        depts: [...newDepts],
      };
    }
    case ActionTypes.DEPT_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.DEPT_FAILED:
      return { ...state, errMess: action.payload, isLoading: false };
    default:
      return state;
  }
};
