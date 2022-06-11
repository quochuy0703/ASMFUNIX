import { actionTypes } from "react-redux-form";
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

export const postStaff = (newStaff) => (dispatch) => {
  newStaff.date = new Date().toISOString();
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
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
    .then((res) => {
      dispatch(addStaff(res[res.length - 1]));
    })
    .catch((err) => console.log(err.message));
};

export const postDeleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
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
    .then((res) => dispatch(deleteStaff(id)))
    .catch((err) => dispatch(failedStaffs(err.message)));
};

export const addStaff = (newStaff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: newStaff,
});

export const deleteStaff = (id) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: id,
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

export const fetchSalary = () => (dispatch) => {
  dispatch(loadingSalary());
  return fetch(baseUrl + "staffsSalary")
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
    .then((res) => dispatch(addSalary(res)))
    .catch((err) => dispatch(failedSalary(err.message)));
};

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});
export const loadingSalary = () => ({ type: ActionTypes.SALARY_LOADING });
export const failedSalary = (errMess) => ({
  type: ActionTypes.SALARY_FAILED,
  paload: errMess,
});

export const fetchStaffOfDept = (id) => (dispatch) => {
  dispatch(loadingStaffsOfDept());
  console.log("fetchStaffOfDept: " + id);
  return fetch(baseUrl + "departments/" + id)
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
    .then((res) => dispatch(addStaffsOfDept(res)))
    .catch((err) => dispatch(failedStaffsOfDept(err.message)));
};

export const addStaffsOfDept = (staffs) => ({
  type: ActionTypes.ADD_STAFFS_DEPT,
  payload: staffs,
});
export const loadingStaffsOfDept = () => ({
  type: ActionTypes.STAFFS_DEPT_LOADING,
});
export const failedStaffsOfDept = (errMess) => ({
  type: ActionTypes.STAFFS_DEPTS_FAILED,
  payload: errMess,
});
