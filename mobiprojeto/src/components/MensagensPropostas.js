import React, { useRef, useState, useEffect, useContext } from 'react';
import { Alert, View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable, StyleSheet, Keyboard } from 'react-native';
import { color, Value } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Estilo from './estilo';
import {
    data_hora_e_segundo_completo_ingles, data_hora_e_segundo_completo, data_hora_e_segundo_sem_separador, EXTRAIR_CELULARES_DE_TEXTO, EXTRAIR_CELULARES_DE_TEXTO_2, DEIXAR_SOMENTE_NUMEROS
    , REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE, REGULARIZANDO_HORAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE
} from '../components/CALCULO_E_FORMATACAO/FORMATACAO';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView } from 'react-native-gesture-handler';

//npm install react-native-webview
import { WebView } from 'react-native-webview';

//npm install react-native-htmlview --save
import HTMLView from 'react-native-htmlview';
//LINK de DOWNLOAD da library => https://nicedoc.io/jsdf/react-native-htmlview


import GlobalContext from '../context/UsersContext';

import Celular_colocar from './Celular_colocar';

import { useNavigation } from "@react-navigation/native";

import Waiting from '../components/Waiting';

import StatusInfoCompraVenda from '../components/StatusInfoCompraVenda';



//VARIAVEL GLOBAL FORA DO METODO EXPORT PRINCIPA DA TELA ABAIXO
var propostasss =
    [{
        cod_automatico: "",
        data_hora_proposta: "",
        id_postagem: "",
        id_proposta: "",
        numero_telefone_vendedor: "",
        numero_telefone_comprador: "",
        conteudo_da_proposta: "",
        postagem_vista_vendedor: "",
        postagem_vista_comprador: "",
        comprador_ou_vendedor: ""
    }];

//VARIAVEL GLOBAL FORA DO METODO EXPORT PRINCIPA DA TELA ACIMA


var COR_FUNDO_MENSAGEN = "34,43,54"; //COR MAIS ESCURA
//var COR_FUNDO_MENSAGEN =  "43,68,74"; //COR MAIS CLARA






