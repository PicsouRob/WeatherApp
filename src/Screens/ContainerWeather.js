import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { dateTime } from "../Utils/api";
import { darkAction, ligthAction } from '../Redux/Action';
import { dark_theme, light_theme } from '../Redux/Theme';

function ContainerWeather(props) {

    const { navigation, data, dispatch, theme, themeValue } = props;

    const onToggleSwitch = (val) => {
        if(val === true) {
            dispatch(darkAction(dark_theme));
        } else {
            dispatch(ligthAction(light_theme));
        }
    };

    useEffect( async () => {
        try{
            if (Platform.OS == 'android') {
                const response = await changeNavigationBarColor(theme ? '#021534' : '#ffffff');
                console.log(response);
            }
            }catch(e){
                console.log(e)// {success: false}
            }
    }, [theme]);

    const getIcon = () => {
        let iconName = '';
        switch (data.weather[0].main) {
            case "Rain":
                iconName = "rainy-outline";
                break;
            case "Clouds":
                iconName = "cloudy-outline";
                break;
            case "Clear":
                iconName = "cloudy-night-outline";
                break;
            case "Thunderstorm":
                iconName = "thunderstorm-outline";
                break;
            case "Snow":
                iconName = "thunderstorm-outline";
                break;
            default:
                iconName = "cloud-outline";
                break;
        }

        return (
            <Icon name={iconName} color={themeValue.ICON_COLOR} type="ionicon" size={70} />
        )
    }
    
    return (
        <View style={[styles.container, { backgroundColor: themeValue.BACKGROUND_COLOR }]}>
            <StatusBar barStyle={themeValue.THEME_CONTENT} backgroundColor={themeValue.SIDEBBAR} />
            <View style={styles.header}>
                <Icon name="search-outline" color={themeValue.ICON_COLOR} type="ionicon" size={30} onPress={() => navigation.push("Search")} />
                <Text style={[styles.ville_name, { color: themeValue.TEXT_COLOR }]}>{data.name}, {data.sys.country} </Text>
                <Switch 
                    value={theme}
                    onValueChange={(val) => onToggleSwitch(val)}
                    style={styles.switch}
                    color={theme ? "green" : "gray"}
                />
            </View>

            <View style={styles.date}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: themeValue.TEXT_COLOR }}>{dateTime()}</Text>
                <Text style={[styles.shadow, { fontSize: 25, fontWeight: "700", color: themeValue.TEXT_COLOR, marginTop: 15, shadowColor: themeValue.SHADOW_COLOR }]}>{data.weather[0].description}</Text>
            </View>

            <View style={{ alignItems: "center" }}>
                <View style={[styles.circle_container, { backgroundColor: themeValue.BACKGROUND_COLOR, shadowColor: themeValue.SHADOW_COLOR, borderColor: theme ? '#fff' : "#000", borderWidth: 1, }]}>
                    {getIcon()}
                    <Text style={[styles.text_degree, { color: themeValue.TEXT_COLOR }]}>{data.main.temp.toString().slice(0, 2)}°</Text>
                </View>
            </View>

            <View style={styles.bottom_container}>
                <View style={styles.text_bottom}>
                    <Text style={[styles.text_bottom_font, { color: themeValue.TEXT_COLOR }]}>Wind</Text>
                    <Text style={[styles.bottom_rigth, { color: themeValue.TEXT_COLOR }]}> {data.wind.speed} m/s</Text>
                </View>
                <View style={styles.text_bottom}>
                    <Text style={[styles.text_bottom_font, { color: themeValue.TEXT_COLOR }]}>Humidity</Text>
                    <Text style={[styles.bottom_rigth, { color: themeValue.TEXT_COLOR }]}>{data.main.humidity}%</Text>
                </View>
                <View style={styles.text_bottom}>
                    <Text style={[styles.text_bottom_font, { color: themeValue.TEXT_COLOR }]}>Feels like</Text>
                    <Text style={[styles.bottom_rigth, { color: themeValue.TEXT_COLOR }]}>{data.main.feels_like.toString().slice(0, 2)}°</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
        themeValue: state.themeValue,
    }
}

export default connect(mapStateToProps)(ContainerWeather);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginVertical: 10,
        flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
    },
    ville_name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    date: {
        alignItems: "center",
        marginTop: 30,
    },
    circle_container: {
        marginTop: 60,
        width: 300,
        height: 300,
        borderRadius: 200,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    image: {
        width: 50,
        height: 50,
    },
    text_degree: {
        fontSize: 70,
        fontWeight: "bold",
        marginTop: 20,
    },
    bottom_container: {
        marginTop: 40,
        marginHorizontal: 70,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    text_bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 8,
    },
    text_bottom_font: {
        fontSize: 23,
        fontWeight: "bold",
    },
    bottom_rigth: {
        fontSize: 20,
    }, 
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {
            width: -1, 
            height: 1
        },
        textShadowRadius: 2,
    }
});
