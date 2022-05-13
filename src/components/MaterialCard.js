import * as React from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";
import moment from "moment";
import "moment-timezone";
import "../styles/Locations.css";

export default function MediaCard(props) {
  const { history } = props;
  const {
    id,
    name,
    entity,
    country,
    sensorType,
    firstUpdated,
    lastUpdated,
    parameters,
    measurements,
  } = props.info;

  return (
    <Card className="m-3">
      <Card.Body>
        {<p>{moment(lastUpdated).fromNow()}</p>}
        <Card.Title className="title"> {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <p>Location ID {id}</p>
          <p>{country}</p>
        </Card.Subtitle>

        <Card.Text>
          <Badge pill bg="primary" className="mx-3">
            {entity}
          </Badge>
          <Badge pill bg="primary">
            {sensorType}
          </Badge>
        </Card.Text>
        <div>
          <Row>
            <Col className="strong">RECOVERY DATA</Col>
          </Row>
          <Card.Text>
            {new Date(firstUpdated).toLocaleDateString()} -{" "}
            {new Date(lastUpdated).toLocaleDateString()}
          </Card.Text>

          <Row>
            <Col className="strong">MEASUREMENTS</Col>
          </Row>
          <Row className="mb-2">
            <Col>{measurements}</Col>
          </Row>

          <Row>
            <Col className="strong">PARAMETERS</Col>
          </Row>
          <Row className="mb-2">
            <Col>{parameters.map((res) => res.displayName).join(",")}</Col>
          </Row>
        </div>

        <Card.Link onClick={() => history.push(`/${id}`)}>
          More information
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
