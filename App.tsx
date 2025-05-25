/*
File: App.tsx          Date: 1/25/2024
   This file provides navigation for the MyWeather app.  See the README.md file
   for the application specifications

   Modification Log
   1/28/2024 Adapted the 2023 starter code to use Typescipt.  S. Sigman
*/
import { StyleSheet } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./screens/Login"
import { AuthWeatherApp } from './AuthWeatherApp';
import React from 'react';

type RootStackParamsList = {
  Login: undefined,
  AuthWeatherApp: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamsList>()

const scrnOptions: NativeStackNavigationOptions = { 
  headerStyle: {
    backgroundColor: 'gray',
  },
  headerTintColor: '#fff',
}

export default function App() {
  //use fetch to get token and run authz
  //use navigation function: if get token, go to currentweather, else go to login
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={scrnOptions}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen 
            name="AuthWeatherApp"
            component={AuthWeatherApp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
