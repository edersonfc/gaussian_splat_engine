import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Animated, Easing } from 'react-native';

import GlobalContext from '../context/UsersContext';

import Icon from 'react-native-vector-icons/FontAwesome';

//npm install react-native-webview
import { WebView } from 'react-native-webview';

function TEXTO() {

    return "Esse Aplicativo tem a finalidade de possibilitar Anúncios de Bovinos, sendo Fotos e Vídeos, para quê, Vendedores e Compradores possam negociar entre si, sendo as 3 primeiras publicações gratuitas, podendo conter diversas Imagens ou Vídeos em cada publicação de sua preferência." +

        "\n\nO Aplicativo permite que Você comunique com a outra parte negociante, fazendo ou recebendo propostas pelo próprio aplicativo, ou tirando dúvida da outra parte que achar necessário." +
        "\n\nPara Sua Segurânça faça chamadas de Vídeos com a outra parte usando outros meios, como WhatZap por Exemplo. "+
        "\n\nA segurança de Nossos Serviços prestados, é Garantida em Parceria com o Mercado Pago."
}



export default function Importante(param) {


    return (

        <View style={[estilo.CONTAINER]}>

            <TouchableOpacity style={[estilo.ICONE_SETA]}
                onPress={() => {
                    param.FECHAR_TELA_INFORMACAO_IMPORTANT();
                }}
            >
                <Icon name='arrow-left' style={{ fontSize: 25, color: 'white' }} />
            </TouchableOpacity>

            <View style={[estilo.TEXT_1]}>
                <Text style={{ fontSize: 28, color: 'white', textAlign: 'center', borderWidth:0, height:45 }} >Amigo Pecuarista</Text>

                <Text style={{ fontSize: 17.5, textAlign: 'justify', color: 'white' }} >{"" + TEXTO()}</Text>

            </View>

        </View >

    )


}




const estilo = StyleSheet.create({



    CONTAINER: {

        width: '100%',
        height: '100%',
        position: 'absolute',
        // // paddingBottom: 50,

        alignItems: 'center',

        // backgroundColor: 'rgb(34,43,54)',
        backgroundColor: 'rgb(62,90,106)',
    },


    VIEW_1: {

        width: '100%',
        // height: 60,
        borderWidth: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgb(62,90,106)',

        textAlign: 'justify',
    },

    TEXT_1: {

        width: '90%',
        height: '85%',
        borderWidth: 0,
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,

        // backgroundColor: 'rgb(62,90,16)',
        textAlign: 'justify',
    }


    , ICONE_SETA: {

        flexDirection: 'row',
        width: '100%',
        // height: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 0,
        borderColor: 'pink',
        paddingTop: 15,
        paddingLeft: 15,
        // position: 'relative'

    }


});