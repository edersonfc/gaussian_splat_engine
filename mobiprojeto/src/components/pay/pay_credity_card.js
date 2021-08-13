import React, { useEffect, useRef, useState, useContext } from 'react';

import {
    AppRegistry, LogBox, ActivityIndicator, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated, View
} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';


//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import {
    QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT,
    data_completa, data_completa_ingles, data_hora_e_segundo_completo_ingles
    , data_hora_e_segundo_completo, REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE, REGULARIZANDO_HORAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE
} from '../CALCULO_E_FORMATACAO/FORMATACAO';



import Estilo from '../estilo';

import Pay_aprovado_reprovado from './pay_aprovado_reprovado';

import TelaAguardeProcessamentoPagamento from './telaAguardeProcessamentoPagamento'


import Axios from 'axios';


import {
    ContainerPrincipal, ViewSeta, ViewTitulo_1, ViewButtons, ViewEspacoAltura, ViewBorda, ContainerValidadeEcodigo,
    Txt_1, Txt_2, Txt_3, Txt_4, Txt_5, Txt_6, Txt_7, Txt_8, Txt_9, Txt_10,
    TextInputMaskCaixa, TextInputCaixa,
    ButtonCancelarPagar,
    StyledIconFontAwesome
} from './pay_credity_card_css';


//npm install react-native-webview
import { WebView } from 'react-native-webview';

import Waiting from '../Waiting';

// import { Card } from 'react-native-paper';
function LoadingIndicatorView() {
    return <ActivityIndicator color='#009b88' size='large' />
}

// import { TextInputMask } from 'react-native-masked-text';


// import WebViewBridge from 'react-native-webview-bridge';

// var WebViewBridge = require('react-native-webview-bridge');

// var dados_da_negociacao_publica = "";


var dados_da_negociacao = "";
var dados_da_venda = "";


var segundo = 0;


var dados_do_tentar_novamente;


