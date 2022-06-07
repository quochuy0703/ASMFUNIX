import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  FormFeedback,
} from "reactstrap";

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: "",
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: { name: "IT" },
      annualLeave: 0,
      overTime: 0,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        startDate: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleAdd() {
    this.toggleModal();
  }

  handleBlur = (code) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [code]: true },
    });
  };

  handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "department") {
      this.setState({
        [evt.target.name]: { name: value },
      });
    } else {
      this.setState({
        [evt.target.name]: value,
      });
    }
  }

  handleClickAdd(e) {
    e.preventDefault();
    const newStaff = {
      name: this.state.name,
      doB: new Date(this.state.doB).toISOString(),
      salaryScale: Number(this.state.salaryScale),
      startDate: new Date(this.state.startDate).toISOString(),
      department: { name: this.state.department.name },
      annualLeave: Number(this.state.annualLeave),
      overTime: Number(this.state.overTime),
      salary: "",
      image: "/assets/images/alberto.png",
    };
    this.props.onAddStaff(newStaff);
    this.toggleModal();
  }

  validate(name, doB, startDate, salaryScale) {
    const error = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
    };
    //it hon 30 ky tu
    if (this.state.touched.name && this.state.name.length > 30) {
      error.name = "Yêu cầu ít hơn 30 ký tự";
    }
    if (this.state.touched.doB && this.state.doB === "") {
      error.doB = "Yêu cầu nhập";
    }
    if (this.state.touched.startDate && this.state.startDate === "") {
      error.startDate = "Yêu cầu nhập";
    }
    if (salaryScale && Number(salaryScale) > 3.0) {
      error.salaryScale = "Phải nhỏ hơn 3.0";
    }
    if (salaryScale && Number(salaryScale) < 1.0) {
      error.salaryScale = "Phải lớn hơn 1.0";
    }
    return error;
  }
  render() {
    const error = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.salaryScale
    );
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <Button color="primary" onClick={this.handleAdd}>
          Thêm
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.handleClickAdd(e)}>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="name">Tên</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    valid={error.name === ""}
                    invalid={error.name !== ""}
                    value={this.state.name}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{error.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="doB">Ngày Sinh</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    valid={error.doB === ""}
                    invalid={error.doB !== ""}
                    value={this.state.doB}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{error.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="startDate">Ngày vào công ty</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    valid={error.startDate === ""}
                    invalid={error.startDate !== ""}
                    value={this.state.startDate}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{error.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="department">Phòng ban</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="select"
                    name="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                  >
                    <option>IT</option>
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="salaryScale">Hệ số lương</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    valid={error.salaryScale === ""}
                    invalid={error.salaryScale !== ""}
                    value={this.state.salaryScale}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{error.salaryScale}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="1.0"
                    value={this.state.annualLeave}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Label htmlFor="overTime">Số ngày làm thêm</Label>
                </Col>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button type="submit" color="primary">
                  Thêm
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddStaff;
