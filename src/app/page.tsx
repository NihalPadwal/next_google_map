"use client";
import Image from "next/image";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Home() {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_OWN || "",
  // });

  // const center = { lat: 48.8584, lng: 2.2945 };

  // console.log(isLoaded);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <main className="min-h-screen ">
      <div className={`inputs flex p-8 gap-3 absolute top-0 left-0 z-10`}>
        <div className=" bg-white max-w-max rounded-xl p-2">
          <input type="text" className="origin" placeholder="Origin" />
        </div>
        <div className=" bg-white max-w-max rounded-xl p-2">
          <input
            type="text"
            className="destination"
            placeholder="Destination"
          />
        </div>
        <button className="bg-amber-700 p-2 rounded-xl">Find Route</button>
      </div>
      {/* {isLoaded && (
        <div className="map w-screen h-screen">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          ></GoogleMap>
        </div>
      )} */}

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_TING }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </main>
  );
}
