import { NavigationContainer } from '@react-navigation/native';

//import { useState, useEffect, createContext } from 'react';
//import translations from './translations/translations';
import BottomBar from './components/BottomBar';

import { LanguageProvider } from './components/LanguageContext';
//export const BottomBarContext = createContext();

export default function App() {

  global.currentLanguage = 'it';
  //global.tabLabel = '---';


  return (
    
     /*<NavigationContainer>
<BottomBarContext.Provider value={{ bottomBarVisible, setBottomBarVisible }}>
     {bottomBarVisible && <BottomBar />}
 </BottomBarContext.Provider>    
 
     </NavigationContainer>   */ 
     <LanguageProvider>
  <NavigationContainer>
      <BottomBar />  
   </NavigationContainer>   
   </LanguageProvider>
  );

}