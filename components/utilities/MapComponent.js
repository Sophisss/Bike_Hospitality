import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View, ActivityIndicator } from "react-native";

import * as Location from "expo-location";
import * as turf from "@turf/turf";
import { getUserLocation } from "./Utils";

import { DOMParser } from "xmldom";
import { gpx } from "@tmcw/togeojson";

const MapComponent = ({ gpxFileUri }) => {
    const [itinerary, setItinerary] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestPoint, setNearestPoint] = useState(null);
    const [region, setRegion] = useState(null);

    async function parseGpx(fileUri) {
        const response = await fetch(fileUri);
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

    function calculateRegion(userLocation, destinationPoint) {
        const latitudes = [userLocation.latitude, destinationPoint.latitude];
        const longitudes = [userLocation.longitude, destinationPoint.longitude];

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        const latitudeDelta = maxLat - minLat + 0.02; // Aggiungi margine
        const longitudeDelta = maxLon - minLon + 0.02; // Aggiungi margine

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta,
            longitudeDelta,
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

                // Calcola la regione
                const calculatedRegion = calculateRegion(location, nearest);
                setRegion(calculatedRegion);
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
        (!itinerary.length || !userLocation) ?
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View> :

            <View style={{ height: Dimensions.get("window").height / 2 }}>
                {region && (
                    <MapView
                        style={styles.map}
                        region={region}
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
