import React from "react";
import MediaCard from "./MaterialCard";

export default function CardWrapper(props) {
  const { history } = props;

  return (
    <>
      <MediaCard info={props.info} history={history}></MediaCard>{" "}
    </>
  );
}
