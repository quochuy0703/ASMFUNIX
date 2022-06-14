import React, { Component } from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import DeleteStaff from "./DeleteStaff";
import UpdateStaff from "./UpdateStaff";

import { FadeTransform } from "react-animation-components";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteStaff(id) {
    console.log("handle delete staff");
    this.props.onDeleteStaff(id);
  }

  handleUpdateStaff(infoStaff) {
    this.props.onUpdateStaff(infoStaff);
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
          <div className="col-md-8 col-sm-12 col-xs-12">
            <div className="row align-items-center h-100">
              <DeleteStaff
                onDeleteStaff={(id) => this.handleDeleteStaff(id)}
                idStaff={this.props.staff.id}
              />
              <UpdateStaff
                depts={this.props.depts}
                staff={this.props.staff}
                onUpdateStaff={(infoStaff) => this.handleUpdateStaff(infoStaff)}
              />
            </div>
          </div>
        </div>
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
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
                <p>
                  Ngày sinh: {dateFormat(this.props.staff.doB, "dd/mm/yyyy")}
                </p>
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
        </FadeTransform>
      </div>
    );
  }
}

export default StaffDetail;
