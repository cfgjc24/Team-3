import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapComponentProps {
  styleUrl?: string;
  longitude: number;
  latitude: number;
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  styleUrl = "https://api.maptiler.com/maps/basic-v2/style.json?key=***REMOVED***",
  longitude,
  latitude,
  zoom = 10,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize the map
      mapInstance.current = new maplibregl.Map({
        container: mapRef.current,
        style: styleUrl,
        center: [longitude, latitude],
        zoom,
      });

      // Add the marker after the map has loaded
      mapInstance.current.on("load", () => {
        new maplibregl.Marker()
          .setLngLat([longitude, latitude]) // Set marker at the map's center
          .addTo(mapInstance.current!); // Add marker to the map
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [styleUrl, longitude, latitude, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
