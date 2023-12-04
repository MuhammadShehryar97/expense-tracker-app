import { useLayoutEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const useLocation = () => {

  const [userLat, setUserLat] = useState<number>(0);
  const [userLng, setUserLng] = useState<number>(0);

  useLayoutEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLat(latitude);
        setUserLng(longitude);
      },
      (error) => {
        console.error(error);
      },
      {}
    );

  }, []);

  return { userLat, userLng, setUserLat, setUserLng };
};

export default useLocation;