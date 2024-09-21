import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Location {
  name: string;
  longitude: number;
  latitude: number;
  // Add more properties as needed, e.g., description, image, etc.
}

interface MapComponentProps {
  styleUrl?: string; //to get style of map
  locations: Location[]; //made to refer to interface location
  zoom?: number; //how much to zoom in - larger number means more zoomed in
}

const MapComponent: React.FC<MapComponentProps> = ({
  styleUrl = "https://api.maptiler.com/maps/basic-v2/style.json?key=***REMOVED***",
<<<<<<< HEAD
  locations,
=======
  longitude,
  latitude,
>>>>>>> b-end
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
        center: [12.55, 55.66],
        zoom,
      });

<<<<<<< HEAD
      // Add markers once the map has loaded
      mapInstance.current.on("load", () => {
        locations.forEach((location) => {
          new maplibregl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .setPopup(
              new maplibregl.Popup({ offset: 25 }) // Optional: Add popups
                .setHTML(`<h3>${location.name}</h3>`)
            )
            .addTo(mapInstance.current!);
        });
=======
      // Add the marker after the map has loaded
      mapInstance.current.on("load", () => {
        new maplibregl.Marker()
          .setLngLat([longitude, latitude]) // Set marker at the map's center
          .addTo(mapInstance.current!); // Add marker to the map
>>>>>>> b-end
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [styleUrl, locations, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
