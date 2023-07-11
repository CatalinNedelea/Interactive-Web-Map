import React, { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { PageContainer } from "./Map.style";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

interface MarkerPosition {
  lat: number;
  lng: number;
}

export const Map = () => {
  const [markers, setMarkers] = useState<MarkerPosition[]>([]);

  const handleAddMarker = () => {
    const centerMarker: MarkerPosition = {
      lat: -25.344, // Replace with your desired latitude
      lng: 131.031, // Replace with your desired longitude
    };

    setMarkers((prevMarkers) => [...prevMarkers, centerMarker]);
  };

  const handleMarkerDrag = (
    event: google.maps.MapMouseEvent,
    index: number
  ) => {
    const { latLng } = event;
    if (latLng) {
      const lat = latLng.lat();
      const lng = latLng.lng();

      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers];
        updatedMarkers[index] = { lat, lng };
        return updatedMarkers;
      });
    }
  };

  const containerStyle = {
    width: "90%",
    height: "90%",
  };

  const center = {
    lat: -25.344,
    lng: 131.031,
  };

  const mapOptions = {
    zoom: 4,
    center,
    mapId: "DEMO_MAP_ID",
    gestureHandling: "greedy",
  };

  return (
    <PageContainer>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} options={mapOptions}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              draggable={true}
              onDrag={(event) => handleMarkerDrag(event, index)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <button onClick={handleAddMarker}>Add Marker</button>
    </PageContainer>
  );
};
