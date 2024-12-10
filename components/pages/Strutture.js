import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import IconDecisionMaker from '../utilities/IconDecisionMaker';
import { _listEmptyComponent } from '../utilities/Utils';
import mainStyle from '../../assets/styles/MainStyle';
import listStyle from '../../assets/styles/ListStyle';
import translations from '../../translations/translations';


function Accomodation({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = Object.keys(data).length;

  const { regioneId } = route.params;

  const getAccomodations = async () => {
    try {
      let json = await fetcher(urls.strutture.url + global.currentLanguage + "&regione=" + regioneId);
      ///setData(await groupByCategory(json));
      setData(await groupByProvincia(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getAccomodations();
  }, []);

  let keys = Object.keys(data);

  var ln = global.currentLanguage;
  var t = translations;

  //const routeName = ln === 'it' ? 'Scheda struttura' : 'Facility Info';
  routeName = t[ln].rt_struttura;

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../assets/images/background.png')} style={mainStyle.imageBackground} />

      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_accommodations)
          :
          <ScrollView showsVerticalScrollIndicator={false} style={mainStyle.box}>
            {keys.map((key) => (
              <View style={listStyle.categoryContainer} key={key}>
                <Text style={listStyle.categoryText}>{t[ln].lb_prov_di}{key}</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={data[key]}
                  renderItem={({ item }) => (
                    <Card style={[listStyle.itemCard, { borderRadius: 15, height: 'auto' }]}
                      onPress={() => navigation.navigate(routeName, {
                        id: item.id,
                        nome: item.nome,
                        //categoria: key,
                        provincia: key,
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
                      })
                      }
                    >

                      <Image style={listStyle.itemImageVertical} source={{ uri: item.immagine }} />

                      <View style={[listStyle.infoContainer, { gap: 10 }]}>
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
                  )
                  }
                />

                {!key.match(keys[keys.length - 1])
                  ? <View style={{ width: '100%', borderBottomColor: 'lightgrey', borderWidth: 1, marginVertical: 30 }} />
                  : null}
              </View>
            ))}
          </ScrollView>
      )}
    </View >
  );
}

async function groupByCategory(data) {

  let result = data.reduce(function (r, a) {
    r[a.categoria] = r[a.categoria] || [];
    r[a.categoria].push(a);
    return r;
  }, Object.create(null));

  return result;
}

async function groupByProvincia(data) {

  let result = data.reduce(function (r, a) {
    r[a.provincia] = r[a.provincia] || [];
    r[a.provincia].push(a);
    return r;
  }, Object.create(null));

  return result;
}


export default Accomodation;