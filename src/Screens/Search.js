import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Icon, SearchBar,  } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';

import { Api_key } from "../Utils/api";
import { darkAction, ligthAction } from '../Redux/Action';
import { dark_theme, light_theme } from '../Redux/Theme';

function Search(props) {

    const { navigation, theme, themeValue, dispatch } = props;
    const [data, setData] = useState('');
    const [value, setValue] = useState("");

    const onToggleSwitch = (val) => {
        if(val === true) {
            dispatch(darkAction(dark_theme));
        } else {
            dispatch(ligthAction(light_theme));
        }
    };

    const onSubmitCity = async (e) => {
        setValue(e);
        await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey= 	            ulcKglttzfbXNrGut5z6AkwaEPqtE7us&q=${e}`)
        .then(function(res) { return res.json()})
        .then(function(response) {
            return setData(response);
        })
    }

    const selectCity = async (name) => {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${Api_key}`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            navigation.push("SearchName", { nameCity: name, data: result })
        })
    }

    return (
        <View style={[styles.container, { backgroundColor: themeValue.BACKGROUND_COLOR }]}>
            <StatusBar barStyle={themeValue.THEME_CONTENT} backgroundColor={themeValue.SIDEBBAR} />
            <View style={styles.header}>
                <Icon name="arrow-back-outline" color={themeValue.ICON_COLOR} type="ionicon" onPress={() => navigation.push("HomeScreen")} />
                <SearchBar 
                    placeholder="City name here...!"
                    containerStyle={[styles.search_barContainer, { backgroundColor: themeValue.SEARCHBAR }, styles.shadow]}
                    inputContainerStyle={styles.search_bar}
                    showLoading={true}
                    onChangeText={(e) => onSubmitCity(e)}
                    value={value}
                />
                <Switch 
                    value={theme}
                    onValueChange={(val) => onToggleSwitch(val)}
                    style={styles.switch}
                    color={theme ? "green" : "gray"}
                />
            </View>

            {value ? (
                <FlatList 
                    data={data}
                    keyExtractor={((item, index) => index.toString())}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.flatlist, { backgroundColor: themeValue.FLAT_ITEM }]}
                            onPress={() => selectCity(item.LocalizedName)}
                        >
                            <Text style={{ fontSize: 23, fontWeight: "bold", color: themeValue.TEXT_COLOR }} >{item.LocalizedName}</Text>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>{item.Country.LocalizedName}, {item.Country.ID}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ padding: 20, paddingBottom: 30, height: "auto" }}
                />
            ) : ( 
                    <View style={styles.value_empty}>
                        <Icon name="cloudy-night-outline" color={themeValue.ICON_COLOR} type="ionicon" size={90} />
                        <Text style={{ color: themeValue.TEXT_COLOR, marginVertical: 15, fontSize: 40 }}  >Oops!</Text>
                        <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", color: themeValue.TEXT_COLOR  }} >Please enter the name of the city you want to search in the search bar to find the weather conditions for your city </Text>
                    </View>
                ) }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
        themeValue: state.themeValue,
    }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    },
    header: {
        marginVertical: 10,
        flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
    },
    search_bar: {
        height: 30,
        backgroundColor: "transparent",
    },
    search_barContainer: {
        width: 270,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    flatlist: {
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: "center",
        paddingLeft: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 14,
    },
    value_empty: {
        justifyContent: "center", 
        alignItems: "center", 
        marginHorizontal: 20,
        marginTop: 170,
    }
});