import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import listStyle from '../../assets/styles/ListStyle';
import { _listEmptyComponent } from '../utilities/Utils';


function Comuni({navigation, route}) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getComuni = async () => {
        try {
         let json = await fetcher(urls.comuni.url);
         setData(await groupByCategory(json));
       } catch (error) {
         console.error("Error: " + error);
       } finally {
         setLoadStatus(false);
       }
     }

     useEffect(() => {
       getComuni();
     }, []);

     let keys = Object.keys(data);

     return(
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[listStyle.mainContainer, {marginLeft: 15}]}>
      
        { loaded ? <ActivityIndicator size="large" color="black" style={{justifyContent: 'center'}}/>  : (

          keys.map((key) => (
            <View style={listStyle.categoryContainer} key={key}>
              <Text style={listStyle.categoryText}>{key}</Text>
              <FlatList
              showsHorizontalScrollIndicator={false}
              _listEmptyComponent={_listEmptyComponent("Nessun comune in provincia di " + key + " disponibile.")}
              horizontal={true}
              data={data[key]}
              renderItem={({item}) => (
                  <Card style={[listStyle.itemCard, listStyle.itemCardComuni]} 
                        onPress={() => navigation.navigate('Dettaglio Comuni', {
                          nome: item.nome,
                          codice_provincia: item.codice_provincia,
                          provincia: key,
                          immagine: item.immagine,
                          url: item.url,
                          wiki: item.wiki,
                          descrizione: item.descrizione,
                      })}
                  >
                    <View style={listStyle.infoContainer}>
                      <Image style={listStyle.comuniItemImage} source={{uri: item.immagine}}/>
                      <Text style={[listStyle.accName, {alignSelf: 'center'}]}>{item.nome}</Text>
                    </View>
                  </Card>
                )
              }
              />

              {!key.match(keys[keys.length - 1])
                ? <View style={{width: '100%', borderBottomColor: 'lightgrey', borderWidth: 1, marginVertical: 30}}/>
                : null}
            </View>
            
          ))
        )}
        
     </ScrollView>
        );
}

async function groupByCategory(data) {

    let result = data.reduce(function (r, a) {
      r[a.provincia] = r[a.provincia] || [];
      r[a.provincia].push(a);
      return r;
    }, Object.create(null));
  
    return result;
  }

export default Comuni;