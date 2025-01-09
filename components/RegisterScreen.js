import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToLogin = () => {
        navigation.navigate('Login'); 
    };

    const handleRegister = async () => {
        if (!username || !email || !password) {
            Alert.alert("Errore", "Per favore, riempi tutti i campi.");
            return;
        }

        try {
            const response = await fetch('http://IP/API/index.php', {
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

            const json = await response.json();
            if (json.message === "Utente creato con successo") {
                Alert.alert("Successo", "Utente registrato correttamente.");
                navigation.goBack(); 
            } else {
                Alert.alert("Errore", json.message);
            }
        } catch (error) {
            Alert.alert("Errore di rete", error.toString());
        }
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
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button
                title="Registra"
                onPress={handleRegister}
                color="#294196"
            />
             <View style={styles.spacing} />
             <Button title="Sei già registrato? Esegui il Login!" onPress={navigateToLogin} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
    spacing: {
        height: 10, 
    }
});

export default RegisterScreen;
