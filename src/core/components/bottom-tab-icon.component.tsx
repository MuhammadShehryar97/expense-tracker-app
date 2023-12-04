import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { TabScreens } from '../constans/screens.constants';
import ActiveHomeIcon from '../../assets/active-home-icon.png';
import HomeIcon from '../../assets/inactive-home-icon.png';
import ActiveProfileIcon from '../../assets/active-profile-icon.png';
import ActiveLocationIcon from '../../assets/active-map.png';
import LocationIcon from '../../assets/map.png';
import AddExpenseIcon from '../../assets/add-expense-icon.png';

interface BottomTabIconProps {
  tab: TabScreens;
  isActive?: boolean;
}

const BottomTabIcon: React.FC<BottomTabIconProps> = ({ tab, isActive }) => {
  switch (tab) {
    case TabScreens.HOME:
      return isActive ? (
        <Image source={ActiveHomeIcon} style={styles.icon} />
      ) : (
        <Image source={HomeIcon} style={styles.icon} />
      );
    case TabScreens.LOCATION:
      return isActive ? (
        <Image source={ActiveLocationIcon} style={styles.icon} />
      ) : (
        <Image source={LocationIcon} style={styles.icon} />
      );
    case TabScreens.ADDEXPENSE:
      return (
        <Image source={AddExpenseIcon} style={styles.addIcon} />
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
  },
  addIcon: {
    width: 65,
    height: 65,
    position: "absolute",
    top: -30
  }
});

export default React.memo(BottomTabIcon);