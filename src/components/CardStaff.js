import React, { Component } from "react";
import dateFormat from "dateformat";

export default class CardStaff extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container_card">
        <div className="header">
          <div className="header_left">
            <input type="checkbox" onClick={(e) => e.preventDefault()} />
          </div>
          <div className="header_right">
            {/* <div className="header_button">
              <button>Action</button>
            </div>
            <div className="header_button">
              <button>Action</button>
            </div> */}
          </div>
        </div>
        <div className="middle">
          <div className="middle_image">
            <img
              className="middle_image_avatar"
              src={this.props.staff.image}
              alt="avatar"
            />
          </div>
          <div className="middle_content">
            <div className="middle_content_name">
              <strong>{this.props.staff.name}</strong>
            </div>
            <div className="middle_content_job">
              <small>Nhân viên</small>
            </div>
          </div>
        </div>
        <div className="footer_card">
          <div className="footer_start">
            <div className="footer_start_dept">
              <p>
                <strong>Phòng Ban</strong>
              </p>
              <p>
                {this.props.depts.some(
                  (item) => item.id === this.props.staff.departmentId
                )
                  ? this.props.depts.filter(
                      (item) => item.id === this.props.staff.departmentId
                    )[0].name
                  : ""}
              </p>
            </div>
            <div className="footer_start_joinDate">
              <p>
                <strong>Ng. vào làm</strong>
              </p>
              <p>{dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}</p>
            </div>
          </div>
          <div className="footer_end">
            <p>Mail: Ronad@gmail.com</p>
            <p>Phone: +084.31245436</p>
          </div>
        </div>
      </div>
    );
  }
}
