import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import SortSalary from "./SortSalary";
import CardSalary from "./CardSalary";

class SalaryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: null,
      sortDir: "asc",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDir = this.handleDir.bind(this);
  }

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

  sortByID = function (a, b) {
    return Number(a.id) - Number(b.id);
  };
  sortBySalary = function (a, b) {
    let aS = Number(a.salaryScale) * 3000000 + Number(a.overTime) * 200000;
    let bS = Number(b.salaryScale) * 3000000 + Number(b.overTime) * 200000;
    return aS - bS;
  };

  render() {
    let listTemp = [...this.props.staffs];
    //sort
    if (this.state.orderBy) {
      let sortFunc;
      if (this.state.orderBy === "id") {
        sortFunc = this.sortByID;
      } else {
        sortFunc = this.sortBySalary;
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
      //   <div className="my-1 col-md-4 col-sm-6 col-xs-12">
      //     <Card key={staff.id}>
      //       <CardBody className="text-center">
      //         <CardTitle>
      //           <strong>{staff.name}</strong>
      //         </CardTitle>
      //         <CardText>
      //           <p>Mã nhân viên: {staff.id}</p>
      //           <p>Hệ số lương: {staff.salaryScale}</p>
      //           <p>Số ngày làm thêm: {staff.overTime}</p>
      //           <p>
      //             Lương:{" "}
      //             {Math.trunc(
      //               Number(staff.salaryScale) * 3000000 +
      //                 Number(staff.overTime) * 200000
      //             )}
      //           </p>
      //         </CardText>
      //       </CardBody>
      //     </Card>
      //   </div>
      // );
      return (
        <div className="my-1 col-md-4 col-sm-6 col-xs-12">
          <CardSalary staff={staff} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-12">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staff">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <SortSalary
              onClick={this.handleClick}
              onHandleDir={this.handleDir}
            />
          </div>
        </div>
        <div className="row">{list}</div>
      </div>
    );
  }
}

export default SalaryDetail;
