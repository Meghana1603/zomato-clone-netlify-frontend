import React, { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaDirections } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getSpecificRestaurant } from "../../Redux/Reducer/restaurant/restaurant.action";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// [28.6812933768556, 77.20791895432784]

function MapView(props) {
  const {id } = useParams();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState({
    mapLocation: ""
  });

  useEffect(() => {
    dispatch(getSpecificRestaurant(id)).then((data) => {
      setRestaurant(() => ({
        ...data.payload.restaurant,
      }));
    });
  });
  const direction = 'https://www.google.com/maps/dir/?api=1&destination='.concat(restaurant?.mapLocation);
  return (
    <>
      <div>
        <h4 className="text-xl font-medium">Call</h4>
        <h5 className="text-zomato-400 font-medium">{props.phno}</h5>
      </div>
      <div >
        <h4 className="text-xl font-medium" >Direction</h4>
        <div className="w-full h-48">
          <MapContainer
            center={props.mapLocation?.split(",").map((item) => parseFloat(item))}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.mapLocation?.split(",").map((item) => parseFloat(item))}>
              <Popup>{props.title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <p>{props.address}</p>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg">
          <MdContentCopy /> Copy
        </button>
        <a href={direction} target="_blank">
          <button className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg">
            <span className="text-zomato-400">
              <FaDirections />
            </span>
            Direction
          </button>
        </a>
      </div>
    </>
  );
}

export default MapView;