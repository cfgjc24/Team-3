import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Location {
  //each induvidual part of the array has this with this data
  name: string;
  longitude: number;
  latitude: number;
}

interface MapComponentProps {
  //makes up, contains the zoom amount, along with map style
  styleUrl?: string;
  locations: Location[];
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  styleUrl = "https://api.maptiler.com/maps/basic-v2/style.json?key=",
  locations,
  zoom = 7,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Dynamically calculate center based on locations
      console.log(locations);
      //   const centerLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
      //   const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
      const centerLng = -74.006;
      const centerLat = 40.712776;
      // Initialize the map
      // mapInstance.current = new maplibregl.Map({
      //   container: mapRef.current,
      //   style: styleUrl,
      //   center: [centerLng, centerLat], // Center on average location
      //   zoom,

      mapInstance.current = new maplibregl.Map({
        container: mapRef.current,
        style: styleUrl,
        center: [centerLng, centerLat], // Center on average location
        zoom,
      });

      mapInstance.current.on("load", () => {
        locations.forEach((location) => {
          new maplibregl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .setPopup(
              new maplibregl.Popup({ offset: 25 }) // Optional: Add popups
                .setHTML(`<h3>${location.name}</h3>`),
            )
            .addTo(mapInstance.current!);
        });
      });
    }

    // Cleanup on unmountdash
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [styleUrl, locations, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
