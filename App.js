import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './components/BottomBar'
import { LanguageProvider } from './components/LanguageContext';

export default function App() {

  global.currentLanguage = 'it';

  return (
    <LanguageProvider>
      <NavigationContainer>
        <BottomBar />
      </NavigationContainer>
    </LanguageProvider>
  );

}