import React, { useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import axios from "axios";
import { Container, Col, Row, Form, Alert } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { EntityList } from "./../constants/entity.constant";
import NavbarItem from "./NavbarItem";

const Locations = (props) => {
  const { history } = props;
  const [locationsData, setLocationsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState(100);
  const [selectedEntity, setSelectedEntity] = useState("");

  useEffect(() => {
    recoveryData(selectedLimit, selectedEntity);
  }, [selectedEntity, selectedLimit]);

  const recoveryData = (limit = 100, entity = null) => {
    setIsLoading(true);
    const params = {
      limit: limit,
      page: "1",
      offset: "0",
      sort: "desc",
      radius: 1000,
      country_id: "MX",
      order_by: "lastUpdated",
    };
    if (entity) {
      params.entity = entity;
    }

    axios
      .get(`https://docs.openaq.org/v2/locations`, { params })
      .then((response) => {
        const { data } = response;
        const { results } = data;
        setLocationsData(results);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEntityChange = ({ target }) => {
    const value = target.value;
    setSelectedEntity(value);
  };

  const handleLimitChange = ({ target }) => {
    const value = target.value;
    setSelectedLimit(value);
  };

  const getLocationCard = (res) => {
    return (
      <Col xs={12} lg={4}>
        <CardWrapper key={res.id} info={res} history={history} />
      </Col>
    );
  };

  return (
    <>
      <NavbarItem />
      <Container>
        <Row className="mt-4">
          <Col>
            <Form.Label htmlFor="inputPassword5">Entity</Form.Label>
            <Form.Select id="brand-input" onChange={handleEntityChange}>
              {EntityList.map(({ key, value }, index) => (
                <option value={key}>{value}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">Limit</Form.Label>
            <Form.Select id="brand-input" onChange={handleLimitChange}>
              <option value="">All</option>
              <option value="20">20 </option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </Form.Select>
          </Col>
        </Row>

        {isLoading ? (
          <LoadingSpinner />
        ) : locationsData.length > 0 ? (
          <Row className="mt-5">
            {locationsData.map((res) => getLocationCard(res))}
          </Row>
        ) : (
          <div>
            <Alert variant="primary" className="mt-4">
              Not elements found
            </Alert>
          </div>
        )}
      </Container>
    </>
  );
};

export default Locations;
