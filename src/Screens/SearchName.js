import React from 'react';

import ContainerWeather from './ContainerWeather';

export default function SearchName(props) {

    const { navigation, route, theme } = props;

    return (
        <ContainerWeather 
            navigation={navigation}
            cityName={route.params.nameCity}
            data={route.params.data}
            theme={theme}
        />
    )
}