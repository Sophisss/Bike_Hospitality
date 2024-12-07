import { useEffect, useState } from "react";
import listStyle from "../../assets/styles/ListStyle";
import { ActivityIndicator, Image, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import { _listEmptyComponent } from "../utilities/Utils";
import mainStyle from '../../assets/styles/MainStyle';
import translations from '../../translations/translations';


function Eventi({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = data.length;

  const getEventi = async () => {
    try {
      let json = await fetcher(urls.eventi.url + global.currentLanguage);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getEventi();
  }, []);

  var ln = global.currentLanguage;
  var t = translations;

  routeName = t[ln].rt_evento;


  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../assets/images/background.png')} style={mainStyle.imageBackground} />

      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_events)
          :
          <View style={mainStyle.box}>
            <FlatList
              style={{ alignSelf: 'center' }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <Card style={[listStyle.itemCardVertical, { alignSelf: 'center' }]}
                  onPress={() => navigation.navigate(routeName, {
                    id: item.id,
                    nome: item.nome,
                    provincia: item.provincia,
                    localita: item.localita,
                    immagine: item.immagine,
                    descrizione: item.descrizione,
                  })}>

                  <Image style={listStyle.eventItemImage} source={{ uri: item.immagine }} />

                  <View style={[listStyle.infoContainer, { gap: 10 }]}>
                    <Text style={listStyle.accName}>{item.nome}</Text>
                    <View style={listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('map')} size={20} color="#6DBE45" />
                      <Text style={[listStyle.text, { color: '#F0F0F0', fontWeight: 'bold' }]}> {"Provincia: " + item.provincia} </Text>
                    </View>
                    <View style={listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('location')} size={30} color="red" />
                      <Text style={[listStyle.text, listStyle.textItalic, { color: '#F0F0F0' }]}>
                        {item.localita ? item.localita : t[ln].empty_address}
                      </Text>
                    </View>
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

export default Eventi;