import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { PageContainer } from "./Map.style";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

interface MarkerPosition {
  id: string;
  lat: number;
  lng: number;
  draggable: boolean;
}

export const Map = () => {
  const [markers, setMarkers] = useState<MarkerPosition[]>([]);
  const [lastDraggedMarker, setLastDraggedMarker] =
    useState<MarkerPosition | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleAddMarker = () => {
    const id = String(Date.now());
    const newMarker: MarkerPosition = {
      id,
      lat: -25.344,
      lng: 131.031,
      draggable: true,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const handleMarkerDrag = (event: google.maps.MapMouseEvent, id: string) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setMarkers((prevMarkers) => {
        const updatedMarkers = prevMarkers.map((marker) =>
          marker.id === id ? { ...marker, lat, lng } : marker
        );
        return updatedMarkers;
      });

      const draggedMarker = markers.find((marker) => marker.id === id);
      if (draggedMarker) {
        setLastDraggedMarker({ ...draggedMarker, lat, lng });
      }
    }
  };

  const handleSaveMarker = (marker: MarkerPosition) => {
    // Handle saving the marker's location
    const itemsString = localStorage.getItem("items");
    const items = itemsString ? JSON.parse(itemsString) : [];
    const newMarker = { ...marker, draggable: false };
    if (!items.includes(newMarker)) {
      localStorage.setItem("items", JSON.stringify([...items, newMarker]));
    }
    const newState = markers.map((obj) => {
      if (obj.id === newMarker.id) {
        return newMarker;
      }
      return obj;
    });

    setMarkers(newState);

    console.log("Marker saved:", marker);
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
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

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    const itemsString = localStorage.getItem("items");
    const items = itemsString ? JSON.parse(itemsString) : [];
    console.log("items cica:", items);
    if (items && !markers.length) {
      setMarkers(items);
    }
  }, []);

  return (
    <div>
      <PageContainer>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={mapOptions}
            onLoad={handleMapLoad}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                draggable={marker.draggable}
                onDrag={(event) => handleMarkerDrag(event, marker.id)}
                icon={{
                  url: marker.draggable
                    ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </PageContainer>
      <button onClick={handleAddMarker}>Add Marker</button>
      <button
        onClick={() => handleSaveMarker(lastDraggedMarker as MarkerPosition)}
        disabled={!lastDraggedMarker}
      >
        Save Last Dragged Marker
      </button>
    </div>
  );
};
