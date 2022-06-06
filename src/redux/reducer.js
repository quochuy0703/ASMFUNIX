import { STAFFS, DEPARTMENTS } from "../shared/staffs";

export const initialState = {
  staffs: STAFFS,
  depts: DEPARTMENTS,
  nextID: 0,
};

export const Reducer = (state = initialState, action) => {
  return state;
};
