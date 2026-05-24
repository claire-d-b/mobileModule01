import * as Location from "expo-location";
import { useState, useEffect } from "react";

interface Coords {
  latitude: number;
  longitude: number;
}

// expo-location est la librairie qui donne accès au GPS.
// Elle fait le pont entre JavaScript et les APIs natives du téléphone :
// Sans elle, tu ne peux pas accéder au GPS depuis React Native.
// C'est elle qui gère aussi les permissions (requestForegroundPermissionsAsync).

const requestPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

/* Get current location */
const getLocation = async (): Promise<Coords | null> => {
  const granted = await requestPermission();
  if (!granted) return null;

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};

/* Track location changes */
const trackLocation = async (
  onChange: (coords: Coords) => void,
): Promise<Location.LocationSubscription | null> => {
  const granted = await requestPermission();
  if (!granted) return null;

  const subscriber = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // every 5 seconds
      distanceInterval: 10, // or every 10 meters
    },
    ({ coords }) => {
      onChange({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    },
  );

  return subscriber;
};

const getLocationName = async (coords: Coords): Promise<string | null> => {
  const [place] = await Location.reverseGeocodeAsync(coords);
  if (!place) return null;

  return [
    place.streetNumber,
    place.street,
    place.city,
    place.region,
    place.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const useLocation = () => {
  const [address, setAddress] = useState<string>("");
  const [coords, setCoords] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false); // ✅ signals when done

  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null;

    const init = async () => {
      const initialCoords = await getLocation();
      const currentCoords = {
        latitude: initialCoords?.latitude ?? 0,
        longitude: initialCoords?.longitude ?? 0,
      };
      setCoords(currentCoords);

      const name = await getLocationName(currentCoords);
      setAddress(name ?? "");
      setLoading(false);
      setReady(true); // ✅ done

      subscriber = await trackLocation(async (newCoords) => {
        setCoords(newCoords);
        const newAddress = await getLocationName(newCoords);
        setAddress(newAddress ?? "");
      });
    };

    init();

    return () => subscriber?.remove();
  }, []);

  return { address };
};

export default useLocation;
