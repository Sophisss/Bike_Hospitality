import Icon from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, } from 'react-native';

import homeStyle from '../assets/styles/HomeStyle';
import urls from './utilities/Urls';
import IconDecisionMaker from './utilities/IconDecisionMaker';
import fetcher from './utilities/Fetcher';

import translations from '../translations/translations';

const appVersion = 3.0;
global.msgShown = '0';

function Home({ navigation, route }) {

    var language = global.currentLanguage;
    var t = translations;

    const urlHome = language === 'it' ? urls.strutture.routeName : urls.struttureen.routeName;
    const urlComuni = language === 'it' ? urls.comuni.routeName : urls.comunien.routeName;
    const urlGuide = language === 'it' ? urls.guide.routeName : urls.guideen.routeName;
    const urlTour = language === 'it' ? urls.tour.routeName : urls.touren.routeName;
    const urlStations = language === 'it' ? urls.stazioni_di_ricarica.routeName : urls.stazioni_di_ricaricaen.routeName;
    const urlEventi = language === 'it' ? urls.eventi.routeName : urls.eventien.routeName;
    const urlPartners = language === 'it' ? urls.collaborations.routeName : urls.collaborationsen.routeName;
    const urlFoodW = language === 'it' ? urls.enogastronomia.routeName : urls.enogastronomiaen.routeName;
    const urlNoleggio = language === 'it' ? urls.noleggio.routeName : urls.noleggioen.routeName;
    const urlPromo = language === 'it' ? urls.promozioni.routeName : urls.promozionien.routeName;


    const iconSize = 30;
    const [data, setData] = useState([]);

    const { regioneId } = route.params;


    const getHome = async () => {
        console.log("getHome...");
        try {
            let json = await fetcher(urls.home.url.concat(global.currentLanguage, "&appVersion=", appVersion));
            console.log(json);
            setData(json);

        } catch (error) {
            console.error('>' + error);
        }
    }

    useEffect(() => {
        // Questo codice verrà eseguito ogni volta che lo stato 'data' cambia
        alert(data);
    }, [data]); // La dipendenza [data] fa sì che useEffect si attivi quando 'data' cambia

    let alert = (data) => {
        //console.log(':'+data.testo+' '+global.msgShown);
        if (data.upd == "1" && global.msgShown === '0') {
            global.msgShown = '1';  //
            Alert.alert("Nuova versione disponibile/Update available", data.testo, [
                {
                    text: 'Ok',
                    onPress: () => null,
                    style: 'Ok',
                },
            ]);

        }
    }

    useEffect(() => {
        getHome();
        //alert();
    }, []);
    ////contentContainerStyle={homeStyle.scrollview} scrollIndicatorInsets={{right:13}} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false}>
    return (


        <View style={homeStyle.mainContainer}>

            <View style={homeStyle.header}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="stretch" style={{ height: '100%' }}>
                    <Image style={homeStyle.logoBH} source={require('../assets/images/logoBH.png')} />


                    <View style={homeStyle.body} keyboardShouldPersistTaps={'handled'}>
                        <ScrollView>

                            <View style={homeStyle.touchableRow}>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlHome, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("bed")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].strutture.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlComuni, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("business")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].comuni.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={homeStyle.touchableRow}>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlGuide, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("person")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].guide.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlTour, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("bicycle-sharp")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].itinerari.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={homeStyle.touchableRow}>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlStations, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("battery-charging")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].stazioni.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlEventi, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("calendar")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].eventi.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={homeStyle.touchableRow}>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlPartners, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("people-sharp")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].collaborazioni.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlFoodW, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("fast-food")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].enogastronomia.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={homeStyle.touchableRow}>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlNoleggio, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("cart")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].noleggio.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyle.touchableRowItem} onPress={() => { navigation.navigate(urlPromo, { regioneId: regioneId }) }}>
                                    <Icon name={IconDecisionMaker("star")} size={iconSize} color="white" style={homeStyle.touchableItemIcon} />
                                    <Text style={homeStyle.touchableItemText}>{t[language].attrazioni.toUpperCase()}</Text>
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