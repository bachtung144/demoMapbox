/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';
import App from './App';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmFjaHR1bmciLCJhIjoiY2tkaDBlNHJyMXQwZzJ3bXRjYzZ0dXA5dCJ9.AZ3zYbiPWw7TomnB74z9dQ',
);
AppRegistry.registerComponent(appName, () => App);
