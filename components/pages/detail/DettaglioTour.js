import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

import detailStyle from '../../../assets/styles/DetailStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import { Dimensions } from 'react-native';
import { Linking } from 'react-native';
import { _listEmptyComponent, sendStats } from '../../utilities/Utils';
import { RenderHTML } from 'react-native-render-html';
import he from 'he';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import mainStyle from '../../../assets/styles/MainStyle';
import notification from '../../utilities/Alert';

import translations from '../../../translations/translations';

function DettaglioTour({ navigation, route }) {
  const { id, nome, categoria, provincia, codice_provincia, comune, localita, gpx, map, linkgpx, telefono, email, descrizione, immagini } = route.params;

  useEffect(() => {
    //W navigation.setOptions({title: nome});
  }, []);

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('tour', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={detailStyle.mainContentView}>
          <Text style={[detailStyle.detailTitle, { flex: 1 }]}>{nome}</Text>
          <Text style={[detailStyle.sectionTitle, { color: '#4d4d4d', marginTop: -5 }]}>{comune + " (" + provincia + ")"}</Text>

          <Image style={detailStyle.photo} source={{ uri: immagini[0] }} />
          <View style={{ flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              {
                telefono !== null && telefono !== undefined && telefono !== "" ?
                  Linking.openURL(`tel:${telefono}`) :
                  notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()
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
                  notification("Attenzione", "Email non disponibile.", "Ok")()
              }
            }}
            >
              <Ionicons name={IconDecisionMaker('mail')} size={30} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_descriz}</Text>
            <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={25} color='#294075' />
          </View>
          <RenderHTML source={{ html: he.decode(descrizione) }} contentWidth={200} baseStyle={HTMLStyle.text} />
        </View>

        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_Gallery}</Text>
            <Ionicons name={IconDecisionMaker('images')} style={detailStyle.sectionIcon} size={25} color='#294075' />
          </View>

          <ScrollView style={{ marginTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
            {immagini.map((ph) => <Image style={detailStyle.photo} source={{ uri: ph }} key={ph.toString()} />)}
          </ScrollView>
        </View>

        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_DettTour}</Text>
            <Ionicons name={IconDecisionMaker('glasses')} style={detailStyle.sectionIcon} size={30} color='#294075' />
          </View>

          {(map !== "") ?
            <WebView
              nestedScrollEnabled
              source={{ uri: map }}
              style={{ marginTop: 10, height: Dimensions.get('window').height / 2, opacity: 0.99 }}
            />
            : _listEmptyComponent(t[ln].msg_Mappa)
          }

          <Text style={{ padding: 5, alignSelf: 'center', justifyContent: 'space-between', marginTop: 10 }}>

            {(gpx !== "") ?
              <TouchableOpacity style={[detailStyle.button,]} onPress={() => WebBrowser.openBrowserAsync(gpx)}>
                <Ionicons name={IconDecisionMaker('map')} size={30} color='green' />
                <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>{t[ln].lb_Altimetria}</Text>
              </TouchableOpacity>
              : _listEmptyComponent(t[ln].msg_Altimetr)
            },
          </Text>

          <Text style={{ padding: 5, alignSelf: 'center', justifyContent: 'space-between' }}>
            {(linkgpx !== "") ?
              <TouchableOpacity style={[detailStyle.button, { flex: 1, alignSelf: 'center' }]} onPress={() => Linking.openURL(linkgpx)}>
                <Ionicons name={IconDecisionMaker('download')} size={30} color='white' />
                <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>{t[ln].lb_DownlGpx}</Text>
              </TouchableOpacity>
              : _listEmptyComponent(t[ln].msg_DownlGpx)
            }

          </Text>
        </View>

        {
          /*<View style={detailStyle.sectionView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={detailStyle.sectionTitle}>{"Posizione"}</Text>
            <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
          </View>
          <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map} 
            region= {{latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1,}}> 
            <Marker coordinate={{latitude: lat, longitude: lgt}} 
              onPress={() => { geo(lat, lgt, nome) }} />
          </MapView> 
        </View>*/
        }

      </ScrollView>
    </View>
  );
}

export default DettaglioTour;