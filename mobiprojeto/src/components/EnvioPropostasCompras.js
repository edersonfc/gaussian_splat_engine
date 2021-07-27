import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';

import Estilo from './estilo';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";

import MensagensPropostas from './MensagensPropostas';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { data_hora_e_segundo_completo_ingles, data_hora_e_segundo_completo, data_hora_e_segundo_sem_separador, EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES, DEIXAR_SOMENTE_NUMEROS } from '../components/CALCULO_E_FORMATACAO/FORMATACAO';




//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

import GlobalContext from '../context/UsersContext';


import Waiting from './Waiting';


var Propostas_rows = [];
var CONTEUDO_DAS_PROPOSTAS = "";
var VALOR_DO_CAMPO_JSON = "";
var numero_CelularUsuario = "";

//var ConteudoPropostas = "";

var ESTATUS_SE_TA_ONLINE_OU_OFFLINE = "";

var INTERVALO_PESQUISA_PROPOSTAS = "";

export default function EnvioPropostasCompras(props) {

    const [waitingVisible, setWaitingisible] = useState(false);

    const [mensagemDoAguarde, setMensagemDoAguarde] = useState("Aguarde");

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // var IP_DO_SERVIDOR = "http://192.168.0.102:3000/"; 
    var IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;

    const navigation = useNavigation();


    async function pegar_ip() {
        //IP_DO_SERVIDOR = await AsyncStorage.getItem('IP_CONEXAO');
        IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;
        //alert(IP_DO_SERVIDOR);
    }



    const { index } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params
    const { numero_telefone } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params
    const { id_da_postagem } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params
    const { numero_telefone_comprador } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params

    const [valueStart, setValueStart] = useState(0)

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    var altura_1;
    var altura_2;
    var altura_3;
    //const [altura_3_state, setAltura_3_state] = useState(0);


    //altura_1 = (  screenHeight *  5   ) / 100; // NÃO ESTÁ SENDO USADO
    //altura_2 = (  screenHeight * 25   ) / 100; // NÃO ESTÁ SENDO USADO
    altura_3 = ((screenHeight * 10) / 50);

    //alert(altura_1);
    //alert(screenWidth+"   "+screenHeight);






    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    async function PEGANDO_CELULAR_USUARIO() {

        const data = await AsyncStorage.getItem('NUMERO_CELL');
        try {
            numero_CelularUsuario = VARIAVEL_GLOBAL.TELEFONE;
            //alert(numero_CelularUsuario)
        } catch (error) {

            //alert("NÃO FOI ACHADO O NUMERO DO CELL DO USUARIO !"); 

        }

    }//function PEGANDO_CELULAR_USUARIO()
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    PEGANDO_CELULAR_USUARIO();//ESTA LINHA FORA DO  useEffect(()  MAS ESTÁ FUNCIONANDO NORMALMENTE



    var propostasss = [{
        cod_automatico_J: "",
        data_e_hora_ingles_J: "",
        id_da_postagem_J: "",
        id_proposta_J: "",
        numero_telefone_J: "",
        numero_telefone_comprador_J: "",
        conteudoDaProposta_J: "",
        postagem_vista_vendedor_J: "",
        postagem_vista_comprador_J: ""
    }];
    /* */

    const [propostass, setPropostas] = useState();//OBSERVER 22/03/2021


    //BUSCAR PROPOSTAS ABAIXO
    //useEffect(() => {

    const abortCont = new AbortController();

    async function PESQUISAR_PROPOSTAS() {

        try {

            //CONTAINER_DA_FUNCAO = async function PESQUISAR_PROPOSTAS_INTERNA() {
            if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO == "Atualizar-Tela-Proposta") {
                //alert("ESTA CHAMANDO");
                // console.log(VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO);

                clearInterval(INTERVALO_PESQUISA_PROPOSTAS);//IBLOQUEAR O PROCESSO COM TIMER clearInterval

                /* */
                var numero_telefone_J = numero_telefone;
                var id_J = id_da_postagem;
                //await api.get('/comprar_direto', {
                const response = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_propostas', {
                    params: {
                        id_J: id_J,
                        numero_telefone__usuario__J: numero_CelularUsuario,
                        numero_telefone__vendedor_J: numero_telefone_J,
                        numero_telefone_comprador_J: numero_telefone_comprador
                    }
                    //} , {signal: abortCont.signal} );
                });

                CONTEUDO_DAS_PROPOSTAS = await response.data;

                try { JSON.parse(CONTEUDO_DAS_PROPOSTAS) } catch (err) { }

                //alert(  JSON.stringify( CONTEUDO_DAS_PROPOSTAS )  );
                try { propostasss = JSON.stringify(CONTEUDO_DAS_PROPOSTAS); } catch (err) { /*console.log('ERRO 768004776')*/ }// IMPORTANTISSIMO USAR JSON.stringify() NOS DADOS QUE VEM DO BANCO
                setPropostas(propostasss);//ESTÁ CAUSANDO LOOP INFINITO
                //.then( () => {

                // console.log("MOSTRAR PROPOSTA SOMENTE QUANDO SOLICITADO" + " 185#_NUMERO LINHA");
                VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "NENHUMA_NOTIFICACAO_AGORA";
                //Desbloqueando o timer aqui com comando na linha abaixo
                INTERVALO_PESQUISA_PROPOSTAS = setInterval(PESQUISAR_PROPOSTAS, 100);//INCIAR NOVAMENTE O PROCESSO COM TIMER setInterval

                //});//then fechamento


            }//if

        } catch (e) {  /*console.log('ERRO 3RTD54587')*/ }

    }//function PESQUISAR_PROPOSTAS(){
    //BUSCAR PROPOSTAS ACIMA

    //INTERVALO_PESQUISA_PROPOSTAS = setInterval(PESQUISAR_PROPOSTAS, 100);

    //return () =>  abortCont.abort();

    //}, []);



    //DELETAR PROPOSTAS FEITAS ABAIXO
    async function DELETAR_PROPOSTAS(cod_automatico, VENDEDOR_R, COMPRADOR_R) {

        var telefone_destino = "";

        if (VARIAVEL_GLOBAL.TELEFONE === VENDEDOR_R) {

            telefone_destino = COMPRADOR_R;

        } else { telefone_destino = VENDEDOR_R; }

        //alert(cod_automatico);
        /**/
        Axios.get(IP_DO_SERVIDOR + 'deletar_propostas', {

            params: {
                cod_automatico_J: cod_automatico,
                telefone_usuario: VARIAVEL_GLOBAL.TELEFONE,
                telefone_destino: telefone_destino

                //resposta_da_proposta_J: resposta_da_proposta
            }, //DELETAR_PROPOSTAS()

        },
        ).catch((err) => {
            alert(err)
        });


    }//function DELETAR_PROPOSTAS() {    
    //DELETAR PROPOSTAS FEITAS ACIMA 


    useEffect(() => {

        pegar_ip();
        //setInterval( VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE(), 10000);//function
        VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE();//function

    }, []);





    useEffect(() => {

        INTERVALO_PESQUISA_PROPOSTAS = setInterval(PESQUISAR_PROPOSTAS, 100);
        //setPropostas(propostasss);
        return () => clearInterval(INTERVALO_PESQUISA_PROPOSTAS)
    });
    /**/

    /*
    const memoizedCallback = useCallback(
        () => {
            setPropostas(propostasss);
        },
        [propostasss],
      );
      */




    //ESTATUS VERIFICAR SE TÁ ON-LINE OU OFF-LINE ABAIXO
    async function VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE() {

        try {
            //ESTATUS_SE_TA_ONLINE_OU_OFFLINE = await AsyncStorage.getItem('ESTATUS_SE_TA_ONLINE');
            ESTATUS_SE_TA_ONLINE_OU_OFFLINE = VARIAVEL_GLOBAL.CONEXAO_DO_APP;
            //alert(ESTATUS_SE_TA_ONLINE_OU_OFFLINE);

            if (ESTATUS_SE_TA_ONLINE_OU_OFFLINE !== 'ON-LINE') {

                clearInterval(INTERVALO_PESQUISA_PROPOSTAS);

            }//IF

        } catch (exception) { alert(exception); }

    }
    //ESTATUS VERIFICAR SE TÁ ON-LINE OU OFF-LINE ACIMA





    //RESPONDER AS PROPOSTAS ABAIXO
    async function RESPOSTA_DE_PROPOSTAS(id_resposta_proposta, resposta_da_proposta, VENDEDOR_R, COMPRADOR_R) {

        setMensagemDoAguarde("Enviando");
        setWaitingisible(true);

        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

        var telefone_destino = "";

        if (VENDEDOR_R === VARIAVEL_GLOBAL.TELEFONE) {

            telefone_destino = COMPRADOR_R;

        } else { telefone_destino = VENDEDOR_R; }


        var DEU_ERRO_SIM_NAO_TALVEZ = "TALVEZ";


        var telefone_do_usuario_txt = VARIAVEL_GLOBAL.TELEFONE.toString();
        telefone_do_usuario_txt = telefone_do_usuario_txt.replace(/([\[])|([\]])/g, '');



        try {
            //Axios.get(IP_DO_SERVIDOR + 'insert_propostas', {
            await Axios.get(IP_DO_SERVIDOR + 'update_propostas', {

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

            // if (DEU_ERRO_SIM_NAO_TALVEZ === "NAO") {

            VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";
            VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

            myLoop();

            // }

            // alert("RESPONDENDO ABAIXO");

        }

    }//function RESPOSTA_DE_PROPOSTAS()

    //RESPONDER AS PROPOSTAS ACIMA



    // .catch((err) => {
    //     alert(err)
    //     // alert("Já foi enviado a Resposta da Proposta");
    // });


    ////////ENVIAR PROPOSTA ABAIXO
    async function ENVIAR_PROPOSTA(funcao_remota_enivar_proposta) {

        setMensagemDoAguarde("Enviando");
        setWaitingisible(true);

        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

        //obreserve
        var conteudoDaProposta = funcao_remota_enivar_proposta;


        // <cabecalho>Comprador  2021-7-12 23:45:48</cabecalho>
        // ADICIONADO EM 13 07 2021
        //  conteudoDaProposta = "<cabecalho>"+VARIAVEL_GLOBAL.TELEFONE + "  " + data_hora_e_segundo_completo() +"</cabecalho>"  + conteudoDaProposta;

        var data_ingles_para_portugues = await EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(data_hora_e_segundo_completo_ingles());
        // alert( data_ingles_para_portugues ); return 0;
        conteudoDaProposta = "<cabecalho>" + DEIXAR_SOMENTE_NUMEROS(VARIAVEL_GLOBAL.TELEFONE) + "  " + data_ingles_para_portugues + "</cabecalho>" + conteudoDaProposta;

        //propostasss

        //returns a random integer from 0 to 9999  in line  below
        var random = Math.floor(Math.random() * 10000);

        //AQUI VAI AS VARIAVEIS QUE VAI COMPOR O JSON ABAIXO
        var data_e_hora_ingles = data_hora_e_segundo_completo_ingles();
        var id_J = id_da_postagem;

        //var id_proposta = "";
        //if(propostasss.length <= 0){
        var id_proposta = random + data_hora_e_segundo_sem_separador();
        id_proposta = id_proposta.replace(/\s/g, ''); //APAGAR VAZIO DENTRO DA STRING
        //}else{
        //id_proposta =
        //}

        //numero_telefone
        //numero_telefone_comprador
        //conteudoDaProposta
        var postagem_vista_vendedor = "0";
        var postagem_vista_comprador = "1";
        //AQUI VAI AS VARIAVEIS QUE VAI COMPOR O JSON ACIMA

        // alert(numero_telefone_comprador+" AUSDIT")

        var VENDEDOR = numero_telefone;

        // var COMPRADOR = JSON.parse(numero_telefone_comprador);
        // COMPRADOR = COMPRADOR.NUMERO_CELL_J;


        ////AUSDIT 23/05/2021 SUBSTITUIU AS 2 LINHAS ACIMA
        var COMPRADOR = VARIAVEL_GLOBAL.TELEFONE.toString();
        COMPRADOR = COMPRADOR.replace(/([\[])|([\]])/g, '');
        numero_CelularUsuario = VARIAVEL_GLOBAL.TELEFONE.toString();
        COMPRADOR = COMPRADOR.replace(/([\[])|([\]])/g, '');


        /**/
        var comprador_ou_vendedor = "";
        if (VENDEDOR === numero_CelularUsuario) {

            comprador_ou_vendedor = "VENDEDOR";

        } else//IF
            if (COMPRADOR === VENDEDOR) {

                comprador_ou_vendedor = "VENDEDOR";

            } else//IF

                if (COMPRADOR === numero_CelularUsuario) {

                    comprador_ou_vendedor = "COMPRADOR";

                }//IF
        //alert(  comprador_ou_vendedor  );
        // alert(VARIAVEL_GLOBAL.TELEFONE); return 0;
        // conteudoDaProposta = VARIAVEL_GLOBAL.TELEFONE + conteudoDaProposta;

        /* SEGUNDA TENTATIVA QUE TAMBÉM FUNCIONA ABAIXO */
        Axios.get(IP_DO_SERVIDOR + 'insert_propostas', {
            params: {
                data_e_hora_ingles_J: data_e_hora_ingles,
                id_da_postagem_J: id_da_postagem,
                id_proposta_J: id_proposta,
                numero_telefone_J: numero_telefone,
                // numero_telefone_comprador_J: numero_telefone_comprador,
                numero_telefone_comprador_J: VARIAVEL_GLOBAL.TELEFONE, //AUSDIT  23/05/2021 DESATIVADO LINHA ACIMA
                conteudoDaProposta_J: conteudoDaProposta,
                postagem_vista_vendedor_J: postagem_vista_vendedor,
                postagem_vista_comprador_J: postagem_vista_comprador,
                comprador_ou_vendedor_J: comprador_ou_vendedor,
                proposta_aceita_J: 'nao'
            },


        }, //INSERT_PROPOSTAS()

        ).catch((err) => {
            alert(err)
        });
        /* SEGUNDA TENTATIVA QUE TAMBÉM FUNCIONA ACIMA */

        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";

        myLoop();

    }// function ENVIAR_PROPOSTA(){
    /////////ENVIAR PROPOSTA ACIMA



    /////////COMPRAR DIRETO ABAIXO
    async function COMPRAR_DIRETO() {

        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

        // alert("VAI COMPRAR DIRETO");
        //alert( index+"   "+numero_telefone+"   "+id_da_postagem );
        var numero_telefone_J = numero_telefone;
        var id_J = id_da_postagem;

        // try {  var resposta

        var retorno = await Axios.get(IP_DO_SERVIDOR + 'comprar_direto', {
            params: {
                numero_telefone_J: numero_telefone_J,
                id_J: id_J,
                comprador_J: numero_telefone_comprador
            }
            // }, alert("Compra Realizada... Entraremos em Contato !")); TROCADO PELAS 5 LINHAS ABAIXO

        });

        if ((await retorno.data.status) === "sucesso") {

            alert("Compra Realizada... Entraremos em Contato !");

        } else if ((await retorno.data.status) === "falha") {

            alert("Falha ao Comprar, Tente novamente !");

        }

        // } catch (error) { alert("Falha ao Comprar, Tente novamente !") }
    }//function COMPRAR_DIRETO(){                    
    ////////COMPRAR DIRETO ACIMA




    //UPDATE ACEITAR PROPOSTA DO COMPRADOR ABAIXO
    async function ACEITAR_PROPOSTA(cod_automatico) {


        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;

        //alert(cod_automatico);


        await Axios.get(IP_DO_SERVIDOR + 'update_aceitar_proposta', {

            params: {
                cod_automatico_J: cod_automatico
            }, //ACEITAR_PROPOSTA()

        })
            .catch((err) => {
                alert(err)
            });


        await Axios.get(IP_DO_SERVIDOR + 'comprar_direto', {

            params: {
                numero_telefone_J: numero_telefone_J,
                id_J: id_J,
                comprador_J: numero_telefone_comprador
            },

        })
            .catch((err) => {
                alert(err)
            });

        /**/

      
    }//function RESPOSTA_DE_PROPOSTAS()
    //UPDATE ACEITAR PROPOSTA DO COMPRADOR ACIMA 'rgb(255,255,255,0)'



    /***************************************************************/
    var i = 1;                  //  set your counter to 1
    function myLoop() {         //  create a loop function
        setTimeout(async function () {   //  call a 3s setTimeout when the loop is called
            //TAREFAZ ABAIXO
            setWaitingisible(true);
            //TAREFAZ ACIMA  
            i++;  //...increment the counter
            if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO === "Atualizar-Tela-Proposta") {
                //CHAMADA RECURSIVA
                myLoop();
            } else {
                //TAREFAZ ABAIXO
                setWaitingisible(false);
                //TAREFAZ ACIMA  
            }   //...setTimeout()
        }, 1000)
    }
    /***************************************************************/




    return (

        <SafeAreaView style={[Estilo.App, backgroundColor = 'rgb(255,255,255,0)']}>

            <TouchableOpacity style={{ width: '100%', height: 'auto', alignItems: 'flex-start', borderWidth: 0 }}

                onPress={() => {

                    navigation.goBack(null);

                }}

            >
                <Icon name='arrow-left' style={Estilo.fonteMedia} />
            </TouchableOpacity>

            <MensagensPropostas key={Math.floor(Math.random() * 10000)} proposct={propostass} numero_telefon={numero_telefone} numero_telefone_comprado={numero_telefone_comprador}
                numero_CelularUsuari={numero_CelularUsuario} funcao_resposta_da_proposta={RESPOSTA_DE_PROPOSTAS}
                funcao_remota_enivar_proposta={ENVIAR_PROPOSTA} funcao_remota_enivar_comprar_direto={COMPRAR_DIRETO}
                funcao_remota_deletar_proposta={DELETAR_PROPOSTAS} funcao_remota_aceitar_proposta={ACEITAR_PROPOSTA}
            />

            {waitingVisible && (<Waiting paremetroEnviado={mensagemDoAguarde+" ..."} ORIENTACAO={"PORTRAIT"} />)}

        </SafeAreaView >

    )
}