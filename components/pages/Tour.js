import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import { _listEmptyComponent } from "../utilities/Utils";
import { getProvinceByRegione } from "../utilities/ApiUtils";
import listStyle from "../../assets/styles/ListStyle";
import mainStyle from '../../assets/styles/MainStyle';
import translations from '../../translations/translations';


function Tour({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const dataLength = Object.keys(data).length;

  const { regioneId } = route.params;

  const getTours = async () => {
    try {
      var province = await getProvinceByRegione(regioneId);
      let tours = [];
      for (let i = 0; i < province.length; i++) {
        let json = await fetcher(urls.tour.url + global.currentLanguage + "&provincia=" + province[i].codice_provincia);
        tours = tours.concat(json);
      }
      setData(await groupByCategory(tours));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getTours();
  }, []);

  var ln = global.currentLanguage;
  var t = translations;

  routeName = t[ln].rt_tour;

  let keys = Object.keys(data);

  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground source={require('../../assets/images/background.png')} style={mainStyle.imageBackground} />

      {loaded ? (
        <><ActivityIndicator size="large" color="black" style={mainStyle.loadIndicator} />
          <Text style={mainStyle.loadText}>{t[ln].loading_data}</Text></>
      ) : (
        (dataLength === 0 || dataLength == undefined) ?
          _listEmptyComponent(t[ln].empty_bike_routes)
          :
          <ScrollView style={mainStyle.box}>
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
    </View>
  );
}

async function groupByCategory(data) {
  let result = data.reduce(function (r, a) {
    r[a.nome_provincia] = r[a.nome_provincia] || [];
    r[a.nome_provincia].push(a);
    return r;
  }, Object.create(null));
  return result;
}

export default Tour;