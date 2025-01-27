import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps/lib/MapView';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, geo, sendStats } from '../../utilities/Utils';
import detailStyle from '../../../assets/styles/DetailStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import he from 'he';
import RenderHTML from 'react-native-render-html';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import mainStyle from '../../../assets/styles/MainStyle';
import notification from '../../utilities/Alert';

import translations from '../../../translations/translations';



function DettaglioStrutture({ navigation, route }) {
  const { id, nome, categoria, codice_provincia, email, localita, indirizzo, immagine, url, telefono, wiki, coords, descrizione } = route.params;

  const coord = coords.split(' ')
  const lat = parseFloat(coord[0])
  const lgt = parseFloat(coord[1])

  var ln = global.currentLanguage;
  var t = translations;

  useEffect(() => {
    // navigation.setOptions({title: nome});
  }, []);

  const isValidCoordinate = (latitude, longitude) => {
    return (
      typeof latitude === "number" &&
      typeof longitude === "number" &&
      !isNaN(latitude) &&
      !isNaN(longitude)
    );
  };

  sendStats('struttura', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={[detailStyle.mainContentView, { gap: 5 }]}>
          <Text style={[detailStyle.detailTitle, { flex: 1, marginBottom: 8 }]}>{nome}</Text>
          <Text style={[detailStyle.sectionTitle, { color: '#4d4d4d', marginBottom: 8 }]}>
            {indirizzo && localita ? `${indirizzo}- ${localita}` : indirizzo || localita}
          </Text>


          <Image style={[detailStyle.photo, { marginBottom: 8 }]} source={{ uri: immagine }} />
          <View style={{ flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              {
                telefono !== null && telefono !== undefined && telefono !== "" ?
                  Linking.openURL(`tel:${telefono}`) :
                  notification(t[ln].attention, t[ln].empty_phone_number, "Ok")()
              }
            }}
            >
              <Ionicons name={IconDecisionMaker('call')} size={30} color='#6DBE45' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_chiama.toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              {
                email !== null && email !== undefined && email !== "" ?
                  Linking.openURL(`mailto:${email}`) :
                  notification(t[ln].attention, t[ln].empty_email, "Ok")()
              }
            }}
            >
              <Ionicons name={IconDecisionMaker('mail')} size={30} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              coords !== null && coords !== undefined && coords !== "" ?
                geo(lat, lgt, nome) :
                notification(t[ln].attention, t[ln].empty_coordinates, "Ok")()
            }}
            >
              <Ionicons name={IconDecisionMaker('navigate')} size={30} color='red' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_goto.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              url !== null && url !== undefined && url !== "" ?
                Linking.openURL(url) :
                notification(t[ln].attention, t[ln].empty_site, "Ok")()
            }}
            >
              <Ionicons name={IconDecisionMaker('link')} size={30} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_website.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_descriz}</Text>
            <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={25} color='#294075' />
          </View>
          {(descrizione !== null && descrizione !== undefined && descrizione !== "") ?
            <RenderHTML source={{ html: he.decode(descrizione), }} contentWidth={200} baseStyle={HTMLStyle.text} />
            : _listEmptyComponent(t[ln].empty_description)}
        </View>

        {coords !== null && coords !== undefined && coords !== "" && isValidCoordinate(lat, lgt) ?
          <View style={detailStyle.mainContentView}>
            <View style={detailStyle.flexDirectionRow}>
              <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_posizione}</Text>
              <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='#294075' />
            </View>
            <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map}
              region={{ latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1, }}>
              <Marker coordinate={{ latitude: lat, longitude: lgt }}
                onPress={() => { geo(lat, lgt, nome) }} />
            </MapView>
          </View>
          : null}
      </ScrollView>

    </View>
  );
}

export default DettaglioStrutture;