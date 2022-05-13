import React, { useEffect, useState } from "react";
import DetailsLocationCard from "./DetailsLocationCard";
import { ChartVertical } from "./ChartVertical";
import axios from "axios";
import MainJumbotron from "./MainJumbotron";
import TableData from "./TableData";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./../App.css";
import LoadingSpinner from "./LoadingSpinner";
import NavbarItem from "./NavbarItem";
import "../styles/AirDetails.css";

const AirDetails = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { locationId } = params;
  const [location, setLocation] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [averageWeek, setAverageWeek] = useState([]);
  const [averageYear, setAverageYear] = useState([]);

  useEffect(() => {
    let one = `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations/${locationId}/`;
    let two = `https://docs.openaq.org/v2/averages?sort=asc&order_by=dow&temporal=dow&parameter=pm1&spatial=location&location=${locationId}`;
    let three = `https://docs.openaq.org/v2/averages?sort=asc&order_by=moy&temporal=moy&parameter=pm1&spatial=location&location=${locationId}`;
    let four = `https://docs.openaq.org/v2/averages?parameter=pm1&temporal=day&limit=10000&date_from=2020-05-12T12%3A12%3A11.000Z&date_to=2022-05-12T12%3A12%3A11.000Z&location=${locationId}&spatial=location`;
    setIsLoading(true);
    const requestOne = axios.get(one),
      requestTwo = axios.get(two),
      requestThree = axios.get(three),
      requestFour = axios.get(four);

    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((...responses) => {
          const responseOneData = responses[0].data;
          const responseTwoData = responses[1].data;
          const responseThreeData = responses[2].data;
          const responseFourData = responses[3].data;
          setAverageWeek(responseTwoData.results);
          setAverageYear(responseThreeData.results);
          setLocation(responseOneData.results[0]);
        })
      )
      .catch((errors) => {
        console.error(errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [locationId]);

  const generateLocationJSX = (Location) => {
    const {
      name,
      id,
      entity,
      sensorType,
      country,
      isMobile,
      parameters,
      coordinates,
    } = Location;
    const locationMainInfo = {
      name,
      id,
      entity,
      sensorType,
      country,
      isMobile,
      coordinates,
    };
    return (
      <>
        <MainJumbotron post={locationMainInfo} />
        <Container>
          <DetailsLocationCard info={location} />
          <Card className="p-4">
            {
              <Row>
                <Col xs={12} md={6}>
                  <h3 className="title">Pm1 Count Day of the week</h3>
                  <ChartVertical
                    dataSet={averageWeek}
                    keyData="dow"
                    labelKey="Avr. Account"
                    backgroundColor="rgba(61,54,109,0.5)"
                  />
                </Col>
                <Col item xs={12} md={6}>
                  <h3 className="title">Pm1 Count Moths of the year</h3>
                  <ChartVertical
                    dataSet={averageYear}
                    keyData="moy"
                    labelKey="Avr. Account"
                    backgroundColor="rgba(61,54,109,0.5)"
                  />
                </Col>
              </Row>
            }
          </Card>

          <Card className="p-4 mt-3">
            <h3 className="title">Parameters average</h3>
            <Row>
              <TableData parameters={parameters}></TableData>
            </Row>{" "}
          </Card>
        </Container>
      </>
    );
  };

  return (
    <>
      <NavbarItem showReturn={true} history={history} />
      <main>
        {isLoading ? (
          <LoadingSpinner />
        ) : location !== undefined && location ? (
          generateLocationJSX(location)
        ) : (
          <div>Not found data</div>
        )}
      </main>
    </>
  );
};

export default AirDetails;
