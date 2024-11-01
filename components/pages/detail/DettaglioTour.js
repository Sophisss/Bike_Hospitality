import React, {useEffect, useState} from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

import detailStyle from '../../../assets/styles/DetailStyle';
import IconDecisionMaker from '../../utilities/IconDecisionMaker';
import { Dimensions } from 'react-native';
import { Linking } from 'react-native';
import { _listEmptyComponent } from '../../utilities/Utils';
import { RenderHTML } from 'react-native-render-html';
import he from 'he';
import HTMLStyle from '../../../assets/styles/HTMLStyle';
import notification from '../../utilities/Alert';
import {PROVIDER_GOOGLE} from "react-native-maps/lib/ProviderConstants";
import MapView, {Marker, Polyline} from "react-native-maps";
import {parseString} from "react-native-xml2js";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

function DettaglioTour({ navigation, route }) {
  const { nome, categoria, provincia, codice_provincia, comune, localita, gpx, map, linkgpx, telefono, email, descrizione, immagini } = route.params;

    const [routePoints, setRoutePoints] = useState([]);
    const [wayPoints, setWayPoints] = useState([]);

    //Require the property gpx will be updated to the gpx content like below
    const dummyGPX = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<gpx version=\"1.1\" creator=\"YourAppName\">\n" +
        "  <metadata>\n" +
        "    <name>Specific Route GPX</name>\n" +
        "  </metadata>\n" +
        "  \n" +
        "  <!-- Waypoints for the Route -->\n" +
        "  <wpt lat=\"43.140113\" lon=\"13.068820\">\n" +
        "    <ele>0</ele>\n" +
        "    <name>Camerino University</name>\n" +
        "    <desc>A description of waypoint 1</desc>\n" +
        "  </wpt>\n" +
        "  <wpt lat=\"43.140105\" lon=\"13.069019\">\n" +
        "    <ele>0</ele>\n" +
        "    <name>Charging Station 1</name>\n" +
        "    <desc>A description of charging station 1</desc>\n" +
        "  </wpt>\n" +
        "  <wpt lat=\"43.140285\" lon=\"13.069513\">\n" +
        "    <ele>0</ele>\n" +
        "    <name>Trenitalia Station 1</name>\n" +
        "    <desc>A description of Trenitalia station 1</desc>\n" +
        "  </wpt>\n" +
        "  <wpt lat=\"43.141608\" lon=\"13.068353\">\n" +
        "    <ele>0</ele>\n" +
        "    <name>Waypoint 2</name>\n" +
        "    <desc>A description of waypoint 2</desc>\n" +
        "  </wpt>\n" +
        "\n" +
        "  <!-- Route with Directions -->\n" +
        "  <rte>\n" +
        "    <name>Directions Route</name>\n" +
        "    <rtept lat=\"43.140113\" lon=\"13.068820\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 1</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.140105\" lon=\"13.069019\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Charging Station 1</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.140285\" lon=\"13.069513\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Trenitalia Station 1</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.141608\" lon=\"13.068353\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "\n" +
        "    <rtept lat=\"43.142473\" lon=\"13.067774\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.142966\" lon=\"13.067994\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.143123\" lon=\"13.068665\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.143221\" lon=\"13.069551\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.143103\" lon=\"13.070517\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "    <rtept lat=\"43.143362\" lon=\"13.072337\">\n" +
        "      <ele>0</ele>\n" +
        "      <name>Waypoint 2</name>\n" +
        "    </rtept>\n" +
        "  </rte>\n" +
        "</gpx>";

  useEffect(() => {
   //W navigation.setOptions({title: nome});
      const fetchGPXTrack = async () => {
          try {
              parseString(dummyGPX, (err, result) => {
                  if (err) {
                      console.error('Error parsing GPX file:', err);
                  } else {
                      const extractedWaypoints = result.gpx.wpt.map(point => ({
                          latitude: parseFloat(point.$.lat),
                          longitude: parseFloat(point.$.lon),
                          name: point.name[0],
                          desc: point.desc[0]
                      }));
                      setWayPoints(extractedWaypoints);

                      const extractedRoutePoints = result.gpx.rte[0].rtept.map(point => ({
                          latitude: parseFloat(point.$.lat),
                          longitude: parseFloat(point.$.lon),
                      }));
                      setRoutePoints(extractedRoutePoints);
                  }
              });
          } catch (error) {
              console.error('Error reading GPX file:', error);
          }
      };

      fetchGPXTrack();
  }, []);

    if (routePoints.length === 0) {
        // Loading state or error handling
        return null;
    }

    const origin = routePoints[0];
    const destination = routePoints[routePoints.length - 1];

    const handleMapClick = () => {
        const originString = `${origin.latitude},${origin.longitude}`;
        const destinationString = `${destination.latitude},${destination.longitude}`;
        const routePointsString = routePoints
            .slice(1, -1)
            .map(point => `${point.latitude},${point.longitude}`)
            .join('|');

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originString}&destination=${destinationString}&waypoints=${routePointsString}&travelmode=bicycling`;

        Linking.openURL(mapsUrl);
    };

    const createAndSaveFile = async () => {
        try {
            const directory = FileSystem.documentDirectory + 'BikeHospitality'
            // Create a directory (optional)
            await FileSystem.makeDirectoryAsync(directory, {
                intermediates: true,
            });

            // Create a file and write content to it
            const filePath = directory + '/myGPX.gpx';
            await FileSystem.writeAsStringAsync(filePath, dummyGPX);

            // Share the file using Expo Sharing
            await Sharing.shareAsync(filePath, {mimeType: 'text/plain', dialogTitle: 'Share File'});
        } catch (error) {
            console.error('Error creating or saving the file:', error);
        }
    };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={detailStyle.mainContainer} >

      <View style={detailStyle.mainContentView}>
        <Text style={[detailStyle.detailTitle, {flex: 1}]}>{nome}</Text>
        <Text style={[detailStyle.sectionTitle, {color: '#4d4d4d', marginTop: -5}]}>{comune + " (" + provincia + ")"}</Text>
        
        <Image style={detailStyle.photo} source={{uri: immagini[0]}}/>
        <View style={{flexGrow: 0, flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {telefono !== null && telefono !== undefined && telefono !== "" ? 
              Linking.openURL(`tel:${telefono}`):
              notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('call')} size={30} color='green'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>CHIAMA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {email !== null && email !== undefined && email !== "" ? 
              Linking.openURL(`mailto:${email}`)  : 
              notification("Attenzione", "Email non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('mail')} size={30} color='tomato'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{"Descrizione"}</Text>
          <Ionicons name={IconDecisionMaker('book')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>
        <RenderHTML source={{html: he.decode(descrizione)}} contentWidth={200} baseStyle={HTMLStyle.text}/>
      </View>

      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{"Galleria Foto"}</Text>
          <Ionicons name={IconDecisionMaker('images')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>

        <ScrollView style={{marginTop: 10}} horizontal>
          {immagini.map( (ph) => <Image style={detailStyle.photo} source={{uri: ph}} key={ph.toString()}/> )}
        </ScrollView>
      </View>
      
      <View style={detailStyle.sectionView}>
        <View style={detailStyle.flexDirectionRow}>
          <Text style={detailStyle.sectionTitle}>{"Dettagli Percorso"}</Text>
          <Ionicons name={IconDecisionMaker('glasses')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
        </View>

       {(map !== "") ?
            <WebView
            nestedScrollEnabled
            source={{ uri: map }}
            style={{ marginTop: 10, height: Dimensions.get('window').height/2, opacity: 0.99}}
            />
        : _listEmptyComponent("Nessuna mappa disponibile.")
        }
        
        <Text style={{ padding: 5, alignSelf: 'center', justifyContent: 'space-between'}}>
            
            {(dummyGPX !== "") ?
                <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map}
                         minZoomLevel={15}
                         region={{latitude: origin.latitude, longitude: origin.longitude, latitudeDelta: 1, longitudeDelta: 1}}
                         onPress={handleMapClick}
                >
                    {/* Render GPX track */}
                    <Polyline coordinates={routePoints} strokeWidth={4} strokeColor="#00F"/>
                    {/* Render markers at each coordinate */}
                    {wayPoints.map((point, index) => (
                        <Marker
                            key={index}
                            coordinate={point}
                            title={point.name}
                            description={point.desc}
                        />
                    ))}
                </MapView>
                : _listEmptyComponent("Altimetria non disponibile.")
            }
        </Text>

        <Text style={{padding: 5, alignSelf: 'center', justifyContent: 'space-between'}}>
            {(dummyGPX !== "") ?
                <TouchableOpacity style={[detailStyle.button, {flex: 1, alignSelf: 'center'}]} onPress={() => createAndSaveFile()}>
                    <Ionicons name={IconDecisionMaker('download')} size={30} color='white'/>
                    <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, {color: 'white', marginLeft: 5}]}>SCARICA GPX</Text>
                </TouchableOpacity>
                : _listEmptyComponent("Download GPX non disponibile.")
            }
            
        </Text>

        
        </View>
        <View style={detailStyle.sectionView} id='contacts'>
            <View style={detailStyle.flexDirectionRow}>
                <Text style={detailStyle.sectionTitle}>{"Contatti"}</Text>
                <Ionicons name={IconDecisionMaker('information-circle')} style={detailStyle.sectionIcon} size={30} color='green'/>
            </View>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 5}}>Contatta l'organizzatore per maggiori informazioni!</Text>
            <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
              {telefono !== null && telefono !== undefined && telefono !== "" ? 
                Linking.openURL(`tel:${telefono}`):
                notification("Attenzione", "Numero di telefono non disponibile.", "Ok")()}}}
            >
            <Ionicons name={IconDecisionMaker('call')} size={30} color='green'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>CHIAMA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[detailStyle.button, detailStyle.buttonFlex]} width={'auto'} onPress={() => { 
            {email !== null && email !== undefined && email !== "" ? 
              Linking.openURL(`mailto:${email}`)  : 
              notification("Attenzione", "Email non disponibile.", "Ok")()}}}
          >
            <Ionicons name={IconDecisionMaker('mail')} size={30} color='tomato'/>
            <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex]}>EMAIL</Text>
          </TouchableOpacity>
        </View>
    
      
     {
         /*<View style={detailStyle.sectionView}>
         <View style={detailStyle.flexDirectionRow}>
           <Text style={detailStyle.sectionTitle}>{"Posizione"}</Text>
           <Ionicons name={IconDecisionMaker('locate')} style={detailStyle.sectionIcon} size={30} color='dodgerblue'/>
         </View>
         <MapView provider={PROVIDER_GOOGLE} style={detailStyle.map} 
           region= {{latitude: lat, longitude: lgt, latitudeDelta: 1, longitudeDelta: 1,}}> 
           <Marker coordinate={{latitude: lat, longitude: lgt}} 
             onPress={() => { geo(lat, lgt, nome) }} />
         </MapView> 
       </View>*/
     }
     

    </ScrollView>
  );
}

export default DettaglioTour;