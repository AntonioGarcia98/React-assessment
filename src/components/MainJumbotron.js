import * as React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import "./../styles/MainJumbotron.css";

function MainJumbotron(props) {
  const { post } = props;
  console.log(post);
  return (
    <div className="bg-light p-5 rounded-lg">
      <h1 className="title">
        {post.id} {post.name}
      </h1>
      <p className="country">{post.country}</p>
      <p>Latitude and longitude</p>
      <p>
        {post.coordinates.latitude}, {post.coordinates.longitude}
      </p>
      <p>
        <Badge pill bg="primary" className="mx-3">
          {post.sensorType}
        </Badge>
        <Badge pill bg="primary">
          {post.isMobile ? "Mobile" : "Stacionary"}
        </Badge>
      </p>
    </div>
  );
}

MainJumbotron.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    entity: PropTypes.string.isRequired,
    sensorType: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    /* coordinates: PropTypes.object({
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.number.isRequired,
    }) */
  }).isRequired,
};

export default MainJumbotron;
