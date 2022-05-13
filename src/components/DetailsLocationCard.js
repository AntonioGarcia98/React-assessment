import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "../styles/DetailsLocationCard.css";

const DetailsLocationCard = (props) => {
  const { firstUpdated, lastUpdated, parameters, measurements } = props.info;

  const getDetailsCard = () => {
    return (
      <div>
        <Card.Title> Details</Card.Title>
        <Card.Text>
          {new Date(firstUpdated).toLocaleDateString()} -{" "}
          {new Date(lastUpdated).toLocaleDateString()}
        </Card.Text>
        <h2 className="meassurement">{measurements}</h2>
        <h3 className="title-meassurement">MEASUREMENTS</h3>
      </div>
    );
  };

  const getElement = (data) => {
    return (
      <Col lg={4} xs={6}>
        <h6 className="title-meassurement">{data.displayName}</h6>
        <h1 className="meassurement">{data.lastValue}</h1>
        <p>{data.unit}</p>
      </Col>
    );
  };

  const getAverageCard = () => {
    return (
      <>
        <Card.Title> Last measurements</Card.Title>
        <Row>
          {parameters.map((res) => {
            return getElement(res);
          })}
        </Row>
      </>
    );
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="m-3">
            <Card.Body>{getDetailsCard()}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="m-3">
            <Card.Body>{getAverageCard()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetailsLocationCard;
