import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

import fetcher from '../utilities/Fetcher';
import listStyle from '../../assets/styles/ListStyle';
import urls from '../utilities/Urls';
import { _listEmptyComponent } from '../utilities/Utils';

import translations from '../../translations/translations';

function Collaborazioni({navigation, route}) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getCollab = async () => {
        try {
         let json = await fetcher(urls.collaborations.url+global.currentLanguage);
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

    var ln = global.currentLanguage;
    var t = translations;

     return(
      <View style={listStyle.mainContainer}>
            
            <FlatList
            style={{alignSelf: 'center'}}
            _listEmptyComponent={_listEmptyComponent("Nessuna collaborazione disponibile.")}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <Card style={[listStyle.itemCardVertical, {alignSelf: 'center'}]} 
                      onPress={() => navigation.navigate('Dettaglio Collaborazioni', {
                        id: item.id,
                        nome: item.nome,
                        categoria: item.categoria,
                        immagine: item.immagine,
                        url: item.url,
                        wiki: item.wiki,
                        descrizione: item.descrizione,
                      }
                     ) 
                    }
                >
                  <Image style={listStyle.itemImageVertical} source={{uri: item.immagine}}/>
                  <View style={listStyle.infoContainer}>
                    <Text style={[listStyle.accName, {textAlign: 'center'}]}>{item.nome}</Text>
                  </View>
                </Card>
              )
            }
            />
      
   </View>
     
        );
}


export default Collaborazioni;