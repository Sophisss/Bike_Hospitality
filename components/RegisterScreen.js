import React, { useState } from 'react';
import { View, TextInput, Alert, ImageBackground, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyle from '../assets/styles/MainStyle';
import authStyle from '../assets/styles/AuthStyle';
import translations from '../translations/translations';

const headerHeight = Dimensions.get('window').height * 7 / 100;

const itIcon = require('../assets/images/itIcon.png');
const enIcon = require('../assets/images/enIcon.png');

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [language, setLanguage] = useState(global.currentLanguage || 'it');

    var ln = global.currentLanguage;
    var t = translations;
    const isFormValid = username !== '' && password !== '' && email !== '';

    const toggleLanguage = () => {
        const newLanguage = language === 'it' ? 'en' : 'it';
        setLanguage(newLanguage);
        global.currentLanguage = newLanguage;
    };

    /**
     * Handle the registration process.
     */
    const handleRegister = async () => {
        if (!isFormValid) {
            Alert.alert(t[ln].error, t[ln].fill_fields);
            return;
        }

        if (password.length < 8) {
            Alert.alert(t[ln].error, t[ln].password_too_short);
            return;
        }

        if (password !== repeatPassword) {
            Alert.alert(t[ln].error, t[ln].passwords_not_matching);
            return;
        }

        try {
            const response = await _register();
            const json = await response.json();
            if (json.message === "Utente creato con successo") {
                Alert.alert("Success", t[ln].registration_success);
                navigation.goBack();
            } else {
                Alert.alert(t[ln].error, json.message);
            }
        } catch (error) {
            Alert.alert("Network Error", error.toString());
        }
    };

    /**
     * Navigate to the login screen 
     * if the user has an account.
     */
    const navigateToLogin = () => {
        resetValues();
        navigation.navigate('Login');
    };

    const resetValues = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const _register = async () => {
        return response = await fetch('http://IP/API/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'register',
                username: username,
                email: email,
                password: password
            })
        });
    };

    return (
        <View style={mainStyle.mainContainer}>
            <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: 'absolute',
                    left: 10,
                    top: headerHeight,
                    zIndex: 2,
                    padding: 6
                }}
            >
                <Ionicons name="arrow-back" size={32} color="#294075" />
            </TouchableOpacity>


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
                <Text style={authStyle.title}>{t[ln].welcome}</Text>

                <Text style={{ color: '#4d4d4d', marginTop: -15, marginLeft: 10, fontSize: 17, textAlign: 'left' }}>
                    {t[ln].create_account_invite}
                </Text>

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
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        {email.length > 0 && (
                            <TouchableOpacity
                                style={authStyle.clearButton}
                                onPress={() => setEmail('')}
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

                    <View style={authStyle.inputContainer}>
                        <TextInput
                            style={authStyle.input}
                            placeholder={t[ln].repeatPassword}
                            placeholderTextColor="#aaa"
                            value={repeatPassword}
                            onChangeText={setRepeatPassword}
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
                        {repeatPassword.length > 0 && (
                            <TouchableOpacity
                                style={[authStyle.clearButton, { right: 40 }]}
                                onPress={() => setRepeatPassword('')}
                            >
                                <Ionicons name="close-circle" size={24} color="#294075" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={authStyle.authButton} onPress={handleRegister}>
                        <Text style={authStyle.authButtonText}>{t[ln].registration}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyle.secondaryButton} onPress={navigateToLogin}>
                        <Text style={authStyle.secondaryButtonText}>
                            {t[ln].login_invite}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;
