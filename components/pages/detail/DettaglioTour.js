import React from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { RenderHTML } from 'react-native-render-html';



import he from 'he';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import detailStyle from '../../../assets/styles/DetailStyle';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import mainStyle from '../../../assets/styles/MainStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import { _listEmptyComponent, sendStats } from '../../utilities/Utils';
import notification from '../../utilities/Alert';
import MapComponent from '../../utilities/MapComponent';
import translations from '../../../translations/translations';

function DettaglioTour({ navigation, route }) {
  const { id, nome, categoria, provincia, codice_provincia, comune, localita, gpx, map, linkgpx, telefono, email, descrizione, immagini } = route.params;

  // utility variables
  const ln = global.currentLanguage;
  const t = translations;

  const isGpxFile = (fileUri) => {
    return fileUri.endsWith('.gpx');
  };

  sendStats('tour', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={detailStyle.mainContentView}>
          <Text style={[detailStyle.detailTitle, { flex: 1 }]}>{nome}</Text>
          <Text style={[detailStyle.sectionTitle, { color: '#4d4d4d', marginTop: -5 }]}>{comune + " (" + provincia + ")"}</Text>

          <Image style={detailStyle.photo} source={{ uri: immagini[0] }} />
          <Text style={{ color: '#4d4d4d', marginTop: 2, fontSize: 18, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>
            {t[ln].msg_CntGuida}
          </Text>
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

          {(linkgpx !== "" && isGpxFile(linkgpx)) ?
            <MapComponent gpxFileUri={linkgpx} />
            : _listEmptyComponent(t[ln].msg_Mappa)
          }

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Feather name="map-pin" size={20} color="green" />
          <Text style={{ marginLeft: 5 }}>{t[ln].your_location}</Text>
          <Feather name="map-pin" size={20} color="red" style={{ marginLeft: 15 }} />
          <Text style={{ marginLeft: 5 }}>{t[ln].nearest_point}</Text>
        </View>

          <Text style={{ padding: 2, alignSelf: 'center' }}>
            {(gpx !== "") ?
              <TouchableOpacity style={[detailStyle.button, { flex: 1, alignSelf: 'center' }]} onPress={() => Linking.openURL(gpx)}>
                <Ionicons name={IconDecisionMaker('map')} size={30} color='#6DBE45' />
                <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>{t[ln].lb_Altimetria}</Text>
              </TouchableOpacity>
              : _listEmptyComponent(t[ln].msg_Altimetr)
            }
          </Text>

          <Text style={{ padding: 2, alignSelf: 'center', justifyContent: 'space-between' }}>
            {(linkgpx !== "") ?
              <TouchableOpacity style={[detailStyle.button, { flex: 1, alignSelf: 'center' }]} onPress={() => Linking.openURL(linkgpx)}>
                <Ionicons name={IconDecisionMaker('download')} size={30} color='white' />
                <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>{t[ln].lb_DownlGpx}</Text>
              </TouchableOpacity>
              : _listEmptyComponent(t[ln].msg_DownlGpx)
            }
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

export default DettaglioTour;