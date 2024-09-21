import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import MapComponent from "@/components/map";

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

interface LocationComponentProps {
  onLocationUpdate: (location: string) => void;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const watchID = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60,
      },
    );

    return () => navigator.geolocation.clearWatch(watchID);
  }, []);

  return { location, error };
};

const useReverseGeocoding = (location: Location | null) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchAddress = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY; //from env local folder
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const { country, state, city, street, postcode } =
            data.features[0].properties;
          setAddress({ country, state, city, street, postcode });
        } else {
          setError("No address found for these coordinates.");
        }
      } catch (err) {
        setError("Failed to fetch address.");
      }
    };

    fetchAddress();
  }, [location]);

  return { address, error };
};

const LocationDisplay = ({ location }: { location: Location }) => (
  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
    <MapPin className="h-4 w-4" />
    <span>
      Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
    </span>
  </div>
);

const AddressDisplay = ({ address }: { address: Address }) => (
  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
    <p>{address.street}</p>
    <p>
      {address.city}, {address.state} {address.postcode}
    </p>
    <p>{address.country}</p>
  </div>
);

export default function LocationComponent({
  onLocationUpdate,
}: LocationComponentProps) {
  const { location, error: locationError } = useGeolocation();
  const { address, error: addressError } = useReverseGeocoding(location);

  useEffect(() => {
    if (address) {
      const locationString = `${address.street}, ${address.city}, ${address.state} ${address.postcode}, ${address.country}`;
      onLocationUpdate(locationString);
    }
  }, [address, onLocationUpdate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Location Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {locationError ? (
          <p className="text-red-500">{locationError}</p>
        ) : !location ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Locating...</span>
          </div>
        ) : (
          <>
            <LocationDisplay location={location} />
            {addressError ? (
              <p className="mt-2 text-red-500">{addressError}</p>
            ) : !address ? (
              <div className="mt-2 flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Fetching address...</span>
              </div>
            ) : (
              <AddressDisplay address={address} />
            )}
            <MapComponent
              locations={[
                {
                  name: "",
                  longitude: location.longitude,
                  latitude: location.latitude,
                },
              ]}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
