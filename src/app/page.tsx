"use client";
import Image from "next/image";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

// const AnyReactComponent = ({
//   text,
//   lat,
//   lng,
// }: {
//   text: String;
//   lat: number;
//   lng: number;
// }) => <div>{text}</div>;

export default function Home() {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_OWN || "",
  // });

  // const center = { lat: 48.8584, lng: 2.2945 };

  // console.log(isLoaded);

  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 11,
  // };

  const [map, setMap] = useState<google.maps.Map | null>(null);

  function initMap() {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    const mapInstance = new window.google.maps.Map(
      document.getElementById("map")!,
      {
        zoom: 10,
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
      }
    );

    setMap(mapInstance);

    // Set up the DirectionsRenderer to display the route
    directionsRenderer.setMap(mapInstance);

    // Set the origin and destination for the directions request
    const origin = new window.google.maps.LatLng(37.7749, -122.4194); // San Francisco
    const destination = new window.google.maps.LatLng(34.0522, -118.2437); // Los Angeles

    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    // Get the directions and display them on the map
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }

  useEffect(() => {
    // Load the Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_TING}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the map once the API is loaded
    (window as any).initMap = initMap;

    // Cleanup function
    return () => {
      if (map) {
        window.google.maps.event.clearListeners(map, "zoom_changed");
      }
    };
  }, []);

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

      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_TING || "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact> */}
      <div id="map" style={{ height: "500px", width: "100%" }} />
    </main>
  );
}
