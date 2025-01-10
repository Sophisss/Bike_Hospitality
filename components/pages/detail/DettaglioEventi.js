import React, { useEffect } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, sendStats} from '../../utilities/Utils';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import HTML from "react-native-render-html";
import he from 'he';
import detailStyle from '../../../assets/styles/DetailStyle';

import translations from '../../../translations/translations';

function DettaglioEventi({ navigation, route }) {
  const { id, nome, provincia, localita, immagine, descrizione } = route.params;


  useEffect(() => {
  //  navigation.setOptions({title: nome});
  })

  var ln = global.currentLanguage;
  var t = translations;

  sendStats('evento',id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >


      <View style={detailStyle.mainContentView} >

        <View style={detailStyle.mainContentDetailsView}>
          <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome}</Text>
        </View>
        <Text style={[detailStyle.sectionTitle, {color: '#4d4d4d', marginTop: -5}]}>{localita}</Text>
        
        <Image style={detailStyle.eventPhoto} source={{uri: immagine}}/>
      </View>
      

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].descriz}</Text>
          <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={25} color='dodgerblue'/>
        </View>
        <HTML source={{html: he.decode(descrizione)}} contentWidth={200} />
      </View>
    


    </ScrollView>
  );
}

export default DettaglioEventi;