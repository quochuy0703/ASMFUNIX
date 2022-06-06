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
      nextID: 0,
    };

    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  handleAddStaff(staff) {
    const newID = this.state.nextID + 1;
    staff = { ...staff, id: newID };
    let arrayStaff = JSON.parse(JSON.stringify(this.state.staffs));
    arrayStaff.push(staff);

    this.setState(
      (prevState) => ({
        staffs: arrayStaff,
        nextID: newID,
      }),
      () => {
        console.log(this.state.staffs);
        localStorage.setItem("staffs", JSON.stringify(this.state.staffs));
      }
    );
  }

  componentDidMount() {
    console.log("did mount");
    let data = localStorage.getItem("staffs");
    if (data) {
      this.setState({
        staffs: JSON.parse(data),
      });
    }

    const listID = this.state.staffs.map((item) => item.id);
    const max = Math.max(...listID);
    console.log(max);
    this.setState({
      nextID: max,
    });
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
            component={() => (
              <StaffList
                onAddStaff={this.handleAddStaff}
                staffs={this.state.staffs}
              />
            )}
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
