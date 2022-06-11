import React, { Component } from "react";
import { Card, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import DeleteStaff from "./DeleteStaff";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteStaff(id) {
    console.log("handle delete staff");
    this.props.onDeleteStaff(id);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="breadcrumbs col-md-4 col-sm-12 col-xs-12">
            <span className="breadcrumbs__item">
              <Link to="/staff">Nhân Viên</Link>
            </span>
            <span className="breadcrumbs__item">{this.props.staff.name}</span>
          </div>
          <DeleteStaff
            onDeleteStaff={(id) => this.handleDeleteStaff(id)}
            idStaff={this.props.staff.id}
          />
        </div>
        <Card>
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12 text-center">
              <img
                src={this.props.staff.image}
                alt={this.props.staff.image}
                style={{ width: "auto", height: "100%" }}
              />
            </div>

            <div className="col-md-9 col-sm-8 col-xs-12">
              <h4>Họ và Tên: {this.props.staff.name}</h4>
              <p>Ngày sinh: {dateFormat(this.props.staff.doB, "dd/mm/yyyy")}</p>
              <p>
                Ngày vào công ty:{" "}
                {dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}
              </p>
              <p>
                Phòng ban:{" "}
                {this.props.depts.some(
                  (item) => item.id === this.props.staff.departmentId
                )
                  ? this.props.depts.filter(
                      (item) => item.id === this.props.staff.departmentId
                    )[0].name
                  : ""}
              </p>
              <p>Số ngày nghỉ còn lại: {this.props.staff.annualLeave}</p>
              <p>Số ngày làm thêm: {this.props.staff.overTime}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default StaffDetail;
