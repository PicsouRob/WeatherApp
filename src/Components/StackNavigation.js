import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from "../Screens/Search";
import HomeScreen from "../Screens/HomeScreen";
import SearchName from '../Screens/SearchName';
import CoordinateWeather from '../Screens/CoordinateWeather';

const Stack = createStackNavigator();

const StackNav = () => (
    <NavigationContainer>
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchName" component={SearchName} />
            <Stack.Screen name="CoordinateWeather" component={CoordinateWeather} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default () => (
    <StackNav />
);