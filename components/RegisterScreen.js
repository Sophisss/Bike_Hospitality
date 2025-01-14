import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyle from '../assets/styles/MainStyle';
import authStyle from '../assets/styles/AuthStyle';

const headerHeight = Dimensions.get('window').height * 8 / 100;

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = username !== '' && password !== '' && email !== '';

    /**
     * Handle the registration process.
     */
    const handleRegister = async () => {
        if (!isFormValid) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        try {
            const response = await _register();
            const json = await response.json();
            if (json.message === "Utente creato con successo") {
                Alert.alert("Success", "User registered successfully.");
                navigation.goBack();
            } else {
                Alert.alert("Error", json.message);
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

            <View style={[mainStyle.box, { marginTop: headerHeight }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={authStyle.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#294075" />
                </TouchableOpacity>

                <View style={mainStyle.header}>
                    <Image style={mainStyle.logoBH}
                        source={require('../assets/images/logoBH.png')} />
                </View>
                <Text style={authStyle.title}>Registration</Text>

                <View style={[mainStyle.body, { padding: 10 }]} keyboardShouldPersistTaps={'handled'}>
                    <View style={authStyle.inputContainer}>
                        <TextInput
                            style={authStyle.input}
                            placeholder="Username"
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
                        {username.length > 0 && (
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
                            placeholder="Password"
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

                    <TouchableOpacity style={authStyle.authButton} onPress={handleRegister}>
                        <Text style={authStyle.authButtonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyle.secondaryButton} onPress={navigateToLogin}>
                        <Text style={authStyle.secondaryButtonText}>
                            Already have an account? Login here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;
