import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import listStyle from "../../assets/styles/ListStyle";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import detailStyle from "../../assets/styles/DetailStyle";
import mainStyle from '../../assets/styles/MainStyle';
import Ionicons from "@expo/vector-icons/Ionicons";
import HTMLStyle from "../../assets/styles/HTMLStyle";
import IconDecisionMaker from "../utilities/IconDecisionMaker";
import BackgroundWrapper from "../utilities/BackgroundWrapper";
import translations from '../../translations/translations';

function Trenitalia({ navigation, route }) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

    var ln = global.currentLanguage;
    var t = translations;

    const logoStyles = {
        alignSelf: 'center',
        resizeMode: "contain",
        width: Dimensions.get('window').width / 2.2,
        height: undefined,
        aspectRatio: 1.5,
    }

    const getCollab = async () => {
        try {

        } catch (error) {

        } finally {
            setLoadStatus(false);
        }
    }

    useEffect(() => {
        getCollab();
    }, []);

    const generalInfo = {
        title: t[ln].trenitalia_general_info_title,
        text: t[ln].trenitalia_general_info_text
    }

    const bikeTrains = {
        title: t[ln].trenitalia_bike_trains_title,
        text: t[ln].trenitalia_bike_trains_text
    }

    const usefulInfo = {
        title: t[ln].trenitalia_useful_info_title,
        linkText: t[ln].trenitalia_useful_info_link_text,
        link: "https://www.trenitalia.com/it/treni_regionali/marche/trenobici-nelle-marche.html"
    }

    const handleOpenTrenitaliaWebpage = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Cannot open url");
            }
        });
    };


    return (
        <BackgroundWrapper styles={mainStyle}>

            <View style={mainStyle.box}>
                <Image source={require('../../assets/images/trenitalia.png')} style={logoStyles} />

                <ScrollView showsVerticalScrollIndicator={false} style={mainStyle.body}>
                    <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                        <View style={[detailStyle.sectionView, { gap: 5 }]}>
                            <View style={detailStyle.flexDirectionRow}>
                                <Text style={[detailStyle.sectionTitle, { textAlign: 'left' }]}>{generalInfo.title}</Text>
                            </View>
                            <Text style={HTMLStyle.text}>{generalInfo.text}</Text>
                        </View>
                    </Card>

                    <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                        <View style={[detailStyle.sectionView, { gap: 5 }]}>
                            <View style={detailStyle.flexDirectionRow}>
                                <Text style={[detailStyle.sectionTitle, { textAlign: 'left' }]}>{bikeTrains.title}</Text>
                            </View>
                            <Text style={HTMLStyle.text}>{bikeTrains.text}</Text>
                        </View>
                    </Card>

                    <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                        <View style={[detailStyle.sectionView, { gap: 5 }]}>
                            <View style={detailStyle.flexDirectionRow}>
                                <Text style={[detailStyle.sectionTitle, { textAlign: 'left' }]}>{usefulInfo.title}</Text>

                            </View>
                            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex, { gap: 5 }]} onPress={() => handleOpenTrenitaliaWebpage(usefulInfo.link)}>
                                <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { fontSize: 15 }]}>
                                    {usefulInfo.linkText}
                                </Text>
                                <Ionicons name={IconDecisionMaker("link-outline")} size={20} color={'white'} />
                            </TouchableOpacity>

                        </View>
                    </Card>
                </ScrollView>
            </View>

        </BackgroundWrapper>

    );
}


export default Trenitalia;