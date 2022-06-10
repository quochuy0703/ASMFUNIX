import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "./baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(loadingStaffs());

  return fetch(baseUrl + "staffs")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var err = new Error("Error " + res.status + ": " + res.statusText);
          err.response = res;
          throw err;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((res) => dispatch(addStaffs(res)))
    .catch((err) => dispatch(failedStaffs(err.message)));
};

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});
export const loadingStaffs = () => ({ type: ActionTypes.STAFFS_LOADING });
export const failedStaffs = (errMess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errMess,
});

export const fetchDepts = () => (dispatch) => {
  dispatch(loadingDepts());
  return fetch(baseUrl + "departments")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error("Error " + res.status + ": " + res.statusText);
          err.response = res;
          throw err;
        }
      },
      (error) => {
        let err = new Error(error.message);
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => dispatch(addDepts(res)))
    .catch((err) => dispatch(failedDepts(err.message)));
};
export const addDepts = (depts) => ({
  type: ActionTypes.ADD_DEPT,
  payload: depts,
});

export const loadingDepts = () => ({
  type: ActionTypes.DEPT_LOADING,
});
export const failedDepts = (errMess) => ({
  type: ActionTypes.DEPT_FAILED,
  payload: errMess,
});
