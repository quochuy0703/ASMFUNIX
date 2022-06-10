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
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      depts: this.props.depts,
      nextID: 0,
    };

    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  // handleAddStaff(staff) {
  //   const newID = this.state.nextID + 1;
  //   staff = { ...staff, id: newID };
  //   let arrayStaff = JSON.parse(JSON.stringify(this.state.staffs));
  //   arrayStaff.push(staff);

  //   let arrayDepts = JSON.parse(JSON.stringify(this.state.depts));

  //   console.log(this.state.depts);

  //   arrayDepts = arrayDepts.map((item) => {
  //     if (item.name === staff.department.name) {
  //       item.numberOfStaff++;
  //     }
  //     return item;
  //   });

  //   console.log(arrayDepts);

  //   this.setState(
  //     (prevState) => ({
  //       staffs: arrayStaff,
  //       nextID: newID,
  //       depts: arrayDepts,
  //     }),
  //     () => {
  //       localStorage.setItem("staffs", JSON.stringify(this.state.staffs));
  //       localStorage.setItem("depts", JSON.stringify(this.state.depts));
  //     }
  //   );
  // }

  handleAddStaff(newStaff) {
    this.props.postStaff(newStaff);
  }
  componentDidMount() {
    console.log("did mount");

    this.props.fetchStaffs();
    //lấy dữ liệu staff từ localStorage
    // let dataStaff = localStorage.getItem("staffs");
    // if (dataStaff) {
    //   this.setState({
    //     staffs: JSON.parse(dataStaff),
    //   });
    // }

    this.props.fetchDepts();
    // //lấy dữ liệu depts từ localStorage
    // let dataDept = localStorage.getItem("depts");
    // if (dataDept) {
    //   this.setState({
    //     depts: JSON.parse(dataDept),
    //   });
    // }

    // //tính toán id tiếp theo cho staff
    // const listID = this.state.staffs.map((item) => item.id);
    // const max = Math.max(...listID);
    // console.log(max);
    // this.setState({
    //   nextID: max,
    // });

    this.props.fetchSalary();
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
