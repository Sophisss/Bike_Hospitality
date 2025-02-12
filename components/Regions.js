import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Svg, { Path } from "react-native-svg";

import mainStyle from '../assets/styles/MainStyle';

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
     * This method fetches the list of regions from the server
     * and enriches them with the path to draw them on the map.
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
            return;
        }
    };

    useEffect(() => {
        getRegions();
    }, []);

    /**
     * This method handles the selection of a region.
     * @param {*} regionId the id of the selected region
     */
    const handleRegionSelection = (selected_region) => {
        const abilitata = data.find(region => region.id_regione === selected_region.id_regione).abilitata;
        navigation.navigate(urls.home.routeName, { region: selected_region });
    };

    return (
        <View style={mainStyle.mainContainer}>
            <ImageBackground source={require('../assets/images/background.png')} style={mainStyle.imageBackground} />

            <View style={mainStyle.box}>

                <View style={mainStyle.header}>
                    <Image style={mainStyle.logoBH}
                        source={require('../assets/images/logoBH.png')} />
                </View>

                <View>
                    <Svg
                        fill="#ffffff"
                        stroke="#000000"
                        viewBox="0 0 1000 1650"
                        alignSelf="center"
                        width={responsiveWidth(200)}
                        height={responsiveHeight(100)}
                    >
                        {data.map((region, index) => {
                            const isSelected = selectedRegion == region.id_regione;

                            return (
                                <Path
                                    key={index}
                                    id={region.id_regione}
                                    d={region.path}
                                    name={region.nome_regione}
                                    fill={isSelected ? '#4C90B1' : '#ffffff'}
                                    onPressIn={() => setSelectedRegion(region.id_regione)}
                                    onPressOut={() => setSelectedRegion(null)}
                                    onPress={() => handleRegionSelection(region)}
                                />
                            );
                        })}
                    </Svg>
                </View>
            </View>
        </View>
    );
}

export default Regions;