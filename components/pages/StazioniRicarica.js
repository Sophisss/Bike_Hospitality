import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from '../utilities/IconDecisionMaker';
import regionsCoordinate from "../utilities/RegionsCoordinates";

function StazioniRicarica({ navigation, route }) {

  const [loaded, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);

  const { regioneId } = route.params;
  const coords = regionsCoordinate[regioneId] || {
    latitude: 43.254052, // Default latitude
    longitude: 13.010569, // Default longitude
  };

  const getStazioniRicarica = async () => {
    try {
      let json = await fetcher(urls.stazioni_di_ricarica.url + "&regione=" + regioneId);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadStatus(false);
    }
  }

  useEffect(() => {
    getStazioniRicarica();
  }, []);


  return (

    <View style={styles.container}>

      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={{
        latitude: coords.latitude, longitude: coords.longitude,
        latitudeDelta: 2, longitudeDelta: 2,
      }}>
        {data.map(marker => {
          return (
            <Marker key={marker.id} title={"Punto di Ricarica"} description={marker.indirizzo + " - " + marker.localita} coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}>
              <Icon name={IconDecisionMaker('battery-charging-outline')} size={45} color='#006400' />
            </Marker>
          )
        })}
      </MapView>

      {/* <FAB color="white" size="medium"
        icon='format-list-bulleted' style={styles.fab}
          onPress={() => console.log('Pressed')}/>*/}
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  /* fab: {
     backgroundColor: 'dodgerblue',
     borderRadius: 30,
     bottom: 0,
     margin: 16,
     position: 'absolute',
     right: 0,
   },*/
});

export default StazioniRicarica;