import React, { useEffect, useRef, useState, useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Estilo from './components/estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import estilo from './components/estilo';

import RangeSlider from 'rn-range-slider';

import { metodo_remoto } from './components/funcao_teste'

import ProdutosEtiquetas from './components/ProdutosEtiquetas'

import FlatlistTeste from './components/FlatlistTeste';


import MENU_LATERAL from './components/Menu'

import FILTRO_CATEGORIA from './components/Categorias'

import DETALHES from './components/DetalhesProdutos'

import { useNavigation } from "@react-navigation/native";

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import Geolocation from 'react-native-geolocation-service'

import { useNetInfo } from '@react-native-community/netinfo';

import { arrayUnique, arrayUnique_2, pegar_somente_valores_de_JSON, converter_Array_para_JSON, data_hora_e_segundo_sem_separador, data_hora_e_segundo_completo, data_completa, FORMATAR_AO_DIGITAR_USANDO_MASCARA, Distancia_entre_2_geolocalizacao, REMOVER_ITENS_NULOS_DO_ARRAY, extrair_nome_de_Arquivo_da_url, Badge, hora_e_segundo_completo } from './components/CALCULO_E_FORMATACAO/FORMATACAO';


//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

//CONTEXT_4
import GlobalContext from './context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';
//npm i react-native-socket.io-client
//import io from 'react-native-socket.io-client';
/*
window.navigator.userAgent = 'react-native';
let io = require('socket.io-client');
*/

import FILTRO_PESQUISA_CATEGORIA from './components/FILTRO_PESQUISA_CATEGORIAS';

import LicencaExpirada from './components/LicencaExpirada';

// LicencaExpirada

//VARIAVÉIS GLOBAIS ABAIXO


// var IP_DO_SERVIDOR = "http://192.168.0.102:3000/";
// var IP_DO_SERVIDOR_IO = "http://192.168.0.102:3001/";

var IP_DO_SERVIDOR = "http://192.168.0.102:3000/";
var IP_DO_SERVIDOR_IO = "http://192.168.0.102:3001/";


var TELA_DE_ORIGEM_E_SITUACAO = 'Tela_AppTest_POSTAGEM_SOMENTE';

var contador_iii = 10;


var TODOSSDADOSJSON = "";



var numero_telefone;
var id;
var data;
var LATITUDE;
var LONGITUDE;
var URL_IMAGEN_DADOS;
var URL_VIDEOS_DADOS;
var corMacho;
var corFemea;
var cor_0_12;
var cor_12_24;
var cor_24_36;
var corAcima_36;
var outrasErasAnterior;
var outrasErasPosterior;
var corBezerros;
var corGarrotes;
var corTourunos;
var corBois;
var corBoisGordos;
var corBezerras;
var corNovilhas;
var corVacasBoiadeiras;
var corVacas;
var corVacasGordas;
var corVacasPrenhas;
var corVacasParidas;
var descricoesGerais;
var precoSugerido;
var quantidadeCabecasOuPesos;
var aprovado_postagem;

var favorito;
var venda_status;
var comprador;
var ta_online;



var busca_de_tempo_em_tempo = 0;
var gatilho_primeira_vez = 0;

var filtro_ativado_sim_ou_nao = false;

var DADOS_TELEFONE = "";

//VARIAVÉIS GLOBAIS ACIMA





/* */
async function MOSTRAR_POSTAGENS() {
  //Recuperando dados da POSTAGEM
  var datos = await AsyncStorage.getItem('POSTAGEM');



  try {


    //alert(datos.length);
    //console.log(datos);  ta_online_J

    var obj_JSON = JSON.parse(datos);

    //alert( JSON.stringify(obj_JSON) );
    console.log(JSON.stringify(obj_JSON));


    //alert(obj_JSON.URL_VIDEOS_DADOS_J);

    //var DADO_CONVERTIDOS_PRA_ARRAY = pegar_somente_valores_de_JSON(obj_JSON);
    //alert(DADO_CONVERTIDOS_PRA_ARRAY);


    //alert(Object.values(obj_JSON));  //pegar somente os NOMES dos CAMPOS
    //alert(Object.keys(obj_JSON));  //pegar somente os NOMES dos CAMPOS
    //alert( JSON.stringify( Object.values(obj_JSON) )  );//pegar somente os VALORES dos CAMPOS



    //PERCORRER E IMPRIMIR DADOS DE OBJETOS ARRAY JSON Abaixo
    //Quantidade de Objeto JSON dentro do ARRAY JSON
    var QWE = null;
    for (var i = 0; i < obj_JSON.length; i++) {

      //Quantidade de Itens dentro do Objeto JSON
      for (var j = 0; j < Object.keys(obj_JSON[i]).length; j++) {

        //Linha que Imprime os DADOS do JSON mesmo sendo OBJETOS ARRAY JSON
        console.log(Object.values(obj_JSON[i])[j]);

        QWE += Object.values(obj_JSON[i])[j] + " # ";

      }//FOR j

    }//FOR i
    alert(QWE);
    //PERCORRER E IMPRIMIR DADOS DE OBJETOS ARRAY JSON Acima




    //CAMPOS DAS POSTAGENS ABAIXO
    for (var i = 0; i < obj_JSON.length; i++) {

      numero_telefone = "" + obj_JSON[i].numero_telefone_J;
      id = "" + obj_JSON[i].id_J;
      data = "" + obj_JSON[i].data_J;
      LATITUDE = "" + obj_JSON[i].LATITUDE_J;
      LONGITUDE = "" + obj_JSON[i].LONGITUDE_J;
      URL_IMAGEN_DADOS = "" + obj_JSON[i].URL_IMAGEN_DADOS_J;
      URL_VIDEOS_DADOS = "" + obj_JSON[i].URL_VIDEOS_DADOS_J;
      corMacho = "" + obj_JSON[i].corMacho_J;
      corFemea = "" + obj_JSON[i].corFemea_J;
      cor_0_12 = "" + obj_JSON[i].cor_0_12_J;
      cor_12_24 = "" + obj_JSON[i].cor_12_24_J;
      cor_24_36 = "" + obj_JSON[i].cor_24_36_J;
      corAcima_36 = "" + obj_JSON[i].corAcima_36_J;
      outrasErasAnterior = "" + obj_JSON[i].outrasErasAnterior_J;
      outrasErasPosterior = "" + obj_JSON[i].outrasErasPosterior_J;
      corBezerros = "" + obj_JSON[i].corBezerros_J;
      corGarrotes = "" + obj_JSON[i].corGarrotes_J;
      corTourunos = "" + obj_JSON[i].corTourunos_J;
      corBois = "" + obj_JSON[i].corBois_J;
      corBoisGordos = "" + obj_JSON[i].corBoisGordos_J;
      corBezerras = "" + obj_JSON[i].corBezerras_J;
      corNovilhas = "" + obj_JSON[i].corNovilhas_J;
      corVacasBoiadeiras = "" + obj_JSON[i].corVacasBoiadeiras_J;
      corVacas = "" + obj_JSON[i].corVacas_J;
      corVacasGordas = "" + obj_JSON[i].corVacasGordas_J;
      corVacasPrenhas = "" + obj_JSON[i].corVacasPrenhas_J;
      corVacasParidas = "" + obj_JSON[i].corVacasParidas_J;
      descricoesGerais = "" + obj_JSON[i].descricoesGerais_J;
      precoSugerido = "" + obj_JSON[i].precoSugerido_J;
      quantidadeCabecasOuPesos = "" + obj_JSON[i].quantidadeCabecasOuPesos_J;
      aprovado_postagem = "" + obj_JSON[i].aprovado_postagem_J;

      favorito = "" + obj_JSON[i].favorito_J;

      venda_status = "" + obj_JSON[i].venda_status_J;
      comprador = "" + obj_JSON[i].comprador_J;
      ta_online = "" + obj_JSON[i].ta_online_J;


    }//FOR
    //alert(LATITUDE);

    //CAMPOS DAS POSTAGENS ACIMA

  } catch (error) { alert('NÃO TEM DADOS GRAVADOS'); alert(error) }


}//MOSTRAR_POSTAGENS()


//ARRAYS DE NOTIFICAÇÕES DO SISTEMA
var array_propostas_recentes_recebidas = [];
var array_propostas_recentes_enviadas = [];
var array_propostas_recentes_aceitas = [];
var array_venda_recentes_requisitadas = [];




export default function AppTest() {

  //CONTEXT_5
  const { VARIAVEL_GLOBAL } = useContext(GlobalContext);


  /* */
  async function pegar_ip() {
    // IP_DO_SERVIDOR = await AsyncStorage.getItem('IP_CONEXAO');
    //alert(IP_DO_SERVIDOR);

    await AsyncStorage.setItem('TELA_PRA_VOLTAR', 'TelaPrincipal');
    VARIAVEL_GLOBAL.NUMERO_IP = IP_DO_SERVIDOR;
    /*
    IP_DO_SERVIDOR_IO = IP_DO_SERVIDOR.replace(/:3000\//g,':3001/');
    //alert(IP_DO_SERVIDOR_IO);
    */
  }

  useEffect(() => {

    pegar_ip();

    //use effect cleanup to set flag false, if unmounted
    return () => { isMounted = false };

  }, []);


  //IP_DO_SERVIDOR = "http://192.168.0.102:3000/";


  const [notificacao_visivel_true_false, setNotificacao_visivel_true_false] = useState(false);

  const [qtde_propostas_recebidas_nao_vista, setQtde_propostas_recebidas_nao_vista] = useState('0');

  const [qtde_propostas_enviadas_nao_vista, setQtde_propostas_enviadas_nao_vista] = useState('0');

  const [qtde_propostas_aceitas_nao_vista, setQtde_propostas_aceitas_nao_vista] = useState('0');

  const [qtde_venda_recentes_nao_vista, setQtde_venda_recentes_nao_vista] = useState('0');

  const [somatorio_notificacao_numero, setSomatorio_notificacao_numero] = useState(0);

  var [imprimirContadorTemporizador, setImprimirContadorTemporizador] = useState(0);

  const [qtde_notificacao, setQtde_notificacao] = useState('0');

  //PROVISORIO ABAIXO
  var [quantidadeCabecasOuPesos, setQuantidadeCabecasOuPesos] = useState('');
  function quantidadeCabecasOuPesosF(quantidadeCabecasOuPesos) { setQuantidadeCabecasOuPesos(quantidadeCabecasOuPesos); }
  //PROVISORIO ACIMA


  var [pesquisarGado, setPesquisarGado] = useState('');
  function pesquisarGadoF(varPesquisaGado) { setPesquisarGado(varPesquisaGado); }

  var [labelOuPesquisar, setLabelOuPesquisar] = useState(true);

  const [botoePropostas, setBotoePropostas] = useState(false);
  const [botoePropostasRecebidas, setbotoePropostasRecebidas] = useState(true);
  const [botoePropostasEnviadas, setbotoePropostasEnviadas] = useState(false);
  const [botoePropostasAceitas, setbotoePropostasAceitas] = useState(false);






  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //REMOVENDO TUDO DAQUI ATÉ ANTES DO RETURN ABAIXO


  const navigation = useNavigation();


  //var URL = "file:///";
  var URL_FOTOS = "file:///zerar_postagem";
  var URL_VIDEOS = "file:///";


  ////DECLARAÇÃO DE STATES ABAIXO
  const [exibeDetalheProdutos, setExibeDetalheProdutos] = useState(false)
  // const [produtos, setProdutos] = useState([]);
  var [variavelTexto, setVariavelTexto] = useState('');
  const [muda_cor, setMuda_cor] = useState(false)
  const [exibe, setExibe] = useState(false)
  const [exibeMenu, setExibeMenu] = useState(false)
  const [exibeFiltroCategoria, setExibeFiltroCategoria] = useState(false)
  const inputRef = useRef();
  const [valorMenor, setValorMenor] = useState(0)
  const [valorMaior, setValorMaior] = useState(300)


  const [exibe_suas_postagens, setExibe_suas_postagens] = useState(false);
  const [corIconeFiltro, setCorIconeFiltro] = useState(false);


  const [licencaExpiradaFalseOrTrue, setLicencaExpiradaFalseOrTrue] = useState(false);

  ////DECLARAÇÃO DE STATES ACIMA


  ////FUNÇÕES JAVASCRIPT ABAIXO



  function MASCARA_PARA_O_COMPOENTES() {  //alert(paramentro)
    variavelTexto = FORMATAR_AO_DIGITAR_USANDO_MASCARA(variavelTexto, '000.000.000-00');
  }


  /* ADICIONANDO OBJETOS DINAMICAMENTE ABAIXO com o comando for  ABAIXO 
  var Produtos_rows = [];
  function ADICIONAR_PRODUTOS_por_ARRAY() {
    for (var i = 0; i < 10; i++) {
      Produtos_rows.push(<ProdutosEtiquetas key={i} />);
    }
    return Produtos_rows;
  }
  //ADICIONANDO OBJETOS DINAMICAMENTE ABAIXO com o comando for  ACIMA */


  //ADICIONANDO PRODUTOS NA TELA GRAVADOS ARMAZENADO PELO AsyncStorage()  ABAIXO




  const [produtosS, setProdutos] = useState();
  var [ARRAY_PRIMEIRAS_URL_IMAGENS_2, setARRAY_PRIMEIRAS_URL_IMAGENS_2] = useState([]);
  var [ARRAY_PRIMEIRAS_URL_VIDEOS_2, setARRAY_PRIMEIRAS_URL_VIDEOSS_2] = useState([]);
  const [produtosEtiquetasExibir, setProdutosEtiquetasExibir] = useState(false);



  //VERIFICANDO SE TEM CONEXÃO COM INTERNET ABAIXO
  const NetInfo = useNetInfo();
  //const [messageConnection, setMessageConnection] = useState('Connected');
  const [messageConnection, setMessageConnection] = useState(true);//MUDAR PRA false DEPOIS

  const [tempo_regressivo, setTempo_regressivo] = useState(5);


  //CONTADOR REGRESSIVO AQUI ABAIXO
  var segundos = 60;
  var RETORNO_JSON = "";
  var RETORNO_STRING = "";





  ////METODO EXTERNO QUE VERIFICA SE TEM CONEXÃO COM  O SERVIDOR ABAIXO
  async function isAvailable() {

    const CONEXAO = IP_DO_SERVIDOR + 'ping_no_servidor';

    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 3000, 'Request timed out');
    });

    // const request = fetch('https://httpbin.org/delay/5');
    const request = fetch(CONEXAO);

    try {
      const response = await Promise
        .race([timeout, request]);
      VARIAVEL_GLOBAL.CONEXAO_DO_APP = "ON-LINE";
    } catch (error) {
      VARIAVEL_GLOBAL.CONEXAO_DO_APP = "OFF-LINE";
    }
  }


  // ////METODO EXTERNO QUE VERIFICA SE TEM CONEXÃO COM O SERVIDOR ACIMA






  //VERIFICANDO SE TEM CONEXÃO COM INTERNET ABAIXO
  //FUNCIONANDO QUASE PERFEITAMENTE ABAIXO 
  //useEffect de ATUALIZAÇÃO DA TELA PRINCIPAL ONDE APARECE TODOS PRODUTOS ABAIXO

  useEffect(() => {



    let VARIAVEL_DA_FUNCAO_TIMER = setInterval(async function contagem_tempo() {

      //BLOCO DE METODOS DOS OUVINTES QUE BUSCA INFORMAÇÃO NO BANCO DE DADOS SEJA OFF-LINE ou ON-LINE ABAIXO
      if (filtro_ativado_sim_ou_nao === false) {

        // if (contador_iii === 10) {
        if (VARIAVEL_GLOBAL.CONTADOR_GLOBAL === 60) {
          VARIAVEL_GLOBAL.CONTADOR_GLOBAL = 0;

          clearInterval(VARIAVEL_DA_FUNCAO_TIMER);//IBLOQUEAR O PROCESSO COM TIMER clearInterval



          //Executando alguma tarefa assincrona aqui ABAIXO com o timer bloqueado  no caso a promisse



          // //PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ABAIXO   TENTATIVA NUMERO 1 ABAIXO     

          // console.log(hora_e_segundo_completo())

          const CONEXAO = IP_DO_SERVIDOR + 'ping_no_servidor';

          async function fetchWithTimeout(resource, options) {
            const { timeout = 8000 } = options;

            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(resource, {
              ...options,
              signal: controller.signal
            });
            clearTimeout(id);

            return response;
          }




          async function VERIFICANDO_ESTATUS_DE_CONEXAO_COM_SERVIDOR() {
            try {
              const response = await fetchWithTimeout(CONEXAO, {
                timeout: 5000,
                headers: {
                  'Cache-Control': 'no-cache, no-store, must-revalidate',
                  'Pragma': 'no-cache',
                  'Expires': 0
                }
              }
              );
              const respostaJSON = await response.json();
              // return respostaJSON;

              /***********TAREFAZ AQUI ABAIXO****************** */

              if (filtro_ativado_sim_ou_nao === false) {
                //process response
                CONECTANDO_AO_BANCO_DE_DADOS()
                  .then(() => {
                    ADICIONAR_PRODUTOS_por_ARRAY(true)
                      .then(() => {
                        //alert(busca_de_tempo_em_tempo+" CONECTADO");
                        //ARMAZENAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE('ON-LINE');
                        VARIAVEL_GLOBAL.CONEXAO_DO_APP = "ON-LINE";
                        //console.log("INICIO => " + hora_e_segundo_completo());
                        // await BUSCANDO_NOTIFICACOES_2();
                        console.log(VARIAVEL_GLOBAL.CONTADOR_GLOBAL + " => " + hora_e_segundo_completo())
                      })
                  })

              }//IF
              console.log("ESTÁ ON-LINE");
              BUSCAR_LICENCA_DE_USO();

              /***********TAREFAZ AQUI ACIMA******************** */


            } catch (error) {
              // Timeouts if the request takes
              // longer than 6 seconds
              // console.log(error.name === 'AbortError');
              console.log("ESTÁ OFF-LINE");
              VARIAVEL_GLOBAL.CONEXAO_DO_APP = "OFF-LINE";
            }
          }


          await VERIFICANDO_ESTATUS_DE_CONEXAO_COM_SERVIDOR();

          // console.log(hora_e_segundo_completo())

          // ////PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ACIMA       TENTATIVA NUMERO 1 ACIMA








          // // //PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ABAIXO    TENTATIVA NUMERO 2 ABAIXO  

          // console.log(hora_e_segundo_completo())


          // const CONEXAO = IP_DO_SERVIDOR + 'ping_no_servidor';

          // // loadProducts = async () => {
          // async function VERIFICANDO_ESTATUS_DE_CONEXAO_COM_SERVIDOR() {
          //   try {
          //     const response = await Axios.get(CONEXAO);

          //     var RESPOSTA = await response.data;

          //     // console.log(RESPOSTA);
          //     console.log("ON-LINE !");

          //   } catch (err) {
          //     // TODO
          //     // adicionar tratamento da exceção
          //     // console.error(err);
          //     console.log("OFF-LINE !");
          //   }
          // };


          // await VERIFICANDO_ESTATUS_DE_CONEXAO_COM_SERVIDOR();

          // console.log(hora_e_segundo_completo())

          // // //PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ACIMA     TENTATIVA NUMERO 2 ACIMA



          // //PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ABAIXO   TENTATIVA NUMERO 3 ABAIXO  

          // var RETORNNO = await isAvailable();
          // console.log(RETORNNO);

          // ////PROMISSE PARA VERIFICAR CONEXÃO COM SERVIDOR ACIMA       TENTATIVA NUMERO 3 ACIMA




          //Desbloqueando o timer aqui com comando na linha abaixo
          VARIAVEL_DA_FUNCAO_TIMER = setInterval(contagem_tempo, 1000);//INCIAR NOVAMENTE O PROCESSO COM TIMER setInterval

        }//Condição de Bloqueio

        // setImprimirContadorTemporizador(contador_iii++);//OBSERVER 2
        VARIAVEL_GLOBAL.BUSCAR_POSTAGENS = "NAO"

      }//FALSE
      //BLOCO DE METODOS DOS OUVINTES QUE BUSCA INFORMAÇÃO NO BANCO DE DADOS SEJA OFF-LINE ou ON-LINE ACIMA

      VARIAVEL_GLOBAL.CONTADOR_GLOBAL++;

      // console.log(VARIAVEL_GLOBAL.CONTADOR_GLOBAL)

    }, 1000);//function final do timer



    //use effect cleanup to set flag false, if unmounted
    return () => clearInterval(VARIAVEL_DA_FUNCAO_TIMER);
    //FUNCIONANDO QUASE PERFEITAMENTE ACIMA
    //VERIFICANDO SE TEM CONEXÃO COM INTERNET ACIMA  



    // }, [somatorio_notificacao_numero, VARIAVEL_GLOBAL.BUSCAR_POSTAGENS, produtosEtiquetasExibir]);
  }, [somatorio_notificacao_numero, VARIAVEL_GLOBAL.TODOS_OS_PRODUTOS]);
  //useEffect de ATUALIZAÇÃO DA TELA PRINCIPAL ONDE APARECE TODOS PRODUTOS ACIMA




  async function ADICIONAR_PRODUTOS_por_ARRAY(estado_da_conecao) {

    try {

      var datos = "";

      if (estado_da_conecao) {
        //alert(estado_da_conecao);    NUMERO_CELL_J

        //BUSCANDO POSTAGENS NA INTERNET ABAIXO


        // //FOI DESATIVADO O ASYNKSTORAGE ABAIXO
        // DADOS_TELEFONE = await AsyncStorage.getItem('NUMERO_CELL');
        // var DADOS_TELEFONE_VALOR = "";
        // try {
        //   //var numero_telefone_J = obj_JSON[i].numero_telefone_J;
        //   //alert(typeof DADOS_TELEFONE);
        //   var DADOS_TELEFONE_JSON = JSON.parse(DADOS_TELEFONE);
        //   // alert(Object.values(DADOS_TELEFONE_JSON));
        //   DADOS_TELEFONE_VALOR = String(Object.values(DADOS_TELEFONE_JSON));
        //   //alert(DADOS_TELEFONE_VALOR);

        // } catch (error) { /* alert("#3547wer " + error); */ }
        //  //FOI DESATIVADO O ASYNKSTORAGE ACIMA



        var response = "";

        //PRIMEIRA TENTATIVA ABAIXO
        try { //alert(IP_DO_SERVIDOR);
          // response = await api.get('/obtendo_postagens_online', {
          //response = await Axios.get('http://192.168.0.102:3000/obtendo_postagens_online', {
          response = await Axios.get(IP_DO_SERVIDOR + "obtendo_postagens_online", {

            // params: { numero_telefone: DADOS_TELEFONE_VALOR }
            params: { numero_telefone: VARIAVEL_GLOBAL.TELEFONE }
          });

        } catch (exception) { alert(exception.message)/**/ }

        //alert(typeof response.data);



        var DADOS_REMOTO_ONLINE = JSON.stringify(response.data);

        //alert(DADOS_REMOTO_ONLINE);

        /* //PEGA SOMENTE OS VALORES ABAIXO
           for(var i = 0; i < response.data.length;  i++ ){
             //alert( Object.values(response.data[i]) );
             //console.log( Object.values(response.data[i]) );
             DADOS_REMOTO_ONLINE = Object.values(response.data[i]);
           }//FOR
           alert(DADOS_REMOTO_ONLINE);
         */ //PEGA SOMENTE OS VALORES ACIMA

        //BUNCANDO POSTAGENS NA INTERNET ACIMA
        /**/
        //datos = await AsyncStorage.getItem('POSTAGEM');//REMOVER SOMENTE O AWAIT NESSA LINHA
        datos = DADOS_REMOTO_ONLINE;
        //console.log(datos);

      } else {
        datos = await AsyncStorage.getItem('POSTAGEM');
        //console.log(datos);
      }

      // alert(datos);

      var URLs_JSON;

      if (datos.includes("|")) {

        ARRAY_PRIMEIRAS_URL_IMAGENS_2.length = 0;
        ARRAY_PRIMEIRAS_URL_VIDEOS_2.length = 0;

        URLs_JSON = JSON.parse(datos);
        //alert(URLs_JSON.length);
        var PRIMEIRA_URL_IMAGEM_INDEXOF;
        var PRIMEIRA_URL_VIDEO_INDEXOF;
        for (var i = 0; i < URLs_JSON.length; i++) {


          //if(i != 6 ){//DESATIVAR DEPOIS QUE TERMINAR O APLICATIVO SOMENTE PARA TESTE 07/11/2020

          //TRATAMENTO COM IMAGENS ABAIXO
          PRIMEIRA_URL_IMAGEM_INDEXOF = URLs_JSON[i].URL_IMAGEN_DADOS_J;
          var TAMANHO = PRIMEIRA_URL_IMAGEM_INDEXOF.indexOf("|");
          PRIMEIRA_URL_IMAGEM_INDEXOF = PRIMEIRA_URL_IMAGEM_INDEXOF.substring(0, TAMANHO);
          ARRAY_PRIMEIRAS_URL_IMAGENS_2.push(PRIMEIRA_URL_IMAGEM_INDEXOF);
          //TRATAMENTO COM IMAGENS ACIMA

          //TRATAMENTO COM VIDEOSS ABAIXO
          PRIMEIRA_URL_VIDEO_INDEXOF = URLs_JSON[i].URL_VIDEOS_DADOS_J;
          var TAMANHO_2 = PRIMEIRA_URL_VIDEO_INDEXOF.indexOf("|");
          PRIMEIRA_URL_VIDEO_INDEXOF = PRIMEIRA_URL_VIDEO_INDEXOF.substring(0, TAMANHO_2);
          ARRAY_PRIMEIRAS_URL_VIDEOS_2.push(PRIMEIRA_URL_VIDEO_INDEXOF);
          //TRATAMENTO COM VIDEOSS ACIMA
          //}//IF //DESATIVAR DEPOIS QUE TERMINAR O APLICATIVO SOMENTE PARA TESTE 07/11/2020

        }//FOR

        /*
        //ARRAY_PRIMEIRAS_URL_IMAGENS_2 = await arrayUnique_2(ARRAY_PRIMEIRAS_URL_IMAGENS_2, ARRAY_PRIMEIRAS_URL_VIDEOS_2);
        ARRAY_PRIMEIRAS_URL_IMAGENS_2 = await REMOVER_ITENS_NULOS_DO_ARRAY(ARRAY_PRIMEIRAS_URL_IMAGENS_2);
        alert( ARRAY_PRIMEIRAS_URL_IMAGENS_2 );
        alert(ARRAY_PRIMEIRAS_URL_IMAGENS_2.length);
        */


      }//IF

      //alert(datos);

      setProdutos(datos);
      //alert(produtosS);
      VARIAVEL_GLOBAL.TODOS_OS_PRODUTOS = datos;
      if (datos.length > 2) {
        setProdutosEtiquetasExibir(true);
      } else { setProdutosEtiquetasExibir(false); }
      console.log("ESTADO => " + produtosEtiquetasExibir + "  " + datos.length);


    } catch (error) { /*  alert("#9514797 " + error);  */ }

  }
  //ADICIONANDO PRODUTOS NA TELA GRAVADOS ARMAZENADO PELO AsyncStorage()  ACIMA 




  ////FUNÇÕES JAVASCRIPT ACIMA


  //HOOKS DA GEOLOCALIZAÇÃO ABAIXO
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState(false);
  //HOOKS DA GEOLOCALIZAÇÃO ACIMA

  //FUNÇÃO QUE VERIFICA SE O APP TEM PERMISSÃO PRA ACESSAR O GPS ABAIXO
  async function verifyLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permissão concedida');
        setHasLocationPermission(true);
      } else {
        console.error('permissão negada');
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err)
    }

  }
  //FUNÇÃO QUE VERIFICA SE O APP TEM PERMISSÃO PRA ACESSAR O GPS ACIMA

  //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ABAIXO 

  // useEffec DA GEOLOCALIZAÇÃO NO CELULAR ABAIXO
  useEffect(() => {

    verifyLocationPermission();

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },

        error => {
          console.log(error.code, error.message);
        }
      );
    }

    //use effect cleanup to set flag false, if unmounted
    return () => { isMounted = false };

  }, [hasLocationPermission]);
  // useEffec DA GEOLOCALIZAÇÃO NO CELULAR ACIMA


  var [numero_CelularUsuario, setNumero_CelularUsuario] = useState("");


  var array_PROPOSTAS_RECEBIDAS = [0];
  var array_PROPOSTAS_ENVIADAS = [0];
  var array_PROPOSTAS_ACEITAS = [0];
  var array_VENDAS_RECENTES = [0];

  /* */
  //PEGAR NUMERO NO CELULAR NO CARREGAMENTO ABAIXO
  useEffect(() => {

    PEGAR_NUMERO_DO_CELL_NO_CARREGAMENTO().then(() => {
      //use effect cleanup to set flag false, if unmounted
      //alert(IP_DO_SERVIDOR_IO);
      //IN CONSTRUCTION HERE SOCKET IO ABAIXO 
      const socket = io(IP_DO_SERVIDOR_IO, {
        query: {
          id: VARIAVEL_GLOBAL.TELEFONE
        }

      });


      /*
      //ENVIANDO MENSAGEM PELO SOCKET HERE DOWN
      var MENSAGEM_CONTEUDO = "Ederson enviando mensagem";
      socket.emit("chat message", MENSAGEM_CONTEUDO);
      */


      //RECEBENDO MENSAGEM
      //socket.on("edersonfc99371235187", msg => {
      socket.on(VARIAVEL_GLOBAL.TELEFONE, msg => {

        VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;
        BUSCANDO_NOTIFICACOES_2();

        //alert(msg);
        async function FUNCAO_NOTIFICACAO_PAI(msg_parametro) {

          VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = msg_parametro;

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("Proposta-Recebida-Recente")) {

            // setNotificacao_visivel_true_false(true);
            VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";
            //console.log(msg_parametro);

          }

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("Resposta-da-Proposta-Recebida-Recente")) {

            VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";

          }

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("propostas-aceitas")) {

            // VARIAVEL_GLOBAL.PROPOSTAS_ACEITAS = parseInt(VARIAVEL_GLOBAL.PROPOSTAS_ACEITAS) + 1;
            // setQtde_propostas_aceitas_nao_vista(VARIAVEL_GLOBAL.PROPOSTAS_ACEITAS);
            setNotificacao_visivel_true_false(true);

          }

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("compra-efetuada")) {

            //alert("Compraram Algum Produto Seu.");
            // VARIAVEL_GLOBAL.VENDAS_RECENTES = parseInt(VARIAVEL_GLOBAL.VENDAS_RECENTES) + 1;
            // setQtde_venda_recentes_nao_vista(VARIAVEL_GLOBAL.VENDAS_RECENTES);

            //VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "NENHUMA_NOTIFICACAO_AGORA";

          }

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("deletar_propostas")) {

            //alert("Foi Apagado uma Proposta Sua");
            VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";
          }

          if (VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO.includes("Postagem de Bovinos")) {
            // alert("Postagem de Bovinos");
          }


          VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;
          // BUSCANDO_NOTIFICACOES_2();


          // setNotificacao_visivel_true_false(true);



        }//IF  FUNCAO_NOTIFICACAO_PAI

        FUNCAO_NOTIFICACAO_PAI(msg).then(() => {

          setSomatorio_notificacao_numero(VARIAVEL_GLOBAL.PROPOSTAS_RECEBIDAS + VARIAVEL_GLOBAL.PROPOSTAS_ENVIADAS + VARIAVEL_GLOBAL.PROPOSTAS_ACEITAS + VARIAVEL_GLOBAL.VENDAS_RECENTES);

        });



      });
      //IN CONSTRUCTION HERE SOCKET IO ACIMA



    });

    //SETAR PRA BUSCAR NOTIFICAÇÃO 
    //VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "BUSCAR_NOTIFICACAO_NA_INICIALIZACAO_ATIVADA";

    return () => { isMounted = false };

  }, [VARIAVEL_GLOBAL.TELEFONE]);//OBSERVER PARECE QUE ESTÁ DANDO LOOP ESSA VARIÁVEL AI
  //}, [ VARIAVEL_GLOBAL.TELEFONE ]);
  //PEGAR NUMERO NO CELULAR NO CARREGAMENTO ACIMA



  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  const [menu_aviso_visivel_or_invisivel, setMenu_aviso_visivel_or_invisivel] = useState(false);

  const [faixa_submenu_e_filtro, setFaixa_submenu_e_filtro] = useState(true);

  const [texto_filtro_notificacao, setTexto_filtro_notificacao] = useState("");



  //#MUDADO PRA CA ABAIXO #REFERENCE321

  async function REMOVER_ITEM_DO_JSON() {

    /**/
    const data = await AsyncStorage.getItem('POSTAGEM');
    //alert(data);

    var obj_JSON = JSON.parse(data);

    //alert(obj_JSON.length);
    //alert(  Object.keys(obj_JSON[3]) ); 
    //alert(  Object.values(obj_JSON[3]) ); 
    //alert(  JSON.stringify(obj_JSON[3]) );    

    //REMOVER ITEM PELO INDICE DO OBJETO JSON
    //Obs: Item é um conjunto de valores do Objeto JSON dentro de 1 Indice
    obj_JSON.splice(obj_JSON.indexOf(obj_JSON[6]), 1);
    //alert(  JSON.stringify(obj_JSON) );  
    //alert(obj_JSON.length);


    //REMOVER TODOS ITENS DO ASYNCSTORAGE
    await AsyncStorage.removeItem('POSTAGEM');
    //ARMAZENANDO NO BANCO DE DADOS ABAIXO
    await AsyncStorage.setItem('POSTAGEM', JSON.stringify(obj_JSON));

  }




  //NUMERO DE CELULAR PEGO NO INICIO DO CARREGAMENTO DA TELA ABAIXO
  async function PEGAR_NUMERO_DO_CELL_NO_CARREGAMENTO() { //OBSERVER ME PARECE QUE ESTÁ DANDO LOOP
    //Recuperando dados da POSTAGEM
    const data = await AsyncStorage.getItem('NUMERO_CELL');

    try {
      //alert(data);
      var obj_JSON = JSON.parse(data);
      numero_CelularUsuario = Object.values(obj_JSON);
      //alert(numero_CelularUsuario);
      //CONTEXT_6
      VARIAVEL_GLOBAL.TELEFONE = numero_CelularUsuario;
      DADOS_TELEFONE = JSON.stringify(obj_JSON);
      //console.log(DADOS_TELEFONE);
    } catch (error) {
      //alert('NÃO TEM NUMERO GRAVADOS, VAI CHAMAR CAIXA DE POR CELULAR'); 
      //setCaixaNumeroCelularVisivel(true);
    }
  }
  //NUMERO DE CELULAR PEGO NO INICIO DO CARREGAMENTO DA TELA ACIMA








  //CALCULO DE DISTANCIA ENTRE GEOLOCALIZAÇÃO ABAIXO
  var latitude_1 = -20.7780092;
  var latitude_2 = -20.791323;

  var longitude_1 = -51.730184;
  var longitude_2 = -51.634494;

  var DISTANCIA;
  DISTANCIA = Distancia_entre_2_geolocalizacao(latitude_1, latitude_2, longitude_1, longitude_2);
  //alert(DISTANCIA);
  //CALCULO DE DISTANCIA ENTRE GEOLOCALIZAÇÃO ACIMA






  async function APAGAR_POSTAGEM(key) {

    try {
      await AsyncStorage.removeItem(key);
      alert("FOI APAGADO OS ITENS !");

    }
    catch (exception) {
      alert("FALHA NA GRAVAÇÃO !");

    }

  }


  ////MANIPULAR O NUMERO DO TELEFONE CADASTRADO NO CELULAR DO USUÁRIO ABAIXO
  //////////////////////////////////////////////////////////////////////////
  async function MOSTRAR_NUMERO_CELULAR() {
    //Recuperando dados da POSTAGEM
    const data = await AsyncStorage.getItem('NUMERO_CELL');

    /**/
    try {

      alert(data);
      var obj_JSON = JSON.parse(data);
      //alert(obj_JSON.URL_VIDEOS_DADOS_J);

      var DADO_CONVERTIDOS_PRA_ARRAY = pegar_somente_valores_de_JSON(obj_JSON);
      //alert(DADO_CONVERTIDOS_PRA_ARRAY);

    } catch (error) { alert('NÃO TEM Nº DE CELULAR GRAVADO !'); }


  }





  async function APAGAR_NUMERO_CELULAR(key) {

    try {
      await AsyncStorage.removeItem(key);
      alert("FOI APAGADO O Nº DE CELULAR !");

    }
    catch (exception) {
      alert("FALHA AO TENTAR APAGAR !");

    }

  }
  //////////////////////////////////////////////////////////////////////////
  ////MANIPULAR O NUMERO DO TELEFONE CADASTRADO NO CELULAR DO USUÁRIO ACIMA




  ///////
  async function PEGAR_TODAS_CHAVES_DO_ASYNC_STORAGE() {

    /*
    var listData = [];
    let keys = await AsyncStorage.getAllKeys();
    keys.forEach(async function(inKey) {
      const person = await AsyncStorage.getItem(inKey);
      person.key = inKey;
      listData.push(person);
    });
    */
    let keys = await AsyncStorage.getAllKeys();
    alert(keys);

  }





  //CONECTAR AO BANCO DE DADOS ABAIXO
  async function CONECTANDO_AO_BANCO_DE_DADOS() {

    try {
      await INSERINDO_NO_BANCO_DE_DADOS_POSTAGENS_OFF_LINE();
      // VARIAVEL_GLOBAL.CONTADOR_GLOBAL = 55;
    } catch (error) { alert(error) }

  }//function CONECTANDO_AO_BANCO_DE_DADOS()
  //CONECTAR AO BANCO DE DADOS ACIMA







  //INSERINDO DADOS NO BANCO DE DADOS ABAIXO
  async function INSERINDO_NO_BANCO_DE_DADOS_POSTAGENS_OFF_LINE() {

    //setSomatorio_notificacao_numero(0);

    try {

      //Pegando dados das POSTAGENS GRAVADO OFF LINE
      var datos = await AsyncStorage.getItem('POSTAGEM');
      //alert(datos);
      //console.log(datos);
      var obj_JSON = JSON.parse(datos);
      //alert(  JSON.stringify(obj_JSON[0]) );
      //alert(obj_JSON.length);

      for (var i = 0; i < obj_JSON.length; i++) {

        var TA_ON_LINE = obj_JSON[i].ta_online_J;//ADICIONADO EM 05/12/2020

        //alert(TA_ON_LINE);

        var JSON_POSTAGEM_STRING = JSON.stringify(obj_JSON[i]);
        //alert( JSON_POSTAGEM_STRING );

        //VERIFICANDO SE POSTAGEM ESTÁ GRAVADO ON-LINE e fazendo A SINCRONIZAÇÃO no BANCO DE DADOS ABAIXO
        /*METODO DE SELECT REMOTO NO BANCO DE DADOS ONLINE ABAIXO */
        var numero_telefone_J = obj_JSON[i].numero_telefone_J;
        var id_J = obj_JSON[i].id_J;

        const response = await Axios.get(IP_DO_SERVIDOR + 'se_postagem_esta_online', {
          params: {
            numero_telefone_J: numero_telefone_J,
            id_J: id_J,
          }
        });

        //console.log( response.data.length );
        var tamanho = response.data.length;

        if (tamanho == 0) {
          //console.log( "GRAVAR" );
          /* METODO DE SELECT REMOTO NO BANCO DE DADOS ONLINE ACIMA */

          //if (TA_ON_LINE === 'nao') { //ADICIONADO EM 05/12/2020
          //console.log("GRAVAR");

          //TENTAR UPAR IMAGENS e VIDEOS AQUI Abaixo


          //UPLOAD DE IMAGENS ABAIXO
          //1º Upload de IMAGENS
          var URL_IMAGEN_DADOS_J = obj_JSON[i].URL_IMAGEN_DADOS_J;
          var ARRAY_IMAGENS = URL_IMAGEN_DADOS_J.split("|");
          ARRAY_IMAGENS = await REMOVER_ITENS_NULOS_DO_ARRAY(ARRAY_IMAGENS);

          //ENVIANDO IMAGENS PRO SERVIDOR REMOTO ABAIXO
          ARRAY_IMAGENS.map(async (photo, index) => {
            var nome_do_arquivo = (extrair_nome_de_Arquivo_da_url(ARRAY_IMAGENS[index]).arquivo);
            //COMANDOS DAQUI PRA BAIXO
            //CHAMANDO O METODO DE ENVIO DE IMAGENS PRO SERVIDOR
            UPLOAD_PRO_SERVIDOR(nome_do_arquivo, ARRAY_IMAGENS[index]);



            //COMANDOS DAQUI PRACIMA
          });//MAP
          //ENVIANDO IMAGENS PRO SERVIDOR REMOTO ACIMA

          //UPLOAD DE IMAGENS ACIMA



          /**/
          //UPLOAD DE VÍDEOS ABAIXO
          //2º Upload de VIDEOS
          var URL_VIDEOS_DADOS_J = obj_JSON[i].URL_VIDEOS_DADOS_J;
          var ARRAY_VIDEOS = URL_VIDEOS_DADOS_J.split("|");
          ARRAY_VIDEOS = await REMOVER_ITENS_NULOS_DO_ARRAY(ARRAY_VIDEOS);

          //ENVIANDO VIDEOS PRO SERVIDOR REMOTO ABAIXO
          ARRAY_VIDEOS.map((video, index) => {
            var nome_do_arquivo = (extrair_nome_de_Arquivo_da_url(ARRAY_VIDEOS[index]).arquivo);
            //COMANDOS DAQUI PRA BAIXO
            //CHAMANDO O METODO DE ENVIO DE IMAGENS PRO SERVIDOR
            UPLOAD_PRO_SERVIDOR(nome_do_arquivo, ARRAY_VIDEOS[index]);
            //COMANDOS DAQUI PRACIMA
          });//MAP
          //ENVIANDO VIDEOS PRO SERVIDOR REMOTO ACIMA

          //UPLOAD DE VÍDEOS ACIMA


          //TENTAR UPAR IMAGENS e VIDEOS AQUI Acima



          //ATIVAR DEPOIS MUITO IMPORTANTE ATENÇÃO 
          //GRAVAÇÃO DA INFORMAÇÃO NO BANCO DE DADOS ABAIXO  
          Axios.get(IP_DO_SERVIDOR + 'insert_postagens', {
            //{postagem:'{"cidade":"Nova Três"}'}
            params:
            {
              postagem: JSON_POSTAGEM_STRING
            }
          });


          /*
          .then((response)=>{
               //console.log(response)
            if(response.ok && response.status == 200){
              //displaying data to screen
              ATUALIZANDO_DADOS_NO_ASYNCSTORAGE_POR_INDICE(i,'sim'); //ADICIONADO EM 05/12/2020
              console.log(JSON_POSTAGEM_STRING);
            } else{
              //display alert failed to call API
              alert("FALHOU A GRAVAÇÃO DE DADOS");
            }
          });
          */

          //GRAVAÇÃO DA INFORMAÇÃO NO BANCO DE DADOS ACIMA 
          /**/


        } else if (tamanho > 0) {
          //} else if (TA_ON_LINE === 'sim') { //ADICIONADO EM 05/12/2020
          //console.log("NÃO GRAVAR");


        }//IF ELSE 
        //VERIFICANDO SE POSTAGEM ESTÁ GRAVADO ON-LINE e fazendo A SINCRONIZAÇÃO no BANCO DE DADOS ACIMA


      }//FOR    


    } catch (error) { /*alert(error)*/ /*console.log("ERRO 8786414" + error);*/ }
    //OBSERVER HERE


  }
  //INSERINDO DADOS NO BANCO DE DADOS ACIMA






  //ESTÁ FUNCIONANDO PERFEITAMENTE ABAIXO
  async function UPLOAD_PRO_SERVIDOR(nome_do_arquivo, URL_PATH) {

    const CONEXAO = IP_DO_SERVIDOR + 'posts';
    //alert(CONEXAO);  

    try {
      //console.log(nome_do_arquivo);
      //console.log(URL_PATH);
      const data = new FormData();
      data.append('file', {
        uri: URL_PATH,
        name: nome_do_arquivo,
        type: 'image/jpg'
      }
      );

      //await Axios.post('http://192.168.0.102:3000/posts', data
      await Axios.post(CONEXAO, data
        //await Axios.post('http://localhost:3000/posts', data,

        , {
          headers: {
            'content-type': `multipart/form-data; boundary=${data._boundary}`,
            //...data.getHeaders()
          }
        }
        /**/
      );


    } catch (error) { /*alert(error)*/ }
  }
  //ESTÁ FUNCIONANDO PERFEITAMENTE ACIMA








  //GRAVANDO POSTAGEM ABAIXO  no AsyncStorage
  async function ARMAZENAR_POSTAGEM_SEGUNTA_ETAPA(data_object) {

    try { //alert(Object.values(data_object));

      //ARMAZENANDO NO BANCO DE DADOS ABAIXO
      await AsyncStorage.setItem('POSTAGEM', JSON.stringify(data_object));
      //await AsyncStorage.setItem('POSTAGEM', toString(DADOS));
      alert("GRAVADO COM SUCESSO !");//

    }
    catch (exception) {

      alert("FALHA NA GRAVAÇÃO !");
      //alert(exception);

    }
  }
  //GRAVANDO POSTAGEM ACIMA  no AsyncStorage








  async function ATUALIZANDO_DADOS_NO_ASYNCSTORAGE_POR_INDICE(indice, conteudo) {

    const data = await AsyncStorage.getItem('POSTAGEM');
    var obj_JSON = JSON.parse(data);

    //AQUI FAZER AS MODIFICAÇÕES ABAIXO  Notebook i7
    //alert(obj_JSON.length);    
    //alert( obj_JSON[1].descricoesGerais_J );
    /*
     var TEXTO = "";
     for(var i = 0; i < obj_JSON.length; i++ ){
  
       TEXTO = obj_JSON[i].descricoesGerais_J
       if(TEXTO.includes('Notebook i7')){
         obj_JSON[i].descricoesGerais_J = 'Notebook i5 8 Geração'
       }//IF
       
  
     }//FOR
     */

    //Modificando dados por indice no JSON Aqui Linha Abaixo
    obj_JSON[indice].ta_online_J = conteudo;

    //AQUI FAZER AS MODIFICAÇÕES ACIMA			


    //REMOVER TODOS ITENS DO ASYNCSTORAGE
    await AsyncStorage.removeItem('POSTAGEM');

    //ARMAZENANDO TODOS OS ITENS NOVAMENTE NO ASYNCSTORAGE ABAIXO
    await AsyncStorage.setItem('POSTAGEM', JSON.stringify(obj_JSON));

    //alert("Os Dados foi alterado !");

  }//function	








  async function ARMAZENAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE(TA_ONLINE_SIM_OU_NAO) {

    try { //alert(Object.values(data_object));

      //ARMAZENANDO NA MEMORIA INTERNA ABAIXO
      await AsyncStorage.setItem('ESTATUS_SE_TA_ONLINE', TA_ONLINE_SIM_OU_NAO);
      //alert("GRAVADO COM SUCESSO !");//
      //ARMAZENANDO NA MEMORIA INTERNA ACIMA


      //PESQUISAR_VENDAS_RECENTES();
      //alert("ESTÁ EXECUTANDO DEPOIS DO AWAIT")
    }
    catch (exception) {
      //alert("FALHA NA GRAVAÇÃO !");
      //alert(exception);
    }
  }//function







  async function FILTRAR_MEUS_FAVORITOS() {

    // alert(numero_CelularUsuario);
    setExibeMenu(false);
    setMuda_cor(true);
    filtro_ativado_sim_ou_nao = true;

    var datos = "";

    try {
      const response = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_favorito_somente_filtros', {
        params: { numero_CelularUsuario: VARIAVEL_GLOBAL.TELEFONE },
      });

      //alert( JSON.stringify( response.data ) );
      datos = JSON.stringify(response.data);

      //alert(datos+"*%@$");
      //alert(datos.length);
      //alert(datos);

      if (datos.length > 2) {
        //************************************************************** */
        //************************************************************** */
        /* */
        var URLs_JSON;

        if (datos.includes("|")) {

          ARRAY_PRIMEIRAS_URL_IMAGENS_2.length = 0;
          ARRAY_PRIMEIRAS_URL_VIDEOS_2.length = 0;

          URLs_JSON = JSON.parse(datos);
          //alert(URLs_JSON.length);
          var PRIMEIRA_URL_IMAGEM_INDEXOF;
          var PRIMEIRA_URL_VIDEO_INDEXOF;
          for (var i = 0; i < URLs_JSON.length; i++) {

            //TRATAMENTO COM IMAGENS ABAIXO
            PRIMEIRA_URL_IMAGEM_INDEXOF = URLs_JSON[i].URL_IMAGEN_DADOS_J;
            var TAMANHO = PRIMEIRA_URL_IMAGEM_INDEXOF.indexOf("|");
            PRIMEIRA_URL_IMAGEM_INDEXOF = PRIMEIRA_URL_IMAGEM_INDEXOF.substring(0, TAMANHO);
            ARRAY_PRIMEIRAS_URL_IMAGENS_2.push(PRIMEIRA_URL_IMAGEM_INDEXOF);
            //TRATAMENTO COM IMAGENS ACIMA

            //TRATAMENTO COM VIDEOSS ABAIXO
            PRIMEIRA_URL_VIDEO_INDEXOF = URLs_JSON[i].URL_VIDEOS_DADOS_J;
            var TAMANHO_2 = PRIMEIRA_URL_VIDEO_INDEXOF.indexOf("|");
            PRIMEIRA_URL_VIDEO_INDEXOF = PRIMEIRA_URL_VIDEO_INDEXOF.substring(0, TAMANHO_2);
            ARRAY_PRIMEIRAS_URL_VIDEOS_2.push(PRIMEIRA_URL_VIDEO_INDEXOF);
            //TRATAMENTO COM VIDEOSS ACIMA


          }//FOR


        }//IF

        //alert(datos);

        setProdutos(datos);
        //alert(produtosS);
        setProdutosEtiquetasExibir(true);

      } else { setProdutosEtiquetasExibir(false); }

    } catch (error) { /* */  alert(datos + "#9514797 " + error); console.log(datos + "#9514797 " + error); setProdutosEtiquetasExibir(false); }

  }//function

















  async function BUSCANDO_NOTIFICACOES_2() {

    // if (VARIAVEL_GLOBAL.TELEFONE == "SEM_TELEFONE_USUARIO") { alert("NUMERO DE TELEFONE NÃO FOI ENCONTTRADO") } // usado somente para teste

    try {

      //In this party I become array empty bellow line
      array_propostas_recentes_recebidas.length = 0;
      array_propostas_recentes_enviadas.length = 0;
      array_propostas_recentes_aceitas.length = 0;


      // var numero_telefone_vendedor = DADOS_TELEFONE;
      // alert(VARIAVEL_GLOBAL.TELEFONE)


      var todas_as_propostas_Recebidas_Enviadas_Aceitas;

      todas_as_propostas_Recebidas_Enviadas_Aceitas = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_propostas_Recebidas_Enviadas_Aceitas', {

        // params: { numero_telefone_J: numero_telefone_vendedor }
        params: { numero_telefone_J: VARIAVEL_GLOBAL.TELEFONE }

      });

      const DADOS = await todas_as_propostas_Recebidas_Enviadas_Aceitas.data;

      // // alert(retorrno);

      const propostas_recebidas = DADOS.filter(DADO => DADO.numero_telefone_vendedor == VARIAVEL_GLOBAL.TELEFONE && DADO.proposta_aceita == "nao")
      const propostas_enviadas = DADOS.filter(DADO => DADO.numero_telefone_comprador == VARIAVEL_GLOBAL.TELEFONE && DADO.proposta_aceita == "nao")
      const propostas_aceitas = DADOS.filter(DADO => DADO.proposta_aceita == "sim")
      // console.log( newDADOS )
      // alert( JSON.stringify(newDADOS) )


      array_propostas_recentes_recebidas = propostas_recebidas.map(newDADO => newDADO.id_postagem)
      array_propostas_recentes_enviadas = propostas_enviadas.map(newDADO => newDADO.id_postagem)
      array_propostas_recentes_aceitas = propostas_aceitas.map(newDADO => newDADO.id_postagem)


      setQtde_propostas_recebidas_nao_vista(array_propostas_recentes_recebidas.length);
      setQtde_propostas_enviadas_nao_vista(array_propostas_recentes_enviadas.length);
      setQtde_propostas_aceitas_nao_vista(array_propostas_recentes_aceitas.length);




      /***************************************************************************************************************************************/
      /****************************************************************************************************************************************/
      var qtd_vendas_nao_vista_pelo_vendedor
      try {

        array_venda_recentes_requisitadas.length = 0;
        qtd_vendas_nao_vista_pelo_vendedor = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_vendas_recentes', {

          params: { numero_telefone_J: VARIAVEL_GLOBAL.TELEFONE }

        });

        const retorrno = await qtd_vendas_nao_vista_pelo_vendedor.data;


        if (retorrno.length > 0) {

          var ARRAY_PROVISORIO_ITENS_DUPLICADOS = []
          for (var i = 0; i < retorrno.length; i++) {
            // [ RowDataPacket { id_J: '10420211534524107   ' } ]
            //  alert(retorrno[i].id_J);
            ARRAY_PROVISORIO_ITENS_DUPLICADOS.push(retorrno[i].id_J);
            // DADOS.filter(DADO => DADO.array_venda_recentes_requisitadas[i] ==  DADO.array_venda_recentes_requisitadas[i] )
          }//FOR
          //alert( array_propostas_recentes_recebidas );

          //REMOVENDO ELEMENTOS DUPLICADOS
          array_venda_recentes_requisitadas = ARRAY_PROVISORIO_ITENS_DUPLICADOS.filter((el, i, arr) => arr.indexOf(el) == i);
          // console.log(unique); // ["a", "b", "c"]

        }//IF

        setQtde_venda_recentes_nao_vista(array_venda_recentes_requisitadas.length);


      } catch (error) { alert(error) }
      //alert("PESQUISANDO VENDAS RECENTES");
      //PESQUISANDO VENDAS RECENTES ACIMA   e   NOTIFICANDO NA TELA PRINCIPAL
      /****************************************************************************************************************************************/
      /****************************************************************************************************************************************/



      VARIAVEL_GLOBAL.PROPOSTAS_RECEBIDAS = array_propostas_recentes_recebidas.length;
      VARIAVEL_GLOBAL.PROPOSTAS_ENVIADAS = array_propostas_recentes_enviadas.length;
      VARIAVEL_GLOBAL.PROPOSTAS_ACEITAS = array_propostas_recentes_aceitas.length;
      VARIAVEL_GLOBAL.VENDAS_RECENTES = array_venda_recentes_requisitadas.length;



      setSomatorio_notificacao_numero(
        array_propostas_recentes_recebidas.length +
        array_propostas_recentes_enviadas.length +
        array_propostas_recentes_aceitas.length +
        array_venda_recentes_requisitadas.length
      );


      // alert(   array_propostas_recentes_recebidas.length  +"  |  "+ 
      //          array_propostas_recentes_enviadas.length   +"  |  "+ 
      //          array_propostas_recentes_aceitas.length );



      VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = false;


      // alert("ESTÁ EXECUTANDO BUSCA DE NOTIFICAÇÃO NESSA AUDITORIA")


    } catch (erro) { alert(erro + " => wdcf$387") }


  }







  //PUXAR LISTA DE PRODUTOS DAS NOTIFICACOES NO BANCO DE DADOS ACIMA



  //MOSTRAR ITENS DAS NOTIFICAÇÕES QUANDO SOLICITADO ABAIXO
  function PROPOSTAS_RECEBIDAS_RECENTES(parametro, fonte) {

    // alert(fonte);

    if (parametro === false) {
      setBotoePropostas(false);
      setLabelOuPesquisar(true);
    } else {

      setLabelOuPesquisar(false);
      setBotoePropostas(true);
      setExibeMenu(false)

    }

    if (array_propostas_recentes_recebidas.length > 0) {
      // alert(array_propostas_recentes_recebidas);

      PUXAR_PRODUTOS_DAS_NOTIFICACOES(array_propostas_recentes_recebidas);
      setMenu_aviso_visivel_or_invisivel(false);
      setFaixa_submenu_e_filtro(false);
      setTexto_filtro_notificacao("Propostas Recebidas");

      return true;

    } else {

      if (fonte === "menuLateral") {
        setbotoePropostasRecebidas(false);
        setbotoePropostasEnviadas(true);
        PROPOSTAS_RESPONDIDAS_RECENTES("menuLateral");
        return false;
      } else {
        alert("Não Tem Propostas Recebidas !");
      }


    }


  }



  function PROPOSTAS_RESPONDIDAS_RECENTES(fonte) {

    if (array_propostas_recentes_enviadas.length > 0) {

      setLabelOuPesquisar(true);
      //alert(array_propostas_recentes_enviadas); 
      PUXAR_PRODUTOS_DAS_NOTIFICACOES(array_propostas_recentes_enviadas);
      setMenu_aviso_visivel_or_invisivel(false);
      setFaixa_submenu_e_filtro(false);
      setTexto_filtro_notificacao("Propostas Enviadas");

      return true;

    } else {


      // alert("Não Tem Propostas Enviadas !"); return false; 

      if (fonte === "menuLateral") {
        setbotoePropostasRecebidas(false);
        setbotoePropostasEnviadas(false);
        setbotoePropostasAceitas(true);
        PROPOSTAS_ACEITAS_RECENTES();
        return false;
      } else {
        alert("Não Tem Propostas Enviadas !");
      }




    }

  }



  function PROPOSTAS_ACEITAS_RECENTES() {



    if (array_propostas_recentes_aceitas.length > 0) {

      setLabelOuPesquisar(true);
      //alert(array_propostas_recentes_aceitas);
      PUXAR_PRODUTOS_DAS_NOTIFICACOES(array_propostas_recentes_aceitas);
      setMenu_aviso_visivel_or_invisivel(false);
      setFaixa_submenu_e_filtro(false);
      setTexto_filtro_notificacao("Propostas Aceitas");

      return true;

    } else { alert("Não Tem Propostas Aceitas !"); setLabelOuPesquisar(false); setBotoePropostas(false); return false; }


  }



  function VENDAS_RECENTES() {


    setLabelOuPesquisar(true);
    //alert(array_venda_recentes_requisitadas);
    PUXAR_PRODUTOS_DAS_NOTIFICACOES(array_venda_recentes_requisitadas)
    setMenu_aviso_visivel_or_invisivel(false);
    setFaixa_submenu_e_filtro(false);
    setTexto_filtro_notificacao("Vendas Recentes");

  }

  //MOSTRAR ITENS DAS NOTIFICAÇÕES QUANDO SOLICITADO ACIMA






  //PUXAR PRODUTOS DAS NOTIFICAÇÕES ABAIXO
  async function PUXAR_PRODUTOS_DAS_NOTIFICACOES(ARRAY_ID_POSTAGENS) {

    filtro_ativado_sim_ou_nao = true;

    var POSTAGENS_RETORNADA = "";
    var datos = "";
    try {

      const response = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_produtos_das_notificacoes', {

        params: {
          ARRAY_ID_POSTAGENS_J: ARRAY_ID_POSTAGENS
        }

      });

      POSTAGENS_RETORNADA = await response.data;

      datos = JSON.stringify(POSTAGENS_RETORNADA);
      //datos = POSTAGENS_RETORNADA.data;
      //alert(datos);
      /*******************************************/
      /*******************************************/
      if (datos.length > 2) {

        var URLs_JSON;

        if (datos.includes("|")) {

          ARRAY_PRIMEIRAS_URL_IMAGENS_2.length = 0;
          ARRAY_PRIMEIRAS_URL_VIDEOS_2.length = 0;

          URLs_JSON = JSON.parse(datos);
          //alert(URLs_JSON.length);
          var PRIMEIRA_URL_IMAGEM_INDEXOF;
          var PRIMEIRA_URL_VIDEO_INDEXOF;
          for (var i = 0; i < URLs_JSON.length; i++) {

            //TRATAMENTO COM IMAGENS ABAIXO
            PRIMEIRA_URL_IMAGEM_INDEXOF = URLs_JSON[i].URL_IMAGEN_DADOS_J;
            var TAMANHO = PRIMEIRA_URL_IMAGEM_INDEXOF.indexOf("|");
            PRIMEIRA_URL_IMAGEM_INDEXOF = PRIMEIRA_URL_IMAGEM_INDEXOF.substring(0, TAMANHO);
            ARRAY_PRIMEIRAS_URL_IMAGENS_2.push(PRIMEIRA_URL_IMAGEM_INDEXOF);
            //TRATAMENTO COM IMAGENS ACIMA

            //TRATAMENTO COM VIDEOSS ABAIXO
            PRIMEIRA_URL_VIDEO_INDEXOF = URLs_JSON[i].URL_VIDEOS_DADOS_J;
            var TAMANHO_2 = PRIMEIRA_URL_VIDEO_INDEXOF.indexOf("|");
            PRIMEIRA_URL_VIDEO_INDEXOF = PRIMEIRA_URL_VIDEO_INDEXOF.substring(0, TAMANHO_2);
            ARRAY_PRIMEIRAS_URL_VIDEOS_2.push(PRIMEIRA_URL_VIDEO_INDEXOF);
            //TRATAMENTO COM VIDEOSS ACIMA


          }//FOR


        }//IF

        //alert(datos);

        setProdutos(datos);
        //alert(produtosS);
        setProdutosEtiquetasExibir(true);

      } else { setProdutosEtiquetasExibir(false); }//OBBBSERVER03052021
      /*******************************************/
      /*******************************************/

    } catch (error) { /*  alert("73@%8549" + error) */ }

  }//PUXAR_PRODUTOS_DAS_NOTIFICACOES(){



  //#MUDADO PRA CA ACIMA







  // //ESTUDO E TESTE DE PROMISSE AQUI ABAIXO
  // /******************************************************************************** */
  // /******************************************************************************** */

  // var [VARIAVEL_FUNCAO_TESTANDO_PROMISSE_DE_TIMER, setVARIAVEL_FUNCAO_TESTANDO_PROMISSE_DE_TIMER] = useState(false);

  // useEffect(() => {


  //   //PROMISSE DE TIMER ABAIXO
  //   function timeout(ms, promise) {
  //     return new Promise(function (resolve, reject) {
  //       setTimeout(function () {
  //         reject(new Error("timeout"))
  //       }, ms)
  //       promise.then(resolve, reject)
  //     })
  //   }
  //   //PROMISSE DE TIMER ACIMA


  //   function TESTANDO_PROMISSE_DE_TIMER() {


  //     console.log("INICIO => " + hora_e_segundo_completo());


  //     //USANDO A PROMISSE COM TIMER ABAIXO
  //     // timeout(10000, fetch(CONEXAO))
  //     timeout(3000, fetch("http://192.168.0.102:3000/"))
  //       .then(function (response) {
  //         //Tarefa do Código Aqui que PODE DEMORAR ABAIXO
  //         console.log("MEIO => " + hora_e_segundo_completo());
  //         //Tarefa do Código Aqui que PODE DEMORAR ACIMA
  //       }).catch(function (error) {
  //         //Tratamento da Falha de Execução do Código Aqui
  //         console.log("ERRO => " + error + hora_e_segundo_completo());
  //       })
  //       //USANDO A PROMISSE COM TIMER ACIMA

  //       .then(() => {

  //         console.log("FIM => " + hora_e_segundo_completo());

  //       }).then(() => {

  //         console.log("FIM 2 => " + hora_e_segundo_completo());

  //       });


  //   }
  //   if (VARIAVEL_FUNCAO_TESTANDO_PROMISSE_DE_TIMER) {
  //     TESTANDO_PROMISSE_DE_TIMER();
  //   }


  // }, [VARIAVEL_FUNCAO_TESTANDO_PROMISSE_DE_TIMER]);
  // /******************************************************************************** */
  // /******************************************************************************** */
  // //ESTUDO E TESTE DE PROMISSE AQUI ACIMA










  // //FOI DESATIVADO OBSERVER 26/04/2021  TALVEZ ATIVAR DEPOIS
  //   //CONTROLE DE TIMER ABAIXO
  //   useEffect(() => {


  //     var contador_j = 60;

  //     let VARIAVEL_DA_FUNCAO_BUSCAR_NOTIFICACAO_TIMER = setInterval(function buscar_notificacao_timer() {//1@#

  //       if (contador_j === 60) {

  //             contador_j = 0;

  //             //Bloqueando o Timer aqui com comando na linha Abaixo
  //             clearInterval(VARIAVEL_DA_FUNCAO_BUSCAR_NOTIFICACAO_TIMER);//BLOQUEAR O PROCESSO COM TIMER clearInterval  //2@#

  //             //TAREFAZ AQUI ABAIXO

  //                   //console.log("INICIO => " + hora_e_segundo_completo());
  //                   if (VARIAVEL_GLOBAL.CONEXAO_DO_APP == "ON-LINE") {
  //                     // console.log("EXECUTAR TAREFA => "+hora_e_segundo_completo());
  //                     VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO = true;
  // console.log("ATIVANDO A BUSCA DE NOTIFICAÇÃO => " + hora_e_segundo_completo());
  //                     BUSCANDO_NOTIFICACOES();
  //                   }//IF

  //             //TAREFAZ AQUI ACIMA

  //             //Desbloqueando o Timer aqui com comando na linha abaixo
  //             VARIAVEL_DA_FUNCAO_BUSCAR_NOTIFICACAO_TIMER = setInterval(buscar_notificacao_timer, 1000);//INCIAR NOVAMENTE O PROCESSO COM TIMER setInterval //3@#

  //       }//Condição de Bloqueio   
  //       contador_j++;



  //     }, 1000);//function buscar_notificacao_timer final do timer //4@#


  //     //use effect cleanup to set flag false, if unmounted
  //     return () => clearInterval(VARIAVEL_DA_FUNCAO_BUSCAR_NOTIFICACAO_TIMER);//5@#



  //   }, []);
  //   //CONTROLE DE TIMER ACIMA















  //VARIAVEL_DA_FUNCAO_TIMER = setInterval(contagem_tempo, 1000);


  VARIAVEL_GLOBAL.TELA_ATUAL = "Principal";
  VARIAVEL_GLOBAL.TELA_ORIGEM = "nenhuma";
  VARIAVEL_GLOBAL.TELA_TERCEIRA = "nenhuma";





  async function PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH(variavelDaPesquisa) {

    // alert(variavelDaPesquisa);

    var dados_da_pesquisa_FullTextSearch_1;

    const dados_da_pesquisa_FullTextSearch_2 = await Axios.get(IP_DO_SERVIDOR + 'pesquisa_full_text_search', {
      params: {
        // id_J: id_J,
        numero_telefone_usuario: VARIAVEL_GLOBAL.TELEFONE,
        DADOS_P_FULLTEXT_SEARCH: variavelDaPesquisa,
        PARAMETRO: "TELA_PRINCIPAL",
        DATA_INICIAL: "vazia",
        DATA_FINAL: "vazia",
        ComprasVendas_J: "vazia"
      }
      //} , {signal: abortCont.signal} );
    });

    dados_da_pesquisa_FullTextSearch_1 = await dados_da_pesquisa_FullTextSearch_2.data;

    // alert(  JSON.stringify(dados_da_pesquisa_FullTextSearch_1)  );
    var datos = JSON.stringify(dados_da_pesquisa_FullTextSearch_1);

    //IMPLEMENTANDO FILTRO FULLTEXTSEARCH AQUI ABAIXO **********************************

    if (datos.length > 2) {
      //************************************************************** */
      //************************************************************** */
      /* */
      var URLs_JSON;

      if (datos.includes("|")) {

        ARRAY_PRIMEIRAS_URL_IMAGENS_2.length = 0;
        ARRAY_PRIMEIRAS_URL_VIDEOS_2.length = 0;

        URLs_JSON = JSON.parse(datos);
        //alert(URLs_JSON.length);
        var PRIMEIRA_URL_IMAGEM_INDEXOF;
        var PRIMEIRA_URL_VIDEO_INDEXOF;

        for (var i = 0; i < URLs_JSON.length; i++) {

          //TRATAMENTO COM IMAGENS ABAIXO
          PRIMEIRA_URL_IMAGEM_INDEXOF = URLs_JSON[i].URL_IMAGEN_DADOS_J;
          var TAMANHO = PRIMEIRA_URL_IMAGEM_INDEXOF.indexOf("|");
          PRIMEIRA_URL_IMAGEM_INDEXOF = PRIMEIRA_URL_IMAGEM_INDEXOF.substring(0, TAMANHO);
          ARRAY_PRIMEIRAS_URL_IMAGENS_2.push(PRIMEIRA_URL_IMAGEM_INDEXOF);
          //TRATAMENTO COM IMAGENS ACIMA

          //TRATAMENTO COM VIDEOSS ABAIXO
          PRIMEIRA_URL_VIDEO_INDEXOF = URLs_JSON[i].URL_VIDEOS_DADOS_J;
          var TAMANHO_2 = PRIMEIRA_URL_VIDEO_INDEXOF.indexOf("|");
          PRIMEIRA_URL_VIDEO_INDEXOF = PRIMEIRA_URL_VIDEO_INDEXOF.substring(0, TAMANHO_2);
          ARRAY_PRIMEIRAS_URL_VIDEOS_2.push(PRIMEIRA_URL_VIDEO_INDEXOF);
          //TRATAMENTO COM VIDEOSS ACIMA


        }//FOR


      }//IF

      //alert(datos);

      setProdutos(datos);
      //alert(produtosS);
      setProdutosEtiquetasExibir(true);

    } else { setProdutosEtiquetasExibir(false); }
    //IMPLEMENTANDO FILTRO FULLTEXTSEARCH AQUI ACIMA ***********************************


  }







  useEffect(() => {

    // setNotificacao_visivel_true_false(true);
    async function CHAMANDO_NF() {
      await PEGAR_NUMERO_DO_CELL_NO_CARREGAMENTO()
      await BUSCANDO_NOTIFICACOES_2()
      // .then(() => { });

    }

    if (VARIAVEL_GLOBAL.BUSCAR_NOTIFICACAO) {
      CHAMANDO_NF();
    }//IF

  }, []);






  useEffect(() => {

    if (somatorio_notificacao_numero > 0) {
      setNotificacao_visivel_true_false(true);

    } else if (somatorio_notificacao_numero === 0) {
      setNotificacao_visivel_true_false(false)
    }

  }, [array_propostas_recentes_recebidas, array_propostas_recentes_enviadas, array_propostas_recentes_aceitas, array_venda_recentes_requisitadas, somatorio_notificacao_numero]);








  async function BUSCAR_LICENCA_DE_USO() {


    const response = await Axios.get(IP_DO_SERVIDOR + 'buscar_licenca', {
      params: {
        telefoneDoUsuario: VARIAVEL_GLOBAL.TELEFONE[0]
      }
    });

    VARIAVEL_GLOBAL.LICENCA_USO = await response.data;

    console.log(VARIAVEL_GLOBAL.LICENCA_USO)


  }





  function MOSTRAR_TELA_EXPIRACAO_LICENCA() {

    setLicencaExpiradaFalseOrTrue(false);

  }






  return (

    <SafeAreaView style={[Estilo.App]}>

      <View style={{ height: 15 }} />

      {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO colocar dentro da View principal que fica dentro do return */}
      <ScreenOrientation
        orientation={PORTRAIT}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
      />
      {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA colocar dentro da View principal que fica dentro do return  */}

      {/* PAINEL DE MENU ABAIXO*/}
      <View style={{ height: 50, paddingHorizontal: '5%', border: 0 }}>

        <View style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#fff' }} >

          <View style={{ flex: 1, flexDirection: 'row', height: 30, borderWidth: 0, borderColor: 'pink', padding: 1 }}>

            <TouchableOpacity style={[Estilo.borda_geral, style = { width: '25%', borderWidth: 0, alignItems: 'center' }]}
              onPress={() => {


                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {

                  setExibeMenu(oldState => !oldState);

                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                          setLicencaExpiradaFalseOrTrue(true);
                }


              }}
            >
              {exibeMenu
                ? <Icon name='bars'
                  /* onPress={() =>  setExibeMenu(oldState => !oldState)} */
                  style={[Estilo.icones_grande, style = { color: '#25E7DB' }]}
                />
                : <Icon name='bars'
                  /* onPress={() =>  setExibeMenu(oldState => !oldState)} */
                  style={[Estilo.icones_grande]}
                />
              }
              <Text style={{ fontSize: 10, color: 'white' }}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Estilo.borda_geral, style = { width: '25%', alignItems: 'center' }]}

              onPress={() => {

                MOSTRAR_POSTAGENS();
                //PEGAR_TODAS_CHAVES_DO_ASYNC_STORAGE();

              }}

            >
              <Icon name='home' style={[Estilo.icones_grande]} />
              <Text style={{ fontSize: 10, color: 'white' }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Estilo.borda_geral, style = { width: '25%', alignItems: 'center', borderWidth: 0 }]}

              onPress={() => {


                const LARTITUDE = userPosition.latitude;
                const LORNGITUDE = userPosition.longitude;
                //alert(userPosition.latitude+"   |    "+ userPosition.longitude);
                //navigation.navigate("MAPA");
                navigation.navigate("MapaGoogle", { LARTITUDE, LORNGITUDE });


                // alert(
                //   array_propostas_recentes_recebidas.length + "  <= recebidas  " +
                //   array_propostas_recentes_enviadas.length + "   <= enviadas  " +
                //   array_propostas_recentes_aceitas.length + "    <= aceitas   " +
                //   array_venda_recentes_requisitadas.length + "    <= vendas requeridas   " +
                //   somatorio_notificacao_numero + " <= SOMATÓRIO TOTAL  "
                // )


              }}
            >
              <Icon name='map-marker' style={[Estilo.icones_grande]} />
              <Text style={{ fontSize: 10, color: 'white' }}>Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Estilo.borda_geral, style = { width: '25%', alignItems: 'center', borderWidth: 0 }]}
              onPress={async () => {


                // await isAvailable();

                // if (VARIAVEL_GLOBAL.CONEXAO_DO_APP === "OFF-LINE") {

                //   alert("Erro de Conexão, Sem Internet !");

                // } else {   }

                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {

                  VARIAVEL_GLOBAL.TELA_ATUAL = "Postar";
                  VARIAVEL_GLOBAL.TELA_ORIGEM = "Principal";
                  VARIAVEL_GLOBAL.TELA_TERCEIRA = "nenhuma";

                  VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length = 0;
                  VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT.length = 0;

                  //navigation.navigate("Postar",{URL})
                  navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS, })

                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                        setLicencaExpiradaFalseOrTrue(true);

                }

              }}
            >
              <Icon name='plus-circle' style={[Estilo.icones_grande]} />
              <Text style={{ fontSize: 10, color: 'white' }}>Postar</Text>

            </TouchableOpacity>
          </View>


        </View>

      </View>

      {/* PAINEL DE MENU ACIMA */}

      <View style={{ height: 10 }} ></View>

      {/********************************************************************* */}

      <View style={{ height: 5 }}></View>

      {faixa_submenu_e_filtro ?

        /*FAIXA ORANGE ABAIXO*/
        <View style={{ height: 50, padding: 5, borderWidth: 0, borderColor: 'orange' }} >



          <View style={{ flex: 1, flexDirection: 'row', height: 30 }}>

            <View style={[Estilo.borda_geral, style = { width: '35%', alignItems: 'flex-start', flexDirection: 'row' }]}  >


              <TouchableOpacity style={{ width: '80%', height: 'auto', borderWidth: 0, justifyContent: 'flex-end', alignItems: 'center' }}
                onPress={() => {

                  if (!corIconeFiltro) {

                    setExibeFiltroCategoria(true);
                    filtro_ativado_sim_ou_nao = true;

                  } else {

                    CONECTANDO_AO_BANCO_DE_DADOS();
                    ADICIONAR_PRODUTOS_por_ARRAY(true);
                    filtro_ativado_sim_ou_nao = false;

                  }


                  setCorIconeFiltro(oldState => !oldState);

                }}
              >

                <View>
                  {/* <Icon name='filter' nativeID='notificacao' style={[Estilo.icones_medio, style = { paddingRight: 10 }]} /> */}
                  <Icon name='filter' nativeID='notificacao' style={[Estilo.icones_medio, style = { paddingRight: 10, color: corIconeFiltro ? "#25E7DB" : "white" }]} />
                </View>
                <Text style={{ fontSize: 10, color: corIconeFiltro ? "#25E7DB" : "white" }}>Filtrar Categorias</Text>

              </TouchableOpacity>


            </View>





            <View style={[Estilo.borda_geral, style = { flexDirection: 'row', width: '35%', alignItems: 'flex-start' }]}  >

              {/* ABIAXO 2 muda_cor_checkado */}
              {/* 
              {muda_cor_checkado_femea
                ? <Icon name='check'
                  style={[style = { color: '#25E7DB' }]}//#2A3E4A

                  onPress={() => {
                    setMuda_cor_checkado_femea(oldState => !oldState)
                  }
                  } />

                : <Icon name='check'
                  style={[style = { color: '#2A3E4A' }]}

                  onPress={() => {
                    setMuda_cor_checkado_femea(oldState => !oldState)

                  }
                  } />

              }


              {muda_cor_checkado_femea
                ? <Text style={[Estilo.fontePequenaIconComClick]}
                  onPress={() => {
                    setMuda_cor_checkado_femea(oldState => !oldState)
                    //APAGAR_NUMERO_CELULAR("NUMERO_CELL");
                  }
                  }
                >Fêmea</Text>

                : <Text style={[Estilo.fontePequenaIconSemClick]}
                  key={121}
                  onPress={() => {
                    setMuda_cor_checkado_femea(oldState => !oldState)
                    //APAGAR_NUMERO_CELULAR("NUMERO_CELL");

                    //alert(numero_CelularUsuario);

                    //CONTEXT_7
                    alert(VARIAVEL_GLOBAL);
                    setTimeout(() => { }, 3000);
                    MOSTRAR_NUMERO_CELULAR();

                  }
                  }
                >Fêmea</Text>
              }
              // {/* ACIAMA 2 muda_cor_checkado */}

              <TouchableOpacity style={{ width: 75, height: 'auto', borderWidth: 0, justifyContent: 'flex-end', alignItems: 'center' }}
                onPress={() => {

                  // setLabelOuPesquisar(oldState => !oldState); 
                  setLabelOuPesquisar(false);
                  setFaixa_submenu_e_filtro(false);
                  // alert("PESQUISAR POSTAGENS DE GADO ");

                }}
              >

                <View>
                  <Icon name='search' nativeID='pesquisa' style={[Estilo.icones_medio, style = { paddingRight: 10 }]} />
                </View>
                <Text style={{ fontSize: 10, color: 'white' }}>Pesquisar</Text>

              </TouchableOpacity>


            </View>



            <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style = { width: '30%', alignItems: 'flex-end' }]} >
              {/*<Icon name='heart' style={[Estilo.icones_grande, Estilo.icones_clicado, Estilo.borda_geral]} />*/}


              {/* COLOCANDO NUMERO ENCIMA DE UM ICONE  #25E7DB */}
              <TouchableOpacity style={{ width: 55, height: 'auto', borderWidth: 0, justifyContent: 'flex-start', alignItems: 'flex-end' }}
                onPress={() => {

                  //alert(somatorio_notificacao_numero);
                  if (somatorio_notificacao_numero == 0) {
                    alert("Nenhuma Notificação !");
                  } else {
                    setMenu_aviso_visivel_or_invisivel(true)
                  }//else if

                }}
              >

                {notificacao_visivel_true_false ?
                  <Text style={{
                    width: 20, height: 20, borderRadius: 50,
                    color: 'white', fontWeight: "bold", fontSize: 10, backgroundColor: 'red',
                    position: 'absolute', zIndex: 10, textAlign: 'center', justifyContent: 'center'
                  }} >{somatorio_notificacao_numero}
                  </Text>
                  : []
                }
                <View>
                  <Icon name='bell' nativeID='notificacao' style={[Estilo.icones_medio, style = { paddingRight: 10 }]} />
                </View>
                <Text style={{ fontSize: 10, color: 'white' }}>Notificação</Text>

              </TouchableOpacity>

              <View style={{ width: 20 }} />

              {/* CORAÇÃO ABAIXO*/}
              <TouchableOpacity style={{ width: 'auto', height: 'auto', borderWidth: 0 }} >
                <View style={{ width: 'auto', borderWidth: 0 }}>
                  {muda_cor
                    ? <Icon name='heart' nativeID='Favorito'
                      style={[Estilo.icones_medio, Estilo.icones_clicado]}
                      onPress={() => {
                        setMuda_cor(oldState => !oldState)
                        //MOSTRAR_NUMERO_CELULAR();
                        //REMOVER_ITEM_DO_JSON();
                        CONECTANDO_AO_BANCO_DE_DADOS();
                        ADICIONAR_PRODUTOS_por_ARRAY(true);
                        filtro_ativado_sim_ou_nao = false;
                      }}
                    />

                    : <Icon name='heart' style={[Estilo.icones_medio]}
                      onPress={() => {
                        // setMuda_cor(oldState => !oldState)
                        //MOSTRAR_NUMERO_CELULAR();
                        //REMOVER_ITEM_DO_JSON();
                        FILTRAR_MEUS_FAVORITOS();
                        // filtro_ativado_sim_ou_nao = true;
                      }}
                    />
                  }
                </View>
                <Text style={{ fontSize: 10, color: 'white' }}>Favorito</Text>
              </TouchableOpacity>
              {/* CORAÇÃO ACIMA */}

            </View>

          </View>



        </View>
        /*FAIXA ORANGE ACIMA*/

        : /* Faixa Filtro SubMenu Abaixo */
        <View style={{ flexDirection: 'row', width: '100%', height: 50, justifyContent: 'center', borderWidth: 0, borderColor: 'yellow' }}>

          <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}
            onPress={() => {

              setBotoePropostas(false);

              setFaixa_submenu_e_filtro(true);
              CONECTANDO_AO_BANCO_DE_DADOS();
              ADICIONAR_PRODUTOS_por_ARRAY(true);
              filtro_ativado_sim_ou_nao = false;
            }}
          >
            <Icon name='reply'
              style={{ fontSize: 25, color: '#fff' }} />
          </TouchableOpacity>

          {botoePropostas ?
            <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0 }}>

              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} >

                <TouchableOpacity style={{ width: '30%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20, borderColor: botoePropostasRecebidas ? '#25E7DB' : 'white' }}

                  onPress={() => {
                    // alert("PROPOSTAS RECEBIDAS AQUI")

                    var RETORNO_BOOLEAN = PROPOSTAS_RECEBIDAS_RECENTES(true, "menuTopo");

                    if (RETORNO_BOOLEAN) {
                      setbotoePropostasRecebidas(true);
                      setbotoePropostasEnviadas(false);
                      setbotoePropostasAceitas(false);
                    }


                  }}

                >
                  <Text style={[Estilo.fontePequena, style = { alignItems: 'center', color: botoePropostasRecebidas ? '#25E7DB' : 'white', }]} >Recebidas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '30%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20, borderColor: botoePropostasEnviadas ? '#25E7DB' : 'white' }}

                  onPress={() => {
                    // alert("PROPOSTAS ENVIADAS AQUI")
                    var RETORNO_BOOLEAN = PROPOSTAS_RESPONDIDAS_RECENTES("menuTopo");

                    if (RETORNO_BOOLEAN) {
                      setbotoePropostasRecebidas(false);
                      setbotoePropostasEnviadas(true);
                      setbotoePropostasAceitas(false);
                    }


                  }}

                >
                  <Text style={[Estilo.fontePequena, style = { alignItems: 'center', color: botoePropostasEnviadas ? '#25E7DB' : 'white' }]} >Enviadas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '30%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20, borderColor: botoePropostasAceitas ? '#25E7DB' : 'white' }}

                  onPress={() => {
                    // alert("PROPOSTAS ACEITAS AQUI")
                    var RETORNO_BOOLEAN = PROPOSTAS_ACEITAS_RECENTES();

                    // alert(RETORNO_BOOLEAN);
                    if (RETORNO_BOOLEAN) {
                      setbotoePropostasRecebidas(false);
                      setbotoePropostasEnviadas(false);
                      setbotoePropostasAceitas(true);
                    }

                  }}

                >
                  <Text style={[Estilo.fontePequena, style = { alignItems: 'center', color: botoePropostasAceitas ? '#25E7DB' : 'white' }]} >Aceitas</Text>
                </TouchableOpacity>

                <View style={{ width: '1%' }} />

              </View>


            </View>
            :
            <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0 }}>

              {/* LABEL DA NOTIFICACÃO ABAIXO */}
              {labelOuPesquisar ?

                <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0 }}>
                  <Text style={{ fontSize: 25, color: '#fff' }}>
                    {texto_filtro_notificacao}
                  </Text>
                </View>
                // {/* LABEL DA NOTIFICACÃO ACIMA */}
                :
                <View style={{ flexDirection: 'row', width: '98%', height: 'auto', alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0 }}>

                  <TextInput style={{ width: '78%', height: 'auto', backgroundColor: 'white', borderRadius: 8 }} onChangeText={pesquisarGadoF} textAlign={'center'} placeholder={'Digite a Pesquisa'} />

                  <TouchableOpacity style={{ width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}
                    onPress={() => {
                      Keyboard.dismiss(); /*alert("DAPESQUISA " + pesquisarGado)*/ PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH(pesquisarGado);
                    }}
                  >
                    <Icon name='search' style={{ fontSize: 25, color: '#fff' }} />
                  </TouchableOpacity>

                </View>
              }{/*labelOuPesquisar*/}

            </View>

          }

        </View>
      }
      {/* Faixa Filtro SubMenu Acima */}

      <View style={[Estilo.div_view_3, Estilo.borda_geral]}>

        <View style={[Estilo.div_view_linha]}></View>


        {
          <Icon name='chevron-down' style={[Estilo.icones_medio, Estilo.icones_clicado, style = { paddingTop: 10 }]}
            onPress={() => {
              setExibe(oldState => !oldState);

              /* SOMENTE PRA TESTE ESSE ARMAZENAMENTO ABAIXO */
              ////alert("GRAVA POSTAGENS ");
              ////alert(JSON.stringify(TODOSSDADOSJSON));
              //ARMAZENAR_POSTAGEM_SEGUNTA_ETAPA(TODOSSDADOSJSON)
              /* SOMENTE PRA TESTE ESSE ARMAZENAMENTO ACIMA */
              //alert(TODOSSDADOSJSON[0].ta_online_J);


              //ATUALIZANDO_TODOS_DADOS_NO_ASYNCSTORAGE();

              setExibe_suas_postagens(oldState => !oldState);

            }
            }
          />
        }

      </View>


      {exibe_suas_postagens &&


        <View>
          <Text style={{ width: '100%', height: 35, color: 'white', borderRadius: 8 }} >  http://192.168.0.102:3000/  </Text>
          <View style={{ flexDirection: 'row', width: '50%' }}>
            <TextInput style={{ width: '100%', height: 35, backgroundColor: 'white', borderRadius: 8 }} onChangeText={quantidadeCabecasOuPesosF} />

            <TouchableHighlight style={{ width: '35%', height: 40, alignItems: 'center', paddingTop: 10, borderWidth: 1, borderRadius: 10, borderColor: 'white' }}

              onPress={async () => {

                var VARIAVEL = String("http://" + quantidadeCabecasOuPesos + ":3000/");
                /* http://192.168.0.102:3000/ */

                await AsyncStorage.setItem('IP_CONEXAO', VARIAVEL);
                alert(VARIAVEL + " GRAVADO ");


              }}
            >
              <Text style={{ fontSize: 15, color: '#fff' }} >Definir IP</Text>
            </TouchableHighlight>
          </View>



          <TouchableHighlight style={{ width: '35%', height: 40, alignItems: 'center', paddingTop: 10, borderWidth: 1, borderRadius: 10, borderColor: 'white' }}

            onPress={async () => {

              ////////////////////////////////////////////////////////////////////////////////////////////////////
              ////////////////////////////////////////////////////////////////////////////////////////////////////
              //const twoOptionAlertHandler = () => {
              //function to make two option alert
              Alert.alert(
                //title
                'Atenção !',
                //body
                //'I am two option alert. Do you want to cancel me ?',
                'Deseja Apagar Total Postagem no AsyncStorage !',
                [
                  {
                    text: 'Sim',
                    onPress: () => {/*console.log('Yes Pressed'), alert("Você Cancelou  "),*/

                      APAGAR_POSTAGEM('POSTAGEM'),
                        APAGAR_NUMERO_CELULAR('NUMERO_CELL')
                      VARIAVEL_GLOBAL.TELEFONE = "SEM_TELEFONE_USUARIO"
                      //setVARIAVEL_FUNCAO_TESTANDO_PROMISSE_DE_TIMER( oldState => !oldState );

                    }
                  },
                  {
                    text: 'Não',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                  },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
              );
              //};
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            }}
          >
            <Text style={{ fontSize: 15, color: '#fff' }} >Apagar Postagem Interna</Text>
          </TouchableHighlight>


        </View>
      }


      {/*PAINEL DE ROLAGEM VERTICAL ABAIXO */}
      {/* <ScrollView style={{ paddingVertical: 1, borderWidth: 0, borderColor: 'orange' }} > */}
      <View style={{ borderWidth: 0, borderColor: 'orange' }} >



        {/* INICIO*************************************************************************** */}

        {produtosEtiquetasExibir
          ?
          <ProdutosEtiquetas
            product={produtosS} ARRAY_PRIMEIRAS_URL_IMAGENSS={ARRAY_PRIMEIRAS_URL_IMAGENS_2} ARRAY_PRIMEIRAS_URL_VIDEOSS={ARRAY_PRIMEIRAS_URL_VIDEOS_2}
            LARTITUDE={userPosition.latitude} LORNGITUDE={userPosition.longitude} numero_telefone_usuario={DADOS_TELEFONE} TELA_DE_ORIGEM_E_SITUACA={TELA_DE_ORIGEM_E_SITUACAO}
            remoto_setLicencaExpiradaFalseOrTrue={setLicencaExpiradaFalseOrTrue}
          />
          :
          <View></View>
        }

        {/* FINAL*************************************************************************** */}

        {/* <FlatlistTeste /> */}


        <View style={{ height: 150 }} ></View>



      </View>
      {/* </ScrollView > */}
      {/*PAINEL DE ROLAGEM VERTICAL ACIMA */}


      {exibeMenu && (<MENU_LATERAL LARTITUDE={userPosition.latitude} LORNGITUDE={userPosition.longitude}
        remoto_PROPOSTAS_RECEBIDAS_RECENTES={PROPOSTAS_RECEBIDAS_RECENTES}
        remote_FILTRAR_MEUS_FAVORITOS={FILTRAR_MEUS_FAVORITOS}
      />)}



      {/* {exibeFiltroCategoria && (<FILTRO_CATEGORIA />)} */}

      {/* {exibeFiltroCategoria && (<FILTRO_PESQUISA_CATEGORIA />)} */}

      {/* {exibeDetalheProdutos && (<DETALHES />)} */}


      {/*MENU DE AVISOS ABAIXO*/}
      {menu_aviso_visivel_or_invisivel && (
        <View style={{ width: '70%', height: 'auto', position: 'absolute', top: 60, zIndex: 0, backgroundColor: 'pink', borderWidth: 5, borderColor: '#778187', borderRadius: 10 }} >


          <View style={{ flexDirection: "row", width: "100%", height: 60, backgroundColor: "#666", alignItems: "center", justifyContent: "center" }} >

            <View style={{ width: "75%", height: 60, paddingLeft: 15, justifyContent: "center", backgroundColor: '#2A3E49' }} >
              <Text style={{ borderWidth: 0, borderColor: "yellow", color: "#fff", fontSize: 25, backgroundColor: "#2A3E49" }}>
                Propostas
        </Text>
            </View>

            <TouchableOpacity style={{ width: "25%", height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#2A3E49' }} >
              {/*<Text style={{ borderWidth: 1, borderColor: "yellow", color: "#fff", fontSize: 25, backgroundColor: "#778187" }} >
                X
              </Text> */}
              <Icon name='times-circle' nativeID='Favorito'
                style={{ color: "#fff", fontSize: 35, borderWidth: 0, borderColor: "yellow" }}

                onPress={() => { setMenu_aviso_visivel_or_invisivel(false) }}

              />
            </TouchableOpacity>

          </View>



          {/*1º FAIXA ITEM DO MENU ABAIXO */}
          <TouchableOpacity style={{ width: '100%', height: 40, backgroundColor: '#778187', justifyContent: 'center' }}
            onPress={() => { PROPOSTAS_RECEBIDAS_RECENTES(false, "menuFlutuante"); }}
          >

            <View flexDirection='row' style={{ width: '100%', height: 30, paddingLeft: 15 }}>

              <Text style={{
                width: 30, height: 30, borderRadius: 50,
                color: 'white', fontWeight: "bold", fontSize: 20, backgroundColor: 'red',
                position: 'relative', zIndex: 10, textAlign: 'center', justifyContent: 'center'
              }} >{qtde_propostas_recebidas_nao_vista}
              </Text>
              <View style={{ width: 10 }} />
              <Text style={{ borderWidth: 0, borderColor: '#fff', color: '#fff', fontSize: 20 }}  >Recebidas</Text>

            </View>

          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, borderWidth: 1, borderColor: '#fff' }} />
          {/*1º FAIXA ITEM DO MENU ACIMA */}


          {/*2º FAIXA ITEM DO MENU ABAIXO */}
          <TouchableOpacity style={{ width: '100%', height: 40, backgroundColor: '#778187', justifyContent: 'center' }}
            onPress={() => { PROPOSTAS_RESPONDIDAS_RECENTES("menuFlutuante"); }}
          >

            <View flexDirection='row' style={{ width: '100%', height: 30, paddingLeft: 15 }}>

              <Text style={{
                width: 30, height: 30, borderRadius: 50,
                color: 'white', fontWeight: "bold", fontSize: 20, backgroundColor: 'red',
                position: 'relative', zIndex: 10, textAlign: 'center', justifyContent: 'center'
              }} >{qtde_propostas_enviadas_nao_vista}
              </Text>
              <View style={{ width: 10 }} />
              <Text style={{ borderWidth: 0, borderColor: '#fff', color: '#fff', fontSize: 20 }}  >Enviadas</Text>

            </View>

          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, borderWidth: 1, borderColor: '#fff' }} />
          {/*2º FAIXA ITEM DO MENU ACIMA */}


          {/*3º FAIXA ITEM DO MENU ABAIXO */}
          <TouchableOpacity style={{ width: '100%', height: 40, backgroundColor: '#778187', justifyContent: 'center' }}
            onPress={() => { PROPOSTAS_ACEITAS_RECENTES(); }}
          >

            <View flexDirection='row' style={{ width: '100%', height: 30, paddingLeft: 15 }}>

              <Text style={{
                width: 30, height: 30, borderRadius: 50,
                color: 'white', fontWeight: "bold", fontSize: 20, backgroundColor: 'red',
                position: 'relative', zIndex: 10, textAlign: 'center', justifyContent: 'center'
              }} >{qtde_propostas_aceitas_nao_vista}
              </Text>
              <View style={{ width: 10 }} />
              <Text style={{ borderWidth: 0, borderColor: '#fff', color: '#fff', fontSize: 20 }}  >Aceitas</Text>

            </View>

          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, borderWidth: 1, borderColor: '#fff' }} />
          {/*3º FAIXA ITEM DO MENU ACIMA */}


          {/*4º FAIXA ITEM DO MENU ACIMA */}

          <View style={{ width: '100%', height: 60, backgroundColor: '#2A3E49', justifyContent: 'center' }} >
            <Text style={{ borderWidth: 0, borderColor: '#fff', color: '#fff', fontSize: 25 }}  >   Vendas</Text>
          </View>


          {/*5º FAIXA ITEM DO MENU ABAIXO */}
          <TouchableOpacity style={{ width: '100%', height: 40, backgroundColor: '#778187', justifyContent: 'center' }}
            onPress={() => { VENDAS_RECENTES(); }}
          >

            <View flexDirection='row' style={{ width: '100%', height: 30, paddingLeft: 15 }}>

              <Text style={{
                width: 30, height: 30, borderRadius: 50,
                color: 'white', fontWeight: "bold", fontSize: 20, backgroundColor: 'red',
                position: 'relative', zIndex: 10, textAlign: 'center', justifyContent: 'center'
              }} >{qtde_venda_recentes_nao_vista}
              </Text>
              <View style={{ width: 10 }} />
              <Text style={{ borderWidth: 0, borderColor: '#fff', color: '#fff', fontSize: 20 }}  >Recentes</Text>

            </View>

          </TouchableOpacity>
          <View style={{ width: '100%', height: 0, borderWidth: 0, borderColor: '#fff' }} />
          {/*5º FAIXA ITEM DO MENU ACIMA */}



        </View>
      )}
      {/*MENU DE AVISOS ACIMA*/}


      {exibeFiltroCategoria && (<FILTRO_PESQUISA_CATEGORIA
        setExibeFiltroCategori={setExibeFiltroCategoria}
        PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH_REMOTO={PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH}
      />)}


      {licencaExpiradaFalseOrTrue && (<LicencaExpirada REMOTO_MOSTRAR_TELA_EXPIRACAO_LICENCA={MOSTRAR_TELA_EXPIRACAO_LICENCA} />)}




    </SafeAreaView   >

  )//DO RETURN


  //#REMOVIDO DAQUI ABAIXO
  //#REFERENCE321
  //REMOVIDO DAQUI ACIMA





}//ESSA CHAVE PERTENCE AO METODO PRINCIPAL




