import "./App.css";
import Main from "./components/MainComponent";
import { STAFFS } from "./shared/staffs";
import React, { Component } from "react";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
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

const store = ConfigureStore();

//class App
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
