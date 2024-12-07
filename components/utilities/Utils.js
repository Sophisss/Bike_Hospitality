import React from 'react';
import { Text, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';
import mainStyle from '../../assets/styles/MainStyle';

/**
 * A View for components which don't have elments inside.
 * 
 * @param {*} result_text text to be shown
 * @returns a View containing the text passed as parameter, or a default text if the parameter is empty
 */
function _listEmptyComponent(result_text) {
  result_text = (result_text == "" || result_text == null) ? "Nessun risultato disponibile." : result_text;

  return (
    <Text style={mainStyle.empty_data}>{result_text}</Text>
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


export { _listEmptyComponent, geo, sendStats };