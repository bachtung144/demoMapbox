import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import sheet from '../styles/sheet';
import HoGuom from '../assets/HoGuom.jpg';

export default function Custom() {
  const coordQuad = [
    [-80.425, 46.437], // top left
    [-71.516, 46.437], // top right
    [-71.516, 37.936], // bottom right
    [-80.425, 37.936], // bottom left
  ];

  return (
    <MapboxGL.MapView
      // ref={(ref) => (this.map = ref)}
      style={sheet.matchParent}
      // styleURL={MapboxGL.StyleURL.Dark}
    >
      <MapboxGL.Camera zoomLevel={5.2} centerCoordinate={[-75.789, 41.874]} />

      <MapboxGL.Animated.ImageSource
        key="d"
        id="radarSource"
        coordinates={coordQuad}
        url={HoGuom}>
        <MapboxGL.RasterLayer id="radarLayer" />
      </MapboxGL.Animated.ImageSource>
    </MapboxGL.MapView>
  );
}
