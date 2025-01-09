import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../translations/translations';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://IP/API/index.php?action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
    
            const json = await response.json();
            if (json.authenticated && json.token) {
                await AsyncStorage.setItem('userToken', json.token);
                navigation.replace(translations[global.currentLanguage].select_region);
            } else {
                Alert.alert('Errore', 'Username o password non validi');
            }
        } catch (error) {
            Alert.alert('Errore', error.toString());
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register'); 
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} color="#294196" />
            <View style={styles.spacing} />
            <Button title="Non sei registrato? Registrati ora" onPress={navigateToRegister} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%', // Assicurati che l'input sia allargato al 100%
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
    spacing: {
        height: 10, 
    }
});

export default LoginScreen;