export default function pay_credity_card(params) {


    const [dados_da_negociacao_publica, setDados_da_negociacao_publica] = useState();


    const navigation = useNavigation();

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // alert( JSON.stringify( params.route.params.propostas ) );
    dados_da_negociacao = JSON.stringify(params.route.params.dados_da_negociacao);



    // alert(   JSON.stringify(  VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  )  );
    dados_da_venda = JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE);


    dados_da_negociacao = JSON.parse(dados_da_negociacao);
    dados_da_venda = JSON.parse(dados_da_venda);


    dados_do_tentar_novamente = dados_da_negociacao;


    // alert( Object.values( dados_da_negociacao ) );
    //  alert( Object.values( dados_da_venda ) );

    // alert( Object.keys( dados_da_negociacao ) );
    // alert( Object.keys( dados_da_venda ) );


    // alert(  Object.keys( dados_da_negociacao_publica ) );
    // alert(  Object.values( dados_da_negociacao_publica ) );
    // alert(   dados_da_negociacao_publica.valor_do_plano );



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


    var [menssagemProcessamento, setMenssagemProcessamento] = useState(false);


    var [compraAprovadaOuReprovadaRecebida, setCompraAprovadaOuReprovadaRecebida] = useState("");


    async function ocultar_tela_de_mensagem(parametro) {

        setMenssagemStatusDaCompra(false);

        if (parametro.includes("cancelar")) {

            // alert("VAI CANCELAR A COMPRA");
            navigation.goBack(null);
            navigation.goBack(null);
            navigation.goBack(null);

        } else if (parametro.includes("tentar_novamente")) {

            // alert("TENTAR COMPRAR NOVAMENTE");
            // //TENTANDO COLOCAR MAIS ATRIBUTOS NO OBJETO JSON ABAIXO
            // for (var i = 0; i < dados_do_tentar_novamente.length; i++) {
            // dados_do_tentar_novamente[i] = { ...dados_do_tentar_novamente[i], bate_e_volta:"go_to_pay_credity_card" };
            // }
            var json_with_atributy_add = await AsynFunctionAddMoreAtributyInJson(dados_do_tentar_novamente)

            var propostas = json_with_atributy_add;
            //  //TENTANDO COLOCAR MAIS ATRIBUTOS NO OBJETO JSON ACIMA

            //Linha Abaixo Delay de 3 Segundos
            // await new Promise((resolve) => setTimeout(resolve, 2000));

            navigation.navigate("Screen_pay", { propostas });
        }

    }




    var AsynFunctionAddMoreAtributyInJson = function (parametro_a_resolver) {

        parametro_a_resolver.bate_e_volta = "go_to_pay_credity_card";

        return new Promise(function (resolve) {
            // setTimeout(function () {
            //     resolve(['comedy', 'drama', 'action'])
            // }, 2000);
            resolve(parametro_a_resolver);
        });
    }





    async function executarPagamentoComCrediCard(status_do_pagamento) {

        setMenssagemProcessamento(true);

        //AQUI SERÁ PROCESSADO O PAGAMENTO  NO MERCADO PAGO PARTE 1   ABAIXO

        //PROCESSANDO PAGAMENTO REMOTO SERVIDOR MERCADO PAGO ABAIXO





        // numeroCredCard = "1234 5678 9012 3456";
        // dataValidade = "09/22";
        // codSeguranca = "1234";
        // nomeCartao = "EDERSON FELICIANO CORSATTO";
        // cpf_cnpjCard = "993.712.351-87";

        // // alert(
        // //     numeroCredCard + "\n" +
        // //     dataValidade + "\n" +
        // //     codSeguranca + "\n" +
        // //     nomeCartao + "\n" +
        // //     cpf_cnpjCard
        // // );

        // var data = new FormData();
        // data.append("Nome", "Ederson Feliciano Corsatto");
        // data.append("Senha", "19591959");









        // TENTATIVA 1 FUNCIONAOU COM SUCESSO SEM SER SERVIDOR DO MERCADO PAGO  //////////////////////////////////////////////////////////////////////////////////////////////////
        // try {

        //     await fetch('http://192.168.0.107:3000/process_payment', {

        //         method: 'post',
        //         mode: 'no-cors',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(
        //             {
        //             // username: 'EDERSON FELICINAO CORSATTO',
        //             data,
        //             }
        //         )
        //     })
        //       // ;
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             console.log('response object:', responseJson);
        //             // alert(responseJson);
        //             alert("SUCESSO => " + JSON.stringify(responseJson));
        //         })
        //         .catch((error) => {
        //             // console.error(error);
        //             alert("FRACASSOU => " + JSON.stringify(error));
        //         });

        // } catch (e) {
        //     // console.log("errosssss "+e);
        //     alert("errosssss " + e);

        // }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // var loading = true;
        // if (loading) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //             <Text style={{ color: 'blue', fontSize: 15 }} >Carregando...</Text>
        //         </View>
        //     );
        // }//if






        // // TENTATIVA 2 FUNCIONAOU COM SUCESSO //////////////////////////////////////////////////////////////////////////////////////////////////
        // try {

        //     await fetch('http://192.168.0.107:3000/process_payment', {
        //         // await fetch('http://192.168.0.107:8080/process_payment', {

        //         method: 'post',
        //         mode: 'no-cors',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(
        //             {
        //                 // data,
        //                 numeroCredCard: "1234 5678 9012 3456",
        //                 dataValidade: "09/22",
        //                 codSeguranca: "1234",
        //                 nomeCartao: "EDERSON FELICIANO CORSATTO",
        //                 cpf_cnpjCard: "993.712.351-87",
        //             }
        //         )
        //     })
        //         // ;
        //         .then((response) => response.json())
        //         .then(async (responseJson) => {
        //             console.log('response object:', responseJson);

        //             //Criando uma Delay com Promisse Abaixo
        //             // await new Promise((resolve) => setTimeout(resolve, 3000));//COLOCADO UM DELAY SÓ POR TESTE

        //             // alert(responseJson);
        //             alert("SUCESSO => " + JSON.stringify(responseJson));
        //             setMenssagemProcessamento(false);
        //         })
        //         .catch(async (error) => {
        //             // console.error(error);

        //             //Criando uma Delay com Promisse Abaixo
        //             // await new Promise((resolve) => setTimeout(resolve, 3000));//COLOCADO UM DELAY SÓ POR TESTE
        //             alert("FRACASSOU => " + JSON.stringify(error));
        //         });

        // } catch (e) {
        //     // console.log("errosssss "+e);
        //     alert("errosssss " + e);

        // }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // return 0;
        //PROCESSANDO PAGAMENTO REMOTO SERVIDOR MERCADO PAGO ACIMA




        //ALTERNANCIA DE ESTADOS USADO SOMENTE PARA TESTES ABAIXO
        var enviandoCondicao = "";
        // var valor = Math.floor(Math.random() * 10);
        // valor = 4;
        // if (valor <= 5) {//AQUI É SE FOR APROVADO A COMPRA
        if (status_do_pagamento.toString() === "aprovado") {//AQUI É SE FOR APROVADO A COMPRA

            if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "PUBLICACAO" || VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "ATIVAR PUBLICACAO") {


                /***************************************************************/
                var tamanho = -1;
                myLoop();  //  start the loop

                var i = 1;                  //  set your counter to 1
                function myLoop() {         //  create a loop function
                    setTimeout(async function () {   //  call a 3s setTimeout when the loop is called
                        tamanho = await VERIFICANDO_SE_POSTAGEM_EXISTE();
                        i++;                    //  increment the counter
                        if (tamanho <= 0) {

                            // console.log("Valor do i => " + i + "  Tamanho =>" + tamanho);
                            myLoop();
                        } else {
                            setMenssagemProcessamento(false);
                            // console.log("Valor do i => " + i + "  Tamanho =>" + tamanho);
                            enviandoCondicao = "aprovado";
                            await UPDATE_PLANO_DE_POSTAGEM_APOS_APROVACAO_();
                            // console.log("Terminou o Loop");
                            setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
                            setMenssagemStatusDaCompra(true);

                        }   //  ..  setTimeout()
                    }, 3000)
                }
                /***************************************************************/




            } else if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "TAXA") {

                setMenssagemProcessamento(false);
                // alert("UPDATE PARA COMPRA REQUERIDA AQUI !");
                enviandoCondicao = "aprovado";
                VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "TAXA";
                // await UPDATE_PLANO_DE_POSTAGEM_APOS_APROVACAO_();
                ACEITAR_PROPOSTA_FUNCAO(1);
                setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
                setMenssagemStatusDaCompra(true);

            } else if (VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA == "TAXAQQQ") {


            }


            // } else if (valor > 5) { //AQUI É SE FOR REPROVADO A COMPRA
        } else if (status_do_pagamento.toString() === "reprovado") { //AQUI É SE FOR REPROVADO A COMPRA
            setMenssagemProcessamento(false);
            enviandoCondicao = "reprovado";
            setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
            setMenssagemStatusDaCompra(true);
        }
        //ALTERNANCIA DE ESTADOS USADO SOMENTE PARA TESTES ACIMA


        // setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
        // setMenssagemStatusDaCompra(true);


    }




    async function VERIFICANDO_SE_POSTAGEM_EXISTE() {

        // console.log(segundo);
        // if (segund >= 20) {


        if (typeof dados_da_venda.id_J === "undefined") {


            /***************************************/
            try {

                const response = await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'se_postagem_esta_online', {
                    params: {
                        numero_telefone_J: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.numero_telefone_J,
                        // id_J: "QWT" + VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J
                        id_J: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J
                    }
                });

                // alert("ESSE É O QUE TÁ RETORNANDO ...1 !");
                // return 0;
                return response.data.length;
                // return response.data;
                // alert(response.data.length);
                // return 0;

            } catch (error) { /**/alert("erro no axios ¨%$367 " + error) }
            /***************************************/


        } else {


            /***************************************/
            try {

                const response = await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'se_postagem_esta_online', {
                    params: {
                        numero_telefone_J: dados_da_venda.numero_telefone_J,
                        // id_J: "QWT" + dados_da_venda.id_J
                        id_J: dados_da_venda.id_J
                    }
                });

                // alert("ESSE É O QUE TÁ RETORNANDO ...2 !");
                // return 0;
                return response.data.length;
                // return response.data;
                // alert(response.data.length);
                // return 0;

            } catch (error) { /**/alert("erro no axios ¨%$3632 " + error) }
            /***************************************/

        }


        //     segundo = 0;
        // }//IF



    }








    async function UPDATE_PLANO_DE_POSTAGEM_APOS_APROVACAO_() {

        // alert( Object.values( dados_da_negociacao ) );
        // alert( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE) );
        // alert( dados_da_venda.numero_telefone_J );
        // alert( dados_da_venda.id_J );
        // alert( VARIAVEL_GLOBAL.tempoPostagem_G );
        // venda_status_J = 'aberta'
        // tempoPostagem_J = 360



        //1º
        if (typeof dados_da_venda.id_J === "undefined") {


            /***************************************/
            var response = "";

            //PRIMEIRA TENTATIVA ABAIXO
            try { //alert(IP_DO_SERVIDOR);
                //    console.log( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE).id_J  );
                //    console.log( VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J  );
                //    return 0;
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

            } catch (exception) { alert("&*%#YGHF " + exception.message)/**/ }
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
                        telefoneDoUsuario: dados_da_venda.numero_telefone_J,
                        id_J: dados_da_venda.id_J,
                        venda_status_J: 'aberta',
                        tempoPostagem_J: VARIAVEL_GLOBAL.tempoPostagem_G
                    }
                });

                var retorno_do_bd_contagem_de_postagem = await response.data;

                // alert( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // alert( retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS );
                // console.log( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
                // VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS = retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS;

            } catch (exception) { alert("78*754*( " + exception.message)/**/ }
            /***************************************/



        }


    }









    function FUNCAO_DELAY() {


    }











    //THIS IS TO GO REMAINING
    function ACEITAR_PROPOSTA_FUNCAO(index) {

        // console.log(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.numero_telefone_J);
        // console.log( JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE) ); NÃO USAR ESSE ESSE É TODO O CONTEUDO

        // alert(  dados_da_negociacao.conteudo_da_proposta  );
        // alert(  JSON.stringify(dados_da_negociacao)  ); //NÃO USAR ESSE ESSE É TODO O CONTEUDO

        // console.log(dados_da_negociacao);

        /***********************************************************************************************/

        var VENDEDOR = "";
        var COMPRADOR = "";
        var USUARIO_CELL = "";

        // var ID_PROPOSTAS      = propostasss[index].cod_automatico;  DESATIVADO
        // var ID_PROPOSTAS      = dados_da_negociacao.id_proposta; DESATIVADO
        var ID_PROPOSTAS = dados_da_negociacao.cod_automatico;

        // var topo_html = '<html><body>';  DESATIVADO E NÃO USADO NO OUTRO TAMBÉM
        // var bottom_html = '</body></html>'; DESATIVADO E NÃO USADO NO OUTRO TAMBÉM

        var RESPOSTAS = '';

        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ABAIXO
        // VENDEDOR =  propostasss[index].numero_telefone_vendedor;  DESATIVADO
        // COMPRADOR = propostasss[index].numero_telefone_comprador; DESATIVADO
        VENDEDOR = dados_da_negociacao.numero_telefone_comprador;
        COMPRADOR = dados_da_negociacao.numero_telefone_vendedor;
        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ACIMA


        let DATA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());
        let HORA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_HORAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());


        //SEM HTML ABAIXO
        RESPOSTAS =
            // propostasss[index].conteudo_da_proposta + DESATIVADO
            dados_da_negociacao.conteudo_da_proposta +
            "\n" +
            // '<a>' + "Vendedor" + "  " + data_hora_e_segundo_completo_ingles() + '</a>' +
            '<a>' + "Vendedor" + "  " + DATA_PORTUGUES_FORMATO_CORRETO + " - " + HORA_PORTUGUES_FORMATO_CORRETO + '</a>' +
            // conteudoDaResposta + DESATIVADO
            // dados_da_negociacao.conteudo_da_proposta +
            '<b> Proposta Aceita !</b>' +
            '<c> Compra e Venda Fechada</c>';

        //alert(RESPOSTAS);
        // param.funcao_resposta_da_proposta(ID_PROPOSTAS, RESPOSTAS, VENDEDOR, COMPRADOR);
        RESPOSTA_DE_PROPOSTAS(ID_PROPOSTAS, RESPOSTAS, VENDEDOR, COMPRADOR);

        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";


    }










    //THIS IS TO GO REMAINING 2
    async function RESPOSTA_DE_PROPOSTAS(id_resposta_proposta, resposta_da_proposta, VENDEDOR_R, COMPRADOR_R) {

        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

        var telefone_destino = "";

        if (VENDEDOR_R.toString() === VARIAVEL_GLOBAL.TELEFONE) {

            telefone_destino = COMPRADOR_R;

        } else { telefone_destino = VENDEDOR_R; }


        // var DEU_ERRO_SIM_NAO_TALVEZ = "TALVEZ"; DESATIVADO
        var DEU_ERRO_SIM_NAO_TALVEZ = "NAO";


        var telefone_do_usuario_txt = VARIAVEL_GLOBAL.TELEFONE.toString();
        telefone_do_usuario_txt = telefone_do_usuario_txt.replace(/([\[])|([\]])/g, '');



        try {
            //    await Axios.get(IP_DO_SERVIDOR + 'update_propostas', {
            await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'update_propostas', {

                params: {
                    id_resposta_proposta_J: id_resposta_proposta,
                    resposta_da_proposta_J: resposta_da_proposta,
                    telefone_do_usuario: telefone_do_usuario_txt,
                    telefone_destino: telefone_destino
                }
            })

        } catch (error) {

            alert(error)
            // alert("Já foi enviado a Resposta da Proposta");
            DEU_ERRO_SIM_NAO_TALVEZ = "SIM"

        } finally {


            // var numeroTLF = "(12)-3-4567-8901";
            var JSON_OBJETO_numero_telefone_comprador = { "NUMERO_CELL_J": "" + dados_da_negociacao.numero_telefone_comprador + "" }
            // console.log(JSON_OBJETO);


            if (DEU_ERRO_SIM_NAO_TALVEZ.toString() === "NAO") {

                await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'comprar_direto', {
                    params: {
                        numero_telefone_J: dados_da_negociacao.numero_telefone_vendedor,
                        id_J: VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J,
                        comprador_J: JSON_OBJETO_numero_telefone_comprador
                    }
                })

                    .then(() => {
                        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";
                        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;
                        alert("Acordo de Compra e Venda Aceita ! \n Entre em Contato com o Comprador !");
                    });

            }

            //AUDITORIA
            // alert( "Vendedor "+dados_da_negociacao.numero_telefone_vendedor+" || Comprador "+dados_da_negociacao.numero_telefone_comprador);




        }

    }//function RESPOSTA_DE_PROPOSTAS()




    // useEffect(() => {

    //     // setCompraAprovadaOuReprovadaRecebida(enviandoCondicao);
    //     setMenssagemStatusDaCompra(true);

    // }, [menssagemStatusDaCompra])








    async function ENVIANDO_DADOS_DOS_PRODUTOS_PAGINA_DO_WEBVIEW() {

        //   alert(  JSON.stringify( VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE )  );
        //   alert(  VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  );

        //   return 0;


        // TENTATIVA 2 FUNCIONAOU COM SUCESSO //////////////////////////////////////////////////////////////////////////////////////////////////
        try {

            await fetch('http://192.168.0.107:3000/dados_da_venda', {
                // await fetch('http://192.168.0.107:8080/process_payment', {

                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        // numeroCredCard: "1234 5678 9012 3456",
                        // dataValidade: "09/22",
                        // codSeguranca: "1234",
                        // nomeCartao: "EDERSON FELICIANO CORSATTO",
                        // cpf_cnpjCard: "993.712.351-87",

                        dadosProdutos: JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE)
                    }
                )
            })
                // ;
                .then((response) => response.json())
                .then(async (responseJson) => {
                    console.log('response object:', responseJson);

                    //Criando uma Delay com Promisse Abaixo
                    // await new Promise((resolve) => setTimeout(resolve, 3000));//COLOCADO UM DELAY SÓ POR TESTE

                    // alert(responseJson);
                    alert("SUCESSO => " + JSON.stringify(responseJson));
                    setMenssagemProcessamento(false);
                })
                .catch(async (error) => {
                    // console.error(error);

                    //Criando uma Delay com Promisse Abaixo
                    // await new Promise((resolve) => setTimeout(resolve, 3000));//COLOCADO UM DELAY SÓ POR TESTE
                    alert("FRACASSOU => " + JSON.stringify(error));
                });

        } catch (e) {
            // console.log("errosssss "+e);
            alert("errosssss " + e);

        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }






    useEffect(() => {
        // 06/07/2021
        setDados_da_negociacao_publica(dados_da_negociacao);
        LogBox.ignoreLogs(["Encountered an error loading page"]);

    }, []);

    // var valll =  JSON.stringify(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO);
    // var valll = VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO;








    //COLOCADO 09 07 2021 ESSES METODOS ABAIXO
    const [retorno_Webview, setRetorno_Webview] = useState();

    var onMessage = event => {
        const { data } = event.nativeEvent;
        // this.setState({ data });
        setRetorno_Webview({ data });

        // console.log("RETORNO DO WEBVIEW \n\n " + JSON.stringify(retorno_Webview));
    };


    const [waitingVisible, setWaitingisible] = useState(false);



    var VERFICAR_STATUS_DO_ON_ERROR_DO_WEBVIEW = (PARAMETRO_RETORNO) => {

        // alert( Object.values(PARAMETRO_RETORNO).toString() );
        // alert( typeof PARAMETRO_RETORNO );
        // alert(JSON.stringify(PARAMETRO_RETORNO));
        // var circularReference = PARAMETRO_RETORNO;
        // var OBJETO_JSON = JSON.stringify(circularReference, getCircularReplacer());
        // var OBJETO_JSON = stringifyObject(circularReference);
        // // alert(OBJETO_JSON);
        // console.log(Object.keys(PARAMETRO_RETORNO));

        // Encountered an error loading page
    }







    const webviewRef = React.useRef(null);

    r => this.webview = r

    useEffect(() => {

        // console.log( Object.keys( VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE ) ); 
        // console.log(  VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J );  
        // console.log(  VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE );  
        
    }, []);



    var handleWebViewNavigationStateChange = (newNavState) => {
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const { url } = newNavState;
        // if (!url) return;

        // // handle certain doctypes
        // if (url.includes('.pdf')) {
        //     WebView.stopLoading();
        //   // open a modal with the PDF viewer
        // }

        // // one way to handle a successful form submit is via query strings
        // if (url.includes('?message=success')) {
        //     WebView.stopLoading();
        //   // maybe close this view?
        // }

        // // one way to handle errors is via query string
        // if (url.includes('?errors=true')) {
        //     WebView.stopLoading();
        // }

        // // redirect somewhere else
        // if (url.includes('mercadopago')) {
        // // if (url.includes('google.com')) {
        //   const newURL = 'https://reactnative.dev/';
        //   const redirectTo = 'window.location = "' + newURL + '"';
        //   WebView.injectJavaScript(redirectTo);
        // }



        if (url.includes('mercadopago')) {
            // alert(url+"\n\n\nTEM LINK DO MERCADO PAGO");
        }

        if (url.includes('pagamento_aprovado')) {
            executarPagamentoComCrediCard("aprovado");
        }


        if (url.includes('pagamento_reprovado')) {
            executarPagamentoComCrediCard("reprovado");
        }

        // console.log(url);

    };



 



    return (


        //         //TELA ORIGINAL ABAIXO
        //         <SafeAreaView style={[Estilo.App]} >

        //             <ScrollView style={{ width: '100%', height: 'auto', borderWidth: 0 }} >

        //                 <ContainerPrincipal
        //                     alinhamento_horizontal={'center'}
        //                     largura={1}
        //                     altura={1}
        //                 >


        //                     <ViewSeta onPress={() => {

        //                         // navigation.navigate("Screen_pay",{propostas});
        //                         navigation.goBack(null);

        //                     }} >
        //                         <StyledIconFontAwesome name='arrow-left' />
        //                     </ViewSeta>

        //                     <ViewTitulo_1><Txt_1>Adicionar cartão de Débito</Txt_1></ViewTitulo_1>

        //                     <ViewBorda />

        //                     <ViewEspacoAltura />
        //                     <ViewEspacoAltura />

        //                     <Txt_2>Número do Cartão</Txt_2>

        //                     <TextInputMaskCaixa largura={0.5}
        //                         type={'credit-card'}
        //                         value={numeroCredCard}
        //                         maxLength={19}
        //                         onChangeText={value => {
        //                             numeroCredCardF(value);
        //                             // value = value.replace('.', '');
        //                             // value = value.replace(',', '.');
        //                             // numeroCredCardF(Number(value));
        //                         }}
        //                     />

        //                     <ViewEspacoAltura />


        //                     <View
        //                         style={{
        //                             flexDirection: 'column',
        //                             width: '85%',
        //                             borderWidth: 0,
        //                             borderColor: '#fff',
        //                             /*backgroundColor: 'green'*/
        //                         }}

        //                     >


        //                         <Txt_2>Validade</Txt_2>
        //                         <TextInputMaskCaixa largura={0.2}
        //                             type={'datetime'}
        //                             options={{
        //                                 format: 'MM/YY'
        //                             }}
        //                             value={dataValidade}
        //                             maxLength={5}
        //                             onChangeText={value => {
        //                                 dataValidadeF(value);
        //                                 // value = value.replace('.', '');
        //                                 // value = value.replace(',', '.');
        //                                 // dataValidadeF(Number(value));
        //                             }}
        //                         />


        //                         <View style={{ height: 20 }} />


        //                         <Txt_2>Código de Segurança</Txt_2>
        //                         <TextInputMaskCaixa largura={0.2}
        //                             type={'only-numbers'}
        //                             value={codSeguranca}
        //                             maxLength={4}
        //                             onChangeText={value => {
        //                                 codSegurancaF(value);
        //                                 // value = value.replace('.', '');
        //                                 // value = value.replace(',', '.');
        //                                 // codSegurancaF(Number(value));
        //                             }}
        //                         />

        //                     </View>



        //                     <ViewEspacoAltura />



        //                     <Txt_2>Nome Impresso no Cartão</Txt_2>

        //                     <TextInputCaixa
        //                         largura={0.5}
        //                         onChangeText={nomeCartaoF}
        //                     />


        //                     <ViewEspacoAltura />


        //                     <Txt_2>CPF/CNPJ do Titular da Conta</Txt_2>

        //                     <TextInputMaskCaixa largura={0.5}

        //                         type={'cpf'}
        //                         value={cpf_cnpjCard}
        //                         maxLength={19}
        //                         onChangeText={value => {
        //                             cpf_cnpjCardF(value);
        //                         }}
        //                     />


        //                     <ViewButtons>


        //                         <ButtonCancelarPagar cor_fundo={'#FF5353'}

        //                             onPress={async () => {
        //                                 // alert("CANCELAR COMPRA COM CARTÃO");
        //                                 setMenssagemStatusDaCompra(false);
        //                                 navigation.goBack(null);
        //                             }}
        //                         >
        //                             <Text style={{ fontSize: 15, color: '#fff' }} >Cancelar</Text>
        //                         </ButtonCancelarPagar>

        //                         <ButtonCancelarPagar cor_fundo={'#36BE54'}
        //                             onPress={async () => {

        //                                 executarPagamentoComCrediCard();

        //                             }}
        //                         >
        //                             <Text style={{ fontSize: 15, color: '#fff' }} >Pagar</Text>
        //                         </ButtonCancelarPagar>


        //                     </ViewButtons>



        //                 </ContainerPrincipal>


        //             </ScrollView>

        //             {menssagemStatusDaCompra && (<Pay_aprovado_reprovado
        //                 compraAprovadaOuReprovadaRecebid={compraAprovadaOuReprovadaRecebida}
        //                 ocultar_tela_de_mensagem={ocultar_tela_de_mensagem}
        //                 executarPagamentoComCrediCard={executarPagamentoComCrediCard}
        //             />)}

        //             {menssagemProcessamento && (
        //                 <TelaAguardeProcessamentoPagamento />
        //             )}


        //         </SafeAreaView>
        //  //TELA ORIGINAL ACIMA


        /**************************************************************************************************************************************************/
        /**************************************************************************************************************************************************/
        /**************************************************************************************************************************************************/
        /**************************************************************************************************************************************************/
        /**************************************************************************************************************************************************/
        /**************************************************************************************************************************************************/


        //TELA WEBVIEW ABAIXO
        //https://living-sun.com/pt/webview/853834-react-native-detect-click-on-webview-webview-onclick-react-native.html
        // <SafeAreaView style={[Estilo.App]} >



        //     {/* <ScrollView style={{ width: '100%', height: 'auto', borderWidth: 0 }} > */}

        //     <View style={{ height: '100%', width: '100%', backgroundColor: '#fff9', alignContent: 'center', justifyContent: 'center' }}>
        //         <View style={{ height: '80%', width: '100%', backgroundColor: '#fff' }}>

        //             <WebView  
        //             // { ...ENVIANDO_DADOS_DOS_PRODUTOS_PAGINA_DO_WEBVIEW() }

        //                 originWhitelist={['*']}


        //                 // source={{ uri: 'http://192.168.0.107:3000/financeira/' }}



        //                 source={{ uri: 'http://192.168.0.107:8080/' }}
        //                 // source={{ uri: 'http://192.168.0.107:3000/' }}



        //                 // source={{
        //                 //     // uri: 'http://192.168.0.107:3000/dados_da_venda',
        //                 //     uri: 'http://192.168.0.107:3000/',
        //                 //     method: 'POST',
        //                 //     // headers: {
        //                 //     //     'Content-Type': 'application/json',
        //                 //     // },
        //                 //     body: JSON.stringify(
        //                 //         {
        //                 //             numeroCredCard: "1234 5678 9012 3456",
        //                 //             dataValidade: "09/22",
        //                 //             codSeguranca: "1234",
        //                 //             nomeCartao: "EDERSON FELICIANO CORSATTO",
        //                 //             cpf_cnpjCard: "993.712.351-87",
        //                 //         }
        //                 //     )
        //                 // }}



        //                 renderLoading={LoadingIndicatorView}
        //                 startInLoadingState={true}
        //                 javaScriptEnabled={true}
        //             />

        //         </View>
        //     </View>


        //     {/* </ScrollView> */}
        // </SafeAreaView>
        //TELA WEBVIEW ACIMA







        // waitingVisible ?
        //     <SafeAreaView style={[Estilo.App]} >
        //         <Waiting paremetroEnviado={"Aguarde ..."} ORIENTACAO={"PORTRAIT"} />
        //     </SafeAreaView>
        //     :

            //TELA WEBVIEW ABAIXO
            <SafeAreaView style={[Estilo.App]} >


                {/* <ScrollView style={{ width: '100%', height: 'auto', borderWidth: 0 }} > */}

                <View style={{ height: '100%', width: '100%', backgroundColor: '#fff9', alignContent: 'center', justifyContent: 'center' }}>
                    <View style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>

                        <WebView

                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}

                            // {...alert(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO.descricao_da_cobranca)}
                            // {...alert(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO.valor_do_plano)}

                            originWhitelist={['*']}


                            // source={{ uri: "http://159.89.87.76:8080/" }}// => SERVIDOR DA DIGITALOCEAN
                               source={{ uri: "https://gadoapp.online/api_recebimento/" }}// => SERVIDOR DA DIGITALOCEAN

                           
                            onMessage={onMessage}

                            renderLoading={LoadingIndicatorView}
                            startInLoadingState={false}
                            javaScriptEnabled={true}

                            // domStorageEnabled={true}

                            // ALTERAR_PRECOS(${JSON.stringify(valll)})
                            // true; // note: this is required, or you'll sometimes get silent failures
                            // true; // observação: isso é necessário, ou você às vezes obterá falhas silenciosas


                            injectedJavaScript={

                                `
                                                    
                                //CÓDIGO ABAIXO EXECUTA DEPOIS DO CARREGAMENTO DA PÁGINA ABAIXO                           
                                    window.onload = function () {
                                        ALTERAR_PRECOS(${JSON.stringify(VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO)})

                                        // var VARIAVEL_DA_FUNCAO_TIMER = function contagem_tempo() { 
                                        //     CHAMADO_PELO_INJECT_JAVASCRIPT();
                                        //     }
                                        //     setInterval(VARIAVEL_DA_FUNCAO_TIMER, 3000);//INCIAR NOVAMENTE O PROCESSO COM TIMER setInterval

                                    }      
                                

                                    
                                // ESSA PARTE ABAIXO ESTÁ CAUSANDO PROBLEMA SOMENTE QUANDO A PÁGINA CHAMADA RETORNA ALGO, FICANDO A PÁGINA EM BRANCO  ABAIXO  
                                // //CÓDIGO ABAIXO COLOCA UM DELAY PRA SER EXECUTADO DEPOIS DO CARREGAMENTO DA PÁGINA ABAIXO
                                //                                 setTimeout(() => {
                                //                                     let evt = document.createEvent('Event');
                                //                                     evt.initEvent('load', false, false);
                                //                                     window.dispatchEvent(evt);
                                //                                 }, 100);
                                // ESSA PARTE ABAIXO ESTÁ CAUSANDO PROBLEMA SOMENTE QUANDO A PÁGINA CHAMADA RETORNA ALGO, FICANDO A PÁGINA EM BRANCO  ACIMA
                                   
                                
                                  
                                //RECEBENDO MENSAGEM DEVOLTA NO WEBVIEW       
                                        (function() {
                                            function wrap(fn) {
                                                return function wrapper() {
                                                var res = fn.apply(this, arguments);
                                                window.ReactNativeWebView.postMessage(window.location.href);
                                                // RETORNO_DO_WEBVIEW(res);
                                                return res;
                                                }
                                            }
                                            history.pushState = wrap(history.pushState);
                                            history.replaceState = wrap(history.replaceState);
                                            })();
                                


                                // FOI DESATIVADO  ESSA PARTE VER ANALIZAR DEPOIS SE VAI SER UTILIZADO ABAIXO
                                // if (navigator.appVersion.includes('Android')) {
                                //     document.addEventListener("message", function (data) {
                                //         alert("you are in android OS");
                                //     });
                                // }
                                // else {
                                //     window.addEventListener("message", function (data) {
                                //         alert("you are in android OS");
                                //     });
                                // }




                                // setTimeout(function () {
                                //     // window.ReactNativeWebView.postMessage(data)
                                //     var elems = document.body.getElementsByTagName("*");
                                //     alert(elems);
                                // }, 3000)

                                "window.isRNWebView=true"

                                true;

                                    `

                            }

                            // mixedContentMode={'compatibility'}


                            // injectedJavaScript={
                            //     `document.getElementById("checkout-btn").addEventListener("click", function () {
                            //         ALTERAR_PRECOS(${VARIAVEL_GLOBAL.DADOS_DA_NEGOCIACAO});
                            //     }); 
                            //     true;`
                            // }

                            ref={webviewRef}

                            onNavigationStateChange={handleWebViewNavigationStateChange}

                        // onError={VOLTAR_PRA_TELA_ANTERIOR}


                        />

                    </View>
                </View>


                {menssagemStatusDaCompra && (<Pay_aprovado_reprovado
                    compraAprovadaOuReprovadaRecebid={compraAprovadaOuReprovadaRecebida}
                    ocultar_tela_de_mensagem={ocultar_tela_de_mensagem}
                    executarPagamentoComCrediCard={executarPagamentoComCrediCard}
                />)}

                {menssagemProcessamento && (
                    <TelaAguardeProcessamentoPagamento />
                )}


                {/* </ScrollView> */}
            </SafeAreaView>
        //TELA WEBVIEW ACIMA






    );//CHAVE PRINCIPAL DO RETURN





}//CHAVE PRINCIPAL DA  APLICAÇÃO RETURN





