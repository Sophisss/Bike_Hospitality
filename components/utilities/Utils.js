import React from 'react';
import { View, Text, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';


/**
 * A View for components which don't have elments inside.
 * 
 * @param {*} result_text text to be shown
 * @returns a View containing the text passed as parameter, or a default text if the parameter is empty
 */
function _listEmptyComponent(result_text) {
    result_text = (result_text=="" || result_text==null) ? "Nessun risultato disponibile." : result_text;

    return (
        <View style={{alignItems:"center", alignContent: 'center'}}>
            <Text style={{ fontSize: 20, color: "darkblue", fontWeight: 'bold', padding: 5 }}>{result_text}</Text>
        </View>
    )
}

/**
 * Open the navigator based on the destination's name, the latitude and longitude.
 * 
 * @param {*} lat latitude of destination
 * @param {*} lng longitude of destination
 * @param {*} name name of destination
 */
function geo(lat, lng, name) {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    WebBrowser.openBrowserAsync(url);
  }


export { _listEmptyComponent, geo };