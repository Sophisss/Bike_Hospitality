import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

import GpxParser from "gpx-parse";
import * as Location from "expo-location";
import * as turf from "@turf/turf";
import { getUserLocation } from "./Utils";

const MapComponent = ({ gpxFileUri }) => {
    const [itinerary, setItinerary] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestPoint, setNearestPoint] = useState(null);

    // Funzione per caricare e parse il file GPX
    async function parseGpx(fileUri) {
        return new Promise((resolve, reject) => {
            fetch(fileUri)
                .then((response) => response.text())
                .then((gpxData) => {
                    GpxParser.parseGpx(gpxData, (error, data) => {
                        if (error) {
                            reject(error);
                        } else {
                            // Estrai i punti del percorso
                            const coordinates = data.tracks[0].segments[0].map((point) => ({
                                latitude: point.lat,
                                longitude: point.lon,
                            }));
                            resolve(coordinates);
                        }
                    });
                })
                .catch((err) => reject(err));
        });
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
        <View style={styles.container}>
            {userLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
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