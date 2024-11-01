import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Accomodation from './pages/Strutture';
import Home from './Home';
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


const Stack = createStackNavigator();


const StackNavigator = () => {
  
  return (
    <Stack.Navigator initialRouteName="BIKE Hospitality" screenOptions={{
      cardStyle: HStyle.cardStyle,
      headerStyle: HStyle.headerStyle,
      headerTitleStyle: HStyle.headerTitleStyle,
      headerTintColor: HStyle.headerTintColor,
      headerTitleAlign: HStyle.headerTitleAlign,
      headerShown: true,
      headerRight: () => {
       /* return(
          <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
            <Card style={HStyle.headerIconStyle} onPress={() => {console.log('Cambia lingua')}}>
              <Icon name={IconDecisionMaker('language')} size={HStyle.headerIconSize} color={HStyle.headerIconColor}/>
            </Card>
          </View>      
        );*/
      },
      
    }}>

        <Stack.Screen name={urls.home.routeName} component={Home} options={{Title: urls.home.routeName}}/>
        <Stack.Screen name={urls.comuni.routeName} component={Comuni} options={{Title: urls.comuni.routeName}}/>
        <Stack.Screen name={"Dettaglio Comuni"} component={DettaglioComuni} options={{Title: "Dettaglio Comuni"}}/>
        <Stack.Screen name={urls.eventi.routeName} component={Eventi} options={{Title: urls.eventi.routeName}}/>
        <Stack.Screen name={"Dettaglio Eventi"} component={DettaglioEventi} options={{Title: "Dettaglio Eventi"}}/>
        <Stack.Screen name={urls.guide.routeName} component={Guide} options={{Title: urls.guide.routeName}}/>
        <Stack.Screen name={"Dettaglio Guide"} component={DettaglioGuide} options={{Title: "Dettaglio Guide"}}/>
        <Stack.Screen name={urls.collaborations.routeName} component={Collaborazioni} options={{Title: urls.collaborations.routeName}}/>
        <Stack.Screen name={urls.enogastronomia.routeName} component={Enogastronomia} options={{Title: urls.enogastronomia.routeName}}/>
        <Stack.Screen name={urls.noleggio.routeName} component={Noleggio} options={{Title: urls.noleggio.routeName}}/>
        <Stack.Screen name={"Dettaglio Collaborazioni"} component={DettaglioPartner} options={{Title: "Dettaglio Collaborazioni"}}/>
        <Stack.Screen name={urls.promozioni.routeName} component={Promozioni} options={{Title: urls.promozioni.routeName}}/>
        <Stack.Screen name={urls.stazioni_di_ricarica.routeName} component={StazioniRicarica} options={{Title: urls.stazioni_di_ricarica.routeName}}/>
        <Stack.Screen name={urls.strutture.routeName} component={Accomodation} options={{Title: urls.strutture.routeName}}/>
        <Stack.Screen name={"Dettaglio Strutture"} component={DettaglioStrutture} options={{Title: "Dettaglio Strutture"}}/>
        <Stack.Screen name={urls.tour.routeName} component={Tour} options={{Title: urls.tour.routeName}}/>
        <Stack.Screen name={"Dettaglio Itinerario"} component={DettaglioTour} options={{Title: "Dettaglio Itinerario"}}/>
    </Stack.Navigator>
  );
};


export default StackNavigator;