import { useEffect, useState } from "react";
import listStyle from "../../assets/styles/ListStyle";
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import { _listEmptyComponent } from "../utilities/Utils";


function Eventi({navigation, route}) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getEventi = async () => {
        try {
         let json = await fetcher(urls.eventi.url);
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


     return(

        <View style={listStyle.mainContainer}>
        
        { loaded ? <ActivityIndicator size="large" color="black" style={{justifyContent: 'center'}}/>  : (

              <FlatList
              style={{alignSelf: 'center'}}
              _listEmptyComponent={_listEmptyComponent("Nessun evento disponibile.")}
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({item}) => (
                <Card style={listStyle.itemCardVertical} 
                        onPress={() => navigation.navigate('Dettaglio Eventi', {
                          nome: item.nome,
                          provincia: item.provincia,
                          localita: item.localita,
                          immagine: item.immagine,
                          descrizione: item.descrizione,
                        })
                      }
                  >
                    
                    
                    <Image style={listStyle.eventItemImage} source={{uri: item.immagine}}/>
                  
                    <View style={listStyle.infoContainer}>
                      <Text style={listStyle.accName}>{item.nome}</Text>
                      <View style = {listStyle.textContainer}>
                        <Icon name={IconDecisionMaker('map')} size={20} color="green"/> 
                        <Text style={[listStyle.text, {color: '#4d4d4d', fontWeight: 'bold'}]}> {"Provincia: " + item.provincia} </Text>
                      </View>
                      <View style = {listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('location')} size={30} color="red"/> 
                        <Text style={[listStyle.text, listStyle.textItalic, {color: 'white'}]}> {item.localita} </Text>
                      </View>
                    </View>
                  </Card>
                )
              }
              />
          )}
              
          </View>
     
        );
}

export default Eventi;