import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import {useState,useEffect} from 'react';


function App() {
  const [latitude,setLatitude]=useState(0)
  const [longitude,setLongitude]=useState(0)

  useEffect(()=>{
    getCurrentLocation();
  },[])


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCZRca5LTDbaSaZZwe9WjTk9oGzOskIz-8",
  });
  const center = { lat: 19.19769277027365, lng: 72.85464173102034 };

  if (!isLoaded) {
    return <div>NOT LOADED</div>;
  }
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
       center = { lat:latitude , lng: longitude };
    });
  }
  

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onClick={(ev) => {
          console.log("latitide = ", ev.latLng.lat());
          console.log("longitude = ", ev.latLng.lng());
        }}
      ></GoogleMap>
    </div>
  );
}

export default App;
