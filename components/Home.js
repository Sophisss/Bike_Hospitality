import Icon from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useRef } from 'react';
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View, Linking, AppState } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import mainStyle from '../assets/styles/MainStyle';
import listStyle from "../assets/styles/ListStyle";
import detailStyle from "../assets/styles/DetailStyle";
import translations from '../translations/translations';

import urls from './utilities/Urls.json';
import IconDecisionMaker from './utilities/IconDecisionMaker';
import fetcher from './utilities/Fetcher';

const appVersion = 3.0;
global.msgShown = '0';

function Home({ navigation, route }) {
    const animationRef = useRef(null);

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

    /**
     * This method plays the animation when the app is in the foreground.
     */
    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState === "active") {
                if (animationRef.current) {
                    animationRef.current.play();
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (

        <View style={mainStyle.mainContainer}>
            <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

            <View style={mainStyle.box}>

                {
                    abilitata == 1 ? (
                        <View style={mainStyle.header}>
                            <Image style={mainStyle.logoBH}
                                source={require('../assets/images/logoBH.png')} />
                        </View>
                    ) : null
                }

                <View style={[mainStyle.body, {
                    justifyContent: abilitata == 1 ? 'flex-start' : 'center'
                }]} keyboardShouldPersistTaps={'handled'}>
                    {
                        abilitata == 0 ? (
                            <View style={{ padding: 10, gap: 10, flex: 1 }}>
                                <LottieView source={require('../assets/animations/cycling.json')} ref={animationRef} autoPlay loop style={mainStyle.animation} />
                                <Text style={mainStyle.disabled_region}>{t[language].disabled_region}</Text>

                                <TouchableOpacity>
                                    <Text style={mainStyle.linkText}>
                                        {t[language].disabled_region_link}
                                    </Text>
                                </TouchableOpacity>

                                <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                                    <View style={detailStyle.sectionView}>
                                        <View style={detailStyle.flexDirectionRow}>
                                            <Text style={[detailStyle.sectionTitle, { flex: 1 }]}>BIKEHOSPITALITY</Text>
                                            <View>
                                                <TouchableOpacity width={'auto'} onPress={() => {
                                                    Linking.openURL('https://www.bikehospitality.it/aderisci/')
                                                }}
                                                >
                                                    <Ionicons name={IconDecisionMaker('link')} size={30} color='#294196' />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <Image style={{ aspectRatio: 2, resizeMode: 'contain' }} source={{ uri: urls.bikeHospitalitySiteImage.url }} />
                                    </View>
                                </Card>
                            </View>
                        ) : (
                            <View>
                                <View style={mainStyle.touchableRow}>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlHome, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("bed")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].strutture.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlComuni, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("business")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].comuni.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={mainStyle.touchableRow}>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlGuide, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("person")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].guide.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlTour, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("bicycle-sharp")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].itinerari.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={mainStyle.touchableRow}>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlStations, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("battery-charging")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].stazioni.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlEventi, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("calendar")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].eventi.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={mainStyle.touchableRow}>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlPartners, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("people-sharp")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].collaborazioni.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlFoodW, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("fast-food")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].enogastronomia.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={mainStyle.touchableRow}>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlNoleggio, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("cart")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].noleggio.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={mainStyle.touchableRowItem} onPress={() => { navigation.navigate(urlPromo, { regioneId: regioneId }) }}>
                                        <Icon name={IconDecisionMaker("star")} size={iconSize} color="white" style={mainStyle.touchableItemIcon} />
                                        <Text style={mainStyle.touchableItemText}>{t[language].attrazioni.toUpperCase()}</Text>
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