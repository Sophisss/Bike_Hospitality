import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Dimensions, View, ActivityIndicator, Button, Linking } from "react-native";
import { DOMParser } from "xmldom";
import { gpx } from "@tmcw/togeojson";
import * as turf from "@turf/turf";
import { getUserLocation } from "./Utils";
import translations from '../../translations/translations';

/**
 * A React component that displays a map with an itinerary and the user's location.
 * @param {*} gpxFileUri The URI of the GPX file containing the itinerary.
 * @returns A React component.
 */
const MapComponent = ({ gpxFileUri }) => {
    const [itinerary, setItinerary] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestPoint, setNearestPoint] = useState(null);
    const [region, setRegion] = useState(null);

    // Utility variables
    const ln = global.currentLanguage;
    const t = translations;

    // Segmentation: Split the itinerary into smaller chunks to optimize rendering
    const chunkSize = 500;
    const chunkItinerary = (coords) => {
        const chunks = [];
        for (let i = 0; i < coords.length; i += chunkSize) {
            chunks.push(coords.slice(i, i + chunkSize));
        }
        return chunks;
    };

    /**
     * Parses a GPX file from a given URI and extracts an array of geographic coordinates.
     * @param {*} fileUri The URI of the GPX file to be parsed.
     * @returns A promise that resolves to an array of coordinate objects, each containing `latitude` and `longitude`.
     */
    async function parseGpx(fileUri) {
        const response = await fetch(fileUri);
        const gpxText = await response.text();
        const gpxXml = new DOMParser().parseFromString(gpxText, "text/xml");
        const geojson = gpx(gpxXml);

        const coordinates = geojson.features[0].geometry.coordinates.map(([lon, lat]) => ({
            latitude: lat,
            longitude: lon,
        }));

        return coordinates;
    }

    /**
     * Find the nearest point on a line to a given user location.
     * @param {*} userLocation A coordinate object representing the user's location.
     * @param {*} itineraryPoints An array of coordinate objects representing the itinerary points.
     * @returns A coordinate object representing the nearest point on the line.
     */
    function findNearestPoint(userLocation, itineraryPoints) {
        const userPoint = turf.point([userLocation.longitude, userLocation.latitude]);
        const line = turf.lineString(
            itineraryPoints.map((point) => [point.longitude, point.latitude])
        );
        const nearestPoint = turf.nearestPointOnLine(line, userPoint);

        return {
            latitude: nearestPoint.geometry.coordinates[1],
            longitude: nearestPoint.geometry.coordinates[0],
        };
    }

    /**
     * Calculate the region to be displayed on the map based on the user's location and the destination point.
     * @param {*} userLocation A coordinate object representing the user's location.
     * @param {*} destinationPoint A coordinate object representing the destination point.
     * @returns An object containing the region's `latitude`, `longitude`, `latitudeDelta`, and `longitudeDelta`.
     */
    function calculateRegion(userLocation, destinationPoint) {
        const latitudes = [userLocation.latitude, destinationPoint.latitude];
        const longitudes = [userLocation.longitude, destinationPoint.longitude];

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        const latitudeDelta = maxLat - minLat + 0.02;
        const longitudeDelta = maxLon - minLon + 0.02;

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta,
            longitudeDelta,
        };
    }

    /**
     * Generates a Google Maps link for the itinerary with a travel mode of biking.
     * @param {*} itinerary The list of coordinates for the itinerary.
     * @returns A string containing the URL for Google Maps.
     */
    function generateGoogleMapsLink(itinerary) {
        if (itinerary.length < 2) {
            return null;  // Non è possibile generare un link con meno di 2 coordinate
        }

        const waypoints = itinerary
            .map(point => `${point.latitude},${point.longitude}`)
            .join('|');

        return `https://www.google.com/maps/dir/?api=1&waypoints=48.8566,2.3522|48.8584,2.2945&travelmode=bicycling`;
    }

    async function initializeMap() {
        try {
            if (!gpxFileUri) {
                throw new Error("URL del file GPX non valido o vuoto.");
            }

            const parsedItinerary = await parseGpx(gpxFileUri);
            setItinerary(parsedItinerary);
            const location = await getUserLocation();
            if (!location) {
                throw new Error("Impossibile ottenere la posizione dell'utente.");
            }
            setUserLocation(location);

            const nearest = findNearestPoint(location, parsedItinerary);
            setNearestPoint(nearest);

            const calculatedRegion = calculateRegion(location, nearest);
            setRegion(calculatedRegion);
        } catch (error) {
            console.error("Errore durante l'inizializzazione della mappa:", error.message);
        }
    }

    useEffect(() => {
        initializeMap();
    }, [gpxFileUri]);

    return (
        (!itinerary.length || !userLocation) ?
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size="large" color="black" />
            </View> :
            <View style={{ height: Dimensions.get("window").height / 2 }}>
                {region && (
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                    >
                        {/* Show the itinerary */}
                        {chunkItinerary(itinerary).map((chunk, index) => (
                            <Polyline
                                key={index}
                                coordinates={chunk}
                                strokeWidth={3}
                                strokeColor="blue"
                            />
                        ))}

                        {/* Show the user's location */}
                        {userLocation && (
                            <Marker
                                coordinate={userLocation}
                                title={t[ln].your_location}
                                pinColor="green"
                            />
                        )}

                        {/* Show the nearest point */}
                        {nearestPoint && (
                            <Marker
                                coordinate={nearestPoint}
                                title={t[ln].nearest_point}
                                pinColor="red"
                            />
                        )}
                    </MapView>
                )}

                <Button
                    title="Segui il percorso in Google Maps"
                    onPress={() => {
                        const routeLink = generateGoogleMapsLink(itinerary);
                        if (routeLink) {
                            Linking.openURL(routeLink);
                        }
                    }}
                />
            </View>
    );
};

export default MapComponent;
