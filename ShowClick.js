import React from 'react';
import {Text,View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


class ShowClick extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: undefined,
            longitude: undefined,
            screenPointX: undefined,
            screenPointY: undefined,
        };

        this.onPress = this.onPress.bind(this);
    }

    get hasValidLastClick() {
        return (
            typeof this.state.latitude === 'number' &&
            typeof this.state.longitude === 'number'
        );
    }

    onPress(event) {
        const {geometry, properties} = event;

        this.setState({
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
            screenPointX: properties.screenPointX,
            screenPointY: properties.screenPointY,
        });
    }

    renderLastClicked() {
        if (!this.hasValidLastClick) {
            return (
                <View>
                    <Text>Click the map!</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Text>Screen Point X: {this.state.screenPointX}</Text>
                <Text>Screen Point Y: {this.state.screenPointY}</Text>
            </View>
        );
    }

    render() {
        return (
            <View {...this.props} style={{flex:1}}>
                <MapboxGL.MapView
                    onPress={this.onPress}
                />

                {this.renderLastClicked()}
            </View>
        );
    }
}

export default ShowClick;
