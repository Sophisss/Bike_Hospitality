import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity  } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps/lib/MapView';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import * as WebBrowser from 'expo-web-browser';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, geo, sendStats } from '../../utilities/Utils';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import he from 'he';
import RenderHTML from 'react-native-render-html';
import notification from '../../utilities/Alert';
import detailStyle from '../../../assets/styles/DetailStyle';

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
    navigation.setOptions({ title: nome});
   //Ss navigation.setOptions({title: nome});
  })

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('partner',id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >

      <View style={detailStyle.mainContentView}>
        <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome}</Text>
        {/*<Text style={[detailStyle.sectionTitle, {color: '#4d4d4d'}]}>{indirizzo + " - " + localita}</Text>*/}
        
        <Image style={detailStyle.photo} source={{uri: immagine}}/>

        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
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
        {(descrizione !== null && descrizione !== undefined && descrizione !== "") ?
          <RenderHTML source={{html: he.decode(descrizione),}} contentWidth={200} baseStyle={HTMLStyle.text}/>
        : _listEmptyComponent("Nessuna descrizione disponibile.")}
        </View>
    
      
      {coords !== null && coords !== undefined && coords !== "" ? 
        <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{"Posizione"}</Text>
          <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map} 
          region= {{latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1,}}> 
          <Marker coordinate={{latitude: lat, longitude: lgt}} onPress={() => { geo(lat, lgt, nome) }} />
        </MapView> 
      </View>  
    : null}
      
    </ScrollView>
  );
}


export default DettaglioPartner;