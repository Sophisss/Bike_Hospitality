import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Dimensions, View, ActivityIndicator, TouchableOpacity, Text, Linking } from "react-native";
import { DOMParser } from "xmldom";
import { gpx } from "@tmcw/togeojson";
import * as turf from "@turf/turf";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getUserLocation } from "./Utils";
import detailStyle from '../../assets/styles/DetailStyle';
import translations from '../../translations/translations';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * A React component that displays a map with an itinerary and the user's location.
 * @param {*} gpxFileUri The URI of the GPX file containing the itinerary.
 * @returns A React component.
 */
const MapComponent = ({ gpxFileUri }) => {
  const [itinerary, setItinerary] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestPoint, setNearestPoint] = useState(null);
  const [routeUrl, setRouteUrl] = useState(null);
  const [mapsUrl, setMapsUrl] = useState(null);
  const [region, setRegion] = useState(null);

  // Utility variables
  const ln = global.currentLanguage;
  const t = translations;

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
    // Convert the user's location to a GeoJSON point
    const userPoint = turf.point([userLocation.longitude, userLocation.latitude]);

    // Convert the itinerary points to a GeoJSON LineString
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
   * Reorders the itinerary so that the nearest point to the user's location is at the beginning of the route.
   * This is necessary because the GPX file might not have the nearest point as the first point, 
   * and we want the user to follow the path starting from the closest location.
   * @param {*} itinerary An array of coordinate objects representing the itinerary.
   * @param {*} nearestPoint A coordinate object representing the nearest point to the user's location.
   * @returns A reordered array of itinerary points, starting from the nearest point.
   */
  function reorderItinerary(itinerary, nearestPoint) {
    let nearestIndex = itinerary.findIndex(point =>
      point.latitude === nearestPoint.latitude && point.longitude === nearestPoint.longitude
    );

    if (nearestIndex === -1) {
      return itinerary;
    }

    const reordered = [...itinerary.slice(nearestIndex), ...itinerary.slice(0, nearestIndex)];

    return reordered;
  }

  /**
   * Generates a Google Maps route URL for the user to follow the entire itinerary, starting from the nearest point.
   * This method creates a URL for Google Maps with waypoints (intermediate points) to follow the entire path.
   * Google Maps supports a maximum of 10 waypoints, so the itinerary is split into smaller segments if necessary.
   * @param {*} itinerary An array of coordinate objects representing the itinerary.
   * @returns A URL that opens the route in Google Maps with the 'bicycling' mode.
   */
  function generateGoogleMapsRoute(itinerary) {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const origin = `${itinerary[0].latitude},${itinerary[0].longitude}`;
    const destination = `${itinerary[itinerary.length - 1].latitude},${itinerary[itinerary.length - 1].longitude}`;

    const maxWaypoints = 10;

    let waypoints = [];
    const totalPoints = itinerary.length;

    if (totalPoints > maxWaypoints) {
      const step = Math.floor((totalPoints - 2) / (maxWaypoints - 2));
      for (let i = step; i < totalPoints - 1; i += step) {
        waypoints.push(`${itinerary[i].latitude},${itinerary[i].longitude}`);
      }
    }

    let mapsUrl = `${baseUrl}&origin=${origin}&destination=${destination}&travelmode=bicycling`;
    if (waypoints.length > 0) {
      mapsUrl += `&waypoints=${waypoints.join("|")}`;
    }

    return mapsUrl;
  }

  /**
   * Initializes the map by parsing the GPX file, getting the user's location, 
   * and calculating the nearest point.
   */
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

      const reorderedItinerary = reorderItinerary(parsedItinerary, nearest);
      setItinerary(reorderedItinerary);

      const generatedRouteUrl = generateGoogleMapsRoute(reorderedItinerary);
      setRouteUrl(generatedRouteUrl);

      if (location && nearest) {
        const url = `https://www.google.com/maps/dir/?api=1` +
          `&origin=${location.latitude},${location.longitude}` +
          `&destination=${nearest.latitude},${nearest.longitude}` +
          `&travelmode=driving`;
        setMapsUrl(url);
      }

      // Calculate the region to display
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
    (!itinerary.length || !userLocation) ? (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : (
      <View>
        <View style={{ paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialIcons name="location-pin" size={30} color="green" />
            <Text style={{
              marginLeft: 5,
              fontSize: 16,
              color: '#294075',
              fontWeight: 'bold',
              flexShrink: 1
            }}>
              {t[ln].your_location}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="location-pin" size={30} color="red" />
            <Text style={{
              marginLeft: 5,
              fontSize: 16,
              color: '#294075',
              fontWeight: 'bold',
              flexShrink: 1
            }}>
              {t[ln].nearest_point}
            </Text>
          </View>
        </View>

        <View style={{ height: Dimensions.get("window").height / 2 }}>
          {region && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              region={region}
            >
              {/* Show the itinerary */}
              {itinerary.length > 0 && (
                <Polyline
                  coordinates={itinerary}
                  strokeWidth={3}
                  strokeColor="blue"
                />
              )}

              {/* Show user location */}
              {userLocation && (
                <Marker
                  coordinate={userLocation}
                  title={t[ln].your_location}
                  pinColor="green"
                />
              )}

              {/* Show nearest point */}
              {nearestPoint && (
                <Marker
                  coordinate={nearestPoint}
                  title={t[ln].nearest_point}
                  pinColor="red"
                />
              )}
            </MapView>
          )}
        </View>

        <View>
          {mapsUrl && (
            <TouchableOpacity style={[detailStyle.button, { flex: 1, alignSelf: 'center', marginTop: 8 }]} onPress={() => Linking.openURL(mapsUrl)}>
              <Ionicons name="navigate" size={25} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>{t[ln].reach_nearest_point}</Text>
            </TouchableOpacity>
          )}

          {routeUrl && (
            <TouchableOpacity
              style={[detailStyle.button, { flex: 1, alignSelf: 'center', marginTop: 8 }]}
              onPress={() => Linking.openURL(routeUrl)}
            >
              <Ionicons name="bicycle" size={25} color='#294075' />
              <Text style={[detailStyle.buttonText, detailStyle.buttonTextFlex, { color: 'white', marginLeft: 5 }]}>
                {t[ln].follow_route}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  );
};

export default MapComponent;