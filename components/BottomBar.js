import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StackNavigator from './StackNavigator';
import urls from './utilities/Urls';
import Collegamenti from './Collegamenti';
import Disciplinario from './Disciplinario';
import HStyle from '../assets/styles/HeaderStyle';
import ProfileScreen from './ProfileScreen';

import { LanguageContext } from './LanguageContext';
import translations from '../translations/translations';

function BottomBar() {
    const Tab = createBottomTabNavigator();
    const { label1 } = useContext(LanguageContext);
    var language = global.currentLanguage;
    var t = translations;

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsUserLoggedIn(userToken !== null);
    };

    useEffect(() => {
        checkLoginStatus();
    }, [])

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: '#294196',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
            tabBarStyle: { backgroundColor: '#CD853F' },
            cardStyle: HStyle.cardStyle,
            headerStyle: HStyle.headerStyle,
            headerTitleStyle: HStyle.headerTitleStyle,
            headerTintColor: HStyle.headerTintColor,
            headerTitleAlign: HStyle.headerTitleAlign,
            headerShown: true
        }}>
            <Tab.Screen name="Home" component={StackNavigator} options={{
                headerShown: false, tabBarLabel: t[language].home, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />

            <Tab.Screen name={t[language].disciplinare} component={Disciplinario} options={{
                headerShown: isUserLoggedIn, tabBarLabel: t[language].disciplinare, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="file" color={color} size={size} />
                )
            }} />

            <Tab.Screen name={t[language].collegamenti} component={Collegamenti} options={{
                headerShown: isUserLoggedIn, tabBarLabel: t[language].collegamenti, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="link" color={color} size={size} />
                )
            }} />
            <Tab.Screen name={"Profilo"} component={ProfileScreen} options={{
                headerShown: isUserLoggedIn, tabBarLabel: t[language].logout, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="logout" color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    );
}

export default BottomBar;
