import Icon from '@expo/vector-icons/Ionicons';
import { useState, useEffect} from 'react';
import { Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View,  } from 'react-native';

import homeStyle from '../assets/styles/HomeStyle';
import urls from './utilities/Urls';
import IconDecisionMaker from './utilities/IconDecisionMaker';
import fetcher from './utilities/Fetcher';


function Home({ navigation, route }) {
    
    const iconSize = 30;
    const [data, setData] = useState([]);

    const getHome = async () => {
        try {
         let json = await fetcher(urls.home.url);
         setData(json);
       } catch (error) {
         console.error(error);
       }
     }

     let alert = () => {
        if(data.testo) {    
            Alert.alert('Nuovi contenuti', data.testo, [
                {
                    text: 'Esplora',
                    onPress: () => null,
                    style: 'Ok',
                },
            ]);
        }
    }

     useEffect(() => {
       getHome();
       alert();
     }, []);

    return (
        <View style={homeStyle.mainContainer}>
            
            <View style={homeStyle.header}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="stretch" style={{height: '100%'}}>
                    <Image style={homeStyle.logoBH} source={require('../assets/images/logoBH.png')}/>
        

            <View style={homeStyle.body} keyboardShouldPersistTaps={'handled'}>    
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                     
                    <View style={homeStyle.touchableRow}>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.strutture.routeName)}}>
                            <Icon name={IconDecisionMaker("bed")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>STRUTTURE RICETTIVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.comuni.routeName)}}>
                            <Icon name={IconDecisionMaker("business")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>COMUNI</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={homeStyle.touchableRow}>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.guide.routeName)}}>
                            <Icon name={IconDecisionMaker("person")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>GUIDE CICLOTURISTICHE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.tour.routeName)}}>
                            <Icon name={IconDecisionMaker("bicycle-sharp")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>ITINERARI</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={homeStyle.touchableRow}>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.stazioni_di_ricarica.routeName)}}>
                            <Icon name={IconDecisionMaker("battery-charging")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>STAZIONI DI RICARICA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.eventi.routeName)}}>
                            <Icon name={IconDecisionMaker("calendar")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>EVENTI</Text>
                        </TouchableOpacity>    
                    </View>

                    <View style={homeStyle.touchableRow}>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.collaborations.routeName)}}>
                            <Icon name={IconDecisionMaker("people-sharp")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>COLLABORAZIONI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.enogastronomia.routeName)}}>
                            <Icon name={IconDecisionMaker("fast-food")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>ENOGASTRONOMIA</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={homeStyle.touchableRow}>
                        <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => {navigation.navigate(urls.noleggio.routeName)}}>
                            <Icon name={IconDecisionMaker("cart")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>NOLEGGIO BIKE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyle.touchableRowItem}>
                            <Icon name={IconDecisionMaker("gift")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                            <Text style={homeStyle.touchableItemText}>PROMOZIONI</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
            </ImageBackground>
            </View>
        </View>
    )
}

export default Home;