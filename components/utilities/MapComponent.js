import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";

import * as Location from "expo-location";
import * as turf from "@turf/turf";
import { getUserLocation } from "./Utils";

import { DOMParser } from "xmldom";
import { gpx } from "@tmcw/togeojson";

const MapComponent = ({ gpxFileUri }) => {
    const [itinerary, setItinerary] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestPoint, setNearestPoint] = useState(null);
    const [regionLocation, setRegionLocation] = useState(null);


    async function parseGpx(fileUri) {
        const response = await fetch(fileUri);
        //const response = "..\\..\\xml_test\\Escursione cicloturistica dei 4 passi Alta Valle del Potenza.gpx.xml";
        const gpxText = await response.text();
        const gpxXml = new DOMParser().parseFromString(gpxText, "text/xml");
        const geojson = gpx(gpxXml);

        // Estrai le coordinate
        const coordinates = geojson.features[0].geometry.coordinates.map(([lon, lat]) => ({
            latitude: lat,
            longitude: lon,
        }));

        return coordinates;
    }

    function findNearestPoint(userLocation, itineraryPoints) {
        // Converte la posizione dell'utente in un punto GeoJSON
        const userPoint = turf.point([userLocation.longitude, userLocation.latitude]);

        // Converte i punti dell'itinerario in una LineString GeoJSON
        const line = turf.lineString(
            itineraryPoints.map((point) => [point.longitude, point.latitude])
        );

        // Trova il punto più vicino sulla linea
        const nearestPoint = turf.nearestPointOnLine(line, userPoint);

        return {
            latitude: nearestPoint.geometry.coordinates[1],
            longitude: nearestPoint.geometry.coordinates[0],
        };
    }

    function calculateMidpoint(coord1, coord2) {
        const lat = (coord1.latitude + coord2.latitude) / 2;
        const lon = (coord1.longitude + coord2.longitude) / 2;
        return { latitude: lat, longitude: lon };
      }
      
    function calculateRegion(userPosition, destinationPosition) {
        // const latDelta = Math.abs(userPosition.latitude - destinationPosition.latitude) * 1.5;
        // const lonDelta = Math.abs(userPosition.longitude - destinationPosition.longitude) * 1.5;
        // const center = calculateMidpoint(userPosition, destinationPosition);
        return {
        //   latitude: center.latitude,
        //   longitude: center.longitude,
        //   latitudeDelta: latDelta,
        //   longitudeDelta: lonDelta
        latitude: 13,
        longitude: 34,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
        };
    }

    useEffect(() => {
        async function initializeMap() {
            try {
                // Parsing del file GPX
                const parsedItinerary = await parseGpx(gpxFileUri);
                setItinerary(parsedItinerary);

                // Posizione attuale dell'utente
                const location = await getUserLocation();
                setUserLocation(location);

                // Punto più vicino
                const nearest = findNearestPoint(location, parsedItinerary);
                setNearestPoint(nearest);

                const pippo = calculateRegion(location, nearest);
                console.log("oppjvh",pippo);
                setRegionLocation(pippo)

            } catch (error) {
                console.error("Errore durante l'inizializzazione della mappa:", error);
            }
        }

        initializeMap();
    }, [gpxFileUri]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        map: {
            flex: 1,
        },
    });

    return (
        <View style={{ height: Dimensions.get("window").height / 2 }}>
            {userLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: regionLocation.latitude,
                        longitude: regionLocation.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {/* Mostra l'itinerario */}
                    {itinerary.length > 0 && (
                        <Polyline
                            coordinates={itinerary}
                            strokeWidth={3}
                            strokeColor="blue"
                        />
                    )}

                    {/* Mostra la posizione dell'utente */}
                    {userLocation && (
                        <Marker
                            coordinate={userLocation}
                            title="La tua posizione"
                            pinColor="green"
                        />
                    )}

                    {/* Mostra il punto più vicino */}
                    {nearestPoint && (
                        <Marker
                            coordinate={nearestPoint}
                            title="Punto più vicino"
                            pinColor="red"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};

export default MapComponent;