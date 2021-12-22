import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function HomeScreen(props) {

    const { navigation } = props;

    useEffect(() => {
        (async () => {
            await Geolocation.getCurrentPosition(async (result) => {
                await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${result.coords.latitude}&lon=${result.coords.longitude}&units=metric&appid=6bd4989b0eae8e9d5e40927c84569df0`)
                .then((data) => data.json())
                .then((res) => {
                    navigation.navigate("CoordinateWeather", { data: res });
                })
                .catch((err) => console.log(err))
            })
        })()
    }, []);
    
    return (
        <View></View>
    )
}