import React, { useEffect, useRef, useState, useContext } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import {
    QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT,
    data_completa, data_completa_ingles
} from '../CALCULO_E_FORMATACAO/FORMATACAO';



import Estilo from '../estilo';

import Pay_aprovado_reprovado from './pay_aprovado_reprovado';


import Axios from 'axios';


import {
    ContainerPrincipal, ViewSeta, ViewTitulo_1, ViewButtons, ViewEspacoAltura, ViewBorda, ContainerValidadeEcodigo,
    Txt_1, Txt_2, Txt_3, Txt_4, Txt_5, Txt_6, Txt_7, Txt_8, Txt_9, Txt_10,
    TextInputMaskCaixa, TextInputCaixa,
    ButtonCancelarPagar,
    StyledIconFontAwesome
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

    var [codSeguranca, setcodSeguranca] = useState("");
    function codSegurancaF(codSeguranca) { setcodSeguranca(codSeguranca); }


    var [nomeCartao, setnomeCartao] = useState("");
    function nomeCartaoF(nomeCartao) { setnomeCartao(nomeCartao); }


    var [cpf_cnpjCard, setcpf_cnpjCard] = useState("");
    function cpf_cnpjCardF(cpf_cnpjCard) { setcpf_cnpjCard(cpf_cnpjCard); }

    var [menssagemStatusDaCompra, setMenssagemStatusDaCompra] = useState(false);



    var [compraAprovadaOuReprovadaRecebida, setCompraAprovadaOuReprovadaRecebida] = useState("");


    function ocultar_tela_de_mensagem() { setMenssagemStatusDaCompra(false); }




    async function executarPagamentoComCrediCard() {



        //AQUI SERÁ PROCESSADO O PAGAMENTO  NO MERCADO PAGO PARTE 1   ABAIXO



        //ALTERNANCIA DE ESTADOS USADO SOMENTE PARA TESTES ABAIXO
        var enviandoCondicao = "";
        var valor = Math.floor(Math.random() * 10);
        if (valor <= 5) {

            if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA === "PUBLICACAO" || VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA === "ATIVAR PUBLICAÇÃO" ) {
                // await VARIAVEL_GLOBAL.CONECTANDO_AO_BANCO_DE_DADOS_GLOBALMENTE;
                enviandoCondicao = "aprovado";
                await UPDATE_PLANO_DE_POSTAGEM_APOS_APROVACAO_();
            }else  if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA === "TAXA") {

                alert("UPDATE PARA COMPRA REQUERIDA AQUI !");

            }

        } else if (valor > 5) {
            enviandoCondicao = "reprovado";
        }
        //ALTERNANCIA DE ESTADOS USADO SOMENTE PARA TESTES ACIMA



        //AQUI SERÁ PROCESSADO O PAGAMENTO PARTE 2  e  FINAL   ABAIXO
        // alert("REALIZAR COMPRA COM O CARTÃO");
        setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
        setMenssagemStatusDaCompra(true);

    }




    async function UPDATE_PLANO_DE_POSTAGEM_APOS_APROVACAO_() {

        // alert( Object.values( dados_da_negociacao ) );
        // alert( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE) );
        // alert( dados_da_venda.numero_telefone_A );
        // alert( dados_da_venda.id_A );
        // alert( VARIAVEL_GLOBAL.tempoPostagem_G );
        // venda_status_J = 'aberta'
        // tempoPostagem_J = 360



        //1º
        if (typeof dados_da_venda.id_A === "undefined") {


            /***************************************/
            var response = "";

            //PRIMEIRA TENTATIVA ABAIXO
            try { //alert(IP_DO_SERVIDOR);
                //    console.log( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE).id_J  );
                //    console.log( VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J  );
                //    return 0;
                // response = await api.get('/obtendo_postagens_online', {
                //response = await Axios.get('http://192.168.0.102:3000/obtendo_postagens_online', {
                await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + "update_plano_de_postagem_pos_pagamento", {

                    params: {
                        data_J: data_completa_ingles(),
                        telefoneDoUsuario: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.numero_telefone_J,
                        id_J: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J,
                        venda_status_J: 'aberta',
                        tempoPostagem_J: VARIAVEL_GLOBAL.tempoPostagem_G
                        // tempoPostagem_J: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.tempoPostagem_J
                    }
                });

                var retorno_do_bd_contagem_de_postagem = await response.data;

                // alert( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // alert( retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS );
                // console.log( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS = retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS;

            } catch (exception) { alert(exception.message)/**/ }
            /***************************************/


        } else {


            //2º
            /***************************************/
            var response = "";

            //PRIMEIRA TENTATIVA ABAIXO
            try { //alert(IP_DO_SERVIDOR);
                // console.log(JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE));
                // return 0;
                // response = await api.get('/obtendo_postagens_online', {
                //response = await Axios.get('http://192.168.0.102:3000/obtendo_postagens_online', {
                await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + "update_plano_de_postagem_pos_pagamento", {

                    params: {
                        data_J: data_completa_ingles(),
                        telefoneDoUsuario: dados_da_venda.numero_telefone_A,
                        id_J: dados_da_venda.id_A,
                        venda_status_J: 'aberta',
                        tempoPostagem_J: VARIAVEL_GLOBAL.tempoPostagem_G
                    }
                });

                var retorno_do_bd_contagem_de_postagem = await response.data;

                // alert( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // alert( retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS );
                // console.log( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS = retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS;

            } catch (exception) { alert(exception.message)/**/ }
            /***************************************/



        }











    }




    return (

        <SafeAreaView style={[Estilo.App]} >

            <ScrollView style={{ width: '100%', height: 'auto', borderWidth: 0 }} >

                <ContainerPrincipal
                    alinhamento_horizontal={'center'}
                    largura={1}
                    altura={1}
                >


                    <ViewSeta onPress={() => {

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

                    <TextInputMaskCaixa largura={0.5}
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


                    <View
                        style={{
                            flexDirection: 'column',
                            width: '85%',
                            borderWidth: 0,
                            borderColor: '#fff',
                            /*backgroundColor: 'green'*/
                        }}

                    >


                        <Txt_2>Validade</Txt_2>
                        <TextInputMaskCaixa largura={0.2}
                            type={'datetime'}
                            options={{
                                format: 'MM/YY'
                            }}
                            value={dataValidade}
                            maxLength={5}
                            onChangeText={value => {
                                dataValidadeF(value);
                                // value = value.replace('.', '');
                                // value = value.replace(',', '.');
                                // dataValidadeF(Number(value));
                            }}
                        />


                        <View style={{ height: 20 }} />


                        <Txt_2>Código de Segurança</Txt_2>
                        <TextInputMaskCaixa largura={0.2}
                            type={'only-numbers'}
                            value={codSeguranca}
                            maxLength={4}
                            onChangeText={value => {
                                codSegurancaF(value);
                                // value = value.replace('.', '');
                                // value = value.replace(',', '.');
                                // codSegurancaF(Number(value));
                            }}
                        />

                    </View>



                    <ViewEspacoAltura />



                    <Txt_2>Nome Impresso no Cartão</Txt_2>

                    <TextInputCaixa
                        largura={0.5}
                        onChangeText={nomeCartaoF}
                    />


                    <ViewEspacoAltura />


                    <Txt_2>CPF/CNPJ do Titular da Conta</Txt_2>

                    <TextInputMaskCaixa largura={0.5}

                        type={'cpf'}
                        value={cpf_cnpjCard}
                        maxLength={19}
                        onChangeText={value => {
                            cpf_cnpjCardF(value);
                        }}
                    />


                    <ViewButtons>


                        <ButtonCancelarPagar cor_fundo={'#FF5353'}

                            onPress={async () => {
                                // alert("CANCELAR COMPRA COM CARTÃO");
                                setMenssagemStatusDaCompra(false);
                                navigation.goBack(null);
                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >Cancelar</Text>
                        </ButtonCancelarPagar>

                        <ButtonCancelarPagar cor_fundo={'#36BE54'}
                            onPress={async () => {

                                executarPagamentoComCrediCard();

                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >Pagar</Text>
                        </ButtonCancelarPagar>


                    </ViewButtons>



                </ContainerPrincipal>


            </ScrollView>

            {menssagemStatusDaCompra && (<Pay_aprovado_reprovado
                compraAprovadaOuReprovadaRecebid={compraAprovadaOuReprovadaRecebida}
                ocultar_tela_de_mensagem={ocultar_tela_de_mensagem}
                executarPagamentoComCrediCard={executarPagamentoComCrediCard}
            />)}

        </SafeAreaView>


    );



}





