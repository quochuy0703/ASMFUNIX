import React, { Component } from "react";
import { Button, InputGroup, Input } from "reactstrap";

class SearchStaff extends Component {
  constructor(props) {
    super(props);
    // this.searchInput = React.createRef();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    this.props.onSearch(this.searchInput.value);
    this.searchInput.value = "";
  }
  render() {
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <InputGroup>
          <Input
            innerRef={(input) => (this.searchInput = input)}
            placeholder="Nhập tên để tìm kiếm, để trống về danh sách ban đầu"
          />
          <Button onClick={this.handleSearch} color="primary">
            Tìm
          </Button>
        </InputGroup>
      </div>
    );
  }
}

export default SearchStaff;
