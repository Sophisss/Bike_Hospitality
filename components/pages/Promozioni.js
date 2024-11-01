import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

import fetcher from "../utilities/Fetcher";
import urls from "../utilities/Urls";
import listStyle from "../../assets/styles/ListStyle";
import { ActivityIndicator } from "react-native";


function Promozioni({navigation, route}) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    const getPromozioni = async () => {
        try {
         let json = await fetcher(urls.promozioni.url);
         setData(await groupByCategory(json));
       } catch (error) {
         console.error(error);
       } finally {
         setLoadStatus(false);
       }
     }

     useEffect(() => {
       getPromozioni();
     }, []);


     return(

        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={listStyle.mainContainer}>
        
            { loaded ? <ActivityIndicator size="large" color="black" style={{justifyContent: 'center'}}/>  : (
            null
            )}
     
        </ScrollView>
     
        );
    
}

async function groupByCategory(data) {

    let result = data.reduce(function (r, a) {
      r[a.categoria] = r[a.categoria] || [];
      r[a.categoria].push(a);
      return r;
    }, Object.create(null));
  
    return result;
  }




export default Promozioni;