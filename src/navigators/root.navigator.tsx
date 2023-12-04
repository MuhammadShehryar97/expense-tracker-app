import React from 'react';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import { RootScreens } from '../core/constans/screens.constants';
import TabNavigator from '../navigators/tabs/tab.navigator';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RootScreens.MAIN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootScreens.MAIN}
        component={TabNavigator}
      />
    </Stack.Navigator>

  );
};

export default React.memo(RootNavigator);