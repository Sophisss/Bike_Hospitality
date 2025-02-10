import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './components/BottomBar'
import StackNavigator from './components/StackNavigator';
import { LanguageProvider } from './components/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  global.currentLanguage = 'it';

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setIsUserLoggedIn(userToken !== null);
  };

  useEffect(() => {
    AsyncStorage.clear();
    checkLoginStatus();
}, []);

  return (
    <LanguageProvider>
      <NavigationContainer>
        {isUserLoggedIn ? <BottomBar /> : <StackNavigator />}
      </NavigationContainer>
    </LanguageProvider>
  );

}