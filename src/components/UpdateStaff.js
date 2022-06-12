import React, { Component } from "react";
import {
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
} from "reactstrap";

import { LocalForm, Control, Errors } from "react-redux-form";

class UpdateStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }
  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleAdd() {
    this.toggleModal();
  }

  handleClickUpdate(values, e) {
    e.preventDefault();
    const newStaff = {
      name: values.name,
      doB: new Date(values.doB).toISOString(),
      salaryScale: Number(values.salaryScale),
      startDate: new Date(values.startDate).toISOString(),
      departmentId: values.department,
      annualLeave: Number(values.annualLeave),
      overTime: Number(values.overTime),
      salary: Math.trunc(
        Number(values.salaryScale) * 3000000 + Number(values.overTime) * 200000
      ),
      image: "/assets/images/alberto.png",
    };
    let tempStaff = {};
    for (const prop in newStaff) {
      if (this.props.staff[prop] !== newStaff[prop]) {
        if (prop === "doB") {
          if (
            this.props.staff[prop].substr(0, 10) !==
            newStaff[prop].substr(0, 10)
          ) {
            tempStaff[prop] = newStaff[prop];
          }
        } else if (prop === "startDate") {
          if (
            this.props.staff[prop].substr(0, 10) !==
            newStaff[prop].substr(0, 10)
          ) {
            tempStaff[prop] = newStaff[prop];
          }
        } else {
          tempStaff[prop] = newStaff[prop];
        }
      }
    }
    tempStaff.id = this.props.staff.id;
    let payload = {};
    payload.old = this.props.staff;
    payload.new = tempStaff;
    this.props.onUpdateStaff(payload);
    // alert(JSON.stringify(tempStaff));

    this.toggleModal();
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => !val || val.length >= len;
    const greatThan = (num) => (val) => !val || Number(val) >= num;
    const lessThan = (num) => (val) => !val || Number(val) <= num;
    const isNumber = (val) => !isNaN(Number(val));

    let listDepts = this.props.depts.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <Button
          className="form-control"
          color="primary"
          onClick={this.handleAdd}
        >
          Cập nhật
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Cập nhật thông tin nhân viên
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values, e) => this.handleClickUpdate(values, e)}
            >
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="name">Tên</Label>
                </Col>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    defaultValue={this.props.staff.name}
                    validators={{ required, maxLength: maxLength(30) }}
                  />
                  <Errors
                    model=".name"
                    show="touched"
                    className="text-danger"
                    messages={{
                      required: "Yêu cầu nhập",
                      maxLength: "Yêu cầu ít hơn 30 ký tự",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="doB">Ngày Sinh</Label>
                </Col>
                <Col md={8}>
                  <Control
                    type="date"
                    model=".doB"
                    id="doB"
                    name="doB"
                    className="form-control"
                    defaultValue={this.props.staff.doB.substr(0, 10)}
                    validators={{ required }}
                  />
                  <Errors
                    model=".doB"
                    show="touched"
                    className="text-danger"
                    messages={{ required: "Yêu cầu nhập" }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="startDate">Ngày vào công ty</Label>
                </Col>
                <Col md={8}>
                  <Control
                    model=".startDate"
                    type="date"
                    id="startDate"
                    name="startDate"
                    defaultValue={this.props.staff.startDate.substr(0, 10)}
                    className="form-control"
                    validators={{ required }}
                  />
                  <Errors
                    model=".startDate"
                    show="touched"
                    className="text-danger"
                    messages={{ required: "Yêu cầu nhập" }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="department">Phòng ban</Label>
                </Col>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    defaultValue={this.props.staff.departmentId}
                    className="form-control"
                  >
                    {/* <option>IT</option>
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>Finance</option> */}
                    {listDepts}
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="salaryScale">Hệ số lương</Label>
                </Col>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    placeholder="1.0 -> 3.0"
                    defaultValue={this.props.staff.salaryScale}
                    validators={{
                      isNumber,
                      greatThan: greatThan(1.0),
                      lessThan: lessThan(3.0),
                    }}
                  />
                  <Errors
                    model=".salaryScale"
                    show="touched"
                    className="text-danger"
                    messages={{
                      isNumber: "Phải là một số",
                      lessThan: "Phải nhỏ hơn 3.0",
                      greatThan: "Phải lớn hơn 1.0",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                </Col>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    placeholder="1.0"
                    defaultValue={this.props.staff.annualLeave}
                    validators={{ isNumber }}
                  />
                  <Errors
                    model=".annualLeave"
                    show="touched"
                    className="text-danger"
                    messages={{
                      isNumber: "Phải là một số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="overTime">Số ngày làm thêm</Label>
                </Col>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    defaultValue={this.props.staff.overTime}
                    validators={{ isNumber }}
                  />
                  <Errors
                    model=".overTime"
                    show="touched"
                    className="text-danger"
                    messages={{
                      isNumber: "Phải là một số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group justify-content-center">
                <Button className="col-4" type="submit" color="primary">
                  Cập nhật
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateStaff;