export default function MensagensPropostas(param) {


    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    const [waitingVisible, setWaitingisible] = useState(false);

    const [compra_e_venda_status, setCompra_e_venda_status] = useState(false);

    // var RETORNO_CONTEUDO_TEXTO = "";
    const [RETORNO_CONTEUDO_TEXTO, setRETORNO_CONTEUDO_TEXTO] = useState("");

    var ARRAY_CELULARES_DAS_MENSAGENS = [];
    var ARRAY_CONTEUDO__DAS_MENSAGENS = [];
    var ARRAY_CONTEUDO__DAS_MENSAGENS_PRO_MOSTRADOR = [];

    // ARRAY_CELULARES_DAS_MENSAGENS.length = 0;
    // ARRAY_CONTEUDO__DAS_MENSAGENS.length = 0;
    // ARRAY_CONTEUDO__DAS_MENSAGENS_PRO_MOSTRADOR.length = 0;




    const navigation = useNavigation();

    //const [chamado_clique_botaoTrueFalse, setChamado_clique_botaoTrueFalse ] = useState(false);

    //VARIAVEIS DOS PARAMETROS RECEBIDOS ABAIXO

    //var propostasS = new Object();
    var propostasS = param.proposct;
    var numero_telefone = param.numero_telefon;
    var numero_telefone_comprador = param.numero_telefone_comprado;

    try {
        numero_telefone_comprador = JSON.parse(numero_telefone_comprador);
        numero_telefone_comprador = numero_telefone_comprador.NUMERO_CELL_J;
        //alert(numero_telefone+" | "+ numero_telefone_comprador );
    } catch (err) { numero_telefone_comprador = ""; }



    var numero_CelularUsuario = param.numero_CelularUsuari;

    //alert(numero_CelularUsuario)
    //alert( JSON.stringify( propostassS ) );

    //VARIAVEIS DOS PARAMETROS RECEBIDOS ACIMA


    var vendedor_ou_comprador = [];

    var USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR = "";


    if (typeof propostasS !== null || typeof propostasS !== "undefined" || propostasS !== "[]") {

        try {
            //propostasS = JSON.stringify( propostasS );
            propostasss = JSON.parse(propostasS);


            if (typeof propostasss !== "undefined") {

                vendedor_ou_comprador.push(propostasss[0].numero_telefone_vendedor);

                if (VARIAVEL_GLOBAL.TELEFONE.toString() === vendedor_ou_comprador[0].toString()) {
                    USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR = "VENDEDOR";
                } else if (VARIAVEL_GLOBAL.TELEFONE.toString() != vendedor_ou_comprador[0].toString()) {
                    USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR = "COMPRADOR";
                }//IF

                // alert(USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR);

            }

        } catch (error) { /*alert("erro 776489$$#  " + error) */ /* alert( propostasS); */ }

        //alert(propostasss[1].data_hora_proposta);//FUNCIONANDO PERFEITAMENTE
    }




    //VARIAVEIS DE ESTADOS  ABAIXO
    //alert(  propostasss.length )
    const [estado_vc_outro, setEstado_vc_outro] = useState(vendedor_ou_comprador);
    const [propostass, setPropostas] = useState(propostasss);
    const [visivel_true_false, setVisivel_true_false] = useState(false);


    //VARIAVEIS DE ESTADOS  ACIMA


    const setAceitar_proposta_true_falseF = (index) => {
        setAceitar_proposta_true_false(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    };

    const setResponder_proposta_true_falseF = (index) => {
        setResponder_proposta_true_false(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    };


    var ARRAY_PROPOSTA_BOOLEAN = [];
    var ARRAY_RESPOSTA_BOOLEAN = [];
    var ARRAY_CAIXA_RESPOSTA_BOOLEAN = [];


    //EFFECTS ABAIXO
    useEffect(() => {

        //alert(propostasss.length);
        if (propostasss.length > 0) {

            setVisivel_true_false(true);

            for (var i = 0; i < propostasss.length; i++) {

                //if( chamado_clique_botaoTrueFalse === true ){

                ARRAY_PROPOSTA_BOOLEAN.push(true);
                ARRAY_RESPOSTA_BOOLEAN.push(true);
                ARRAY_CAIXA_RESPOSTA_BOOLEAN.push(false);

                //}//IF

                //vendedor_ou_comprador[i] = "Comprador";

            }//DO FOR


        } else if (propostasss.length <= 0) {

            setVisivel_true_false(false);

        }//ELSE IF  

        setPropostas(propostasss);
        //alert(propostasss);


        //if(){


        if (VARIAVEL_GLOBAL.FAZER_PROPOSTA.includes("Fazer")) {
            setContainer_do_formulario_enviar_proposta_true_false(true);
        } else if (VARIAVEL_GLOBAL.FAZER_PROPOSTA.includes("Ver")) {
            setContainer_do_formulario_enviar_proposta_true_false(false);
        }
        //CONSTRUCTION HERE
        //alert(numero_telefone_comprador+" $ "+numero_CelularUsuario);



        //use effect cleanup to set flag false, if unmounted
        return () => { isMounted = false };


    }, []);
    //EFFECTS ACIMA

    const [aceitar_proposta_true_false, setAceitar_proposta_true_false] = useState(ARRAY_PROPOSTA_BOOLEAN);

    const [responder_proposta_true_false, setResponder_proposta_true_false] = useState(ARRAY_RESPOSTA_BOOLEAN);

    const [caixa_responder_proposta_true_false, setCaixa_responder_proposta_true_false] = useState(ARRAY_CAIXA_RESPOSTA_BOOLEAN);


    //FUNÇÃO MOSTRAR BOTÃO RESPONDER COM CLIQUE E RE-CLIQUE no useState COM ARRAY DE BOOLEAN
    const alernarTrueFalseBotaoResponderF = (index) => {
        setResponder_proposta_true_false(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    };

    //FUNÇÃO MOSTRAR CAIXA RESPONDER COM CLIQUE E RE-CLIQUE no useState COM ARRAY DE BOOLEAN
    const alernarTrueFalseCaixaResponderF = (index) => {
        setCaixa_responder_proposta_true_false(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    };



    //CODIGO =  SUPLANTADO765 ABAIXO
    var VENDEDOR = "";
    var COMPRADOR = "";
    var USUARIO_CELL = "";
    var VENDA_OU_COMPRA = "";

    useEffect(() => {

        if (propostasss.length > 0 && numero_telefone !== numero_CelularUsuario) {

            for (var I = 0; I < propostasss.length; I++) {

                VENDEDOR = propostasss[I].numero_telefone_vendedor;
                COMPRADOR = propostasss[I].numero_telefone_comprador;
                USUARIO_CELL = numero_CelularUsuario;
                VENDA_OU_COMPRA = propostasss[I].comprador_ou_vendedor;
                //alert( propostasss[I].numero_telefone_vendedor +" | "+ propostasss[I].numero_telefone_comprador );


                //ESTÁ FUNCIONANDO ABAIXO
                if (VENDEDOR.toString() === USUARIO_CELL.toString()) {

                    // setAceitar_proposta_true_falseF(I);
                    // setResponder_proposta_true_falseF(I);

                }
                else if (COMPRADOR.toString() === USUARIO_CELL.toString()) {

                    setAceitar_proposta_true_falseF(I);
                    //setResponder_proposta_true_falseF(I);

                }
                //ESTÁ FUNCIONANDO ACIMA

            }//DO FOR

        }//DO IF

        //use effect cleanup to set flag false, if unmounted
        return () => { isMounted = false };

    }, []);
    // CODIGO =  SUPLANTADO765 ACIMA


    //conteudoDaResposta  ConteudoDaResposta

    var [conteudoDaResposta, setConteudoDaResposta] = useState("");
    function conteudoDaRespostaF(conteudoDaResposta) { setConteudoDaResposta(conteudoDaResposta); }


    //ESTILIZAÇÃO ABAIXO  color: '#25E7DB'
    const htmlStyles = StyleSheet.create({

        cabecalho: {
            color: '#25E7DB',
            textAlign: 'center',
        },
        a: {
            paddingTop: 10,
            paddingBottom: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: 'rgb(55,80,94)',
            textAlign: 'center',
            fontSize: 15,
            color: '#25E7DB'
        },

        b: {
            paddingTop: 10,
            //paddingBottom:10,
            // //borderTopLeftRadius:10,
            // borderTopRightRadius:10,
            backgroundColor: 'rgb(43,61,72)',
            textAlign: 'center',
            fontSize: 17,
            color: '#FFF' // make links coloured
        },
        c: {
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'rgb(43,61,72)',
            textAlign: 'center',
            fontSize: 17,
            //fontWeight: '300',
            color: '#FFF' // make links coloured
        }

        //   ,d: {
        //     paddingTop:10,
        //     paddingBottom:10,
        //     borderBottomLeftRadius:10,
        //     borderBottomRightRadius:10,
        //     backgroundColor:'rgb(43,2,72)',
        //     textAlign: 'center',
        //     fontSize:17,
        //     //fontWeight: '300',
        //     color: '#FFD700', // make links coloured
        //   }

    });
    //ESTILIZAÇÃO ACIMA



    function handleClickOcultarFormulario(e) {

        //e.preventDefault();
        //console.log('The link was clicked.');
        //alert('The Button was clicked.');
        //event.preventDefault();
        //param.funcao_ocultar_formulario(e);
        /**/

    }


    var [conteudoDaProposta, setConteudoDaProposta] = useState("");
    function conteudoDaPropostaF(conteudoDaProposta) { setConteudoDaProposta(conteudoDaProposta); }

    var [container_do_formulario_enviar_proposta_true_false, setContainer_do_formulario_enviar_proposta_true_false] = useState(false);

    const [formulario_enviar_proposta_true_false, setFormulario_enviar_proposta_true_false] = useState(true);

    const [voltar_enviar_proposta_true_false, setVoltar_enviar_proposta_true_false] = useState(false);

    //FUNÇÃO MOSTRAR FORMULÁRIO ENVIAR PROPOSTA COM CLIQUE E RE-CLIQUE no useState COM ARRAY DE BOOLEAN
    const alernarTrueFalseFormularioEnviarPropostaF = (index) => {
        setResponder_proposta_true_false(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    };


    var [INDICE_GLOBAL_RESPOSTA, setINDICE_GLOBAL_RESPOSTA] = useState(0);

    var [responderTaTrue_or_False, setResponderTaTrue_or_False] = useState(false);



    var DATA_PORTUGUES_CABECALHO = "";
    var DATA_CHEIA_INGLES = "";
    function EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(RECEBE_PARAMETRO) {

        var DATAS_INGLES = "";
        var DATAS_PORTUGUES = "";
        var ANO = "";
        var DIA = "";
        var MES = "";

        var regex;
        try {
            regex = new RegExp(/(\d{4}\-\d{2}\-\d{2})|(\d{2}\/\d{2}\/\d{4})|(\d{4}\-\d{1}\-\d{2})/g);
            //RECEBE_PARAMETRO = RECEBE_PARAMETRO.match(regex)[0];
            DATAS_INGLES = RECEBE_PARAMETRO.match(regex);
        } catch (e) { RECEBE_PARAMETRO = e; }

        try {

            for (var i = 0; i < DATAS_INGLES.length; i++) {

                DATAS_PORTUGUES = DATAS_INGLES[i].split("-");
                ANO = DATAS_PORTUGUES[0];
                MES = DATAS_PORTUGUES[1];
                DIA = DATAS_PORTUGUES[2];

                if (MES.length == 1) { MES = "0" + MES }
                if (DIA.length == 1) { DIA = "0" + DIA }

                DATAS_PORTUGUES = DIA + "-" + MES + "-" + ANO;

                try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{1}\-\d{2})/g, DATAS_PORTUGUES); } catch (error) { }
                try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{2}\-\d{2})/g, DATAS_PORTUGUES); } catch (error) { }
                try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{1}\-\d{1})/g, DATAS_PORTUGUES); } catch (error) { }
                try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{2}\-\d{1})/g, DATAS_PORTUGUES); } catch (error) { }

            }//FOR


        } catch (e) { }

        //alert(RECEBE_PARAMETRO);

        //DATA_CHEIA_INGLES = RECEBE_PARAMETRO;

        return RECEBE_PARAMETRO;
    }

    const [colocar_celular_visivel_or_invisivel, setColocar_celular_visivel_or_invisivel] = useState(false);


    function OCULTAR_TELA_TELEFONE_PROPOSTA() {
        setColocar_celular_visivel_or_invisivel(false);
    }


    useEffect(() => {

        //alert(VARIAVEL_GLOBAL.TELEFONE);
        if (VARIAVEL_GLOBAL.TELEFONE == "SEM_TELEFONE_USUARIO") {
            setColocar_celular_visivel_or_invisivel(true);
        }

        //use effect cleanup to set flag false, if unmounted  #2A3E4A
        return () => { isMounted = false };

    }, []);







    function FUNCAO_QUE_IDENTIFICA_SE_E_VENDEDOR_OU_COMPRADOR(TELEFONE_VENDEDOR_PARAMETRO, TELEFONE_COMPRADOR_PARAMETRO) {


        // //propostasss
        // alert("VENDEDOR = "+TELEFONE_VENDEDOR_PARAMETRO+" USUÁRIO = "+VARIAVEL_GLOBAL.TELEFONE);
        // alert("COMPRADOR = "+TELEFONE_COMPRADOR_PARAMETRO+" USUÁRIO = "+VARIAVEL_GLOBAL.TELEFONE);
        // //vendedor_ou_comprador[index]

        var RETORNO = "";

        if (VARIAVEL_GLOBAL.TELEFONE == TELEFONE_VENDEDOR_PARAMETRO) {

            // alert("USUARIO É VENDEDOR");
            RETORNO = "Vendedor";

        } else
            if (VARIAVEL_GLOBAL.TELEFONE == TELEFONE_COMPRADOR_PARAMETRO) {

                // alert("USUARIO É COMPRADOR"); 
                RETORNO = "Comprador";

            }//IF

        return RETORNO;

    }//IF





    //OBSERVER ABAIXO talvez vai ter que Ativar Novamente
    // useEffect(  () => {

    //     var VENDEDORR = "";
    //     var COMPRADORR = "";
    //     var VENDEDOR_OU_COMPRADORR = "";

    //       propostasss.map((percorrer, index) => {

    //             VENDEDORR =  propostasss[index].numero_telefone_vendedor;
    //             COMPRADORR = propostasss[index].numero_telefone_comprador;
    //             //console.log(typeof VENDEDORR);
    //             //console.log( propostasss[index].numero_telefone_vendedor +" | "+propostasss[index].numero_telefone_comprador );
    //             // VENDEDOR_OU_COMPRADORR = FUNCAO_QUE_IDENTIFICA_SE_E_VENDEDOR_OU_COMPRADOR(VENDEDORR, COMPRADORR);
    //             VENDEDOR_OU_COMPRADORR = FUNCAO_QUE_IDENTIFICA_SE_E_VENDEDOR_OU_COMPRADOR(propostasss[index].numero_telefone_vendedor, propostasss[index].numero_telefone_comprador);
    //             vendedor_ou_comprador[index] = VENDEDOR_OU_COMPRADORR;
    //             console.log(typeof VENDEDOR_OU_COMPRADORR);
    //         })//DO MAP

    //     console.log(vendedor_ou_comprador);

    // }, [vendedor_ou_comprador]);
    //OBSERVER ACIMA talvez vai ter que Ativar Novamente





    function ACEITAR_PROPOSTA_FUNCAO(index) {


        var ID_PROPOSTAS = propostasss[index].cod_automatico;

        var PRIMEIRA_PROPOSTA = propostasss[index].conteudo_da_proposta;

        var topo_html = '<html><body>';
        var bottom_html = '</body></html>';

        var RESPOSTAS = '';

        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ABAIXO
        VENDEDOR = propostasss[index].numero_telefone_vendedor;
        COMPRADOR = propostasss[index].numero_telefone_comprador;
        vendedor_ou_comprador[index] = "Vendedor";
        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ACIMA


        let DATA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());
        let HORA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_HORAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());


        //SEM HTML ABAIXO
        RESPOSTAS =
            propostasss[index].conteudo_da_proposta +
            "\n" +
            // '<a>' + vendedor_ou_comprador[index] + "  " + data_hora_e_segundo_completo_ingles() + '</a>' +
            '<a>' + vendedor_ou_comprador[index] + "  " + DATA_PORTUGUES_FORMATO_CORRETO + " - " + HORA_PORTUGUES_FORMATO_CORRETO + '</a>' +
            conteudoDaResposta +
            '<b> Proposta Aceita !</b>' +
            '<c> Compra e Venda Fechada</c>';

        //alert(RESPOSTAS);
        param.funcao_resposta_da_proposta(ID_PROPOSTAS, RESPOSTAS, VENDEDOR, COMPRADOR);

        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";




    }





    useEffect(() => {

        var CONTEUDO = "";
        propostasss.map((propostas, index) => {

            CONTEUDO = propostasss[index].conteudo_da_proposta;

            if (CONTEUDO.includes("Proposta Aceita !")) {

                setAceitar_proposta_true_false(false);
                setResponder_proposta_true_false(false);


            }//if

        });

    }, []);







    const [containerProposta_Visivel_Invisivel, setContainerProposta_Visivel_Invisivel] = useState(false);

    // visivel_true_false 

    useEffect(() => {

        if (propostasss.length == 0) {

            setContainerProposta_Visivel_Invisivel(false);
            // alert("INVISIVEL");

        } else {

            setContainerProposta_Visivel_Invisivel(true);
            // alert("VISIVEL");

        }

        // }, [containerProposta_Visivel_Invisivel, visivel_true_false, VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO]);
    }, [containerProposta_Visivel_Invisivel, visivel_true_false]);






    useEffect(() => {


        // alert(VARIAVEL_GLOBAL.STATUS_DA_VENDA_OU_COMPRA);

        if( VARIAVEL_GLOBAL.STATUS_DA_VENDA_OU_COMPRA === 'Status da Compra' ||
            VARIAVEL_GLOBAL.STATUS_DA_VENDA_OU_COMPRA === 'Status da Venda' ){

                setCompra_e_venda_status(true);

        }



    },[]);



    return (

        <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2A3E4A' }}


        //GRABBER IN CONSTRUCTION
        /*
        {//EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ABAIXO  ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO
        /*
         ...(() => {
        //TareFaz Executado Squi
        })()
        ///EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ACIMA 
        }
        */
        >


            {/* FORMULÁRIO DE ENVIO PROPOSTA ABAIXO   #2A3E4A  */}

            {container_do_formulario_enviar_proposta_true_false && (

                <View style={{
                    width: '99%',
                    height: 'auto',
                    //height: altura_2,
                    backgroundColor: '#2A3E4A',
                    borderRadius: 15,
                    borderColor: '#fff',
                    borderWidth: 1,
                }} >

                    <View style={{ height: 20 }} />


                    {formulario_enviar_proposta_true_false && (
                        <View style={{ width: '100%', alignItems: 'center' }} >
                            <TextInput
                                multiline={true} flexWrap='wrap' textAlign={'center'} placeholder={'DIGITE AQUI SUA PROPOSTA'} size={15} onChangeText={conteudoDaPropostaF}
                                style={{ width: '92%', height: 50, alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderRadius: 15 }}
                            >
                            </TextInput>
                        </View>
                    )}

                    <View style={{ flexDirection: 'row', width: '100%' }} >

                        {/* <View style={{ width: '100%', alignItems: 'flex-end', borderWidth: 0 }} >   </View> */}



                        <View height={0}></View>

                        <View style={{ flexDirection: 'row', width: '100%', padding: '5%' }} >

                            {formulario_enviar_proposta_true_false && (
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '45%', borderRadius: 20, borderColor: '#fff', borderWidth: 1 }}
                                    onPress={async () => {

                                        /************************************************************************************************/
                                        /************************************************************************************************/
                                        /************************************************************************************************/
                                        /**/
                                        if (conteudoDaProposta != "" &&
                                            conteudoDaProposta != null ||
                                            typeof conteudoDaProposta != "undefined") {
                                            try {
                                                var regex = new RegExp(/\w/g);
                                                var TXT = conteudoDaProposta.match(regex)[0];
                                                if (conteudoDaProposta.includes(TXT)) {
                                                    if (conteudoDaProposta.length >= 6) {
                                                        //TAREFAZ AQUI ABAIXO
                                                        //////////////////////////
                                                        if (JSON.stringify(propostasss).includes("Compra e Venda Fechada</")) {
                                                            alert("Compra e Venda Fechada ! \n Não é possivel Emviar Mensagem de Proposta !");
                                                        } else {
                                                            //ENVIAR PROPOSTA CHAMANDO FUNÇÃO DO PAI AQUI

                                                            param.funcao_remota_enivar_proposta(conteudoDaProposta);
                                                            Keyboard.dismiss();
                                                            // VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta"; FOI DESATIVADO PORQUE JÁ EXISTE NO METODO CHAMADO ACIMA

                                                        }//IF ELSE
                                                        /////////////////////////
                                                        //TAREFAZ AQUI ACIMA
                                                    } else { alert("Proposta muito Curta !"); }
                                                }//IF ELSE
                                            } catch (e) { alert("O Campo não pode ser vazio !"); }
                                        }//IF ELSE
                                        else { alert("O Campo não pode ser \n vazio !"); }

                                        // alert(conteudoDaProposta);
                                        ////////////////////

                                        /************************************************************************************************/
                                        /************************************************************************************************/
                                        /************************************************************************************************/

                                    }}
                                >

                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0, padding: 2 }} >
                                        <Text style={[Estilo.fontePequena, style = { alignItems: 'center', padding: 2 }]} >Enviar Proposta</Text>
                                        <Icon name='paper-plane-o' style={[Estilo.fonteMedia, style = { alignItems: 'center' }]} />
                                    </View>

                                </TouchableOpacity>
                            )
                            }

                            {/* COLOCAR BOTÃO VOLTAR PROPOSTA AQUI ABAIXO */}
                            {voltar_enviar_proposta_true_false && (
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '45%', borderRadius: 20, borderColor: '#fff', borderWidth: 1 }}
                                    onPress={() => {

                                        //ENVIAR PROPOSTA CHAMANDO FUNÇÃO DO PAI AQUI
                                        //param.funcao_remota_enivar_proposta(conteudoDaProposta);
                                        setFormulario_enviar_proposta_true_false(oldState => !oldState)
                                        setVoltar_enviar_proposta_true_false(oldState => !oldState)

                                        //alert(INDICE_GLOBAL_RESPOSTA);
                                        alernarTrueFalseCaixaResponderF(INDICE_GLOBAL_RESPOSTA);
                                        alernarTrueFalseBotaoResponderF(INDICE_GLOBAL_RESPOSTA);

                                        setResponderTaTrue_or_False(false);


                                    }}
                                >

                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0, padding: 2 }} >
                                        <Text style={[Estilo.fontePequena, style = { alignItems: 'center', padding: 2 }]} >Nova Proposta</Text>
                                        <Icon name='reply' style={[Estilo.fonteMedia, style = { alignItems: 'center' }]} />
                                    </View>

                                </TouchableOpacity>
                            )
                            }
                            {/* COLOCAR BOTÃO VOLTAR PROPOSTA AQUI ACIMA */}



                            <View style={{ width: '10%', height: 20 }} />

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '45%', borderRadius: 20, borderColor: '#fff', borderWidth: 1 }}
                                onPress={async () => {


                                    if (JSON.stringify(propostasss).includes("Compra e Venda Fechada</")) {

                                        alert("Compra e Venda já Fechada ! \n Não é Possivel Essa Operação !");

                                    } else {

                                        Alert.alert(
                                            //title
                                            'Atenção !',
                                            //body
                                            //'I am two option alert. Do you want to cancel me ?',
                                            'Deseja Realizar esta Compra !',
                                            [
                                                {
                                                    text: 'Sim',
                                                    onPress: () => {
                                                        //TAREFAZ AQUI ABAIXO
                                                        //COMPRAR DIRETO FUNÇÃO AQUI NESSE ONPRESS
                                                        param.funcao_remota_enivar_comprar_direto();
                                                        //TAREFAZ AQUI ACIMA
                                                    }
                                                },
                                                {
                                                    text: 'Não',
                                                    onPress: () => {/*console.log('No Pressed')*/ },
                                                    style: 'cancel'
                                                },
                                            ],
                                            { cancelable: false },
                                            //clicking out side of alert will not cancel
                                        );



                                    }

                                }}
                            >

                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', borderWidth: 0 }} >
                                    <Text style={Estilo.fontePequena} >Comprar Direto</Text>
                                    <Icon name='cart-arrow-down' style={Estilo.fonteMedia} />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>


                </View>

            )}
            {/* FORMULÁRIO DE ENVIO PROPOSTA ACIMA*/}




            <ScrollView style={{ width: '98%', height: 'auto', backgroundColor: '#2A3E49', borderWidth: 0, borderColor: 'yellow', paddingTop: 5, }} >



                {visivel_true_false && (

                    propostasss.map((propostas, index) => (


                        // DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(propostasss[index].conteudo_da_proposta),

                        ARRAY_CONTEUDO__DAS_MENSAGENS.push(propostasss[index].conteudo_da_proposta),



                        {
                            ...(async () => {
                                // DATA_CHEIA_INGLES = await COMFORMANDO_A_IDENTIFICACAO_DAS_MENSAGENS(propostasss[index].conteudo_da_proposta)
                                // DATA_CHEIA_INGLES = ARRAY_CONTEUDO__DAS_MENSAGENS_PRO_MOSTRADOR[index]
                                // alert(propostasss[index].conteudo_da_proposta);

                                var TELEFONE_USUARIO_TRABALHADO = DEIXAR_SOMENTE_NUMEROS(VARIAVEL_GLOBAL.TELEFONE);

                                ARRAY_CONTEUDO__DAS_MENSAGENS.map(async (ar, iii) => {

                                    // var CELULARES_POR_MESAGEM_array_local = {};

                                    var CELULARES_POR_MESAGEM_array_local = EXTRAIR_CELULARES_DE_TEXTO_2(ARRAY_CONTEUDO__DAS_MENSAGENS[iii]);
                                    /********************************************************************************************** */

                                    if (USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR.toString() === "VENDEDOR") {

                                        try {
                                            CELULARES_POR_MESAGEM_array_local.map((array, jjj) => {

                                                // alert(CELULARES_POR_MESAGEM_array_local);

                                                if (TELEFONE_USUARIO_TRABALHADO == CELULARES_POR_MESAGEM_array_local[jjj]) {
                                                    ARRAY_CONTEUDO__DAS_MENSAGENS[iii] = ARRAY_CONTEUDO__DAS_MENSAGENS[iii].replace(CELULARES_POR_MESAGEM_array_local[jjj], "Você");
                                                    DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(ARRAY_CONTEUDO__DAS_MENSAGENS[iii]);
                                                }//IF 

                                                else if (TELEFONE_USUARIO_TRABALHADO != CELULARES_POR_MESAGEM_array_local[jjj]) {
                                                    ARRAY_CONTEUDO__DAS_MENSAGENS[iii] = ARRAY_CONTEUDO__DAS_MENSAGENS[iii].replace(CELULARES_POR_MESAGEM_array_local[jjj], "Comprador");
                                                    DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(ARRAY_CONTEUDO__DAS_MENSAGENS[iii]);
                                                }//IF

                                            });//map()
                                        } catch (error) { console.log("ERRRRO AQUI 1 " + error); }
                                        // SOMENTE PARA AUDITORIA ESSA METODO LINHA ABAIXO
                                        // DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(propostasss[index].conteudo_da_proposta);


                                    } else if (USUARIO_CELL_E_VENDEDOR_OU_COMPRADOR.toString() === "COMPRADOR") {

                                        try {
                                            CELULARES_POR_MESAGEM_array_local.map((array, jjj) => {


                                                if (TELEFONE_USUARIO_TRABALHADO == CELULARES_POR_MESAGEM_array_local[jjj]) {
                                                    ARRAY_CONTEUDO__DAS_MENSAGENS[iii] = ARRAY_CONTEUDO__DAS_MENSAGENS[iii].replace(CELULARES_POR_MESAGEM_array_local[jjj], "Você");
                                                    DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(ARRAY_CONTEUDO__DAS_MENSAGENS[iii]);
                                                }//IF 

                                                else if (TELEFONE_USUARIO_TRABALHADO != CELULARES_POR_MESAGEM_array_local[jjj]) {
                                                    ARRAY_CONTEUDO__DAS_MENSAGENS[iii] = ARRAY_CONTEUDO__DAS_MENSAGENS[iii].replace(CELULARES_POR_MESAGEM_array_local[jjj], "Vendedor");
                                                    DATA_CHEIA_INGLES = EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(ARRAY_CONTEUDO__DAS_MENSAGENS[iii]);
                                                }//IF

                                            });//map()                                   
                                        } catch (error) { console.log("ERRRRO AQUI 2 " + error); }

                                    }//IF

                                    /****************************************************************************** */

                                })

                            })()
                        },

                        //alert(  propostasss[1].conteudo_da_proposta  ),  // RGB(42,62,74)  backgroundColor: '#2A3E49'
                        // vendedor_ou_comprador[index] = "Comprador",
                        //vendedor_ou_comprador.push(FUNCAO_QUE_IDENTIFICA_SE_E_VENDEDOR_OU_COMPRADOR(propostasss[index].numero_telefone_vendedor, propostasss[index].numero_telefone_comprador)),

                        visivel_true_false && (
                            // containerProposta_Visivel_Invisivel && (

                            <View key={propostasss[index].id_proposta + index} style={{ width: '100%', height: 'auto', backgroundColor: '#2A3E49', padding: 5, position: 'relative', top: 5, bottom: 0, left: 0, right: 0 }} >

                                {/* CONTAINER DA ETIQUETA DA MENSAGEM ABAIXO  Pressable */}
                                <TouchableOpacity style={{ padding: 5, width: '100%', height: 'auto', alignItems: 'center', backgroundColor: 'rgb(' + COR_FUNDO_MENSAGEN + ')', borderWidth: 0, borderColor: 'RGB(' + COR_FUNDO_MENSAGEN + ')', borderRadius: 15 }}

                                    //FECHAR CAIXA RESPONDER SE TIVER ABERTO ABAIXO
                                    onPress={(e) => {

                                        if (responderTaTrue_or_False == true) {

                                            //alert("FOI PRESSIONADO NO CONTAINE DA MENSAGEM !");
                                            setFormulario_enviar_proposta_true_false(oldState => !oldState)
                                            setVoltar_enviar_proposta_true_false(oldState => !oldState)

                                            //alert(INDICE_GLOBAL_RESPOSTA);
                                            alernarTrueFalseCaixaResponderF(INDICE_GLOBAL_RESPOSTA);
                                            alernarTrueFalseBotaoResponderF(INDICE_GLOBAL_RESPOSTA);

                                            setResponderTaTrue_or_False(false);


                                        }//IF            
                                    }}
                                    //FECHAR CAIXA RESPONDER SE TIVER ABERTO ACIMA

                                    // //FOI DESATIVADO O DELETAR MENSAGEM NO CHAT ABAIXO  18 07 2021
                                    onLongPress={(e) => {

                                        //alert("FOI MANTIDO PRESSIONADO");
                                        Alert.alert(
                                            //title
                                            'Atenção !',
                                            //body
                                            //'I am two option alert. Do you want to cancel me ?',
                                            'Deseja Apagar essa Mensagem ?',
                                            [
                                                {
                                                    text: 'Sim',
                                                    onPress: () => {

                                                        if (JSON.stringify(propostasss).includes("Compra e Venda Fechada</")) {
                                                            alert("Compra e Venda Fechada ! \n Não é possivel Excluir a Mensagem da Proposta !");
                                                        } else {
                                                            // alert("VAI APAGAR ESSA PROPOSTA");
                                                            param.funcao_remota_deletar_proposta(propostas.cod_automatico, propostas.numero_telefone_vendedor, propostas.numero_telefone_comprador);
                                                            VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";
                                                        }

                                                    }
                                                },
                                                {
                                                    text: 'Não',
                                                    onPress: () => {/*console.log('No Pressed')*/ },
                                                    style: 'cancel'
                                                },
                                            ],
                                            { cancelable: false },
                                            //clicking out side of alert will not cancel
                                        );

                                    }}
                                // //FOI DESATIVADO O DELETAR MENSAGEM NO CHAT ACIMA  18 07 2021

                                >


                                    <View style={{ width: '85%', height: 'auto', backgroundColor: 'rgb(' + COR_FUNDO_MENSAGEN + ')', borderWidth: 0, borderColor: 'yellow' }} >



                                        <HTMLView
                                            key={index}
                                            stylesheet={htmlStyles}
                                            textComponentProps={{ style: { color: 'white' } }}
                                            addLineBreaks={false}//REMOVE A GRANDE DISTANCIA ENTRE AS LINHAS QUE É DESNECESSÁRIO
                                            value={
                                                //propostasss[index].conteudo_da_proposta
                                                DATA_CHEIA_INGLES
                                                // RETORNO_CONTEUDO_TEXTO

                                                // "<a>EDERSON FELICIANO CORSATTO"
                                            }
                                        />


                                    </View>

                                    <View style={{ height: 15 }} />



                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(' + COR_FUNDO_MENSAGEN + ')' }}>

                                        {aceitar_proposta_true_false[index] && (
                                            <TouchableOpacity style={{ width: '47%', backgroundColor: 'rgb(' + COR_FUNDO_MENSAGEN + ')', borderColor: 'white', borderWidth: 0, borderRadius: 15, backgroundColor: 'grey' }}

                                                onPress={(e) => {

                                                    VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "TAXA";
                                                    //param.funcao_remota_aceitar_proposta(propostasss[index].cod_automatico);
                                                    // ACEITAR_PROPOSTA_FUNCAO(index);
                                                    navigation.navigate("Screen_pay", { propostas });

                                                    <Icon name='arrow-left' style={Estilo.icones_medio} />
                                                }}

                                            >
                                                <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }} >
                                                    <Text style={{ padding: 5, color: 'white', fontSize: 12 }} >Aceitar Proposta</Text>
                                                    <Icon style={{ padding: 5, color: 'white', fontSize: 15 }} name='thumbs-o-up' />
                                                </View>
                                            </TouchableOpacity>
                                        )}

                                        <View style={{ width: '3%' }} />

                                        {responder_proposta_true_false[index] && (
                                            <TouchableOpacity style={{ width: '47%', backgroundColor: 'rgb(' + COR_FUNDO_MENSAGEN + ')', borderColor: 'white', borderWidth: 0, borderRadius: 15, backgroundColor: 'grey' }}

                                                onPress={(e) => {

                                                    //RESETAR se tiver CAIXA RESPONDER PROPOSTA ABERTA ABAIXO ///////////////////////////////////////
                                                    if (responderTaTrue_or_False == true) {

                                                        //alert("FOI PRESSIONADO NO CONTAINE DA MENSAGEM !");
                                                        setFormulario_enviar_proposta_true_false(oldState => !oldState)
                                                        setVoltar_enviar_proposta_true_false(oldState => !oldState)
                                                        //alert(INDICE_GLOBAL_RESPOSTA);
                                                        alernarTrueFalseCaixaResponderF(INDICE_GLOBAL_RESPOSTA);
                                                        alernarTrueFalseBotaoResponderF(INDICE_GLOBAL_RESPOSTA);

                                                        setResponderTaTrue_or_False(false);

                                                    }//IF  
                                                    //RESETAR se tiver CAIXA RESPONDER PROPOSTA ACIMA ///////////////////////////////////////


                                                    //handleClickOcultarFormulario(e);
                                                    setFormulario_enviar_proposta_true_false(oldState => !oldState)
                                                    alernarTrueFalseCaixaResponderF(index);
                                                    alernarTrueFalseBotaoResponderF(index);
                                                    setVoltar_enviar_proposta_true_false(oldState => !oldState);

                                                    setINDICE_GLOBAL_RESPOSTA(index);
                                                    //alert(INDICE_GLOBAL_RESPOSTA);

                                                    setResponderTaTrue_or_False(true);


                                                }}
                                            >
                                                <View style={{ width: '100%', height: 30, padding: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }} >
                                                    <Text style={{ padding: 5, color: 'white', fontSize: 12 }} >Responder</Text>
                                                    <Icon style={{ padding: 5, color: 'white', fontSize: 15 }} name='comment' />
                                                </View>

                                            </TouchableOpacity>
                                        )}

                                    </View>

                                    <View style={{ height: 5 }} />


                                    {caixa_responder_proposta_true_false[index] && (
                                        <View style={{ paddingStart: 7, width: '100%', height: 'auto', flexDirection: 'row', borderWidth: 0, borderColor: 'yellow' }} >

                                            <TextInput
                                                multiline={true} flexWrap='wrap' textAlign={'center'} placeholder={'Digite Aqui Sua Resposta !'} size={15} onChangeText={conteudoDaRespostaF}
                                                style={{ width: '85%', height: 'auto', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderRadius: 15 }}
                                            >
                                            </TextInput>

                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                                <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#25E7DB', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}

                                                    onPress={async () => {

                                                        /************************************************************************************************/
                                                        /************************************************************************************************/
                                                        /************************************************************************************************/
                                                        if (conteudoDaResposta != "" &&
                                                            conteudoDaResposta != null ||
                                                            typeof conteudoDaResposta != "undefined") {
                                                            try {
                                                                var regex = new RegExp(/\w/g);
                                                                var TXT = conteudoDaResposta.match(regex)[0];
                                                                if (conteudoDaResposta.includes(TXT)) {
                                                                    if (conteudoDaResposta.length >= 2) {
                                                                        //TAREFAZ AQUI ABAIXO


                                                                        Keyboard.dismiss();
                                                                        alernarTrueFalseCaixaResponderF(index);
                                                                        alernarTrueFalseBotaoResponderF(index);
                                                                        //param.funcao_resposta_da_proposta(0);
                                                                        //param.funcao_resposta_da_proposta();

                                                                        // alert( propostasss[index].cod_automatico+"\n"+  propostasss[index].conteudo_da_proposta+"\n"+ vendedor_ou_comprador[index] +"  "+data_hora_e_segundo_completo_ingles() +"\n"+conteudoDaResposta );

                                                                        var ID_PROPOSTAS = propostasss[index].cod_automatico;

                                                                        var PRIMEIRA_PROPOSTA = propostasss[index].conteudo_da_proposta;

                                                                        var topo_html = '<html><body>';
                                                                        var bottom_html = '</body></html>';

                                                                        var RESPOSTAS = '';


                                                                        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ABAIXO
                                                                        VENDEDOR = propostasss[index].numero_telefone_vendedor;
                                                                        COMPRADOR = propostasss[index].numero_telefone_comprador;
                                                                        vendedor_ou_comprador[index] =
                                                                            FUNCAO_QUE_IDENTIFICA_SE_E_VENDEDOR_OU_COMPRADOR(propostasss[index].numero_telefone_vendedor, propostasss[index].numero_telefone_comprador)
                                                                        //DEFININDO SE É COMPRADOR OU VENDEDOR NA HORA DE RESPONDER ACIMA

                                                                        // REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE
                                                                        let DATA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_DATAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());
                                                                        let HORA_PORTUGUES_FORMATO_CORRETO = REGULARIZANDO_HORAS_COM_FORMATO_DE_ZEROS_CORRETAMENTE(data_hora_e_segundo_completo());

                                                                        //SEM HTML ABAIXO
                                                                        RESPOSTAS =
                                                                            propostasss[index].conteudo_da_proposta +
                                                                            "\n" +
                                                                            // '<cabecalho>' + vendedor_ou_comprador[index] + "  " + data_hora_e_segundo_completo_ingles() + '</cabecalho>' +
                                                                            // ADICIONADO EM 13 07 2021

                                                                            '<cabecalho>' + DEIXAR_SOMENTE_NUMEROS(VARIAVEL_GLOBAL.TELEFONE) + "  " + DATA_PORTUGUES_FORMATO_CORRETO + " - " + HORA_PORTUGUES_FORMATO_CORRETO + '</cabecalho>' +
                                                                            conteudoDaResposta +
                                                                            "\n";
                                                                        //SEM HTML ACIMA
                                                                        /**/

                                                                        //alert(RESPOSTAS);
                                                                        param.funcao_resposta_da_proposta(ID_PROPOSTAS, RESPOSTAS, VENDEDOR, COMPRADOR);

                                                                        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";



                                                                        //TAREFAZ AQUI ACIMA
                                                                    } else { alert("Resposta muito Curta !"); }
                                                                }//IF ELSE
                                                            } catch (e) { alert("O Campo não pode ser vazio !"); }
                                                        }//IF ELSE
                                                        else { alert("O Campo não pode ser vazio !"); }
                                                        /************************************************************************************************/
                                                        /************************************************************************************************/
                                                        /************************************************************************************************/






                                                    }}//do onPress()    
                                                >
                                                    <Icon style={{ color: 'white', fontSize: 17 }} name='send' />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )}



                                    <View style={{ height: 5 }} />
                                    {/*<View style={{ width:'100%', height: 10, backgroundColor:'#2A3E49' }} />*/}

                                </TouchableOpacity>
                                {/* CONTAINER DA ETIQUETA DA MENSAGEM ACIMA Pressable */}

                            </View>


                        )// containerProposta_Visivel_Invisivel &&

                    ))//DO MAP


                )/*visivel_true_false*/}


            </ScrollView>


            {colocar_celular_visivel_or_invisivel && (
                <Celular_colocar tela_chamada={"tela_proposta"} OCULTAR_TELA_TELEFONE_PROPOSTA_remoto={OCULTAR_TELA_TELEFONE_PROPOSTA} />
            )}


            {/* {waitingVisible && (<Waiting paremetroEnviado={"Aguarde ..."} ORIENTACAO={"PORTRAIT"} />)} */}


            {compra_e_venda_status && (<StatusInfoCompraVenda/>)}



        </View>


    )//return





}//function MensagensPropostas