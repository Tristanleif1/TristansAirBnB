import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import { loadSingleSpot } from "../../store/spots";


const SpotDetail = () => {
    const spot = useSelector((state) => state.spot.Spots);
    const {spotId} = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
       if(spotId && spotId !== "") dispatch(loadSingleSpot())
    }, [spotId])
    console.log(spotId);

    return (
        <div>
            <h1>ProductDetail</h1>
        </div>
    )
}
