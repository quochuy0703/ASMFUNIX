import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Switch, Redirect, withRouter } from "react-router-dom";

class DeleteStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handledDeleteStaff = this.handleDeleteStaff.bind(this);
    this.handleDeleteStaffYes = this.handleDeleteStaffYes.bind(this);
  }
  handleToggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleDeleteStaff(e) {
    e.preventDefault();
    console.log("delete staff");

    this.handleToggleModal();
  }
  handleDeleteStaffYes(e, id) {
    e.preventDefault();
    this.handleToggleModal();
    this.props.onDeleteStaff(id);
    this.props.history.push("/staff");
  }
  render() {
    return (
      <div className="col-md-4 col-sm-12 col-xs-12">
        <Button
          color="danger"
          className="form-control"
          onClick={(e) => this.handleDeleteStaff(e)}
        >
          Xoá
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.handleToggleModal}>
          <ModalHeader toggle={this.handleToggleModal}>
            Xoá nhân viên
          </ModalHeader>
          <ModalBody>Bạn chắc chắn muốn xoá nhân viên này?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="col-4"
              onClick={(e) => {
                this.handleDeleteStaffYes(e, this.props.idStaff);
              }}
            >
              Có
            </Button>{" "}
            <Button
              className="col-4"
              onClick={(e) => {
                e.preventDefault();
                this.handleToggleModal();
              }}
            >
              Không
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(DeleteStaff);
