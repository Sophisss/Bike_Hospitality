import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';

import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import IconDecisionMaker from '../utilities/IconDecisionMaker';
import listStyle from '../../assets/styles/ListStyle';
import { _listEmptyComponent } from '../utilities/Utils';


function Enogastronomia({navigation, route}) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getCollab = async () => {
        try {
         let json = await fetcher(urls.enogastronomia.url);
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

     return(
      <View style={listStyle.mainContainer}>
        
            <FlatList
            style={{alignSelf: 'center'}}
            _listEmptyComponent={_listEmptyComponent("Nessun partner enogastronomico disponibile.")}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <Card style={[listStyle.itemCardVertical, {alignSelf: 'center'}]} 
                      onPress={() => navigation.navigate('Dettaglio Collaborazioni', {
                        nome: item.nome,
                        categoria: item.categoria,
                        localita: item.localita,
                        indirizzo: item.indirizzo,
                        immagine: item.immagine,
                        url: item.url,
                        wiki: item.wiki,
                        coords: item.coords,
                        descrizione: item.descrizione,
                      }
                     ) 
                    }
                >
                
                  <Image style={listStyle.itemImageVertical} source={{uri: item.immagine}}/>
                  <View style={listStyle.infoContainer}>
                    <Text style={listStyle.accName}>{item.nome}</Text>
                    <View style = {listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('map')} size={20} color="green"/> 
                      <Text style={[listStyle.text, {color: '#4d4d4d', fontWeight: 'bold'}]}> {item.localita} </Text>
                    </View>
                    <View style = {listStyle.textContainer}>
                      <Icon name={IconDecisionMaker('location')} size={30} color="red"/> 
                      <Text style={[listStyle.text, listStyle.textItalic, {color: 'white'}]}> {item.indirizzo} </Text>
                    </View>
                  </View>
                </Card>
              )
            }
            />
      
   </View>
     
        );
}


export default Enogastronomia;