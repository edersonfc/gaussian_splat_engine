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


// var TAXA = "R$ 149,99"
var TAXA = ""


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


    //RAAAWWW
    // alert(  JSON.stringify(  VARIAVEL_GLOBAL.tempoPostagem_G )  );
    // alert(typeof VARIAVEL_GLOBAL.tempoPostagem_G);

    var TXT_QUANTIDADE_MESES_DE_ANUNCIOS = "";
    if (VARIAVEL_GLOBAL.tempoPostagem_G === 30) {

        TXT_QUANTIDADE_MESES_DE_ANUNCIOS = " 1 Mês de ";

    } else if (VARIAVEL_GLOBAL.tempoPostagem_G === 90) {

        TXT_QUANTIDADE_MESES_DE_ANUNCIOS = " 3 Mêses de ";

    } else if (VARIAVEL_GLOBAL.tempoPostagem_G === 180) {

        TXT_QUANTIDADE_MESES_DE_ANUNCIOS = " 6 Mêses de ";

    } else if (VARIAVEL_GLOBAL.tempoPostagem_G === 360) {

        TXT_QUANTIDADE_MESES_DE_ANUNCIOS = " 12 Mêses de ";

    }
    // alert( TXT_QUANTIDADE_MESES_DE_ANUNCIOS );




    //RAAAWWW
    // alert( VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO );
    // alert( VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA );
    // VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = dados_da_negociacao;
    // // console.log( VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO );
    // console.log( Object.keys( VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO ) );



    // // CALCULOS ABAIXO

    //     // alert(dados_da_venda.precoSugerido_J+"  |  "+dados_da_venda.quantidadeCabecasOuPesos_J);
    //     alert( QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J  ) );
    //     var a = MOEDA_P_DOUBLE_OU_FLOAT(QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J ));
    //     alert( (a * 1.5) / 100 );

    // // CALCULOS ACIMA



    // alert( JSON.stringify( dados_da_negociacao ) );

    var chave = Object.keys(dados_da_negociacao);

    // alert(chave);

    if (chave.includes("valor_do_plano")) {

        TAXA = dados_da_negociacao.valor_do_plano;
        //  alert(TAXA);

        // //RAAAWWW
        // // VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = dados_da_negociacao;
        const objetos_da_negociacao =
        {
            descricao_da_cobranca: TXT_QUANTIDADE_MESES_DE_ANUNCIOS+"Anuncio de Bovinos nessa Publicação",
            valor_do_plano: dados_da_negociacao.valor_do_plano,
            id_do_produto: dados_da_venda.id_J
        };
        // VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = JSON.parse( JSON.stringify(objetos_da_negociacao)  );
        VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = objetos_da_negociacao;
        // console.log( VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO);
        // console.log(Object.keys(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO));
        // console.log(JSON.stringify(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO)  );


    } else {

        //  alert( QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J  ) );

        var a = MOEDA_P_DOUBLE_OU_FLOAT(QUANTIDADES_VEZES_PRECOS(dados_da_venda.quantidadeCabecasOuPesos_J, dados_da_venda.precoSugerido_J));


        //  alert( (a * 1.5) / 100 );
        if (a >= 200000) {

            TAXA = "R$ 249,97"

        } else if (a > 99999 || a < 200000) {

            TAXA = "R$ 149,98"

        } else if (a < 99999 || a > 49999) {
            TAXA = "R$ 99,98"

        } else if (a < 50000) {

            TAXA = "R$ 69,99"

        }

        //RAAAWWW
        //   VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = dados_da_negociacao;
        const objetos_da_negociacao =
        {
            descricao_da_cobranca: "Taxa Cobrada Nessa Operação",
            valor_do_plano: TAXA,
            id_do_produto: dados_da_venda.id_J
        }
        VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO = objetos_da_negociacao;
        // console.log( VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO);
        // console.log(Object.keys(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO));
        // console.log(JSON.stringify(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO)  );

    }



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
                navigation.navigate("pay_credity_card", { dados_da_negociacao });


            }} >
                <StyledIconFontAwesome_2 name='credit-card' />
                <Txt_5> Realizar Pagamento </Txt_5>
                {/* <Txt_5> Cartão de Débito </Txt_5> */}
            </ButtonCartao>

            <ViewEspacoAltura />
            <ViewEspacoAltura />

            {/* <ButtonGerarBoleto onPress={() => {
                alert("Gerar Boleto");
            }} >
                <StyledIconFontAwesome_2 name='barcode' />
                <Txt_6>Gerar Boleto   </Txt_6>
            </ButtonGerarBoleto> */}

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





