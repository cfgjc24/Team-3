import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  postcode: string;
}

export default function LocationComponent() {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (latitude: number, longitude: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY; // Store your Geoapify API key in .env.local
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;
    console.log(url);

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const { country, state, city, street, postcode } =
          data.features[0].properties;
        setAddress({ country, state, city, street, postcode });
        // console.log(data.features[0].properties);
      } else {
        setError("No address found for these coordinates.");
      }
    } catch (err) {
      setError("Failed to fetch address.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      const watchID = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude); // Fetch address every time location changes
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true, // Optional: Request high accuracy
          maximumAge: 60, // Optional: Do not use cached location data
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchID); // Cleanup the watcher on component unmount
      };
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading location...</p>
      )}

      {address ? (
        <div>
          <h3>Address</h3>

          <p>Street: {address.street}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Country: {address.country}</p>
          <p>Postcode: {address.postcode}</p>
        </div>
      ) : error ? (
        <p>Error fetching address: {error}</p>
      ) : location ? (
        <p>Fetching address...</p>
      ) : null}
    </div>
  );
}
