import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Route } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreens, TabScreens } from '../../core/constans/screens.constants';
import ExpenseListScreen from '../../screens/expense-list.screen';
import ExpenseDetailScreen from '../../screens/expense-detail.screen';
import Colors from '../../core/constans/styles/colors';
import { isIOS } from '../../core/constans/platform.constants';
import BottomTabIcon from '../../core/components/bottom-tab-icon.component';
import AddExpenseModal from '../../core/components/add-expense-modal.component';
import ExpenseLocationsScreen from '../../screens/expense-loctions.screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type BarSelectorRoute = Route<TabScreens>;

export type BarScreenOptions = (props: {
  route: BarSelectorRoute;
  navigation: any;
}) => BottomTabNavigationOptions;

const HomeStackNavigator = React.memo(() => (
  <Stack.Navigator
    initialRouteName={HomeScreens.EXPENSE_LIST}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={HomeScreens.EXPENSE_LIST}
      component={ExpenseListScreen}
    />
    <Stack.Screen
      name={HomeScreens.EXPENSE_DETAIL}
      component={ExpenseDetailScreen}
    />
  </Stack.Navigator>
));

const TabNavigator: React.FC = () => {

  const barIconSelectorHandler = useCallback(
    (route: BarSelectorRoute) =>
      (params: BarIconSelectorParams) => {
        return (
          <BottomTabIcon tab={route.name} isActive={params.focused} />
        );
      },
    [],
  );

  const screenOptions = useCallback<BarScreenOptions>(
    ({ route }) => ({
      tabBarIcon: barIconSelectorHandler(route),
      tabBarInactiveTintColor: Colors.basic.black,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: Colors.basic.black,
      headerShown: false,
      tabBarHideOnKeyboard: true,
      lazy: isIOS,
    }),
    [barIconSelectorHandler],
  );

  return (
    <Tab.Navigator
      initialRouteName={TabScreens.HOME}
      backBehavior="none"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name={TabScreens.HOME}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name={TabScreens.ADDEXPENSE}
        component={AddExpenseModal}
        options={{
          tabBarLabelStyle: {
            color: Colors.basic.white,
          },
        }}
      />
      <Tab.Screen
        name={TabScreens.LOCATION}
        component={ExpenseLocationsScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.basic.white,
  },
  labelText: {
    fontSize: 11,
    lineHeight: 17.61,
    marginTop: 10.5,
  },
  inActiveLabelText: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 17.61,
    marginTop: 10.5,
  },
  labelWithoutMargin: {
    marginTop: 0,
  },
  indicatedBarBadgeStyle: {
    top: -10,
    right: 0,
    maxWidth: 10,
    maxHeight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.basic.white,
    backgroundColor: Colors.text.error,
  },

});

export default React.memo(TabNavigator);