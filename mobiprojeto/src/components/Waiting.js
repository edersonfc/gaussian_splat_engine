/*IMPLEMENTAÇÃO ABAIXO
import Waiting from './components/Waiting';

const [ waitingVisible, setWaitingisible] = useState(false);

 { waitingVisible && (<Waiting paremetroEnviado={"Aguarde ..."} ORIENTACAO={"PORTRAIT"} />)  }

//IMPLEMENTAÇÃO ACIMA
*/

import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Animated, Easing } from 'react-native';

import GlobalContext from '../context/UsersContext';

import Icon from 'react-native-vector-icons/FontAwesome';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";



export default function Waiting(param) {


    //ANIMAÇÃO DA TELA ABAIXO
    const [largura, setLargura] = useState(new Animated.Value(0));
    const [visivel_falso_true, setVisivel_falso_true] = useState(false);
    // var SETENTA_PORCENTO_LARGURA_TELA = ((Largura_total_da_tela * 80) / 100);

    //    useEffect(async () => {

    //        Animated.timing(
    //            largura,
    //            {
    //                toValue: Math.round(Dimensions.get('window').width),
    //                duration: 1000,
    //                useNativeDriver: false
    //            }

    //        )
    //            .start(({ finished }) => {
    //                // completion callback
    //                setVisivel_falso_true(true);
    //            });

    //    }, []);
    //ANIMAÇÃO DA TELA ACIMA


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


        <View style={[estilo.VIEW_1]} >

            <ScreenOrientation orientation={param.ORIENTACAO} />

            {/* <View style={[estilo.VIEW_2, style = { width: "100%" }]} > */}
            <Text style={[estilo.TEXT_2]}>{param.paremetroEnviado}</Text>
            <Animated.View style={{ transform: [{ rotate: spin }] }} >
                <Icon name='spinner' style={{ fontSize: 70, color: '#FFF' }} />
            </Animated.View>
            {/* </View> */}
        </View>

    );

}// export default


var BACKGROUND_COR = 'rgb(255,255,255)';
BACKGROUND_COR = 'rgb(245,245,245)';
// BACKGROUND_COR = 'rgb(235,235,235)';
// BACKGROUND_COR = 'rgb(225,225,225)';
// BACKGROUND_COR = 'rgb(211,211,211)';



const estilo = StyleSheet.create({

    VIEW_1: {

        flexDirection: 'row',
        width: '100%',
        // height: Math.round(Dimensions.get('window').height),
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0

    },

    VIEW_2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        /* backgroundColor: BACKGROUND_COR, */
        backgroundColor: 'rgba(0,0,0,0.6)',

    },

    VIEW_3: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: '100%',
    },



    TEXT_1: {

        borderWidth: 0,
        textAlign: 'center',
        fontSize: 32,
        color: 'rgba(0,0,0,0.9)'

    },

    TEXT_2: {

        borderWidth: 0,
        textAlign: 'center',
        fontSize: 25,
        color: 'rgba(255,255,255,0.8)',

    },

    TEXT_3: {
        borderWidth: 0,
        textAlign: 'center',
        fontSize: 20,
        color: 'rgba(0,176,80,0.9)',

    },

    TEXT_4: {
        borderWidth: 0,
        textAlign: 'center',
        fontSize: 20,
        color: 'rgba(112,48,160,0.9)',

    },

    TEXT_5: {
        borderWidth: 0,
        textAlign: 'center',
        fontSize: 25,
        color: 'rgba(255,0,0,0.9)'

    },

    BOTAO_1: {

        width: '50%',
        height: 50,

        alignContent: 'center',
        justifyContent: 'center',

        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'rgba(255,0,0,0.9)',
        backgroundColor: BACKGROUND_COR,
    },

});