/*
function EXECUCAO_CONSTANTE_DE_UM_EM_UM_SEGUNDO(){


        if(gatilho_primeira_vez == 0 && busca_de_tempo_em_tempo == -1 ){

              gatilho_primeira_vez = 1;
              alert("SÓ VAI EXECUTAR UMA VEZ ESSA MENSAGEM");


                //TAREFA DE BUSCA COM REGRA DE LIMITE DE ATRAZO DE 5 SEGUNDOS

              if(tempo_estipulado_de_atrazo == -1){

                  tempo_estipulado_de_atrazo = 5;
                  busca_de_tempo_em_tempo = 10;
                  gatilho_primeira_vez = 0;

             }//IF



        }//IF




        //RESET NAS VARIAVEIS CONTADORAS DE ESTADOS ABAIXO
        if(tempo_estipulado_de_atrazo == -1){  tempo_estipulado_de_atrazo = 5;  }//IF

        if(busca_de_tempo_em_tempo == -1){  busca_de_tempo_em_tempo = 10;   }//IF
        //RESET NAS VARIAVEIS CONTADORAS DE ESTADOS ACIMA

        //DECREMENTO NAS VARIAVEIS DE ESTADOS ABAIXO
        tempo_estipulado_de_atrazo = tempo_estipulado_de_atrazo - 1;
        busca_de_tempo_em_tempo = busca_de_tempo_em_tempo - 1;
        //DECREMENTO NAS VARIAVEIS DE ESTADOS ACIMA

}//function


setInterval(EXECUCAO_CONSTANTE_DE_UM_EM_UM_SEGUNDO, 1000);
*/
