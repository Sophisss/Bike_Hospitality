import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from '../utilities/Fetcher';
import listStyle from '../../assets/styles/ListStyle';
import urls from '../utilities/Urls';
import IconDecisionMaker from '../utilities/IconDecisionMaker';
import { _listEmptyComponent } from '../utilities/Utils';

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
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[listStyle.mainContainer, { marginLeft: 15 }]}>

      {loaded ? <ActivityIndicator size="large" color="black" style={{ justifyContent: 'center' }} /> : (

        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].no_data)
          : keys.map((key) => (
            <View style={listStyle.categoryContainer} key={key}>
              <Text style={listStyle.categoryText}>{t[ln].lb_prov_di}{key}</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                _listEmptyComponent={_listEmptyComponent("Nessun " + key + " disponibile.")}
                horizontal={true}
                data={data[key]}
                renderItem={({ item }) => (
                  <Card style={listStyle.itemCard}
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


                    <Image style={listStyle.itemImage} source={{ uri: item.immagine }} />

                    <View style={listStyle.infoContainer}>
                      <Text style={listStyle.accName}>{item.nome}</Text>
                      <View style={listStyle.textContainer}>
                        <Icon name={IconDecisionMaker('map')} size={20} color="green" />
                        <Text style={[listStyle.text, { color: '#4d4d4d', fontWeight: 'bold' }]}> {item.localita} </Text>
                      </View>
                      <View style={listStyle.textContainer}>
                        <Icon name={IconDecisionMaker('location')} size={30} color="red" />
                        <Text style={[listStyle.text, listStyle.textItalic, { color: 'white' }]}> {item.indirizzo} </Text>
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

          ))
      )}

    </ScrollView>
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