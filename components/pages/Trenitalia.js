import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import listStyle from "../../assets/styles/ListStyle";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import detailStyle from "../../assets/styles/DetailStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import HTMLStyle from "../../assets/styles/HTMLStyle";
import IconDecisionMaker from "../utilities/IconDecisionMaker";

function Trenitalia({ navigation, route }) {

    const [loaded, setLoadStatus] = useState(true);
    const [data, setData] = useState([]);

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
        title: "La mobilità integrata sostenibile",
        text: "Nelle Marche, entro i confini geografici della regione, il transporto della bici è gratuito sui treni Trenitalia."
    }

    const bikeTrains = {
        title: "Trasporto bici a bordo dei treni regionali",
        text: "Nelle Marche, tutti i treni regionali sono attrezzati per il trasporto delle biciclette a bordo e il trasporto della bici è gratuito.\n\n" +
            "Un’ottima occasione per muoversi e conoscere il territorio marchigiano in modo sostenibile, pratico ed economico."
    }

    const usefulInfo = {
        title: "Informazioni Utili",
        linkText: "Informazioni Utili - Marche - Trenitalia",
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
        <View style={[listStyle.mainContainer, { height: '100%' }]}>
            <Image source={require('../../assets/images/trenitalia.png')} style={logoStyles} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                    <View style={detailStyle.sectionView}>
                        <View style={detailStyle.flexDirectionRow}>
                            <Text style={detailStyle.sectionTitle}>{generalInfo.title}</Text>
                        </View>
                        <Text style={HTMLStyle.text}>{generalInfo.text}</Text>
                    </View>
                </Card>

                <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                    <View style={detailStyle.sectionView}>
                        <View style={detailStyle.flexDirectionRow}>
                            <Text style={detailStyle.sectionTitle}>{bikeTrains.title}</Text>
                        </View>
                        <Text style={HTMLStyle.text}>{bikeTrains.text}</Text>
                    </View>
                </Card>

                <Card style={[listStyle.itemCardLeftImage, { margin: 10, alignContent: 'center' }]}>
                    <View style={detailStyle.sectionView}>
                        <View style={detailStyle.flexDirectionRow}>
                            <Text style={detailStyle.sectionTitle}>{usefulInfo.title}</Text>

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

    );
}


export default Trenitalia;