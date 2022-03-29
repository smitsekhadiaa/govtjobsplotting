import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";
import { useJsApiLoader, GoogleMap,Marker } from "@react-google-maps/api";
import {useState,useEffect} from 'react';
// import { getDistance,isPointWithinRadius} from 'geolib';
// import geolib from 'geolib';
import * as geolib from 'geolib';

function App() {
  const [latitude,setLatitude]=useState(0)
  const [longitude,setLongitude]=useState(0)

  useEffect(()=>{
    getCurrentLocation();
  },[])


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCZRca5LTDbaSaZZwe9WjTk9oGzOskIz-8",
  });
  let center = { lat: 19.19769277027365, lng: 72.85464173102034 };

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
  
  let arr=[{
    lat:parseFloat(19.19443222884145),
    lng:parseFloat(72.84613530780784)
  },
  {
    lat:parseFloat(19.20337583618798),
    lng:parseFloat(72.85956859588623)
  },
  {
    lat:parseFloat(19.19945782353501),
    lng:parseFloat(72.84604947711937)
  },
  {
    lat:parseFloat(19.20038992529954),
    lng:parseFloat(72.8624959338949)
 },
  {
    lat:parseFloat(19.193743175937936),
    lng:parseFloat(72.85545781743983)
  },
  {
    lat:parseFloat(19.20873851048727),
    lng:parseFloat(72.85335496557215)
  },
  {
    lat:parseFloat(20.506876734232385),
    lng:parseFloat(73.31951923400982)
  },
  {
    lat:parseFloat(21.07178033055075),
    lng:parseFloat(73.12176532775982)
  },
  {
    lat:parseFloat(20.928187671260243),
    lng:parseFloat(73.96771259338482)
  },
]
let nearbyUsers=[];
// let nearbyUsers = Object.values(arr.map(item => getDistance(center, item)).filter(distance => distance < 5000))
for(let i=0;i<arr.length;i++)
{
  if(geolib.isPointWithinRadius(
    { latitude: arr[i].lat, longitude: arr[i].lng },
    { latitude: center.lat, longitude: center.lng },
    5000))
  {
    nearbyUsers=[...arr[i]]
  }
}

console.log(nearbyUsers)
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
        options={{
          streetViewControl:false
        }}
      >
        
        {nearbyUsers.map((item)=>{
          return <Marker position={item}>
          </Marker>
        })}
        
      </GoogleMap>
    </div>
  );
}

export default App;
