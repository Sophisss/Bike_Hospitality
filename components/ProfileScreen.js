import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyle from '../assets/styles/MainStyle';
import profileStyle from '../assets/styles/ProfileStyle';
import translations from '../translations/translations';

function ProfileScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const ln = global.currentLanguage;
    const t = translations;

    useEffect(() => {
        const loadProfileData = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                try {
                    const response = await fetch('http://IP/API/index.php?action=getUserDetail', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    const json = await response.json();
                    if (response.ok) {
                        setUsername(json.username);
                        setEmail(json.email);
                    } else {
                        Alert.alert(t[ln].error, json.message || 'Failed to fetch user details');
                    }
                } catch (error) {
                    Alert.alert(t[ln].error, 'Network error: Unable to connect to the server');
                }
            }
        };

        loadProfileData();
    }, []);

    const updateProfile = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert(t[ln].error, t[ln].passwords_do_not_match);
            return;
        }

        // Logic to update profile should be here
        Alert.alert(t[ln].success, t[ln].profile_updated);
    };

    return (
        <View style={mainStyle.mainContainer}>
            <View style={mainStyle.box}>
                <Text style={profileStyle.title}>{t[ln].manage_profile}</Text>
                <TextInput
                    style={profileStyle.input}
                    placeholder={t[ln].username}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={profileStyle.input}
                    placeholder={t[ln].email}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={profileStyle.input}
                    placeholder={t[ln].current_password}
                    secureTextEntry={true}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <TextInput
                    style={profileStyle.input}
                    placeholder={t[ln].new_password}
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={profileStyle.input}
                    placeholder={t[ln].confirm_password}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={profileStyle.updateButton} onPress={updateProfile}>
                    <Text style={profileStyle.buttonText}>{t[ln].update_profile}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProfileScreen;
