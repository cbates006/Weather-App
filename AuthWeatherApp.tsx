import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import CurrentWeather from './screens/CurrentWeather';
import Location from './screens/Location';

const Tab = createBottomTabNavigator();

export const AuthWeatherApp =() => {
    return (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName : keyof typeof Ionicons.glyphMap = 'home'
                if (route.name ==='CurrentWeather') {
                  iconName = focused 
                    ? 'home'
                    : 'home-outline';
                } else if (route.name==='Location') {
                  iconName = focused ? 'list' : 'list-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: '#03DAC6',
              tabBarInactiveTintColor: '#018786',
              tabBarActiveBackgroundColor: '#6200EE',
              tabBarInactiveBackgroundColor: '#3700B3'
            })}
          >
            <Tab.Screen
              name="CurrentWeather"
              component={CurrentWeather}
              options={ {
                title: 'MyWeather', 
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }}
            />
            <Tab.Screen 
              name ='Location'
              component={Location}
              options={ {
                title: 'Locations',
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }} 
            />
          </Tab.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <AuthWeatherApp />
        </NavigationContainer>
    )
};
