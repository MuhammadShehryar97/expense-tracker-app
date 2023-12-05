import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../core/constans/styles/colors';
import BackArrow from '../assets/back-arrow.png'

const ExpenseDetailScreen: React.FC = ({ route }) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { expense } = route.params;

  return (
    <View style={styles.container}>

      <View style={[styles.headerView, { paddingTop: top + 10 }]}>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={BackArrow} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {'Expense Detail'}
        </Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.insideView}>
          <View style={styles.nameView}>
            <Text style={styles.label}>{'Name:'}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>{expense?.name}</Text>
          </View>
        </View>

        <View style={styles.insideView}>
          <View style={styles.nameView}>
            <Text style={styles.label}>{'Amount:'}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>{expense?.amount}</Text>
          </View>
        </View>

        <View style={styles.insideView}>
          <View style={styles.nameView}>
            <Text style={styles.label}>{'Description:'}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>{expense?.description}</Text>
          </View>
        </View>

        <Text style={styles.label}>{`"Spending Location"`}</Text>

        <View style={styles.mapView}>
          <MapView
            provider={PROVIDER_GOOGLE}    // remove if not using Google Maps
            region={{
              latitude: expense.latitude,
              longitude: expense.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.0111,
            }}
            style={styles.map}>
            <Marker
              title={`${expense.amount} Rs.`}
              coordinate={{
                latitude: expense.latitude,
                longitude: expense.longitude,
              }} />
          </MapView>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white
  },
  headerView: {
    flexDirection: "row",
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0.6,
    shadowOpacity: 5,
    shadowColor: Colors.basic.black,
    backgroundColor: Colors.basic.white,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  arrowBtn: {
    flex: 0.5
  },
  mainView: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  textView: {
    flex: 1
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  nameView: {
    flex: 0.5
  },
  insideView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10
  },
  mapView: {
    height: 350,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5
  },
  image: {
    width: 23,
    height: 23
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addBtn: {
    backgroundColor: Colors.basic.black,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.darkGray
  },
});


export default React.memo(ExpenseDetailScreen);