import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, View } from 'react-native';

import homeStyle from '../../assets/styles/HomeStyle';
import urls from '../utilities/Urls.json';
import fetcher from '../utilities/Fetcher';
import SVGComponent from './svgComponent';

/**
 * Component for selecting regions.
 * @returns {JSX.Element}
 */
function Regions() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("0");

    /**
     * This method fetches the list of regions from the server.
     */
    const getRegions = async () => {
        try {
            let json = await fetcher(urls.regions.url);
            console.log("Data fetched:", json);
            setData(json);
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        getRegions();
    }, []);

    const handleRegionSelection = (regionId) => {
        console.log("Selected region:", regionId);
        setSelectedValue(regionId);
        navigation.navigate(urls.home.routeName, { regionId: regionId });
    };

    return (
        <View style={homeStyle.mainContainer}>
            <View style={homeStyle.header}>
                <ImageBackground source={require('../../assets/images/background.png')} resizeMode="stretch" style={{ height: '100%' }}>
                    <Image style={[homeStyle.logoBH, { height: '20%' }]}
                        source={require('../../assets/images/logoBH.png')} />
                    <View>
                        <SVGComponent regions={data} onRegionPress={handleRegionSelection} />
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

export default Regions;