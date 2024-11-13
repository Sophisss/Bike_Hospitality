import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Linking  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, sendStats } from '../../utilities/Utils';
import detailStyle from '../../../assets/styles/DetailStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';

import translations from '../../../translations/translations';


function DettaglioGuide({ navigation, route }) {
  const { id, nome, cognome, provincia, comune, localita, foto, lingue, settori, telefono, email, descrizione } = route.params;


  useEffect(() => {
  //  navigation.setOptions({title: nome + " " + cognome});
  })

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('guida',id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >


      <View style={detailStyle.mainContentView} >
        <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome + " " + cognome}</Text>    
        <Text style={[detailStyle.sectionTitle, {color: '#4d4d4d', marginTop: -5}]}>{comune + " (" + provincia + ")"}</Text>
        
        <Image style={detailStyle.guidePhoto} source={{uri: foto}}/>
        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {telefono !== null && telefono !== undefined && telefono !== "" ? 
              Linking.openURL(`tel:${telefono}`): 
              notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('call')} size={30} color='green'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_chiama}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {email !== null && email !== undefined && email !== "" ? 
              Linking.openURL(`mailto:${email}`)  : 
              notification("Attenzione", "Email non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('mail')} size={30} color='tomato'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_descriz}</Text>
          <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        {descrizione !== null && descrizione !== undefined && descrizione !== "" ? 
          descrizione.split(' - ').map((elem => {
            return(<Text style={[detailStyle.sectionBody, {textAlign: 'left'}]}>{'\u25cf ' + elem}</Text>)
          }))
        : _listEmptyComponent("Descrizione non disponibile.")}
      </View>


      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_lingue}</Text>
          <Ionicons name={IconDecisionMaker('language')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        {lingue !== null && lingue !== undefined && lingue !== "" ? 
          lingue.split('|').map((elem => {
            return(<Text style={[detailStyle.sectionBody, {backgroundColor: 'rgba(40, 63, 151, 1)', padding: 10, alignSelf: 'flex-start', borderRadius: 20, margin: 5, textAlign: 'left', color: 'yellow'}]}>{elem}</Text>)
        }))
        : _listEmptyComponent("Lingue non disponibili.")}
      </View>

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_settori}</Text>
          <Ionicons name={IconDecisionMaker('list')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>


        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
          {settori.split('|').map((elem => {
            return(<Text style={[detailStyle.sectionBody, {backgroundColor: '#b300b3', color: 'white', padding: 10, alignSelf: 'flex-start', borderRadius: 20, margin: 5, textAlign: 'left'}]}>{elem}</Text>)
          }))}
        </ScrollView>
      </View>

      <View style={detailStyle.sectionView} id='contacts'>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_contatti}</Text>
          <Ionicons name={IconDecisionMaker('information-circle')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        {/*<Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 5}}>Contatta questa guida per maggiori informazioni!</Text>*/}
        <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {telefono !== null && telefono !== undefined && telefono !== "" ? 
              Linking.openURL(`tel:${telefono}`): 
              notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('call')} size={30} color='green'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>CHIAMA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {email !== null && email !== undefined && email !== "" ? 
              Linking.openURL(`mailto:${email}`)  : 
              notification("Attenzione", "Email non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('mail')} size={30} color='tomato'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
        </TouchableOpacity>
      </View>
      

    </ScrollView>
  );
}

export default DettaglioGuide;