import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
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
import mainStyle from '../../../assets/styles/MainStyle';

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

  sendStats('comune', id);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={mainStyle.imageBackground} />

      <ScrollView showsVerticalScrollIndicator={false} style={[mainStyle.box, { padding: 0 }]}>
        <View style={[detailStyle.mainContentView, { gap: 5 }]}>
          <Text style={[detailStyle.detailTitle, { flex: 1, marginBottom: 8 }]}>{nome}</Text>

          <Image style={[detailStyle.comunePhoto, { marginBottom: 8 }]} source={{ uri: immagine }} />
          <View style={{ flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => {
              url !== null && url !== undefined && url !== "" ?
                Linking.openURL(url) :
                notification(t[ln].attention, t[ln].empty_site, "Ok")()
            }}
            >
              <Ionicons name={IconDecisionMaker('link')} size={30} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{t[ln].lb_website}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={[detailStyle.mainContentView, { gap: 0 }]}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].lb_descriz}</Text>
            <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={25} color='#294075' />
          </View>
          <RenderHTML source={{ html: he.decode(descrizione) }} contentWidth={200} baseStyle={HTMLStyle.text} />
        </View>

        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}>{t[ln].tit_strutture + provincia}</Text>
            <Ionicons name={IconDecisionMaker('bed')} style={[detailStyle.sectionIcon, { alignSelf: 'center' }]} size={30} color='#294075' />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            _listEmptyComponent={_listEmptyComponent(t[ln].empty_accommodations)}
            horizontal={true}
            data={data}
            renderItem={({ item }) => (
              <Card style={[listStyle.itemCard, { borderRadius: 15, height: 'auto' }]}
                onPress={() => navigation.navigate(t[ln].rt_struttura, {
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
                <Image style={listStyle.itemImageVertical} source={{ uri: item.immagine }} />

                <View style={[listStyle.infoContainer, { gap: 8 }]}>
                  <Text style={listStyle.accName}>{item.nome}</Text>
                  <View style={listStyle.textContainer}>
                    <Icon name={IconDecisionMaker('map')} size={20} color="#6DBE45" />
                    <Text style={[listStyle.text, { color: '#F0F0F0', fontWeight: 'bold' }]}> {item.localita} </Text>
                  </View>
                  <View style={listStyle.textContainer}>
                    <Icon name={IconDecisionMaker('location')} size={25} color="red" />
                    <Text style={[listStyle.text, listStyle.textItalic, { color: '#F0F0F0' }]}>
                      {item.indirizzo ? item.indirizzo : t[ln].empty_address}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
          />
        </View>


        <View style={detailStyle.mainContentView}>
          <View style={detailStyle.flexDirectionRow}>
            <Text style={[detailStyle.sectionTitle, { textAlign: 'left', fontSize: 22, color: '#294075' }]}> {t[ln].tit_itinerari + provincia}</Text>
            <Ionicons name={IconDecisionMaker('bicycle-sharp')} style={[detailStyle.sectionIcon, { alignSelf: 'center' }]} size={30} color='#294075' />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            _listEmptyComponent={_listEmptyComponent(t[ln].empty_bike_routes)}
            horizontal={true}
            data={tour}
            renderItem={({ item }) => (
              <Card style={[listStyle.itemCard, { borderRadius: 15, height: 'auto' }]}
                onPress={() => navigation.navigate(t[ln].rt_tour, {
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

                <Image style={listStyle.itemImageVertical} source={{ uri: item.immagini[0] }} />

                <View style={[listStyle.infoContainer, { gap: 8 }]}>
                  <Text style={listStyle.accName}>{item.nome}</Text>
                  <View style={listStyle.textContainer}>
                    <Icon name={IconDecisionMaker('map')} size={20} color="#6DBE45" />
                    <Text style={[listStyle.text, { color: '#F0F0F0', fontWeight: 'bold' }]}> {item.comune + " (" + item.provincia + ")"} </Text>
                  </View>
                  <View style={listStyle.textContainer}>
                    <Icon name={IconDecisionMaker('list')} size={25} color="white" />
                    <Text style={[listStyle.text, listStyle.textItalic, { color: '#F0F0F0' }]}> {item.categoria} </Text>
                  </View>
                </View>
              </Card>
            )
            }
          />

        </View>

      </ScrollView >
    </View >
  );
}

const styles = {
  tagsStyles: {
    p: { margin: 2, fontSize: 17, color: 'black' },
    h3: { margin: 2, color: 'red' }
  }
};

export default DettaglioComuni;