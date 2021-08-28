import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Animated, Easing } from 'react-native';

import GlobalContext from '../context/UsersContext';

import Icon from 'react-native-vector-icons/FontAwesome';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";



export default function StatusInfoCompraVenda() {

    const [vendedor_ou_comprador, setVendedor_ou_comprador] = useState(true);

    const [numeroCelularComprador, setNumeroCelularComprador] = useState("");

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    useEffect(() => {


        if (VARIAVEL_GLOBAL.STATUS_DA_VENDA_OU_COMPRA === 'Status da Venda') {

            setVendedor_ou_comprador(true);

            // alert( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.comprador_J) );
            setNumeroCelularComprador(JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.comprador_J));

        } else if (VARIAVEL_GLOBAL.STATUS_DA_VENDA_OU_COMPRA === 'Status da Compra') {

            setVendedor_ou_comprador(false);
        }


    }, []);


    return (

        <View style={[estilo.CONTAINER]}>

            {vendedor_ou_comprador ?

                <View>

                    <View style={[estilo.VIEW_1]} >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 }} >Negociação Solicitada</Text>
                    </View>

                    <View style={[estilo.TEXT_1]}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }} >{"\n"}Amigo Pecuarista</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }} >{"\n"}Entre em Contato com o Comprador pelo</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }} >Fone: {numeroCelularComprador}</Text>

                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 19 }} >{"\n"}Procure sempre tirar todas as Dúvidas com o Comprador,</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}  >usando a própria ferramenta de Comunicação disponibilizada no próprio aplicativo,</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }} >se possivel para sua maior certeza e segurança, faça uma vídeo chamada com o mesmo, se utilizando de outros meios como Whatzap.</Text>


                    </View>

                </View>

                :

                <View>

                    <View style={[estilo.VIEW_1]} >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 }} >Negociação Solicitada</Text>
                    </View>

                    <View style={[estilo.TEXT_1]}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }} >{"\n"}Amigo Pecuarista</Text>
                        <Text style={{ height: 50, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 22, borderWidth: 1 }} >O Vendedor Entrará em Contato</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 19 }} >Procure sempre tirar todas as Dúvidas com o Vendedor,</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}  >usando a própria ferramenta de Comunicação disponibilizada no próprio aplicativo,</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }} >se possivel para sua maior certeza e segurança, faça uma vídeo chamada com o mesmo, se utilizando de outros meios como Whatzap.</Text>
                    </View>

                </View>

            }

        </View>


    )

}



const estilo = StyleSheet.create({



    CONTAINER: {

        width: '95%',
        height: 500,
        position: 'absolute',
        // paddingBottom: 50,

        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        backgroundColor: 'rgb(34,43,54)',
    },


    VIEW_1: {

        width: '100%',
        height: 60,
        borderWidth: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgb(62,90,106)',

        justifyContent: 'center'
    },

    TEXT_1: {

        width: '100%',
        height: '85%',
        borderWidth: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        // backgroundColor: 'rgb(62,90,16)',
        // justifyContent: 'center'
    }
});