"use client";
import Image from "next/image";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useRef, useState } from "react";

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_OWN || "",
    libraries: ["places"],
  });

  const center = { lat: 48.8584, lng: 2.2945 };

  const [map, setMap] = useState<google.maps.Map>();
  const [directionResponse, setDirectionResponse] = useState<any>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const destinationRef = useRef<HTMLInputElement | any>(null);
  const originRef = useRef<HTMLInputElement | any>();

  if (!isLoaded) {
    return <h1>Loading .....</h1>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(result);
    setDistance(`${result.routes[0].legs[0].distance?.text}`);
    setDuration(`${result.routes[0].legs[0].duration?.text}`);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <main className="min-h-screen ">
      <div
        className={`inputs flex p-8 gap-3 absolute top-0 left-0 z-10 items-center`}
      >
        <div className=" bg-white max-w-max rounded-xl p-2 text-black">
          <Autocomplete>
            <input
              ref={originRef}
              type="text"
              className="origin"
              placeholder="Origin"
            />
          </Autocomplete>
        </div>
        <div className=" bg-white max-w-max rounded-xl p-2">
          <Autocomplete>
            <input
              ref={destinationRef}
              type="text"
              className="destination"
              placeholder="Destination"
            />
          </Autocomplete>
        </div>
        <button
          className="bg-amber-700 p-2 rounded-xl"
          onClick={calculateRoute}
        >
          Find / Calculate Route
        </button>
        <button
          className="bg-amber-700 p-2 rounded-xl"
          onClick={() => map?.panTo(center)}
        >
          Pan to Center
        </button>
        <button className="bg-amber-700 p-2 rounded-xl" onClick={clearRoute}>
          Clear
        </button>
        <div className="bg-red-900 text-center p-2">Distance: {distance}</div>
        <div className="bg-red-900 text-center p-2">Duration: {duration}</div>
      </div>
      <div className="map w-screen h-screen">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </GoogleMap>
      </div>
      {/* <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_OWN || ""}>
        <div className="h-screen w-screen"></div>
        <Map zoom={9} center={center} />
      </APIProvider> */}
    </main>
  );
}
