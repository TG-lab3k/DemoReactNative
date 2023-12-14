/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './src/HomePage';
import EposPage from './src/epos/EposPage';
import StarPage from './src/star/StarPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="eposn" component={EposPage} />
        <Stack.Screen name="star" component={StarPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
