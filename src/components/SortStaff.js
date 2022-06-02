import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  UncontrolledDropdown,
  Button,
} from "reactstrap";

class SortStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      sortBy: "Tên",
      sortDir: "Tăng",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDir = this.handleDir.bind(this);
  }
  handleClick(e, code) {
    this.setState({
      isOpen: this.state.isOpen,
      sortBy: e.target.textContent,
      sortDir: this.state.sortDir,
    });
    console.log(this.state, e.target.textContent);
    this.props.onClick(code);
  }
  handleDir(e, code) {
    this.setState({
      isOpen: this.state.isOpen,
      sortBy: this.state.sortBy,
      sortDir: e.target.textContent,
    });

    this.props.onHandleDir(code);
  }

  render() {
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="row">
          <div className="col-4">
            <UncontrolledDropdown>
              <DropdownToggle className="bg-secondary" caret>
                Sắp xếp theo
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={(e) => this.handleClick(e, "name")}>
                  Tên
                </DropdownItem>
                <DropdownItem onClick={(e) => this.handleClick(e, "id")}>
                  ID
                </DropdownItem>
                <DropdownItem onClick={(e) => this.handleClick(e, "startDate")}>
                  Ngày vào làm
                </DropdownItem>
                <DropdownItem onClick={(e) => this.handleClick(e, "doB")}>
                  Ngày sinh
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="col-5">
            <Button color="success" outline disabled block>
              {this.state.sortBy}
            </Button>
          </div>
          <div className="col-2">
            <UncontrolledDropdown>
              <DropdownToggle className="bg-secondary" caret>
                {this.state.sortDir}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={(e) => this.handleDir(e, "asc")}>
                  Tăng
                </DropdownItem>
                <DropdownItem onClick={(e) => this.handleDir(e, "dsc")}>
                  Giảm
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default SortStaff;
