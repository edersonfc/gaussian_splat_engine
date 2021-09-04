import React, { useEffect, useRef, useState, useContext } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT } from '../CALCULO_E_FORMATACAO/FORMATACAO';


import Estilo from '../estilo';


import {
    View_1, View_2, View_3, View_4,
    Txt_1, Txt_2,
    ButtonCancelarTentarNovamente, cor_fundo,
    StyledIconFontAwesome
} from './pay_aprovado_reprovado_css'


var LARGURA = Math.round(Dimensions.get('window').width);
var ALTURA = Math.round(Dimensions.get('window').height);

export default function pay_aprovado_reprovado(params) {


    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    const navigation = useNavigation();

    var compraAprovadaOuReprovada = params.compraAprovadaOuReprovadaRecebid;
    // alert( JSON.stringify(params) );
    // alert( compraAprovadaOuReprovada );



    var [compraAprovada, setCompraAprovada] = useState(false);
    var [compraReprovada, setCompraReprovada] = useState(false);



    useEffect(() => {

        // var valor = Math.floor(Math.random() * 10);

        if (compraAprovadaOuReprovada == "aprovado") {

            setCompraAprovada(true);
            setCompraReprovada(false);

        } else if (compraAprovadaOuReprovada == "reprovado") {

            setCompraAprovada(false);
            setCompraReprovada(true);

        }


        // },[]);
    });












    return (

        //1
        <View_1
            largura={LARGURA}
            altura={ALTURA}
        >


            {/* 2 */}
            <View_2
                largura={LARGURA}
                altura={(ALTURA * 0.4)}
            >

                {compraAprovada && (

                    //3
                    <View_3
                        largura={LARGURA}
                        altura={(ALTURA * 0.4)}
                        cor_fundo={'#36BE54'}
                    >

                        <StyledIconFontAwesome largura={50} altura={(50)} name='check-circle' />

                        <Txt_1
                            largura={(LARGURA * 0.90)}
                        >
                            {/* Pagamento Realizado com Sucesso */}
                            A Publicação foi Ativada para que Outros Pecuaristas possam ver
                        </Txt_1>

                        {/* 4 */}
                        <View_4 altura={30} />

                        <ButtonCancelarTentarNovamente
                            largura={(LARGURA * 0.4)}
                            altura={50}
                            cor_fundo={'#36BE54'}

                            onPress={() => {

                                if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "ATIVAR PUBLICACAO") {

                                    VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "";
                                    VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = true;
                                    navigation.goBack(null);
                                    navigation.goBack(null);
                                    navigation.goBack(null);
                                    navigation.goBack(null);


                                } else if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "TAXA") {

                                    VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "";
                                    VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = true;
                                    navigation.goBack(null);
                                    navigation.goBack(null);
                                    // navigation.goBack(null);


                                } else if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "PUBLICACAO") {

                                    VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "";
                                    VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = true;

                                    //ADCIONADO 02/08/2021
                                    VARIAVEL_GLOBAL.INDICE_GLOBAL_IMAGENS_VIDEOS = -1;
                                    VARIAVEL_GLOBAL.CONTADOR_GLOBAL = 55;

                                    //DESATIVADO ABAIXO 02/08/2021  1 DESATIVADO TROCADO POR #$8654
                                    // navigation.goBack(null);
                                    // navigation.goBack(null);
                                    // navigation.goBack(null);
                                    // navigation.goBack(null);

                                //    navigation.navigate("TelaPrincipal", null);  2  DESATIVADO #$8654   TROCADO PELAS LINHAS ABAIXO #%&5432

                                   // ADICIONADO EM 03092021   => #%&5432  CÓDIGO REFERENCIA
                                   VARIAVEL_GLOBAL.TELA_ATUAL = "Postar";
                                   VARIAVEL_GLOBAL.TELA_ORIGEM = "Principal";
                                   VARIAVEL_GLOBAL.TELA_TERCEIRA = "nenhuma";
                                   VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length = 0;
                                   VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT.length = 0;
                                   VARIAVEL_GLOBAL.PUBLICACAO_EM_PROCESSO = "NAO_ENVIADO";
                                   // var URL_FOTOS = "file:///zerar_postagem";
                                   // var URL_VIDEOS = "file:///";
                                   let URL_FOTOS  = "";
                                   let URL_VIDEOS = "";
                                   navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS, });

                                   

                                }
                            }}

                        >

                            <Txt_2
                                largura={(LARGURA * 0.4)}
                                altura={30}
                            >
                                Voltar Inicio
                            </Txt_2>

                        </ButtonCancelarTentarNovamente>

                    </View_3>

                )}





                {compraReprovada && (

                    //3
                    <View_3
                        largura={LARGURA}
                        altura={(ALTURA * 0.4)}
                        cor_fundo={'#FF5353'}

                    >
                        <StyledIconFontAwesome largura={50} altura={(50)} name='times-circle' />

                        <Txt_1
                            largura={(LARGURA * 0.90)}
                        >
                            Houve Algum erro com o Seu Pagamento
                        </Txt_1>

                        {/* 4 */}
                        <View_4 altura={30} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between' }} >

                            <ButtonCancelarTentarNovamente
                                largura={(LARGURA * 0.4)}
                                altura={50}
                                cor_fundo={'#FF5353'}

                                onPress={() => {  /*navigation.goBack(null);*/ params.ocultar_tela_de_mensagem("cancelar"); }}

                            >

                                <Txt_2
                                    largura={(LARGURA * 0.4)}
                                    altura={30}
                                >
                                    Cancelar
                                </Txt_2>

                            </ButtonCancelarTentarNovamente>

                            <View style={{ width: '4%' }} />

                            <ButtonCancelarTentarNovamente
                                largura={(LARGURA * 0.5)}
                                altura={50}
                                cor_fundo={'#36BE54'}
                            >

                                <Txt_2
                                    largura={(LARGURA * 0.5)}
                                    altura={30}
                                    onPress={() => { 
                                       
                                        // params.executarPagamentoComCrediCard();
                                        params.ocultar_tela_de_mensagem("tentar_novamente");
                                    
                                    }}
                                >
                                    Tentar Novamente
                                </Txt_2>

                            </ButtonCancelarTentarNovamente>

                        </View>

                    </View_3>

                )}



            </View_2>




        </View_1>


    );


    // backgroundColor: '#FF5353'

}