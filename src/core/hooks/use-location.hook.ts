import { useLayoutEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import { setLocationCoords } from '../redux/expense.slice';

const useLocation = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        const coords = {
          latitude: latitude,
          longitude: longitude
        };

        dispatch(setLocationCoords(coords));
      },
      (error) => {
        console.error(error);
      },
      {}
    );

  }, []);

};

export default useLocation;