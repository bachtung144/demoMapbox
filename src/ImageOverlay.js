import React, {useState, useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import sheet from '../styles/sheet';
import radar0 from '../assets/radar.png';
import radar1 from '../assets/radar1.png';
import radar2 from '../assets/radar2.png';

const frames = [radar0, radar1, radar2];

export default function ImageOverlay() {
    let _timeout = null;
    const coordQuad = [
        [-80.425, 46.437], // top left
        [-71.516, 46.437], // top right
        [-71.516, 37.936], // bottom right
        [-80.425, 37.936], // bottom left
    ];
    const [radarFrameIndex, useRadar] = useState(0);

    const heartbeat = () => {
        _timeout = setTimeout(() => {
            requestAnimationFrame(() => {
                let nextFrame = radarFrameIndex + 1;
                if (nextFrame > 2) {
                    nextFrame = 0;
                }
                useRadar(nextFrame);
                heartbeat();
            });
        }, 500);
    };

    useEffect(() => {
        heartbeat();
        return () => {
            if (_timeout) {
                clearTimeout(_timeout);
            }
        };
    });

    return (
        <MapboxGL.MapView
            ref={(ref) => (this.map = ref)}
            style={sheet.matchParent}
            styleURL={MapboxGL.StyleURL.Dark}
        >
            <MapboxGL.Camera zoomLevel={5.2} centerCoordinate={[-75.789, 41.874]} />

            <MapboxGL.Animated.ImageSource
                key="d"
                id="radarSource"
                coordinates={coordQuad}
                url={frames[radarFrameIndex]}>
                <MapboxGL.RasterLayer id="radarLayer" />
            </MapboxGL.Animated.ImageSource>
        </MapboxGL.MapView>
    );
}
