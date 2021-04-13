import React, { useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity, StyleSheet, ScrollView, Button, TouchableHighlight, CheckBox, PermissionsAndroid } from 'react-native'

import Estilo from './estilo';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";

import Geolocation from 'react-native-geolocation-service';


//Da Google
import MapView from 'react-native-maps';

//mobiSatelite  => é o nome do projeto
export default function MAPA() {

    var produto = '';
    const navigation = useNavigation();



    //HOOKS DA GEOLOCALIZAÇÃO ABAIXO
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState(false);
    //HOOKS DA GEOLOCALIZAÇÃO ACIMA

    //FUNÇÃO QUE VERIFICA SE O APP TEM PERMISSÃO PRA ACESSAR O GPS ABAIXO
    async function verifyLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permissão concedida');
                setHasLocationPermission(true);
            } else {
                console.error('permissão negada');
                setHasLocationPermission(false);
            }
        } catch (err) {
            console.warn(err)
        }

    }
    //FUNÇÃO QUE VERIFICA SE O APP TEM PERMISSÃO PRA ACESSAR O GPS ACIMA


    
    // useEffec DA GEOLOCALIZAÇÃO NO CELULAR ABAIXO
    useEffect(() => {

        verifyLocationPermission();

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },

                error => {
                    console.log(error.code, error.message);
                }
            );
        }
    }, [hasLocationPermission]);
    // useEffec DA GEOLOCALIZAÇÃO NO CELULAR ACIMA
    


    //HOOKS DE SETAGEM DA GOOGLE ABAIXO
    const [minhaLocalizacao, setMinhaLocalizacao] = useState({});

    //FERRAMENTA DA GOOGLE DE LOCALIZAÇÃO ABAIXO
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                //setUserPosition({  
                 setMinhaLocalizacao({
                    //latitude: position.coords.latitude,
                    //longitude: position.coords.longitude,
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                console.log('minha localização => ', minhaLocalizacao);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [])
    //}// TALVE O ERRO TÁ AQUI
    //FERRAMENTA DA GOOGLE DE LOCALIZAÇÃO ACIMA



    return (


        <SafeAreaView style={[Estilo.App]}>

            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 0, borderColor: 'pink' }}>
                <Icon name='window-close' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]}
                    onPress={() => {
                        navigation.navigate("TelaPrincipal", { produto })
                    }} />
            </TouchableOpacity>


            <View>
                
                <Text  style={{ textAlign: 'left', color: 'white' }} >LATITUDE : {userPosition.latitude} </Text>
                <Text  style={{ textAlign: 'left', color: 'white' }} >LONGITUDE: {userPosition.longitude} </Text>
               
                {/*<Text style={[Estilo.icones_medio]} > {minhaLocalizacao} </Text>  */}
            </View>

            

            <MapView
                region={minhaLocalizacao}
                //region={setUserPosition}
                style={{ width: 360, height:'auto' }} //570
                showsUserLocation={true}
                onPress={(position) => getLocalizacao(position.nativeEvent)}
            />

          




        </SafeAreaView   >
    )

}

//CRIANDO ESTILOS ABAIXO NÃO RECOMENDADO MAS COLOCADO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {

        backgroundColor: 'rgba(200,200,2,0)',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 15,
        margin: 5,
        borderRadius: 10,

    },

    fontIcone: {

        fontSize: 24,
        color: '#fff',

    },

    fontBotao: {

        fontSize: 19,
        color: '#fff',

    },

});

