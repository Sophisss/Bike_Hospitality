import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, ImageBackground, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import IconDecisionMaker from "./utilities/IconDecisionMaker";
import fetcher from "./utilities/Fetcher";
import urls from './utilities/Urls'
import notification from "./utilities/Alert";
import mainStyle from '../assets/styles/MainStyle';
import listStyle from "../assets/styles/ListStyle";
import detailStyle from "../assets/styles/DetailStyle";
import { _listEmptyComponent } from "./utilities/Utils";
import translations from "../translations/translations";

/**
 * Collegamenti component displays the Collegamenti data fetched from the server.
 * @returns {View} View containing the Collegamenti data.
 */
function Collegamenti() {
  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = Object.keys(data).length;

  // Utility variables
  const ln = global.currentLanguage;
  const t = translations;

  /**
   * Fetches the Collegamenti data from
   * the server and sets the data state with the response.
   */
  const getCollegamenti = async () => {
    try {
      let json = await fetcher(urls.collegamenti.url);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getCollegamenti();
  }, []);


  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

      <View style={mainStyle.box}>
        <Text style={[listStyle.categoryText, { marginLeft: 15, marginBottom: 10 }]}>{translations[global.currentLanguage].titoloColl}</Text>

        <View style={mainStyle.body} keyboardShouldPersistTaps={'handled'}>
          {loaded ? <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
            <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></> : (

            (dataLength === 0 || dataLength == undefined) ?
              _listEmptyComponent(t[ln].empty_connections, true) :
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                  <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                    <View style={detailStyle.sectionView}>
                      <View style={detailStyle.flexDirectionRow}>
                        <Text style={[detailStyle.sectionTitle, { flex: 1, textAlign: 'left' }]}>{item.nome}</Text>
                        <View>
                          <TouchableOpacity width={'auto'} onPress={() => {
                            item.web !== null && item.web !== undefined && item.web !== "" ?
                              Linking.openURL(item.web) :
                              notification("Attenzione", "Sito web non disponibile.", "Ok")()
                          }}
                          >
                            <Ionicons name={IconDecisionMaker('link')} size={30} color='#294196' />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Image style={detailStyle.collPhoto} source={{ uri: item.immagine }} />
                    </View>
                  </Card>
                )
                }
              />
          )}
        </View>
      </View>
    </View>
  );
}


export default Collegamenti;