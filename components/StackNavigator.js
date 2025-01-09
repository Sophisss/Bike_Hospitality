import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import Home from './Home';
import Accomodation from './pages/Strutture';
import HStyle from '../assets/styles/HeaderStyle';
import Promozioni from './pages/Promozioni';
import Comuni from './pages/Comuni';
import Guide from './pages/Guide';
import Tour from './pages/Tour';
import StazioniRicarica from './pages/StazioniRicarica';
import Eventi from './pages/Eventi';
import urls from './utilities/Urls.json';
import DettaglioStrutture from './pages/detail/DettaglioStrutture';
import DettaglioPartner from './pages/detail/DettaglioPartner';
import DettaglioComuni from './pages/detail/DettaglioComuni';
import DettaglioGuide from './pages/detail/DettaglioGuide';
import DettaglioTour from './pages/detail/DettaglioTour';
import Collaborazioni from './pages/Collaborazioni';
import Enogastronomia from './pages/Enogastronomia';
import Noleggio from './pages/Noleggio';
import DettaglioEventi from './pages/detail/DettaglioEventi';
import Regions from '../components/Regions';
import LoginScreen from './LoginScreen';
import { LanguageContext } from './LanguageContext';
import translations from '../translations/translations';
import RegisterScreen from './RegisterScreen';


const Stack = createStackNavigator();

const itIcon = require('../assets/images/itIcon.png');
const enIcon = require('../assets/images/enIcon.png');



var icon = global.currentLanguage === 'it' ? itIcon : enIcon;

const setLanguage = (navigation) => {
  global.currentLanguage === 'it' ? global.currentLanguage = 'en' : global.currentLanguage = 'it';
  icon = global.currentLanguage === 'it' ? enIcon : itIcon;
  navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
};


const StackNavigator = () => {
  const navigation = useNavigation();
  const { setLabel1 } = useContext(LanguageContext);
  const changeLabel = () => {
    setLabel1(translations[global.currentLanguage].disciplinare);
  };

  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        cardStyle: HStyle.cardStyle,
        headerStyle: HStyle.headerStyle,
        headerTitleStyle: HStyle.headerTitleStyle,
        headerTintColor: HStyle.headerTintColor,
        headerTitleAlign: HStyle.headerTitleAlign,
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={() => { setLanguage(navigation); changeLabel() }}>
            <Image source={icon} style={{ width: 34, height: 34, marginRight: 12 }} />
          </TouchableOpacity>
        )
    }}>

      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name={urls.home.routeName} component={Home} options={{ Title: urls.home.routeName }} />
      <Stack.Screen name={translations[global.currentLanguage].select_region} component={Regions} options={{ Title: urls.home.routeName }} />
      <Stack.Screen name={urls.comuni.routeName} component={Comuni} options={{ Title: urls.comuni.routeName }} />
      <Stack.Screen name={urls.comunien.routeName} component={Comuni} options={{ Title: urls.comunien.routeName }} />
      <Stack.Screen name={"Scheda Comune"} component={DettaglioComuni} options={{ Title: "Dettaglio Comuni" }} />
      <Stack.Screen name={"City Info"} component={DettaglioComuni} options={{ Title: "City Info" }} />
      <Stack.Screen name={urls.eventi.routeName} component={Eventi} options={{ Title: "Eventi" }} />
      <Stack.Screen name={urls.eventien.routeName} component={Eventi} options={{ Title: "Events" }} />
      <Stack.Screen name={"Scheda Evento"} component={DettaglioEventi} options={{ Title: "Scheda Evento" }} />
      <Stack.Screen name={"Event Info"} component={DettaglioEventi} options={{ Title: "Event Info" }} />
      <Stack.Screen name={urls.guide.routeName} component={Guide} options={{ Title: urls.guide.routeName }} />
      <Stack.Screen name={urls.guideen.routeName} component={Guide} options={{ Title: urls.guideen.routeName }} />
      <Stack.Screen name={"Scheda Personale"} component={DettaglioGuide} options={{ Title: "Scheda Personale" }} />
      <Stack.Screen name={"Personal Info"} component={DettaglioGuide} options={{ Title: "Personal Info" }} />
      <Stack.Screen name={urls.collaborations.routeName} component={Collaborazioni} options={{ Title: urls.collaborations.routeName }} />
      <Stack.Screen name={urls.collaborationsen.routeName} component={Collaborazioni} options={{ Title: urls.collaborationsen.routeName }} />
      <Stack.Screen name={urls.enogastronomia.routeName} component={Enogastronomia} options={{ Title: urls.enogastronomia.routeName }} />
      <Stack.Screen name={urls.enogastronomiaen.routeName} component={Enogastronomia} options={{ Title: urls.enogastronomiaen.routeName }} />
      <Stack.Screen name={urls.noleggio.routeName} component={Noleggio} options={{ Title: urls.noleggio.routeName }} />
      <Stack.Screen name={urls.noleggioen.routeName} component={Noleggio} options={{ Title: urls.noleggioen.routeName }} />
      <Stack.Screen name={"Dettaglio Collaborazioni"} component={DettaglioPartner} options={{ Title: "Dettaglio Collaborazioni" }} />
      <Stack.Screen name={urls.promozioni.routeName} component={Promozioni} options={{ Title: urls.promozioni.routeName }} />
      <Stack.Screen name={urls.promozionien.routeName} component={Promozioni} options={{ Title: urls.promozionien.routeName }} />
      <Stack.Screen name={urls.stazioni_di_ricarica.routeName} component={StazioniRicarica} options={{ Title: urls.stazioni_di_ricarica.routeName }} />
      <Stack.Screen name={urls.stazioni_di_ricaricaen.routeName} component={StazioniRicarica} options={{ Title: urls.stazioni_di_ricaricaen.routeName }} />
      <Stack.Screen name={urls.strutture.routeName} component={Accomodation} options={{ Title: urls.strutture.routeName }} />
      <Stack.Screen name={urls.struttureen.routeName} component={Accomodation} options={{ Title: urls.struttureen.routeName }} />
      <Stack.Screen name={"Scheda struttura"} component={DettaglioStrutture} options={{ Title: "Scheda struttura" }} />
      <Stack.Screen name={"Facility Info"} component={DettaglioStrutture} options={{ Title: "Facility Info" }} />
      <Stack.Screen name={urls.tour.routeName} component={Tour} options={{ Title: urls.tour.routeName }} />
      <Stack.Screen name={urls.touren.routeName} component={Tour} options={{ Title: urls.touren.routeName }} />
      <Stack.Screen name={"Scheda Itinerario"} component={DettaglioTour} options={{ Title: "Scheda Itinerario" }} />
      <Stack.Screen name={"Bike Route Info"} component={DettaglioTour} options={{ Title: "Bike Route Info" }} />

    </Stack.Navigator>
  );
};


export default StackNavigator;