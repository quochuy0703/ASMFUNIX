import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, Row } from "reactstrap";
import { Link } from "react-router-dom";

import SearchStaff from "./SearchStaff";
import SortStaff from "./SortStaff";
import CardStaff from "./CardStaff";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      orderBy: null,
      sortDir: "asc",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDir = this.handleDir.bind(this);
  }

  handleSearch(value) {
    console.log("staff", value);
    this.setState({
      searchWord: value,
      orderBy: this.state.orderBy,
      sortDir: this.state.sortDir,
    });

    // if (value) {
    //   let temp = this.state.staffs.filter((item) => item.name === value);
    //   this.setState({ staffs: temp });
    // } else {
    //   this.setState({ staffs: this.props.staffs });
    // }
  }

  sortByDoB = function (a, b) {
    var c = new Date(a.doB);
    var d = new Date(b.doB);
    return c - d;
  };
  sortByStartDate = function (a, b) {
    var c = new Date(a.startDate);
    var d = new Date(b.startDate);
    return c - d;
  };
  sortByID = function (a, b) {
    return Number(a.id) - Number(b.id);
  };
  sortByName = function (a, b) {
    return a.name.localeCompare(b.name);
  };
  handleClick(code) {
    console.log(code);

    this.setState({
      searchWord: this.state.searchWord,
      orderBy: code,
      sortDir: this.state.sortDir,
    });
  }
  handleDir(code) {
    this.setState({
      searchWord: this.state.searchWord,
      orderBy: this.state.orderBy,
      sortDir: code,
    });
    console.log(this.state);
  }
  render() {
    //search
    let listTemp;
    if (this.state.searchWord) {
      listTemp = this.props.staffs.filter(
        (item) => item.name === this.state.searchWord
      );
    } else {
      listTemp = [...this.props.staffs];
    }

    //sort
    if (this.state.orderBy) {
      let sortFunc;
      if (this.state.orderBy === "id") {
        sortFunc = this.sortByID;
      } else if (this.state.orderBy === "name") {
        sortFunc = this.sortByName;
      } else if (this.state.orderBy === "doB") {
        sortFunc = this.sortByStartDate;
      } else {
        sortFunc = this.sortByDoB;
      }
      listTemp.sort(sortFunc);
    }

    //dsc
    if (this.state.sortDir === "asc") {
    } else {
      listTemp.reverse();
    }

    //list chứa danh sách nhân viên
    const list = listTemp.map((staff) => {
      // return (
      //   <div className="m-1">
      //     <Card key={staff.id}>
      //       <Link to={`staff/${staff.id}`}>
      //         <CardImg
      //           top
      //           src={staff.image}
      //           alt={staff.image}
      //           className="avatar"
      //         />
      //         <CardBody className="text-center">
      //           <CardTitle>
      //             <strong>{staff.name}</strong>
      //           </CardTitle>
      //         </CardBody>
      //       </Link>
      //     </Card>
      //   </div>
      // );
      return (
        <Link style={{ textDecoration: "none" }} to={`staff/${staff.id}`}>
          <CardStaff key={staff.id} staff={staff} />
        </Link>
      );
    });

    return (
      <div className="container">
        <h1>Nhân Viên</h1>
        <div className="row">
          <SearchStaff onSearch={this.handleSearch} />
          <SortStaff onClick={this.handleClick} onHandleDir={this.handleDir} />
        </div>

        <hr />
        {/* render list nhân viên */}
        <Row md="6" sm="2" xs="1">
          {list}
        </Row>
      </div>
    );
  }
}

export default StaffList;
