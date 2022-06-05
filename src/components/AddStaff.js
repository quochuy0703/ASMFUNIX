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
      department: "",
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
    console.log(code);
    this.setState({
      touched: { ...this.state.touched, [code]: true },
    });
    console.log(this.state);
  };

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });

    console.log(this.state);
  }

  handleClickAdd() {
    console.log(new Date(this.state.doB).toLocaleDateString());
  }

  validate(name, doB, startDate) {
    const error = {
      name: "",
      doB: "",
      startDate: "",
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
    return error;
  }
  render() {
    const error = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate
    );
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <Button color="primary" onClick={this.handleAdd}>
          Thêm
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={() => this.handleClickAdd()}>
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
                  <Label htmlFor="Department">Phòng ban</Label>
                </Col>
                <Col md={8}>
                  <Input type="select" name="Department">
                    <option>IT</option>
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
                    value={this.state.salaryScale}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleChange}
                  />
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
