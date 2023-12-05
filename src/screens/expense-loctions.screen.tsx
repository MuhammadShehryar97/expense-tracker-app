import React from 'react';
import {
   View, 
   StyleSheet, 
   SafeAreaView
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import _ from 'lodash';

import { WINDOW_HEIGHT } from '../core/constans/dimenstions.constants';
import { useAppSelector } from '../core/redux/store';

const ExpenseLocationsScreen: React.FC = () => {

  const { expenseList } = useAppSelector((state) => state.expenseList);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}           // remove if not using Google Maps
          region={{
            latitude: 33.738045,
            longitude: 73.084488,
            latitudeDelta: 0.3,
            longitudeDelta: 119,
           }}
          style={styles.map}
        >
          {_.map(expenseList, (item) => (
            <Marker
              title={`${item.amount} Rs.`}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }} 
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: WINDOW_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default ExpenseLocationsScreen;