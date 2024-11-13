import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity  } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps/lib/MapView';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import * as WebBrowser from 'expo-web-browser';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, geo, sendStats } from '../../utilities/Utils';
import detailStyle from '../../../assets/styles/DetailStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import he from 'he';
import RenderHTML from 'react-native-render-html';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
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

  sendStats('struttura',id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >


      <View style={detailStyle.mainContentView}>
        <Text style={[detailStyle.detailTitle, {flex: 1}]}>{nome}</Text>
        <Text style={[detailStyle.sectionTitle, {color: '#4d4d4d', marginTop: -5}]}>{indirizzo + " - " + localita}</Text>
        
        <Image style={detailStyle.photo} source={{uri: immagine}}/>
        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {telefono !== null && telefono !== undefined && telefono !== "" ? 
              Linking.openURL(`tel:${telefono}`): 
              notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('call')} size={30} color='green'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_chiama.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {email !== null && email !== undefined && email !== "" ? 
              Linking.openURL(`mailto:${email}`)  : 
              notification("Attenzione", "Email non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('mail')} size={30} color='tomato'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => 
            {coords !== null && coords !== undefined && coords !== "" ?
              geo(lat, lgt, nome)  : 
              notification("Attenzione", "Coordinate per la navigazione non disponibili.", "Ok")()}}
          >
            <Ionicons name={IconDecisionMaker('navigate')} size={30} color='red'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_goto.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => 
              {url !== null && url !== undefined && url !== "" ?
                WebBrowser.openBrowserAsync(url) : 
                notification("Attenzione", "Sito web non disponibile.", "Ok")()}}
            >
              <Ionicons name={IconDecisionMaker('link')} size={30} color='gold'/>
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_website.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
      </View>
      

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_descriz}</Text>
          <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        <RenderHTML contentWidth={200} source={{html: he.decode(descrizione),}} baseStyle={HTMLStyle.text}/>
      </View>
    
      
      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_posizione}</Text>
          <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        {coords !== null && coords !== undefined && coords !== "" ? 
          <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map} 
            region= {{latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1,}}> 
            <Marker coordinate={{latitude: lat, longitude: lgt}} 
              onPress={() => { geo(lat, lgt, nome) }} />
          </MapView>
         : _listEmptyComponent("Mappa non disponibile.")}
      </View>
      
    </ScrollView>
  );
}

export default DettaglioStrutture;