import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import { _listEmptyComponent } from "../utilities/Utils";
import { getProvinceByRegione } from "../utilities/ApiUtils";
import BackgroundWrapper from "../utilities/BackgroundWrapper";
import listStyle from "../../assets/styles/ListStyle";
import mainStyle from '../../assets/styles/MainStyle';
import translations from '../../translations/translations';

/**
 * Tour Component
 * Displays a list of tours grouped by province.
 * @param {*} navigation Navigation object for screen transitions
 * @param {*} route Route object for passing parameters between screens
 */
function Tour({ navigation, route }) {
  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = Object.keys(data).length;

  // Utility variables
  const { regioneId } = route.params;
  const ln = global.currentLanguage;
  const t = translations;
  const keys = Object.keys(data);
  routeName = t[ln].rt_tour;

  /**
   * Fetch tours based on the region ID and group them by province.
   * 
   */
  const getTours = async () => {
    try {
      const provinces = await getProvinceByRegione(regioneId);
      let tours = [];

      for (const province of provinces) {
        const json = await fetcher(
          `${urls.tour.url}${global.currentLanguage}&provincia=${province.codice_provincia}`
        );
        tours = tours.concat(json);
      }
      setData(await groupByProvincia(tours));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  /**
   * Fetch tours when the component mounts.
   */
  useEffect(() => {
    getTours();
  }, []);

  // #region Async Functions

  /**
   * Groups the tours by their province.
   * @param {*} data An array of tours.
   * @returns An object where the keys are the province names and the values are the tours in that province.
   */
  async function groupByCategory(data) {
    return data.reduce((result, item) => {
      result[item.nome_provincia] = result[item.nome_provincia] || [];
      result[item.nome_provincia].push(item);
      return result;
    }, {});
  }

  // #endregion

  return (
    <BackgroundWrapper dataLength={dataLength} styles={mainStyle}>
      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_bike_routes, true)
          :
          <ScrollView showsVerticalScrollIndicator={false} style={mainStyle.box}>
            {keys.map((key) => (
              <View style={listStyle.categoryContainer} key={key}>
                <Text style={listStyle.categoryText}>{(key == "Itinerario") ? "Itinerari/Tour" : t[ln].lb_prov_di + key}</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={data[key]}
                  renderItem={({ item }) => (
                    <Card style={[listStyle.itemCard, { borderRadius: 15, height: 'auto' }]}
                      onPress={() => navigation.navigate(routeName, {
                        id: item.id,
                        nome: item.nome,
                        ///categoria: key,
                        nome_provincia: key,
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

                      <View style={[listStyle.infoContainer, { gap: 10 }]}>
                        <Text style={listStyle.accName}>{item.nome}</Text>
                        <View style={listStyle.textContainer}>
                          <Icon name={IconDecisionMaker('map')} size={20} color="#6DBE45" />
                          <Text style={[listStyle.text, { color: '#F0F0F0', fontWeight: 'bold' }]}> {item.comune + " (" + item.provincia + ")"} </Text>
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
    </BackgroundWrapper>
  );
}

async function groupByProvincia(data) {
  data.sort((a, b) => a.nome_provincia.localeCompare(b.nome_provincia));

  let result = data.reduce(function (r, a) {
    r[a.nome_provincia] = r[a.nome_provincia] || [];
    r[a.nome_provincia].push(a);
    return r;
  }, Object.create(null));

  return result;
}

export default Tour;