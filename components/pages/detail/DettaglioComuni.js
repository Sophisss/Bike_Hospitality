import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Ionicons from '@expo/vector-icons/Ionicons';

import { _listEmptyComponent, sendStats } from '../../utilities/Utils';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import fetcher from '../../utilities/Fetcher';
import urls from '../../utilities/Urls';
import Icon from '@expo/vector-icons/Ionicons';
import RenderHTML from 'react-native-render-html';
import he from 'he';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import listStyle from '../../../assets/styles/ListStyle';
import detailStyle from '../../../assets/styles/DetailStyle';

import translations from '../../../translations/translations';


function DettaglioComuni({ navigation, route }) {
  const { id, nome, provincia, codice_provincia, immagine, url, wiki, descrizione } = route.params;

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const [tour, setTour] = useState([]);

  var ln = global.currentLanguage;
  var t = translations;

  


  const getStrutture = async () => {
      try {
       let json = await fetcher(urls.strutture.url + "&provincia=" + codice_provincia);
       setData(json);
       json = await fetcher(urls.tour.url + "&provincia=" + codice_provincia);
       setTour(json);
     } catch (error) {
       console.error(error);
     } finally {
       setLoadStatus(false);
     }
   }

  useEffect(() => {
     getStrutture();
    // navigation.setOptions({title: nome});
   }, []);

   sendStats('comune',id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >


      <View style={detailStyle.mainContentView}>
        <Text style={[detailStyle.detailTitle, detailStyle.buttonTextFlex]}>{nome}</Text>
        
        <Image style={detailStyle.comunePhoto} source={{uri: immagine}}/>
        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => 
              {url !== null && url !== undefined && url !== "" ?
                WebBrowser.openBrowserAsync(url) : 
                notification("Attenzione", "Sito web non disponibile.", "Ok")()}}
            >
              <Ionicons name={IconDecisionMaker('link')} size={30} color='gold'/>
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_website}</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].lb_descriz}</Text>
          <Ionicons name={IconDecisionMaker('book')} style={{ alignSelf: 'flex-start'}} size={30} color='dodgerblue'/>
        </View>
        <RenderHTML source={{html: he.decode(descrizione)}} contentWidth={200} baseStyle={HTMLStyle.text}/>
      </View>
    
      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].tit_strutture + provincia}</Text>
          <Ionicons name={IconDecisionMaker('bed')} style={{ alignSelf: 'flex-start'}} size={30} color='white'/>
        </View>

        <FlatList
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              _listEmptyComponent={_listEmptyComponent("Nessuna struttura ricettiva disponibile.")}
              horizontal={true}
              data={data}
              renderItem={({item}) => (
                  <Card style={listStyle.itemCard} 
                        onPress={() => navigation.navigate('Dettaglio Strutture', {
                          nome: item.nome,
                          categoria: item.categoria,
                          codice_provincia: item.codice_provincia,
                          email: item.email,
                          localita: item.localita,
                          indirizzo: item.indirizzo,
                          immagine: item.immagine,
                          telefono: item.telefono,
                          url: item.url,
                          wiki: item.wiki,
                          coords: item.coords,
                          descrizione: item.descrizione,
                      })}
                  >
                  <Image style={listStyle.itemImage} source={{uri: item.immagine}}/>
                  
                  <View style={listStyle.infoContainer}>
                    <Text style={listStyle.accName}>{item.nome}</Text>
                    <View style = {listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('map')} size={20} color="green"/> 
                      <Text style={[listStyle.text, {color: '#4d4d4d', fontWeight: 'bold'}]}> {item.localita} </Text>
                    </View>
                    <View style = {listStyle.textContainer}>
                    <Icon name={IconDecisionMaker('location')} size={30} color="red"/> 
                      <Text style={[listStyle.text, listStyle.textItalic, {color: 'white'}]}> {item.indirizzo} </Text>
                    </View>
                  </View>
                    
                  </Card>
                )
              }
            />
      </View>
      

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{t[ln].tit_itinerari + provincia}</Text>
          <Ionicons name={IconDecisionMaker('bicycle-sharp')} style={{ alignSelf: 'flex-start'}} size={30} color='white'/>
        </View>

        <FlatList
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              _listEmptyComponent={_listEmptyComponent("Nessun tour disponibile.")}
              horizontal={true}
              data={tour}
              renderItem={({item}) => (
                  <Card style={listStyle.itemCard}
                        onPress={() => navigation.navigate("Dettaglio Itinerario", {
                          nome: item.nome,
                          categoria: item.categoria,
                          provincia: item.provincia,
                          codice_provincia: item.codice_provincia,
                          comune: item.comune,
                          localita: item.localita,
                          mail: item.mail,
                          gpx: item.gpx,
                          map: item.map,
                          linkgpx: item.linkgpx,
                          telefono: item.telefono,
                          email: item.email,
                          descrizione: item.descrizione,
                          immagini: item.immagini,
                        })
                      }
                  >
                    
                    <Image style={listStyle.itemImage} source={{uri: item.immagini[0]}}/>

                    <View style={listStyle.infoContainer}>
                      <Text style={listStyle.accName}>{item.nome}</Text>
                      <View style = {listStyle.textContainer}>
                        <Icon name={IconDecisionMaker('map')} size={20} color="green"/> 
                        <Text style={[listStyle.text, {color: '#4d4d4d', fontWeight: 'bold'}]}> {item.comune + " (" + item.provincia + ")"} </Text>
                      </View>
                      <View style = {listStyle.textContainer}>
                        <Icon name={IconDecisionMaker('list')} size={20} color="white"/> 
                        <Text style={[listStyle.text, {color: '#4d4d4d', fontWeight: 'bold'}]}> {item.categoria} </Text>
                      </View>
                    </View>
                  </Card>
                )
              }
              />

      </View>
      
      
     { /*<View style={detailStyle.sectionView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={detailStyle.sectionTitle}>{"Posizione"}</Text>
            <Ionicons name={Platform.OS === "ios" ? "ios-locate" : "md-locate"} style={{ alignSelf: 'flex-end'}} size={30} color='dodgerblue'/>
        </View>
        <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map} 
          region= {{latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1,}}> 
          <Marker coordinate={{latitude: lat, longitude: lgt}} 
            onPress={() => { geo(lat, lgt, name) }} />
        </MapView> 
  </View>*/  }
      

    </ScrollView>
  );
}

const styles = {
  tagsStyles: { 
      p: {margin: 2, fontSize: 17, color: 'black'},
      h3: {margin: 2, color: 'red'}
  }

};




export default DettaglioComuni;