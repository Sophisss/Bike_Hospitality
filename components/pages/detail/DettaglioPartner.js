import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps/lib/MapView';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, geo, sendStats } from '../../utilities/Utils';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import he from 'he';
import RenderHTML from 'react-native-render-html';
import notification from '../../utilities/Alert';
import detailStyle from '../../../assets/styles/DetailStyle';
import mainStyle from '../../../assets/styles/MainStyle';
import translations from '../../../translations/translations';


function DettaglioPartner({ navigation, route }) {
  const { id, nome, categoria, localita, indirizzo, immagine, url, wiki, coords, descrizione } = route.params;

  let lat = useState(0.0)
  let lgt = useState(0.0)
  if (coords !== undefined && coords !== "") {
    const coord = coords.split(' ')
    lat = parseFloat(coord[0])
    lgt = parseFloat(coord[1])
  }

  useEffect(() => {
    navigation.setOptions({ title: nome });
  })

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('partner', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={detailStyle.mainContentView}>
          <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome}</Text>
          {
            indirizzo || localita ? (
              <Text style={[detailStyle.sectionTitle, { color: '#4d4d4d', marginBottom: 8 }]}>
                {indirizzo && localita ? `${indirizzo} - ${localita}` : indirizzo || localita}
              </Text>
            ) : null
          }

          <Image style={detailStyle.photo} source={{ uri: immagine }} />
          <View style={{ flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between' }}>

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

        {coords !== null && coords !== undefined && coords !== "" ?
          <View style={detailStyle.mainContentView}>
            <View style={detailStyle.flexDirectionRow}>
              <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_posizione}</Text>
              <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='#294075' />
            </View>
            <Text style={{ color: '#4d4d4d', fontSize: 15, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>
              {t[ln].pin_click}
            </Text>
            <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map}
              region={{ latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1, }}>
              <Marker coordinate={{ latitude: lat, longitude: lgt }} onPress={() => { geo(lat, lgt, nome) }} />
            </MapView>
          </View>
          : null}

      </ScrollView>
    </View>
  );
}


export default DettaglioPartner;