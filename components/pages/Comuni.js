import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import { _listEmptyComponent } from '../utilities/Utils';
import { getProvinceByRegione } from '../utilities/ApiUtils';
import BackgroundWrapper from "../utilities/BackgroundWrapper";
import listStyle from '../../assets/styles/ListStyle';
import mainStyle from '../../assets/styles/MainStyle';
import translations from '../../translations/translations';


function Comuni({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = Object.keys(data).length;

  const { regioneId } = route.params;

  const getComuni = async () => {
    try {
      var province = await getProvinceByRegione(regioneId);
      let comuni = [];
      for (let i = 0; i < province.length; i++) {
        let json = await fetcher(urls.comuni.url + global.currentLanguage + "&provincia=" + province[i].codice_provincia);
        comuni = comuni.concat(json);
      }
      setData(await groupByProvince(comuni));
    } catch (error) {
      console.error("Error: " + error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getComuni();
  }, []);

  let keys = Object.keys(data);

  var ln = global.currentLanguage;
  var t = translations;

  routeName = t[ln].rt_comune;

  return (
    <BackgroundWrapper dataLength={dataLength} styles={mainStyle}>
      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_cities, true)
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
                    <Card style={[listStyle.itemCard, listStyle.itemCardComuni, { height: 'auto' }]}
                      onPress={() => navigation.navigate(routeName, {
                        id: item.id,
                        nome: item.nome,
                        codice_provincia: item.codice_provincia,
                        provincia: key,
                        immagine: item.immagine,
                        url: item.url,
                        wiki: item.wiki,
                        descrizione: item.descrizione,
                      })}
                    >
                      <View style={[listStyle.infoContainer, { gap: 10 }]}>
                        <Image style={listStyle.comuniItemImage} source={{ uri: item.immagine }} />
                        <Text style={[listStyle.accName, { textAlign: 'center' }]}>{item.nome}</Text>
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
    </BackgroundWrapper>
  );
}

async function groupByProvince(data) {
  data.sort((a, b) => a.provincia.localeCompare(b.provincia));

  let result = data.reduce(function (r, a) {
    r[a.provincia] = r[a.provincia] || [];
    r[a.provincia].push(a);
    return r;
  }, Object.create(null));

  return result;
}


export default Comuni;