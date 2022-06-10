import React, { Component } from "react";

export default class CardSalary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container_card" style={{ width: "250px" }}>
        <div className="header">
          <div className="header_left">
            <input type="checkbox" />
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
              <small>Mã nhân viên: {this.props.staff.id}</small>
            </div>
          </div>
        </div>
        <div className="footer_card">
          <div className="footer_start">
            <div className="footer_start_dept">
              <p>
                <strong>HS Lương</strong>
              </p>
              <p>{this.props.staff.salaryScale}</p>
            </div>
            <div className="footer_start_joinDate">
              <p>
                <strong>S. ng. làm thêm</strong>
              </p>
              <p>{this.props.staff.overTime}</p>
            </div>
          </div>
          <div className="footer_end">
            <p>
              <strong>Lương</strong>
            </p>
            <p>
              {this.props.staff.salary}
              {/* {Math.trunc(
                Number(this.props.staff.salaryScale) * 3000000 +
                  Number(this.props.staff.overTime) * 200000
              )} */}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
