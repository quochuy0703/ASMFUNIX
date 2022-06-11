import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.ADD_STAFF:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: state.staffs.concat(action.payload),
      };
    case ActionTypes.DELETE_STAFF: {
      let newStaff = state.staffs;
      let index = newStaff.findIndex((item) => item.id === action.payload);
      newStaff.splice(index, 1);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: [...newStaff],
      };
    }
    case ActionTypes.UPDATE_STAFF: {
      let newStaffs = [...state.staffs];
      let index = newStaffs.findIndex((item) => item.id === action.payload.id);

      for (const prop in action.payload) {
        newStaffs[index] = {
          ...newStaffs[index],
          [prop]: action.payload[prop],
        };
      }

      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: [...newStaffs],
      };
    }

    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        staffs: [],
      };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };
    default:
      return state;
  }
};
