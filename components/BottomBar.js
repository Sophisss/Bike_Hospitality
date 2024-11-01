import React from 'react';
import StackNavigator from './StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import urls from './utilities/Urls';
import Collegamenti from './Collegamenti';
import Disciplinario from './Disciplinario';
import HStyle from '../assets/styles/HeaderStyle';

function BottomBar() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: '#294196', // Active Tab's Text Color
            tabBarInactiveTintColor: 'white', // Inactive Tab's Text Color
            tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold', marginBottom: 2}, // TabBar's Text Style
            tabBarStyle: {backgroundColor: '#CD853F'}, // TabBar's Background Color
            cardStyle: HStyle.cardStyle,
            headerStyle: HStyle.headerStyle,
            headerTitleStyle: HStyle.headerTitleStyle,
            headerTintColor: HStyle.headerTintColor,
            headerTitleAlign: HStyle.headerTitleAlign,
            headerShown: true,
            headerRight: () => {
            /*  return(
                <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                  <Card style={HStyle.headerIconStyle} onPress={() => {console.log('Cambia lingua')}}>
                    <Icon name={IconDecisionMaker('language')} size={HStyle.headerIconSize} color={HStyle.headerIconColor}/>
                  </Card>
                </View>      
              ); */
            },
            }} >
        
            <Tab.Screen name="Home" component={StackNavigator} options={{headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />

            <Tab.Screen name={urls.disciplinario.routeName} component={Disciplinario} options={{tabBarLabel: urls.disciplinario.routeName, tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="file" color={color} size={size} />
                ),
            }} />

            <Tab.Screen name="Collegamenti" component={Collegamenti} options={{tabBarLabel: 'Collegamenti', tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="link" color={color} size={size} />
                ),
            }} />

        </Tab.Navigator>
    );
}



export default BottomBar;