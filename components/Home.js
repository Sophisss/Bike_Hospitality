import Icon from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View, Linking } from 'react-native';
import LottieView from 'lottie-react-native';

import homeStyle from '../assets/styles/HomeStyle';
import translations from '../translations/translations';

import urls from './utilities/Urls';
import IconDecisionMaker from './utilities/IconDecisionMaker';
import fetcher from './utilities/Fetcher';

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

    const { regioneId, abilitata } = route.params;
    console.log("Home regioneId: " + regioneId + " abilitata: " + abilitata);


    /**
     * This method fetches the home data from
     * the server and checks if there is a new version available.
     */
    const getHome = async () => {
        try {
            let json = await fetcher(urls.home.url.concat(global.currentLanguage, "&appVersion=", appVersion));
            setData(json);
        } catch (error) {
            console.error('>' + error);
        }
    }

    useEffect(() => {
        // This code will run every time the 'data' state changes
        alert(data);
    }, [data]); // The dependency [data] makes useEffect run when 'data' changes

    /**
     * This method shows an alert if there is a new version available.
     * @param {*} data the data from the server containing the new version.
     */
    let alert = (data) => {
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
    }, []);

    return (

        <View style={homeStyle.mainContainer}>
            <ImageBackground source={require('../assets/images/background.png')} style={homeStyle.imageBackground} />

            <View style={homeStyle.box}>

                <View style={homeStyle.header}>
                    <Image style={homeStyle.logoBH}
                        source={require('../assets/images/logoBH.png')} />
                </View>

                <View style={homeStyle.body} keyboardShouldPersistTaps={'handled'}>
                    {
                        abilitata == 0 ? (
                            <View>
                                {/* <LottieView source={require('../assets/animations/cycling.json')} autoPlay loop style={homeStyle.animation} /> */}
                                <Text style={homeStyle.disabled_region}>{t[language].disabled_region}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.bikehospitality.it/')}>
                                    <Text style={homeStyle.linkText}>
                                        {t[language].disabled_region_link}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
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
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default Home;