import React from 'react';

import ContainerWeather from './ContainerWeather';

export default function CoordinateWeather(props) {
    const { navigation, route } = props;

    return (
        <ContainerWeather 
            navigation={navigation}
            cityName={route.params.nameCity}
            data={route.params.data}
        />
    )
}