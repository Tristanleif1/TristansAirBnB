import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllSpotsComponent = () => {
  const spots = useSelector((state) => state);
  console.log(spots);
  return (
    <div>
      <h1>Spots</h1>
    </div>
  );
};

export default AllSpotsComponent;
