import React, { useRef, useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Image, Animated, Easing } from 'react-native'



import { color } from 'react-native-reanimated';

// import Estilo from './estilo'


import Icon from 'react-native-vector-icons/FontAwesome';

// import { WebView } from 'react-native-webview';
import WebView from 'react-native-webview';
import styled from 'styled-components';

// import styled from 'styled-components/native';

import { ContainerPrincipal, Texto, IconeContainerRoda } from './styledComponents';


// import "./arquivosHtml/style.css";

const logo_do_app = require('./arquivosHtml/imgsplash.png');

const roda = require('./arquivosHtml/wheel2.png');

const grama_img = require('./arquivosHtml/clipart_2.png');


// import { CSS_EXTERNO } from './arquivosHtml/style.css';



export default function TelaSplash(param) {

    const largura = Math.round(Dimensions.get('window').width);

    var spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )
    ).start()

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })






    return (


        <ContainerPrincipal>


            <Image source={logo_do_app} style={{
                width: '100%', height: '30%',
                alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'
            }} />


            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0, width: '100%', height: 110 }} >


                {/* <Image source={grama_img} style={{ width: '100%', height: 65 }} /> */}


                <View style={{ flexDirection: 'row', width: 'auto', height: 100, position: 'absolute', borderWidth: 0 }} >

                    <Text style={estilo.FONTT} >GAD</Text>

                    <IconeContainerRoda >

                        <Animated.View style={{ transform: [{ rotate: spin }] }} >

                            <Image source={roda} style={{ width: 100, height: 100 }} />

                        </Animated.View>

                    </IconeContainerRoda>

                    <Texto>APP</Texto>

                </View>


            </View>


        </ContainerPrincipal>


    )

}




const estilo = StyleSheet.create({

    VIEW_1: {

        width: '100%',
        height: Math.round(Dimensions.get('window').height),
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'rgb(255,255,25)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0

    },

    FONTT: {

        fontSize: 64,
        // fontFamily:'AlfaSlabOne-Regular',
        fontFamily: 'coolveticarg',
        alignItems: 'center',
        color: 'rgba(183,185,18,1)'

    }


});