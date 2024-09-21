import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Location {
  name: string;
  longitude: number;
  latitude: number;
}

interface MapComponentProps {
  styleUrl?: string;
  locations: Location[];
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  styleUrl = "https://api.maptiler.com/maps/basic-v2/style.json?key=***REMOVED***",
  locations,
  zoom = 5,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Dynamically calculate center based on locations
      const centerLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
      const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;

      // Initialize the map
      mapInstance.current = new maplibregl.Map({
        container: mapRef.current,
        style: styleUrl,
        center: [centerLng, centerLat], // Center on average location
        zoom,
      });

      // Add markers after the map has loaded
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
