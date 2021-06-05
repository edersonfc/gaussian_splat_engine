import React, { useEffect, useRef, useState, useContext } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT } from '../CALCULO_E_FORMATACAO/FORMATACAO';

import {
    ContainerPrincipal, ViewSeta, ViewTitulo_1, ViewTitulo_2, ViewTaxa, ViewEspacoAltura, ViewBorda, ViewFinal,
    Txt_1, Txt_2, Txt_3, Txt_4, Txt_5, Txt_6, Txt_7, Txt_8, Txt_9, Txt_10,
    ButtonCartao, ButtonGerarBoleto,
    StyledIconFontAwesome, StyledIconFontAwesome_2
} from './screen_pay_css';




export default function Screen_pay(params) {


    const navigation = useNavigation();

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // alert( JSON.stringify( params.route.params.propostas ) );
    var dados_da_negociacao = JSON.stringify(params.route.params.propostas);


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



    return (

        <ContainerPrincipal>

            <ViewSeta onPress={() => {

                // alert("Voltar pra Tela Anterior");
                // navigation.navigate("Screen_pay",{propostas});
                navigation.goBack(null);

            }} >
                <StyledIconFontAwesome name='arrow-left' />
            </ViewSeta>

            <ViewTitulo_1><Txt_1>Valor cobrado pela GadoApp</Txt_1></ViewTitulo_1>

            <ViewTitulo_2><Txt_2>Nessa Operação.</Txt_2></ViewTitulo_2>

            <ViewEspacoAltura />

            <ViewTaxa>
                <Txt_3>{TAXA}</Txt_3>
            </ViewTaxa>

            <ViewEspacoAltura />
            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_4>
                Escolha a Forma de Pagamento
            </Txt_4>

            <ViewBorda />

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <ButtonCartao onPress={() => {

                // alert("Pagar com Cartão de Débito");
                navigation.navigate("pay_credity_card",{dados_da_negociacao});


            }} >
                <StyledIconFontAwesome_2 name='credit-card' />
                <Txt_5> Cartão de Débito </Txt_5>
            </ButtonCartao>

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <ButtonGerarBoleto onPress={() => {

                alert("Gerar Boleto");


            }} >

                <StyledIconFontAwesome_2 name='barcode' />
                <Txt_6>Gerar Boleto   </Txt_6>


            </ButtonGerarBoleto>

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            <Txt_7>Amigo Pecuarista</Txt_7>

            <ViewEspacoAltura />

            <ViewFinal>

                <Txt_8> Não divulgamos e não utilizamos</Txt_8>
                <Txt_8> seus dados para quaisquer outras</Txt_8>
                <Txt_8> finalidades que não esteja dentro</Txt_8>
                <Txt_8> da Lei de Proteção de Dados !</Txt_8>

                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center' }} >
                    <Txt_9>Lei nº</Txt_9>
                    <Txt_10> 13.709 </Txt_10>
                </View>

            </ViewFinal>



        </ContainerPrincipal>

    );



}





