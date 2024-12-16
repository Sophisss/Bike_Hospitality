import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Card } from 'react-native-paper';
import { ActivityIndicator, Image, Text, View, ImageBackground } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from '../utilities/IconDecisionMaker';
import { _listEmptyComponent } from "../utilities/Utils";
import BackgroundWrapper from "../utilities/BackgroundWrapper";
import listStyle from "../../assets/styles/ListStyle";
import mainStyle from '../../assets/styles/MainStyle';
import translations from '../../translations/translations';


function Guide({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = data.length;

  const { regioneId } = route.params;

  var ln = global.currentLanguage;
  var t = translations;

  routeName = t[ln].rt_guida;

  const getGuide = async () => {
    try {
      let json = await fetcher(urls.guide.url + global.currentLanguage + "&regione=" + regioneId);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getGuide();
  }, []);


  return (
    <BackgroundWrapper dataLength={dataLength} styles={mainStyle}>
      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_cycling_guides)
          :
          <View style={[mainStyle.box, { padding: 15 }]}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <Card style={[listStyle.itemCardLeftImage]}
                  onPress={() => navigation.navigate(routeName, {
                    id: item.id,
                    nome: item.nome,
                    cognome: item.cognome,
                    provincia: item.provincia,
                    comune: item.comune,
                    localita: item.localita,
                    foto: item.foto,
                    lingue: item.lingue,
                    settori: item.settori,
                    telefono: item.telefono,
                    email: item.email,
                    descrizione: item.descrizione,
                  })}
                >

                  <View style={listStyle.infoContainerLeftImage}>
                    <Image style={listStyle.itemLeftImage} source={{ uri: item.foto }} />

                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, gap: 10 }}>
                      <Text style={listStyle.accName}>{item.nome} {item.cognome}</Text>
                      <View style={listStyle.textContainerLeftImage}>
                        <Icon name={IconDecisionMaker('location')} size={20} color="red" />
                        <Text style={[listStyle.text, { color: '#F0F0F0', fontWeight: 'bold' }]}> {item.comune} {"(" + item.provincia + ")"} </Text>
                      </View>
                      <View style={[listStyle.textContainerLeftImage]}>
                        <Icon name={IconDecisionMaker('call')} size={20} color="#6DBE45" />
                        <Text style={[listStyle.text, listStyle.textItalic, { color: '#F0F0F0' }]}> {item.telefono} </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              )
              }
            />
          </View>
      )}
    </BackgroundWrapper>
  );
}


export default Guide;