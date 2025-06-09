import { StyleSheet } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./screens/Login"
import { AuthWeatherApp } from './AuthWeatherApp';

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
