import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Animated } from 'react-native'
import { color } from 'react-native-reanimated';

// import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import GlobalContext from '../context/UsersContext';





export default function LicencaExpirada(param) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);


    //ANIMAÇÃO DA TELA ABAIXO
    const [largura, setLargura] = useState(new Animated.Value(0));
    const [visivel_falso_true, setVisivel_falso_true] = useState(false);
    // var SETENTA_PORCENTO_LARGURA_TELA = ((Largura_total_da_tela * 80) / 100);

    useEffect(async () => {

        Animated.timing(
            largura,
            {
                toValue: Math.round(Dimensions.get('window').width),
                duration: 1000,
                useNativeDriver: false
            }

        )
            .start(({ finished }) => {
                // completion callback
                setVisivel_falso_true(true);
            });

    }, []);
    //ANIMAÇÃO DA TELA ACIMA





    return (


        <View style={[estilo.VIEW_1]} >

            <Animated.View style={[estilo.VIEW_2, style = { width: largura }]} >

                {visivel_falso_true && (
                    <View style={[estilo.VIEW_3]}>

                        <Text style={[estilo.TEXT_1]}>Amigo Pecuarista.</Text>
                        <Text style={[estilo.TEXT_2]}>Não Constamos o Pagamento de Sua Mensalidade !</Text>
                        <Text style={[estilo.TEXT_3]}>Entre em Contato pelo </Text>
                        <Text style={[estilo.TEXT_4]}>Fone: (67) 99324-4226</Text>
                        <Text style={[estilo.TEXT_3]}>Ou</Text>
                        <Text style={[estilo.TEXT_4]}>Email: edersonfc7@gmail.com</Text>

                        <View style={{ height: '5%' }} />

                        <TouchableOpacity style={[estilo.BOTAO_1]}
                            onPress={() => {

                                param.REMOTO_MOSTRAR_TELA_EXPIRACAO_LICENCA();

                            }}
                        >
                            <Text style={[estilo.TEXT_5]} >Fechar</Text>
                        </TouchableOpacity>

                    </View>)}

            </Animated.View>

        </View>


    )





}

var BACKGROUND_COR = 'rgb(255,255,255)';
BACKGROUND_COR = 'rgb(245,245,245)';
// BACKGROUND_COR = 'rgb(235,235,235)';
// BACKGROUND_COR = 'rgb(225,225,225)';
// BACKGROUND_COR = 'rgb(211,211,211)';


const estilo = StyleSheet.create({

    VIEW_1: {

        width: '100%',
        height: Math.round(Dimensions.get('window').height),
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
        backgroundColor: BACKGROUND_COR,

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
        color: 'rgba(0,0,0,0.3)'

    },

    TEXT_2: {

        borderWidth: 0,
        textAlign: 'center',
        fontSize: 20,
        color: 'rgba(210,105,30,0.8)',

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