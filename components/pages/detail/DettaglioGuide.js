import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, sendStats } from '../../utilities/Utils';
import detailStyle from '../../../assets/styles/DetailStyle';
import mainStyle from '../../../assets/styles/MainStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';

import translations from '../../../translations/translations';


function DettaglioGuide({ navigation, route }) {
  const { id, nome, cognome, provincia, comune, localita, foto, lingue, settori, telefono, email, descrizione } = route.params;

  useEffect(() => {
    //  navigation.setOptions({title: nome + " " + cognome});
  })

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('guida', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={[detailStyle.mainContentView, { marginVertical: 10 }]} >
          <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome + " " + cognome}</Text>
          <Text style={[detailStyle.sectionTitle, { color: '#4d4d4d', marginTop: -5 }]}>{comune + " (" + provincia + ")"}</Text>

          <Image style={detailStyle.guidePhoto} source={{ uri: foto }} />
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
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_chiama}</Text>
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


        <View style={[detailStyle.mainContentView, { marginVertical: 10 }]} >
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_descriz}</Text>
            <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={25} color='#294075' />
          </View>
          {descrizione !== null && descrizione !== undefined && descrizione !== "" ?
            descrizione.split(' - ').map((elem => {
              return (<Text style={[detailStyle.sectionBody, { textAlign: 'left' }]}>{elem}</Text>)
            }))
            : _listEmptyComponent(t[ln].empty_description)}
        </View>


        <View style={[detailStyle.mainContentView, { marginVertical: 10 }]} >
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_lingue}</Text>
            <Ionicons name={IconDecisionMaker('language')} style={detailStyle.sectionIcon} size={30} color='#294075' />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {lingue !== null && lingue !== undefined && lingue !== "" ?
              lingue.split('|').map((elem => {
                return (<Text style={[detailStyle.sectionBody, { alignSelf: 'flex-start', margin: 5, textAlign: 'left', color: '#4d4d4d', fontWeight: 'bold', fontSize: 20 }]}>{elem}</Text>)
              }))
              : _listEmptyComponent(t[ln].empty_languages)}
          </ScrollView>
        </View>

        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_settori}</Text>
            <Ionicons name={IconDecisionMaker('list')} style={detailStyle.sectionIcon} size={30} color='#294075' />
          </View>


          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {settori.split('|').map((elem => {
              return (<Text style={[detailStyle.sectionBody, { color: '#4d4d4d', alignSelf: 'flex-start', margin: 5, textAlign: 'left', fontWeight: 'bold', fontSize: 20 }]}>{elem}</Text>)
            }))}
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}

export default DettaglioGuide;