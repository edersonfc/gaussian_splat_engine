import React, { useEffect, useRef, useState, useContext } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT } from '../CALCULO_E_FORMATACAO/FORMATACAO';

// import {
//     ContainerPrincipal, ViewSeta, ViewTitulo_1, ViewTitulo_2, ViewTaxa, ViewEspacoAltura, ViewBorda, ViewFinal,
//     Txt_1, Txt_2, Txt_3, Txt_4, Txt_5, Txt_6, Txt_7, Txt_8, Txt_9, Txt_10,
//     ButtonCartao, ButtonGerarBoleto,
//     StyledIconFontAwesome, StyledIconFontAwesome_2
// } from './screen_pay_css';


import {
    ContainerPrincipal, ViewSeta, ViewTitulo_1, ViewTitulo_2, ViewTaxa, ViewEspacoAltura, ViewBorda, ViewFinal,
    Txt_1, Txt_2, Txt_3, Txt_4, Txt_5, Txt_6, Txt_7, Txt_8, Txt_9, Txt_10,
    TextInputMaskCaixa,
    ButtonCartao, ButtonGerarBoleto,
    StyledIconFontAwesome, StyledIconFontAwesome_2
} from './pay_credity_card_css';


// import { TextInputMask } from 'react-native-masked-text';


export default function pay_credity_card(params) {


    const navigation = useNavigation();

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // alert( JSON.stringify( params.route.params.propostas ) );
    var dados_da_negociacao = JSON.stringify(params.route.params.dados_da_negociacao);


    // alert(   JSON.stringify(  VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  )  );
    var dados_da_venda = JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE);


    dados_da_negociacao = JSON.parse(dados_da_negociacao);
    dados_da_venda = JSON.parse(dados_da_venda);


    // alert( Object.values( dados_da_negociacao ) );
    // alert( Object.values( dados_da_venda ) );

    // alert( Object.keys( dados_da_negociacao ) );
    // alert( Object.keys( dados_da_venda ) );



    // // CALCULOS ABAIXO

    //     // alert(dados_da_venda.precoSugerido_J+"  |  "+dados_da_venda.quantidadeCabecasOuPesos_J);
    //     alert( QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J  ) );
    //     var a = MOEDA_P_DOUBLE_OU_FLOAT(QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J ));
    //     alert( (a * 1.5) / 100 );

    // // CALCULOS ACIMA

    var TAXA = "R$ 149,99"

    // var [dataValidade, set dataValidade ] = useState("");
    // function dataValidade F(dataValidade) { set dataValidade  (dataValidade); }

    var [numeroCredCard, setnumeroCredCard] = useState("");
    function numeroCredCardF(numeroCredCard) { setnumeroCredCard(numeroCredCard); }

    var [dataValidade, setdataValidade] = useState("");
    function dataValidadeF(dataValidade) { setdataValidade(dataValidade); }

        var [codSeguranca, setcodSeguranca ] = useState("");
    function codSegurancaF(codSeguranca) { setcodSeguranca  (codSeguranca); }


        var [nomeCartao, setnomeCartao ] = useState("");
    function nomeCartaoF(nomeCartao) { setnomeCartao  (nomeCartao); }


        var [cpf_cnpjCard, setcpf_cnpjCard ] = useState("");
    function cpf_cnpjCardF(cpf_cnpjCard) { setcpf_cnpjCard  (cpf_cnpjCard); }



    return (

        <ContainerPrincipal>

            <ViewSeta onPress={() => {

                // alert("Voltar pra Tela Anterior");
                // navigation.navigate("Screen_pay",{propostas});
                navigation.goBack(null);

            }} >
                <StyledIconFontAwesome name='arrow-left' />
            </ViewSeta>

            <ViewTitulo_1><Txt_1>Adicionar cartão de Débito</Txt_1></ViewTitulo_1>

            <ViewBorda />

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_2>Número do Cartão</Txt_2>

            <TextInputMaskCaixa
                type={'credit-card'}
                value={numeroCredCard}
                maxLength={19}
                onChangeText={value => {
                    numeroCredCardF(value);
                    // value = value.replace('.', '');
                    // value = value.replace(',', '.');
                    // numeroCredCardF(Number(value));
                }}
            />

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_2>Validade</Txt_2>

            <TextInputMaskCaixa
                type={'custom'}
                value={dataValidade}
                maxLength={19}
                onChangeText={value => {
                    dataValidadeF(value);
                    // value = value.replace('.', '');
                    // value = value.replace(',', '.');
                    // dataValidadeF(Number(value));
                }}
            />


            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_2>Código de Segurança</Txt_2>

            <TextInputMaskCaixa  Style={{width:'30%'}}
                type={'only-numbers'}
                value={codSeguranca}
                maxLength={19}
                onChangeText={value => {
                    codSegurancaF(value);
                    // value = value.replace('.', '');
                    // value = value.replace(',', '.');
                    // dataValidadeF(Number(value));
                }}
            />


            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_2>Nome Impresso no Cartão</Txt_2>

            <TextInputMaskCaixa  Style={{width:'30%'}}
                type={'custom'}
                value={nomeCartao}
                maxLength={19}
                onChangeText={value => {
                    nomeCartaoF(value);
                    // value = value.replace('.', '');
                    // value = value.replace(',', '.');
                    // dataValidadeF(Number(value));
                }}
            />


            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_2>CPF/CNPJ do Titular da Conta</Txt_2>

            <TextInputMaskCaixa  Style={{width:'30%'}}
                type={'custom'}
                value={cpf_cnpjCard}
                maxLength={19}
                onChangeText={value => {
                    cpf_cnpjCardF(value);
                    // value = value.replace('.', '');
                    // value = value.replace(',', '.');
                    // dataValidadeF(Number(value));
                }}
            />





        </ContainerPrincipal>

    );



}





