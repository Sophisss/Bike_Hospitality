import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import RenderHTML from "react-native-render-html";
import he from 'he';

import mainStyle from '../assets/styles/MainStyle';
import detailStyle from "../assets/styles/DetailStyle";
import listStyle from "../assets/styles/ListStyle";
import HTMLStyle from "../assets/styles/HTMLStyle";
import fetcher from "./utilities/Fetcher";
import urls from './utilities/Urls'
import { _listEmptyComponent } from "./utilities/Utils";
import translations from "../translations/translations";

/**
 * Disciplinario component displays the Disciplinario data fetched from the server.
 * @returns {View} View containing the Disciplinario data.
 */
function Disciplinario() {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);

  /**
   * Fetches the Disciplinario data from
   * the server and sets the data state with the response.
   */
  const getDisciplinario = async () => {
    try {
      let json = await fetcher(urls.disciplinario.url + global.currentLanguage);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getDisciplinario();
  }, []);


  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

      <View style={mainStyle.box}>
        <Text style={[listStyle.categoryText, { marginHorizontal: 15, marginBottom: 10 }]}>{translations[global.currentLanguage].titoloDisc}</Text>

        <View style={mainStyle.body} keyboardShouldPersistTaps={'handled'}>
          {loaded ? <ActivityIndicator size="large" color="black" style={{ justifyContent: 'center' }} /> : (

            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              _listEmptyComponent={_listEmptyComponent("Disciplinare non disponibile.")}
              data={data}
              renderItem={({ item }) => (
                <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]} >
                  <View style={[detailStyle.sectionView, { gap: 15 }]}>
                    <View style={detailStyle.flexDirectionRow}>
                      <Text style={detailStyle.sectionTitle}>{item.titolo}</Text>
                      <Ionicons name={Platform.OS === "ios" ? "ios-information-circle" : "md-information-circle"} size={30} color={((item.titolo.includes("obbl") || item.titolo.includes("Mand")) ? 'red' : 'green')} />
                    </View>
                    <RenderHTML source={{ html: he.decode(item.testo), }} contentWidth={200} baseStyle={HTMLStyle.text} />
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


export default Disciplinario;