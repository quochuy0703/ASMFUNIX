import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

const RenderDept = function (props) {
  return (
    <Link style={{ texDecoration: "none" }} to={`dept/${props.dept.id}`}>
      <Card key={props.dept.id}>
        <CardBody>
          <CardTitle>
            <strong>{props.dept.name}</strong>
          </CardTitle>
          <CardText>Số lượng nhân viên: {props.dept.numberOfStaff}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

class DeptComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loadingDepts) {
      return <Loading />;
    } else if (this.props.failedDepts) {
      return <h4>{this.props.failedDepts}</h4>;
    } else {
      const list = this.props.depts.map((dept) => {
        return (
          <div className="col-md-3 col-sm-2 col-xs-1 m-1" key={dept.id}>
            <RenderDept dept={dept} />
          </div>
        );
      });
      return <div className="row">{list}</div>;
    }
  }
}

export default DeptComponent;
