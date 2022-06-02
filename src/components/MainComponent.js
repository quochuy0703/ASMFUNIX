import React, { Component } from "react";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetail";
import SalaryDetail from "./SalaryDetail";

import DeptComponent from "./DeptComponent";

import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      depts: DEPARTMENTS,
    };
  }

  render() {
    const staffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
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
            component={() => <StaffList staffs={this.state.staffs} />}
          />
          <Route exact path="/staff/:id" component={staffWithID} />
          <Route
            exact
            path="/dept"
            component={() => <DeptComponent depts={this.state.depts} />}
          />
          <Route
            exact
            path="/salary"
            component={() => <SalaryDetail staffs={this.state.staffs} />}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
