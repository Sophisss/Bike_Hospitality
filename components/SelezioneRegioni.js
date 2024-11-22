import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import homeStyle from '../assets/styles/HomeStyle';
import urls from './utilities/Urls';
import fetcher from './utilities/Fetcher';

import { useNavigation } from '@react-navigation/native';

/**
 * Component for selecting regions.
 * @returns {JSX.Element}
 */
function SelezioneRegioni() {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("0");

    /**
     * Fetches the list of regions from the server.
     * @async
     */
    const getRegioni = async () => {
        try {
            let json = await fetcher(urls.regioni.url);
            //console.log("Dati ricevuti:", json);
            setData(json);
        } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
        }
    };

    useEffect(() => {
        getRegioni();
    }, []);

    /**
     * Handles the selection of a region.
     * @param {string} id_regione - The ID of the selected region.
     */
    const handleRegionChange = (id_regione) => {
        setSelectedValue(id_regione);
        navigation.navigate(urls.home.routeName, { regioneId: id_regione });
    };

    return (
        <View style={homeStyle.mainContainer}>
            <View style={homeStyle.header}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="stretch" style={{ height: '100%' }}>
                    <Image style={homeStyle.logoBH} source={require('../assets/images/logoBH.png')} />
                    <View style={homeStyle.body}>
                        {data && data.length > 0 ? (
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => handleRegionChange(itemValue)}
                                style={{ color: 'black', height: 50, width: '100%' }}
                            >
                                <Picker.Item label="Seleziona una regione" value="0" style={{ fontSize: 16, color: 'gray' }} />
                                {data.map((regione) => (
                                    <Picker.Item
                                        key={regione.id_regione}
                                        label={regione.nome_regione}
                                        value={regione.id_regione}
                                        style={{ fontSize: 16, color: 'black' }}
                                    />
                                ))}
                            </Picker>
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>Caricamento...</Text>
                        )}
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

export default SelezioneRegioni;