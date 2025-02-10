import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyle from '../assets/styles/MainStyle';
import authStyle from '../assets/styles/AuthStyle';
import translations from '../translations/translations';

const headerHeight = Dimensions.get('window').height * 7 / 100;

const itIcon = require('../assets/images/itIcon.png');
const enIcon = require('../assets/images/enIcon.png');

function LoginScreen({ navigation }) {

  // ----- Definizione stati -----
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState(global.currentLanguage || 'it');

  const ln = global.currentLanguage;
  const t = translations;

  const toggleLanguage = () => {
    const newLanguage = language === 'it' ? 'en' : 'it';
    setLanguage(newLanguage);
    global.currentLanguage = newLanguage;
  };

  const isFormValid = username !== '' && password !== '';

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert(t[ln].error, t[ln].fill_fields);
      return;
    }

    try {
      const response = await _login();
      const json = await response.json();
      if (json.authenticated && json.token) {
        await AsyncStorage.setItem('userToken', json.token);
        navigation.replace(translations[global.currentLanguage].select_region);
      } else {
        Alert.alert(t[ln].error, t[ln].invalid_credentials);
      }
    } catch (error) {
      Alert.alert(t[ln].error, error.toString());
    }
  };

  const navigateToRegister = () => {
    resetValues();
    navigation.navigate('Register');
  };

  const navigateToForgotPassword = () => {
    // navigation.navigate('ForgotPassword');
  };

  const resetValues = () => {
    setUsername('');
    setPassword('');
  };

  const _login = async () => {
    return response = await fetch('http://IP/API/index.php?action=login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
  };

  // ===== NUOVO handleLogin CHE IGNORA TUTTO E FORZA LE CREDENZIALI =====
  // const handleLogin = async () => {
  //   // Forzo username e password
  //   setUsername('username');
  //   setPassword('password');

  //   // Simulo un token come se il login fosse andato a buon fine
  //   await AsyncStorage.setItem('userToken', 'dummy_token');

  //   // Navigo direttamente alla schermata successiva
  //   navigation.replace(t[ln].select_region);
  // };

  // ===== Render =====
  return (
    <View style={mainStyle.mainContainer}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={mainStyle.imageBackground}
      />


      <View style={[mainStyle.box, { marginTop: headerHeight }]}>

        <TouchableOpacity
          onPress={toggleLanguage}
          style={{
            position: 'absolute',
            right: 0,
            padding: 10,
            zIndex: 1
          }}
        >
          <Image source={global.currentLanguage == 'it' ? enIcon : itIcon} style={{ width: 34, height: 34, marginRight: 12 }} />
        </TouchableOpacity>

        <View style={mainStyle.header}>
          <Image style={mainStyle.logoBH}
            source={require('../assets/images/logoBH.png')} />
        </View>
        <Text style={authStyle.title}>{t[ln].welcome_back}</Text>

        <View style={[mainStyle.body, { padding: 5 }]} keyboardShouldPersistTaps={'handled'}>
          <View style={authStyle.inputContainer}>
            <TextInput
              style={authStyle.input}
              placeholder={t[ln].username}
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            {username.length > 0 && (
              <TouchableOpacity
                style={authStyle.clearButton}
                onPress={() => setUsername('')}
              >
                <Ionicons name="close-circle" size={24} color="#294075" />
              </TouchableOpacity>
            )}
          </View>
          <View style={authStyle.inputContainer}>
            <TextInput
              style={authStyle.input}
              placeholder={t[ln].password}
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={authStyle.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#294075"
              />
            </TouchableOpacity>
            {password.length > 0 && (
              <TouchableOpacity
                style={[authStyle.clearButton, { right: 40 }]}
                onPress={() => setPassword('')}
              >
                <Ionicons name="close-circle" size={24} color="#294075" />
              </TouchableOpacity>
            )}
          </View>

          {/* <View style={[mainStyle.body, { padding: 10 }]} keyboardShouldPersistTaps={'handled'}> */}
          {/* Input Username (commentato o lasciato visibile, ma non incide sul login) */}
          {/* <View style={authStyle.inputContainer}>
              <TextInput
                style={authStyle.input}
                placeholder={t[ln].username}
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
              />
              {username.length > 0 && (
                <TouchableOpacity
                  style={authStyle.clearButton}
                  onPress={() => setUsername('')}
                >
                  <Ionicons name="close-circle" size={24} color="#294075" />
                </TouchableOpacity>
              )}
            </View> */}

          {/* Input Password (commentato o lasciato visibile, ma non incide sul login) */}
          {/* <View style={authStyle.inputContainer}>
              <TextInput
                style={authStyle.input}
                placeholder={t[ln].password}
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={authStyle.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#294075"
                />
              </TouchableOpacity>
              {password.length > 0 && (
                <TouchableOpacity
                  style={[authStyle.clearButton, { right: 40 }]}
                  onPress={() => setPassword('')}
                >
                  <Ionicons name="close-circle" size={24} color="#294075" />
                </TouchableOpacity>
              )}
            </View> */}

          <TouchableOpacity style={authStyle.authButton} onPress={handleLogin}>
            <Text style={authStyle.authButtonText}>{t[ln].login}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={authStyle.secondaryButton} onPress={navigateToRegister}>
            <Text style={authStyle.secondaryButtonText}>{t[ln].registration_invite}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ marginTop: 35 }} onPress={navigateToForgotPassword}>
            <Text style={{
              color: '#fff', textAlign: 'center', marginTop: 30,
              fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline'
            }}>
              {t[ln].forgot_password}
            </Text>
          </TouchableOpacity> */}

          {/* </View> */}
        </View>
      </View>
    </View>
  );
}
export default LoginScreen;
