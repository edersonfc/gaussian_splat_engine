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

import Pay_aprovado_reprovado from './pay_aprovado_reprovado';


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

    var [ menssagemStatusDaCompra, setMenssagemStatusDaCompra  ] = useState(false);


   
    var [ compraAprovadaOuReprovadaRecebida, setCompraAprovadaOuReprovadaRecebida  ] = useState("");


function ocultar_tela_de_mensagem(){  setMenssagemStatusDaCompra(false);  }

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
                                // alert("REALIZAR COMPRA COM O CARTÃO");
                                setCompraAprovadaOuReprovadaRecebida("reprovado");
                                setMenssagemStatusDaCompra(true);
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
                               />)}
        
        </SafeAreaView>


    );



}





