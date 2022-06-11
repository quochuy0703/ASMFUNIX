import React, { Component } from "react";
import { Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

import SearchStaff from "./SearchStaff";
import SortStaff from "./SortStaff";
import CardStaff from "./CardStaff";

import { Loading } from "./LoadingComponent";

class StaffListOfDept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      orderBy: null,
      sortDir: "asc",
      addStaff: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDir = this.handleDir.bind(this);
  }
  //xử lý khi người dùng nhấn nút search
  handleSearch(value) {
    this.setState({
      searchWord: value,
      orderBy: this.state.orderBy,
      sortDir: this.state.sortDir,
    });
  }
  //xử lý khi người dùng chọn sắp xếp theo ID, name, ngày sinh hoặc ngày vào làm
  handleClick(code) {
    this.setState({
      searchWord: this.state.searchWord,
      orderBy: code,
      sortDir: this.state.sortDir,
    });
  }

  //xử lý khi người dùng chọn sắp xếp theo tăng dần hoặc giảm dần
  handleDir(code) {
    this.setState({
      searchWord: this.state.searchWord,
      orderBy: this.state.orderBy,
      sortDir: code,
    });
  }

  //các hàm xử lý sắp xếp
  //sắp xếp theo ngày sinh
  sortByDoB = function (a, b) {
    var c = new Date(a.doB);
    var d = new Date(b.doB);
    return c - d;
  };
  //sắp xếp theo ngày vào làm
  sortByStartDate = function (a, b) {
    var c = new Date(a.startDate);
    var d = new Date(b.startDate);
    return c - d;
  };
  //sắp xếp theo ID
  sortByID = function (a, b) {
    return Number(a.id) - Number(b.id);
  };
  //sắp xếp theo name
  sortByName = function (a, b) {
    return a.name.localeCompare(b.name);
  };

  componentDidMount() {
    this.props.fetchData(this.props.deptID);
  }
  render() {
    if (this.props.loadingStaffs) {
      return <Loading />;
    } else if (this.props.failedStaffs) {
      return <h4>this.props.failedStaffs</h4>;
    } else {
      //xử lý tìm kiếm theo tên
      let listTemp;
      if (this.state.searchWord) {
        listTemp = this.props.staffs.filter((item) =>
          item.name.toLowerCase().includes(this.state.searchWord.toLowerCase())
        );
      } else {
        listTemp = [...this.props.staffs];
      }

      //sắp xếp theo ID, name, ngày sinh hoặc ngày vào làm
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

      //xử lý sắp xếp tăng dần hoặc giảm dần
      if (this.state.sortDir === "asc") {
      } else {
        listTemp.reverse();
      }

      //list chứa danh sách nhân viên
      const list = listTemp.map((staff) => {
        return (
          <Link
            key={staff.id}
            style={{ textDecoration: "none" }}
            to={`/staff/${staff.id}`}
          >
            <CardStaff key={staff.id} staff={staff} depts={this.props.depts} />
          </Link>
        );
      });
      return (
        <div className="container">
          <h1>Nhân Viên</h1>
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/dept">Phòng ban</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {
                  this.props.depts.filter(
                    (item) => item.id === this.props.deptID
                  )[0].name
                }
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="row">
            <SearchStaff onSearch={this.handleSearch} />
            <SortStaff
              onClick={this.handleClick}
              onHandleDir={this.handleDir}
            />
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
}

export default StaffListOfDept;
