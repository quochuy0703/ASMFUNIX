import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

class DeptComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = this.props.depts.map((dept) => {
      return (
        <div className="col-md-3 col-sm-2 col-xs-1 m-1">
          <Card key={dept.id}>
            <CardBody>
              <CardTitle>
                <strong>{dept.name}</strong>
              </CardTitle>
              <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });
    return <div className="row">{list}</div>;
  }
}

export default DeptComponent;
