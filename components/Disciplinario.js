import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View,} from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import he from 'he';
import RenderHTML from "react-native-render-html";

import detailStyle from "../assets/styles/DetailStyle";
import listStyle from "../assets/styles/ListStyle";
import fetcher from "./utilities/Fetcher";
import urls from './utilities/Urls'
import HTMLStyle from "../assets/styles/HTMLStyle";
import { _listEmptyComponent } from "./utilities/Utils";
import translations from "../translations/translations";

function Disciplinario() {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getDisciplinario = async () => {
        try {
         let json = await fetcher(urls.disciplinario.url+global.currentLanguage);
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
      <View style={[listStyle.mainContainer, {height: '100%'}]}>
        <Text style={[listStyle.categoryText, {marginHorizontal: 15, marginBottom: 10}]}>{translations[global.currentLanguage].titoloDisc}</Text>
        
        {/* 
          <View style={detailStyle.mainContentView}>
          <View>
            <TouchableOpacity  style={[detailStyle.button, {marginBottom: 5}]}>
              <Ionicons name={IconDecisionMaker('information-circle')} size={30} color='red'/>
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{"Requisiti Obbligatori"}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity  style={detailStyle.button}>
              <Ionicons name={IconDecisionMaker('information-circle')} size={30} color='green'/>
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>{"Requisiti Consigliati"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        */}
        
            { loaded ? <ActivityIndicator size="large" color="black" style={{justifyContent: 'center'}}/>  : (

            <FlatList
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              _listEmptyComponent={_listEmptyComponent("Disciplinare non disponibile.")}
              data={data}
              renderItem={({item}) => (
                <Card style={[listStyle.itemCardLeftImage, {margin: 10, alignContent: 'center'}]} >
                  <View style={detailStyle.sectionView}>
                      <View style={detailStyle.flexDirectionRow}>
                          <Text style={detailStyle.sectionTitle}>{item.titolo}</Text>
                          <Ionicons name={Platform.OS === "ios" ? "ios-information-circle" : "md-information-circle"} size={30} color={( (item.titolo.includes("obbl") ||  item.titolo.includes("Mand")) ? 'red' : 'green')}/>
                      </View>
                      <RenderHTML source={{html: he.decode(item.testo),}} contentWidth={200} baseStyle={HTMLStyle.text}/>
                  </View>
                </Card>
                )
              }
              />
              )}

        </View>
    );
}


export default Disciplinario;