import "./App.css";
import Menu from "./components/MenuComponent";
import { DISHES } from "./shared/dishes";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return <Menu dishes={this.state.dishes} />;
  }
}

export default App;
