import React from 'react';
import { Text, Platform, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';
import mainStyle from '../../assets/styles/MainStyle';
import { Link } from '@react-navigation/native';
import * as Location from "expo-location";

/**
 * A View for components which don't have elments inside.
 * 
 * @param {*} result_text text to be shown
 * @returns a View containing the text passed as parameter, or a default text if the parameter is empty
 */
function _listEmptyComponent(result_text, empty_page = false) {
  const dynamicStyle = empty_page ? { position: 'absolute', top: '45%' } : {};
  result_text = (result_text == "" || result_text == null) ? "Nessun risultato disponibile." : result_text;

  return (
    <Text style={[mainStyle.empty_data, dynamicStyle]}>{result_text}</Text>
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
  const iosUrl = `maps:0,0?q=${encodeURIComponent(name)}@${lat},${lng}`;
  const androidUrl = `geo:${lat},${lng}?q=${encodeURIComponent(name)}`;

  const url = Platform.select({
    ios: iosUrl,
    android: androidUrl
  });

  Linking.openURL(url).catch(error => console.error('Error opening maps:', error));
}

async function getUniqueID() {
  let uniqueID = await SecureStore.getItemAsync('uniqueID');
  if (!uniqueID) {
    uniqueID = uuidv4();
    await SecureStore.setItemAsync('uniqueID', uniqueID);
  }
  return uniqueID;
}

async function sendStats(page, id) {

  const uniqueID = await getUniqueID();

  const deviceInfo = {
    model: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  };

  const data = {
    "view": {
      "page": page,
      "id": id,
      "lang": global.currentLanguage,
      "UniqueID": uniqueID
    },
    deviceInfo
  }

  fetch('https://www2.wifi-project.cloud/bikehospitality/dashboard/stats.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permessi di localizzazione non concessi");
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export { _listEmptyComponent, geo, sendStats, getUserLocation };