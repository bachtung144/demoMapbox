import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYmFjaHR1bmciLCJhIjoiY2tkaDBlNHJyMXQwZzJ3bXRjYzZ0dXA5dCJ9.AZ3zYbiPWw7TomnB74z9dQ',
);

export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.startPoint = [34.4999, 31.5542];
    this.finishedPoint = [34.4979, 31.5512];
    this.state = {
      center: [],
      // initialCoords: undefined,
      initialCoords: [-77.034084, 38.9],
      acceptedPermations: false,

      // Two point state
      route: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                this.startPoint, //point A "current" ~ From
                this.finishedPoint, //Point B ~ to
              ],
            },
            style: {
              fill: 'red',
              strokeWidth: '10',
              fillOpacity: 0.6,
            },
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.8,
            },
          },
        ],
      },
    };
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
  }

  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
    this.setState({isGranted: isGranted});
    MapboxGL.setAccessToken(
        '....',
    );
  }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    this.setState({center}, () =>
        console.log('onRegionDidChange', this.state.center),
    );
  }

  renderCurrentPoint = () => {
    return (
        <>
          <MapboxGL.UserLocation
              renderMode="normal"
              visible={false}
              onUpdate={location => {
                const currentCoords = [
                  location.coords.longitude,
                  location.coords.latitude,
                ];
                // console.log(location); // current location is here
                this.setState({
                  initialCoords: currentCoords,
                });
              }}
          />

          {/* current Provider location */}
          <MapboxGL.PointAnnotation
              selected={true}
              key="key1"
              id="id1"
              coordinate={this.startPoint}>
            {/*<Icon name="ios-pin" size={45} color="#00f" />*/}
            <MapboxGL.Callout title="My" />
          </MapboxGL.PointAnnotation>
          {/* user From DB location */}
          <MapboxGL.PointAnnotation
              selected={true}
              key="key2"
              id="id2"
              coordinate={this.finishedPoint}>
            {/*<Icon name="ios-pin" size={45} color="#0f0" />*/}
            <MapboxGL.Callout title="User" />
          </MapboxGL.PointAnnotation>
          <MapboxGL.ShapeSource id="line1" shape={this.state.route}>
            <MapboxGL.LineLayer
                id="linelayer1"
                style={{
                  lineColor: 'red',
                  lineWidth: 10,
                  lineCap: 'round',
                }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.Camera
              zoomLevel={16}
              centerCoordinate={this.state.initialCoords}
              // centerCoordinate={[-5.803457464752711, 35.769940811797404]}
          />
        </>
    );
  };
  render() {
    if (!this.state.isGranted) {
      return null;
    }

    return (
        <View style={styles.page}>
          <MapboxGL.MapView
              styleURL={MapboxGL.StyleURL.Street}
              ref={c => (this._map = c)}
              onRegionDidChange={this.onRegionDidChange}
              zoomEnabled={true}
              style={styles.map}>
            {this.renderCurrentPoint()}
          </MapboxGL.MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  container: {
    height: 500,
    width: 500,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
