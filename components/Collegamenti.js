import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View,} from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

import IconDecisionMaker from "./utilities/IconDecisionMaker";
import fetcher from "./utilities/Fetcher";
import urls from './utilities/Urls'
import notification from "./utilities/Alert";
import listStyle from "../assets/styles/ListStyle";
import detailStyle from "../assets/styles/DetailStyle";
import { _listEmptyComponent } from "./utilities/Utils";
import translations from "../translations/translations";


function Collegamenti() {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

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
        <View showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[listStyle.mainContainer, {height: '100%'}]}>
            <Text style={[listStyle.categoryText, {marginLeft: 15, marginBottom: 10}]}>{translations[global.currentLanguage].titoloColl}</Text>

            { loaded ? <ActivityIndicator size="large" color="black" style={{justifyContent: 'center'}}/>  : (
            
            <FlatList
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            _listEmptyComponent={_listEmptyComponent("Nessun collegamento disponibile.")}
              data={data}
              renderItem={({item}) => (
                <Card style={[listStyle.itemCardLeftImage, {margin: 10, alignContent: 'center'}]}>
                  <View style={detailStyle.sectionView}>
                    <View style={detailStyle.flexDirectionRow}>
                      <Text style={[detailStyle.sectionTitle, {flex: 1,}]}>{item.nome}</Text>
                      <View> 
                      <TouchableOpacity style={detailStyle.smallButton} width={'auto'} onPress={() => 
                          {item.web !== null && item.web !== undefined && item.web !== "" ?
                            WebBrowser.openBrowserAsync(item.web) : 
                            notification("Attenzione", "Sito web non disponibile.", "Ok")()}}
                        >
                          <Ionicons name={IconDecisionMaker('link')} size={30} color='gold'/>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Image style={detailStyle.collPhoto} source={{uri: item.immagine}}/>
                  </View>
                    
                </Card>
                )
              }
              />
              )}

        </View>
    );
}


export default Collegamenti;