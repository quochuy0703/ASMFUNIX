import React, { Component } from "react";
import { Card, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
          </Breadcrumb> */}
          <nav class="breadcrumbs">
            <span class="breadcrumbs__item">
              <Link to="/staff">Nhân Viên</Link>
            </span>
            <span class="breadcrumbs__item">{this.props.staff.name}</span>
          </nav>
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
              <p>Phòng ban: {this.props.staff.department.name}</p>
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
