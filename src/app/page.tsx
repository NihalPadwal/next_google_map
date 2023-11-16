"use client";
import Image from "next/image";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_TING || "",
  });

  const center = { lat: 48.8584, lng: 2.2945 };

  console.log(isLoaded);

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
      {isLoaded && (
        <div className="map w-screen h-screen">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          ></GoogleMap>
        </div>
      )}
    </main>
  );
}
