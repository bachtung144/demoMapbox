import React, {useState, useEffect, useCallback} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, View} from 'react-native';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYmFjaHR1bmciLCJhIjoiY2tkaDBlNHJyMXQwZzJ3bXRjYzZ0dXA5dCJ9.AZ3zYbiPWw7TomnB74z9dQ',
);

export default function Test() {
    const [initialCoords, useInitialCoords] = useState([-77.034084, 38.9]);
    const [isGranted, useIsGranted] = useState();
    const [finishLocation, useFinishLocation] = useState();
    const [route, useRoute] = useState();

    const checkPermissions = useCallback(async () => {
        let isGranted = await MapboxGL.requestAndroidLocationPermissions();
        useIsGranted(isGranted);
        MapboxGL.setAccessToken('....');
    }, []);

    const setUserLocation = (location) => {
        const currentCoords = [location.coords.longitude, location.coords.latitude];
        useInitialCoords(currentCoords);
    };

    const renderCurrentLocation = () => {
        return (
            <View>
                <MapboxGL.UserLocation
                    renderMode="normal"
                    visible={false}
                    onUpdate={(location) => setUserLocation(location)}
                />

                <MapboxGL.PointAnnotation
                    selected={true}
                    key="key1"
                    id="id1"
                    coordinate={initialCoords}>
                    <MapboxGL.Callout title="My Location" />
                </MapboxGL.PointAnnotation>

                {finishLocation ? (
                    <MapboxGL.MarkerView
                        selected={true}
                        key="key2"
                        id="id2"
                        coordinate={finishLocation}>
                        <MapboxGL.Callout title="Finish Location" />
                    </MapboxGL.MarkerView>
                ) : null}

                <MapboxGL.Camera zoomLevel={16} centerCoordinate={initialCoords} />
            </View>
        );
    };

    const onPressFinishLocation = (location) => {
        useFinishLocation(location.geometry.coordinates);
        console.warn(location.geometry.coordinates);
    };

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    if (!isGranted) {
        return null;
    } else {
        return (
            <>
                <View style={styles.page}>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Street}
                        zoomEnabled={true}
                        style={styles.map}
                        onPress={(location) => onPressFinishLocation(location)}>
                        {renderCurrentLocation()}
                    </MapboxGL.MapView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
