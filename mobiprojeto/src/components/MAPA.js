import React, { useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity, StyleSheet, ScrollView, Button, TouchableHighlight, CheckBox, PermissionsAndroid } from 'react-native'

import Estilo from './estilo';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";

import {  MapaTeste }  from  './MapaGoogle';

/*
import Geolocation from 'react-native-geolocation-service';

//Da Google
import MapView from 'react-native-maps';
*/

//mobiSatelite  => é o nome do projeto
export default function MAPA() {
  
    var produto = '';
    const navigation = useNavigation();
   




    return (


        <SafeAreaView style={[Estilo.App]}>

            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 0, borderColor: 'pink' }}>
                <Icon name='window-close' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]}
                    onPress={() => {
                        navigation.navigate("TelaPrincipal", { produto })
                    }} />
            </TouchableOpacity>


            <View>
                
                {/* <Text  style={{ textAlign: 'left', color: 'white' }} >LATITUDE : {userPosition.latitude} </Text>
                <Text  style={{ textAlign: 'left', color: 'white' }} >LONGITUDE: {userPosition.longitude} </Text>     NÃO É DA GOOGLE
               
                 
               <Text style={[Estilo.icones_medio]} > {minhaLocalizacao} </Text>  */}
            </View>

            
           
            <MapaTeste/>
     
         




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

