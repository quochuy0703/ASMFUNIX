import React, { Component } from "react";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffListOfDept from "./StaffsListOfDeptComponent";
import StaffDetail from "./StaffDetail";
import SalaryDetail from "./SalaryDetail";

import DeptComponent from "./DeptComponent";
import { connect } from "react-redux";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
  addStaffs,
  fetchStaffs,
  fetchDepts,
  fetchSalary,
  fetchStaffOfDept,
  postStaff,
  postDeleteStaff,
  patchUpdateStaff,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    depts: state.depts,
    nextID: state.nextID,
    salary: state.salary,
    staffsOfDept: state.staffsOfDept,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDepts: () => dispatch(fetchDepts()),
  fetchSalary: () => dispatch(fetchSalary()),
  fetchStaffOfDept: (deptID) => dispatch(fetchStaffOfDept(deptID)),
  postStaff: (newStaff) => dispatch(postStaff(newStaff)),
  postDeleteStaff: (id) => dispatch(postDeleteStaff(id)),
  patchUpdateStaff: (infoStaff) => dispatch(patchUpdateStaff(infoStaff)),
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  handleAddStaff(newStaff) {
    this.props.postStaff(newStaff);
  }
  componentDidMount() {
    console.log("did mount");

    this.props.fetchDepts();
    this.props.fetchStaffs();

    this.props.fetchSalary();
  }

  onDeleteStaff(id) {
    this.props.postDeleteStaff(id);
  }
  onUpdateStaff(infoStaff) {
    this.props.patchUpdateStaff(infoStaff);
  }

  render() {
    const staffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (item) => item.id === parseInt(match.params.id, 10)
            )[0]
          }
          onDeleteStaff={(id) => this.onDeleteStaff(id)}
          onUpdateStaff={(infoStaff) => this.onUpdateStaff(infoStaff)}
          depts={this.props.depts.depts}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <StaffList
                onAddStaff={this.handleAddStaff}
                staffs={this.props.staffs.staffs}
                loadingStaffs={this.props.staffs.isLoading}
                failedStaffs={this.props.staffs.errMess}
                depts={this.props.depts.depts}
              />
            )}
          />
          <Route exact path="/staff/:id" component={staffWithID} />
          <Route
            exact
            path="/dept/:id"
            render={(route) => (
              <StaffListOfDept
                fetchData={this.props.fetchStaffOfDept}
                deptID={route.match.params.id}
                staffs={this.props.staffsOfDept.staffs}
                loadingStaffs={this.props.staffsOfDept.isLoading}
                failedStaffs={this.props.staffsOfDept.errMess}
                depts={this.props.depts.depts}
              />
            )}
          />

          <Route
            exact
            path="/dept"
            component={() => (
              <DeptComponent
                depts={this.props.depts.depts}
                loadingDepts={this.props.depts.isLoading}
                failedDepts={this.props.depts.errMess}
              />
            )}
          />
          <Route
            exact
            path="/salary"
            component={() => <SalaryDetail staffs={this.props.salary.salary} />}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
