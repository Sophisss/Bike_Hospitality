import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, View } from 'react-native';
import Svg, { Path } from "react-native-svg";

import homeStyle from '../assets/styles/HomeStyle';
import urls from './utilities/Urls.json';
import fetcher from './utilities/Fetcher';
import { regionPaths } from './utilities/Paths';


/**
 * Component for selecting regions.
 * @returns {JSX.Element}
 */
function Regions() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);

    /**
     * This method fetches the list of regions from the server.
     */
    const getRegions = async () => {
        try {
            let json = await fetcher(urls.regions.url);

            // Adding paths to regions
            const enrichedRegions = json.map(region => {
                const regionPath = regionPaths.find(path => path.region === region.nome_regione);
                return {
                    ...region,
                    path: regionPath ? regionPath.path : ''
                };
            });

            setData(enrichedRegions);
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        getRegions();
    }, []);

    const handleRegionSelection = (regionId) => {
        navigation.navigate(urls.home.routeName, { regioneId: regionId });
    };

    return (
        <View style={homeStyle.mainContainer}>
            <View style={homeStyle.header}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="stretch" style={{ height: '100%' }}>
                    <Image style={homeStyle.logoBH}
                        source={require('../assets/images/logoBH.png')} />
                    <View padding={10}>
                        <Svg
                            fill="#ffffff"
                            height={1000}
                            width={1000}
                            stroke="#000000"
                            viewBox="0 0 1000 1700"
                            alignSelf="center"
                        >
                            {data.map((region, index) => {
                                const isSelected = selectedRegion === region.id_regione;

                                return (
                                    <Path
                                        key={index}
                                        id={region.id_regione}
                                        d={region.path}
                                        name={region.nome_regione}
                                        fill={isSelected ? 'lightblue' : '#ffffff'}
                                        onPressIn={() => setSelectedRegion(region.id_regione)}
                                        onPressOut={() => setSelectedRegion(null)}
                                        onPress={() => handleRegionSelection(region.id_regione)}
                                    />
                                );
                            })}
                        </Svg>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

export default Regions;