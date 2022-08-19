/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Collection from './pages/Collection';
import Home from './pages/Home';
import {RootStackScreens} from './types';

const Stack = createNativeStackNavigator<RootStackScreens>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{title: 'Collection'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
