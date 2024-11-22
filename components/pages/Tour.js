import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import listStyle from "../../assets/styles/ListStyle";
import { _listEmptyComponent } from "../utilities/Utils";

import translations from '../../translations/translations';

import { getProvinceByRegione } from "../utilities/ApiUtils";


function Tour({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);

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

    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[listStyle.mainContainer, { marginLeft: 15 }]}>

      {loaded ? <ActivityIndicator size="large" color="black" style={{ justifyContent: 'center' }} /> : (

        keys.map((key) => (
          <View style={listStyle.categoryContainer} key={key}>
            <Text style={listStyle.categoryText}>{(key == "Itinerario") ? "Itinerari/Tour" : t[ln].lb_prov_di + key}</Text>
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


                  <Image style={listStyle.itemImage} source={{ uri: item.immagini[0] }} />

                  <View style={listStyle.infoContainer}>
                    <Text style={listStyle.accName}>{item.nome}</Text>
                    <View style={listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('map')} size={20} color="green" />
                      <Text style={[listStyle.text, { color: '#4d4d4d', fontWeight: 'bold' }]}> {item.comune + " (" + item.provincia + ")"} </Text>
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
    r[a.nome_provincia] = r[a.nome_provincia] || [];
    r[a.nome_provincia].push(a);
    return r;
  }, Object.create(null));
  return result;
}

export default Tour;