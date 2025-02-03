import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

// Definisci qui i tuoi stili
const mainStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    // Eventuali ombre o margin aggiuntivi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

const profileStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  updateButton: {
    backgroundColor: '#294075',
    padding: 14,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileScreen;
