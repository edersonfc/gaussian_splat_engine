import React, { useEffect, useRef, useState, useContext } from 'react';

import {
    View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView,
    PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Image, Animated, Easing
} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT } from '../CALCULO_E_FORMATACAO/FORMATACAO';
// import { Icon } from 'react-native-vector-icons/Icon';

import Icon from 'react-native-vector-icons/FontAwesome';


var LARGURA = Math.round(Dimensions.get('window').width);
var ALTURA = Math.round(Dimensions.get('window').height);



//IMPORTANDO IMAGEM DEPOIS ABAIXO
// const roda = require('./arquivosHtml/wheel2.png');




export default function telaAguardeProcessamentoPagamento() {


    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);



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

        <>
            <View style={{
                position: 'absolute', width: LARGURA, height: ALTURA,
                backgroundColor: '#abc273',
                justifyContent: 'center', alignItems: 'center'
            }} >

                {/* <Text style={{ fontSize: 25, color: '#fff' }} >Processando o Pagamento !</Text> */}
                <Text style={{ fontSize: 25, color: '#fff' }} >Ativando esta Publicação !</Text>

                <Animated.View style={{ transform: [{ rotate: spin }] }} >
                    <Icon name='spinner' style={{ fontSize: 90, color:'#FFF' }} />
                </Animated.View>

            </View>
        </>

    );
}