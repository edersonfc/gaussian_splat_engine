import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Estilo from './estilo'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
var LATITUDE = 37.78825;
var LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0422;//
//const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
    constructor(props) {

        var { LARTITUDE } = props.route.params;
        var { LORNGITUDE } = props.route.params;

        LATITUDE = LARTITUDE;
        LONGITUDE = LORNGITUDE


        super(props);


        this.state = {
            region: {
                latitude: LARTITUDE,
                longitude: LORNGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
        };
    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
    }

    render() {

        const { navigation } = this.props;

        return (

            <SafeAreaView style={[Estilo.App]}>

                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0, borderColor: 'pink', position: 'absolute' }}
                    onPress={() => {
                        var produto = "";
                        navigation.navigate("TelaPrincipal", { produto })
                    }}
                >
                    <Icon name='arrow-left' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A', fontSize: 28 }]} />
                    <View style={{ width: 20 }} ></View>
                    <Text style={{ color: 'white' }}>Latitude:{LATITUDE} </Text>
                    <View style={{ width: 10 }} ></View>
                    <Text style={{ color: 'white' }}>Longitude:{LONGITUDE} </Text>
                    <View style={{ width: 20 }} ></View>


                </TouchableOpacity>

                <View style={styles.container}>



                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        initialRegion={this.state.region}
                        onPress={e => this.onMapPress(e)}
                    >
                        {this.state.markers.map(marker => (
                            <Marker
                                key={marker.key}
                                coordinate={marker.coordinate}
                                pinColor={marker.color}
                            />
                        ))}
                    </MapView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => this.setState({ markers: [] })}
                            style={styles.bubble}
                        >
                            <Text>Tap to create a marker of random color</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>

        );
    }
}

DefaultMarkers.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        /*...StyleSheet.absoluteFillObject,*/
        paddingTop: 35,
        justifyContent: 'flex-start',
        alignItems: 'center',

        position: 'relative',
        width: '100%',
        height: '100%',
        /**/
    },
    map: {
        /*...StyleSheet.absoluteFillObject,*/
        position: 'relative',
        width: '100%',
        height: '100%',

        backgroundColor:'green'

    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default DefaultMarkers;