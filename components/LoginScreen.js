import React, { useState } from 'react';
import { View, TextInput, Alert, ImageBackground, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyle from '../assets/styles/MainStyle';
import authStyle from '../assets/styles/AuthStyle';
import translations from '../translations/translations';
import { set } from 'ramda';

const headerHeight = Dimensions.get('window').height * 8 / 100;

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    var ln = global.currentLanguage;
    var t = translations;

    const isFormValid = username !== '' && password !== '';

    /**
     * Handle the login process.
     */
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

    /**
     * Navigate to the register screen 
     * if the user doesn't have an account.
     */
    const navigateToRegister = () => {
        resetValues();
        navigation.navigate('Register');
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

    return (
        <View style={mainStyle.mainContainer}>
            <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

            <View style={[mainStyle.box, { marginTop: headerHeight }]}>
                <View style={mainStyle.header}>
                    <Image style={mainStyle.logoBH}
                        source={require('../assets/images/logoBH.png')} />
                </View>
                <Text style={authStyle.title}>{t[ln].welcome_back}</Text>

                <View style={[mainStyle.body, { padding: 10 }]} keyboardShouldPersistTaps={'handled'}>
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

                    <TouchableOpacity style={authStyle.authButton}
                        onPress={handleLogin}>
                        <Text style={authStyle.authButtonText}>{t[ln].login}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyle.secondaryButton} onPress={navigateToRegister}>
                        <Text style={authStyle.secondaryButtonText}>
                            {t[ln].registration_invite}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;
