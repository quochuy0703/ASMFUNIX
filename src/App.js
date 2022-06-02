import "./App.css";
import Main from "./components/MainComponent";
import { STAFFS } from "./shared/staffs";
import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Nav,
  UncontrolledDropdown,
} from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";

//class App
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
