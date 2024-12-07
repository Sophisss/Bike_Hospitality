import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import { _listEmptyComponent } from '../utilities/Utils';
import mainStyle from '../../assets/styles/MainStyle';
import listStyle from '../../assets/styles/ListStyle';
import translations from '../../translations/translations';

function Collaborazioni({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = data.length;

  const { regioneId } = route.params;

  const getCollab = async () => {
    try {
      let json = await fetcher(urls.collaborations.url + global.currentLanguage + "&regione=" + regioneId);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getCollab();
  }, []);

  var ln = global.currentLanguage;
  var t = translations;

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../assets/images/background.png')} style={mainStyle.imageBackground} />

      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_collaborations)
          :
          <View style={mainStyle.box}>
            <FlatList
              style={{ alignSelf: 'center' }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <Card style={[listStyle.itemCardVertical, { alignSelf: 'center' }]}
                  onPress={() => navigation.navigate('Dettaglio Collaborazioni', {
                    id: item.id,
                    nome: item.nome,
                    categoria: item.categoria,
                    immagine: item.immagine,
                    url: item.url,
                    wiki: item.wiki,
                    descrizione: item.descrizione,
                  }
                  )
                  }
                >
                  <Image style={listStyle.itemImageVertical} source={{ uri: item.immagine }} />
                  <View style={listStyle.infoContainer}>
                    <Text style={[listStyle.accName, { textAlign: 'center' }]}>{item.nome}</Text>
                  </View>
                </Card>
              )
              }
            />
          </View>
      )}
    </View>
  );
}


export default Collaborazioni;