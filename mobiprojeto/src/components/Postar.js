import React, { useRef, useState, useEffect, useMemo, useContext } from 'react'
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity, StyleSheet, ScrollView, Button, TouchableHighlight, CheckBox, PermissionsAndroid, Dimensions, Animated } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';


//import Range from '@ptomasroos/react-native-multi-slider'

import RangeSlider from 'rn-range-slider';
import { TextInput } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";

import Axios from 'axios';
import GlobalContext from '../context/UsersContext';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import ImageLista from './IMAGELISTA';
import VideoLista from './VIDEOLISTA';

//TALVEZ DESINSTALAR TUDO ABAIXO
var RNFS = require('react-native-fs');

//import { Selecionar } from './SELECIONARQUIVOS';
//import RNFileSelector from 'react-native-file-selector';

//TALVEZ DESINSTALAR TUDO ACIMA

import DocumentPicker from 'react-native-document-picker';

//import RNFetchBlob from 'react-native-fetch-blob'; FOI DESATIVADO MAS TÁ FUNCIONANDO  ATENÇÃO foi substituido pelo debaixo pelos Criadores
// import RNFetchBlob from 'rn-fetch-blob'; //FOI DESATIVADO MAS TÁ FUNCIONANDO

import Geolocation from 'react-native-geolocation-service';

//import  { AsyncStorage } from  '@react-native-community/async-storage';

import {
    arrayUnique, arrayUnique_2, pegar_somente_nome_dos_campos_de_JSON, pegar_somente_valores_de_JSON, converter_Array_para_JSON,
    data_hora_e_segundo_sem_separador, data_hora_e_segundo_completo, data_completa, data_completa_ingles, FORMATAR_AO_DIGITAR_USANDO_MASCARA, Distancia_entre_2_geolocalizacao,
    TRANFORMAR_P_CAMINHO_ABSOLUTO, FORMATAR_PARA_MOEDA_DEFINITIVO_AO_DIGITAR
} from './CALCULO_E_FORMATACAO/FORMATACAO';


import { TextInputMask } from 'react-native-masked-text';
import { or } from 'react-native-reanimated';

/*IMPOTAÇÕES DO STYLED COMPONENTS ABAIXO
import { Checkbox } from './styledComponents'
//IMPOTAÇÕES DO STYLED COMPONENTS ACIMA */


var andar = 0;
var ARRY_URL_IMAGENS = new Array();
var ARRY_URL_VIDEOS = new Array();
var TAMANHO_ARRAY_IMG_E_VIDEO = 0;

var ARRY_URL_IMAGENS_DO_CELL = new Array();
var ARRY_URL_VIDEOS_DO_CELL = new Array();


//Criar o OBJETO JSON ABAIXO
/* */
var dadosPostagem =
    [{
        numero_telefone_J: "",
        id_J: "",
        data_J: "",
        LATITUDE_J: "",
        LONGITUDE_J: "",
        URL_IMAGEN_DADOS_J: "",
        URL_VIDEOS_DADOS_J: "",
        corMacho_J: "",
        corFemea_J: "",
        cor_0_12_J: "",
        cor_12_24_J: "",
        cor_24_36_J: "",
        corAcima_36_J: "",
        outrasErasAnterior_J: "",
        outrasErasPosterior_J: "",
        corBezerros_J: "",
        corGarrotes_J: "",
        corTourunos_J: "",
        corBois_J: "",
        corBoisGordos_J: "",
        corBezerras_J: "",
        corNovilhas_J: "",
        corVacasBoiadeiras_J: "",
        corVacas_J: "",
        corVacasGordas_J: "",
        corVacasPrenhas_J: "",
        corVacasParidas_J: "",
        descricoesGerais_J: "",
        precoSugerido_J: "",
        quantidadeCabecasOuPesos_J: "",
        aprovado_postagem_J: "",

        favorito_J: "",
        // venda_status_J: "aberta",
        venda_status_J: "aberta",
        comprador_J: "nenhum",
        ta_online_J: "nao",

        tempoPostagem_J: 30
    }];


//Criar o OBJETO JSON ACIMA    

var categorias_Objetos = {
    Obj_Macho: "",
    Obj_Femea: "",

    Obj__0_12: "",
    Obj__12_24: "",
    Obj__24_36: "",
    Obj_Acima_36: "",


    Obj_Bezerros: "",
    Obj_Garrotes: "",
    Obj_Tourunos: "",
    Obj_Bois: "",
    Obj_BoisGordos: "",

    Obj_Bezerras: "",
    Obj_Novilhas: "",
    Obj_VacasBoiadeiras: "",
    Obj_Vacas: "",
    Obj_VacasGordas: "",
    Obj_VacasPrenhas: "",
    Obj_VacasParidas: ""
}

export default function Postar(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // var { URL_FOTOS } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params  17 04 2021






    //TESTANDO FUNCTION ABAIXO
    function OBJETO_RECEBIDO(props) {

        alert(props);

    }

    var [checked, setChecked] = useState(false);

    var [isPress, setIsPress] = useState(false);

    var [corMacho, setcorMacho] = useState(false);
    var [corFemea, setcorFemea] = useState(false);

    var [cor_0_12, setcor_0_12] = useState(false);
    var [cor_12_24, setcor_12_24] = useState(false);
    var [cor_24_36, setcor_24_36] = useState(false);
    var [corAcima_36, setcorAcima_36] = useState(false);


    var [corBezerros, setcorBezerros] = useState(false);
    var [corGarrotes, setcorGarrotes] = useState(false);
    var [corTourunos, setcorTourunos] = useState(false);
    var [corBois, setcorBois] = useState(false);
    var [corBoisGordos, setcorBoisGordos] = useState(false);

    var [corBezerras, setcorBezerras] = useState(false);
    var [corNovilhas, setcorNovilhas] = useState(false);
    var [corVacasBoiadeiras, setcorVacasBoiadeiras] = useState(false);
    var [corVacas, setcorVacas] = useState(false);
    var [corVacasGordas, setcorVacasGordas] = useState(false);
    var [corVacasPrenhas, setcorVacasPrenhas] = useState(false);
    var [corVacasParidas, setcorVacasParidas] = useState(false);

    var [arquivoDoCell, setarquivoDoCell] = useState('file:///');


    var [imagensEvideos, setimagensEvideos] = useState(false);
    var [tirarFotoGravarVideo, settirarFotoGravarVideo] = useState(false);


    //VARIAVEL DE DADOS ABAIXO  set
    var [outrasErasAnterior, setOutrasErasAnterior] = useState(0);
    function outrasErasAnteriorF(outrasErasAnterior) { setOutrasErasAnterior(outrasErasAnterior); }

    var [outrasErasPosterior, setOutrasErasPosterior] = useState(0);
    function outrasErasPosteriorF(outrasErasPosterior) { setOutrasErasPosterior(outrasErasPosterior); }


    var [descricoesGerais, setDescricoesGerais] = useState("");
    function descricoesGeraisF(descricoesGerais) { setDescricoesGerais(descricoesGerais); }




    var [precoSugerido, setPrecoSugerido] = useState("");
    function precoSugeridoF(precoSugerido) { setPrecoSugerido(precoSugerido); }

    var [quantidadeCabecasOuPesos, setQuantidadeCabecasOuPesos] = useState(0);
    function quantidadeCabecasOuPesosF(quantidadeCabecasOuPesos) { setQuantidadeCabecasOuPesos(quantidadeCabecasOuPesos); }



    var [numero_do_cell, setNumero_do_cell] = useState(null);

    var [variavelTelefone, setVariavelTelefone] = useState("");

    var [codigoDeSeguranca, setCodigoDeSeguranca] = useState("");

    var [caixaNumeroCelularVisivel, setCaixaNumeroCelularVisivel] = useState(false);
    var [aprovado_postagem, setAprovado_postagem] = useState(false);

    /*
    var [favorito, setFavorito ] = useState("");
    var [comprado, setComprado ] = useState("");
    */
    var favorito = "";
    var venda_status = "aberta";
    var comprador = "nenhum";
    var ta_online = "nao";

    //VARIAVEL DE DADOS ACIMA


    /*
    var touchProps = {
        activeOpacity: 1,
        underlayColor: 'gray',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => alert('HELLO'),                 // <-- "onPress" is apparently required
      };
      */

    var touchProps = {
        activeOpacity: 1,
        //underlayColor: 'gray',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: isPress ? style = { backgroundColor: 'green' } : style = { backgroundColor: 'black' }, // <-- but you can still apply other style changes
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
    };

    var vacaParida = {
        style: isPress ? style = { backgroundColor: 'green' } : style = { backgroundColor: 'black' },
        onPress: () => {
            //alert('VACA PARIDA APERTADA')
            //await sleep(1000)
            //alert('VACA PARIDA APERTADA 2') 

            alert(style.props)

        },
    };


    //TESTANDO FUNCTION ACIMA

    var [url_strings, setUrl_strings] = useState('file:///')

    var produto = '';
    const navigation = useNavigation();


    //DESATIVADO ABAIXO 17 04 2021
    /* PEGANDO RETORNO DA VARIAVEL PELA CHAMADA DE TELA ABAIXO */
    var { URL_FOTOS } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params 
    //alert(typeof(URL))
    //alert(URL_FOTOS)

    //  LISTAIMAGENS_CONTEXT
    // alert(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT)

    // var URL_FOTOS_2;

    // if (URL_FOTOS.includes("zerar_postagem")) {

    //     // ARRY_URL_IMAGENS.length = 0;
    //     VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length = 0;
    //     ARRY_URL_VIDEOS.length = 0;

    //     URL_FOTOS_2 = URL_FOTOS;

    //     URL_FOTOS = URL_FOTOS.replace("zerar_postagem", "");

    // }//IF
    //DESATIVADO ACIMA 17 04 2021


    var { URL_VIDEOS } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    //alert(URL_VIDEOS)

    /* PEGANDO RETORNO DA VARIAVEL PELA CHAMADA DE TELA ACIMA */

    //ARRY_URL_IMAGENS.length = 0;
    //ARRY_URL_IMAGENS = URL_FOTOS.split("|");



    const [valueStart, setValueStart] = useState(0)
    const [muda_cor_checkado_macho, setMuda_cor_checkado_macho] = useState(false)
    const [muda_cor_checkado_bovino, setMuda_cor_checkado_bovino] = useState(false)
    const [muda_cor_checkado_femea, setMuda_cor_checkado_femea] = useState(false)
    const [muda_cor_checkado_equino, setMuda_cor_checkado_equino] = useState(false)
    const [muda_cor_checkado_suino, setMuda_cor_checkado_suino] = useState(false)


    const [exibe, setExibe] = useState(false)
    const [valorMenor, setValorMenor] = useState(0)
    const [valorMaior, setValorMaior] = useState(300)

    const [fecharTelaCategoria, setFecharTelaCategoria] = useState(true)
    const [fecharPrecoDescricao, setFecharPrecoDescricao] = useState(false)

    const [alterna_abas, setAlterna_abas] = useState(true)



    /*PEGANDO ELEMENTOS DO ARRAY E PONDO JUNTO COM UMA VIEW LINHA ABAIXO
    let elements = ARRY_URL_IMAGENS.map((text)=> <View><Text>{text}</Text></View>);
    //PEGANDO ELEMENTOS DO ARRAY E PONDO JUNTO COM UMA VIEW LINHA ACIMA */


    //PEGANDO ELEMENTOS DO ARRAY E PONDO JUNTO COM UMA VIEW LINHA ABAIXO
    //let elements = ARRY_URL_IMAGENS.map((text)=> <View><Text>{text}</Text></View>);
    //PEGANDO ELEMENTOS DO ARRAY E PONDO JUNTO COM UMA VIEW LINHA ACIMA


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
                // console.log('permissão concedida');
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
    }, [hasLocationPermission]);
    // useEffec DA GEOLOCALIZAÇÃO NO CELULAR ACIMA





    /////////////////////////////////////////////////////
    //PEDINDO PERMISSÃO PRA ACESSAR AQUIVOS ABAIXO
    useEffect(() => {
        requestStoragePermission = async () => {

            if (Platform.OS !== "android") return true

            const pm1 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const pm2 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (pm1 && pm2) return true

            const userResponse = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

                //alert ("PERMISSÃO CONCEDIDA")
            ]);

            if (userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
                userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
                return true
            } else {
                return false
            }
        }

    }, []);




    useEffect(() => {

        //METODO CHAMANDO O PEDIDO DE PERMISSÃO PRA ACESSAR ARMAZENAMENTO INTERNO
        requestStoragePermission();

    }, []);
    //PEDINDO PERMISSÃO PRA ACESSAR AQUIVOS ACIMA
    /////////////////////////////////////////////////////



    //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ACIMA





    const [atualizarTela, setAtualizarTela] = useState(0);
    let VARIAVEL_DA_FUNCAO_TIMER;

    // useEffect(() => {

    //     //alert("EXECUTAR QUANDO É CARREGADO PELA PRIMEIRA VEZ");
    //     nome_da_funcao();
    //     // VARIAVEL_DA_FUNCAO_TIMER = setInterval(function atualizacao_tela_com_timer() {


    //     // }, 1000);//function final do timer

    //     // VARIAVEL_DA_FUNCAO_TIMER = setInterval(atualizacao_tela_com_timer, 1000);//INCIAR NOVAMENTE O PROCESSO COM TIMER setInterval

    //     // return () => clearInterval(VARIAVEL_DA_FUNCAO_TIMER);

    // }, [atualizarTela]);



    useEffect(() => {

        setAtualizarTela(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length);
        nome_da_funcao();

    });




    /**/
    //INSERINDO IMAGENS ABAIXO POR MEIO DO ARRAY ABAIXO
    var Produtos_rows = [];
    function nome_da_funcao() {
        // alert("18 04 2021 TESTANDO");

        // ARRY_URL_IMAGENS = URL_FOTOS.split("|");
        // VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT = URL_FOTOS.split("|");  //OBSERVER 17 04 2021


        //ARRY_URL_VIDEOS.length = 0;
        ARRY_URL_VIDEOS = URL_VIDEOS.split("|");



        // if (ARRY_URL_IMAGENS.length > 1 || ARRY_URL_VIDEOS.length > 1) {
        if (VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length > 0 || ARRY_URL_VIDEOS.length > 0) {

            //alert('EXECUTADO NO INICIO DA EXECUÇÃO'+ ARRY_URL_IMAGENS.length);


            //LIMPANDO CONTEUDOS VAZIOS DO ARRAY DAS FOTOS ABAIXO
            // for (var i_vazio = 0; i_vazio < ARRY_URL_IMAGENS.length; i_vazio++) {
            for (var i_vazio = 0; i_vazio < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length; i_vazio++) {
                var vazio_no_array;
                // vazio_no_array = ARRY_URL_IMAGENS[i_vazio];
                vazio_no_array = VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i_vazio];
                //alert(vazio_no_array);
                //alert(ARRY_URL_IMAGENS.length);
                if (!vazio_no_array.includes("file:///") && !vazio_no_array.includes("content://") || vazio_no_array.length < 14) {
                    //if (!vazio_no_array.includes("file:///")) {    
                    // ARRY_URL_IMAGENS.splice(ARRY_URL_IMAGENS.indexOf(ARRY_URL_IMAGENS[i_vazio]), 1);
                    VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.splice(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.indexOf(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i_vazio]), 1);

                    //alert(i_vazio);
                }//IF   
            }//FOR
            //LIMPANDO CONTEUDOS VAZIOS DO ARRAY DAS FOTOS ACIMA


            //LIMPANDO CONTEUDOS VAZIOS DO ARRAY DOS VIDEOS ABAIXO
            for (var i_vazio = 0; i_vazio < ARRY_URL_VIDEOS.length; i_vazio++) {
                var vazio_no_array;
                vazio_no_array = ARRY_URL_VIDEOS[i_vazio];
                //alert(vazio_no_array);
                //alert(ARRY_URL_IMAGENS.length);
                if (!vazio_no_array.includes("file:///") && !vazio_no_array.includes("content://") || vazio_no_array.length < 14) {
                    //if (!vazio_no_array.includes("file:///")) {    
                    ARRY_URL_VIDEOS.splice(ARRY_URL_VIDEOS.indexOf(ARRY_URL_VIDEOS[i_vazio]), 1);
                    //alert(i_vazio);
                }//IF   
            }//FOR
            //LIMPANDO CONTEUDOS VAZIOS DO ARRAY DOS VIDEOS ACIMA


            //ADICIONANDO VIEW COM IMAGEM pelo FOR ABAIXO 
            // for (var i = 0; i < ARRY_URL_IMAGENS.length; i++) {
            for (var i = 0; i < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length; i++) {

                // Produtos_rows.push(<ImageLista key={"1" + i} IMAGE={ARRY_URL_IMAGENS[i]} LISTAIMAGENS={ARRY_URL_IMAGENS} index={i} />);
                Produtos_rows.push(<ImageLista key={"1" + i} IMAGE={VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i]} LISTAIMAGENS={VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT} index={i} />);

            }//FOR
            //ADICIONANDO VIEW COM IMAGEM pelo FOR ACIMA 


            for (var i = 0; i < ARRY_URL_VIDEOS.length; i++) {

                Produtos_rows.push(<VideoLista key={"2" + i} VIDEO={ARRY_URL_VIDEOS[i]} index={i} />);

            }//FOR


            return Produtos_rows;

        }//IF  


    }
    //setInterval(nome_da_funcao, 10000);
    //INSERINDO IMAGENS ABAIXO POR MEIO DO ARRAY ACIMA

    //




    async function VERIFICAR_SE_CELULAR_JA_ESTA_CADASTRADO_NO_BANCO_DE_DADOS(NUMERO_DE_TELEFONE_USUARIO) {

        //alert(NUMERO_DE_TELEFONE_USUARIO);
        //   const  resposta = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_vendas_recentes', {
        const resposta = Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'verificar_se_telefone_ja_esta_cadastrado', {

            params: { numero_telefone_J: NUMERO_DE_TELEFONE_USUARIO }

        });
        return resposta;
    }//function



    var [ocultarMostrarClique, setOcultarMostrarClique] = useState(true);
    var [ocultarMostrarEnvioCodigo, setOcultarMostrarEnvioCodigo] = useState(false);
    var [ocultarMostrarCaixaTexto, setOcultarMostrarCaixaTexto] = useState(false);

    var [gerarEnviarCodigo, setGerarEnviarCodigo] = useState("Gerar Código Recuperação");



    //COLOCANDO EFEITOS DE ANIMAÇÃO ABAIXO



    // //UseState do Amimated
    // const [largura, setLargura] = useState(new Animated.Value(0));
    // const [altura, setAltura] = useState(new Animated.Value(0));


    // var Largura_total_da_tela = Math.round(Dimensions.get('window').width);
    // var largura_cem_porcento = ((Largura_total_da_tela * 100) / 100);
    // // console.log(largura_sesenta_e_sete_porcento);


    // var Altura__total_da_tela = Math.round(Dimensions.get('window').height);
    // var altura_cem_porcento = ((Altura__total_da_tela * 100) / 100);


    // useEffect(() => {

    // Animated.sequence([

    //     Animated.timing(
    //         largura,
    //         {
    //             toValue: largura_cem_porcento,
    //             duration: 1000,
    //             useNativeDriver: false
    //         }
    //     ),
    //     Animated.timing(
    //         altura,
    //         {
    //             toValue: altura_cem_porcento,
    //             duration: 300,
    //             useNativeDriver: false
    //         }
    //     )

    // ]).start();


    // }, []);

    //COLOCANDO EFEITOS DE ANIMAÇÃO ACIMA





    async function CONTANDO_QUANTIDADE_DE_POSTAGENS() {

        // alert("TÁ CHAMANDO");

        // if (VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ === true) {

        /***************************************/
        var response = "";

        //PRIMEIRA TENTATIVA ABAIXO
        try { //alert(IP_DO_SERVIDOR);
            // response = await api.get('/obtendo_postagens_online', {
            //response = await Axios.get('http://192.168.0.102:3000/obtendo_postagens_online', {
            response = await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + "contando_postagens", {

                // params: { numero_telefone: DADOS_TELEFONE_VALOR }
                params: { telefoneDoUsuario: VARIAVEL_GLOBAL.TELEFONE }
            });

            var retorno_do_bd_contagem_de_postagem = await response.data;

            // alert( JSON.stringify(retorno_do_bd_contagem_de_postagem) );
            // alert( retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS );
            // console.log( JSON.stringify(retorno_do_bd_contagem_de_postagem) );

            VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS = retorno_do_bd_contagem_de_postagem[0].QUANTIDADE_DE_POSTAGENS;

        } catch (exception) { alert(exception.message)/**/ }
        /***************************************/


        //   VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = false;
        // }   // if (VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ === true) {



    }







    /**************************************************************************************************/
    /**************************************************************************************************/
    /**************************************************************************************************/
    //INSERINDO DADOS NO BANCO DE DADOS ABAIXO
    async function INSERINDO_NO_BANCO_DE_DADOS_POSTAGENS_OFF_LINE_2() {

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
                    await Axios.get(IP_DO_SERVIDOR + 'insert_postagens', {
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
    /**************************************************************************************************/
    /**************************************************************************************************/
    /**************************************************************************************************/







    return (



        <SafeAreaView style={[Estilo.App]}    >




            {/*<SafeAreaView >*/}


            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO colocar dentro da View principal que fica dentro do return */}
            <ScreenOrientation
                // orientation={LANDSCAPE_LEFT}
                orientation={PORTRAIT}
            // onChange={orientation => console.log('onChange', orientation)}
            // onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
            />
            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA colocar dentro da View principal que fica dentro do return  */}

            {/* <Animated.View style={{ width:largura, height:altura_cem_porcento }} > */}

            {/* <ScrollView style={{ flex: 1, width: '100%', height:'100%' }} >    */}

            <View style={{ height: 10 }}></View>
            <View style={{ flexDirection: 'row', width: '100%', height: 45, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 0, borderColor: 'darkred' }} >

                {/*****************************************/}
                <TouchableOpacity style={{ flexDirection: 'row', width: '30%', height: 40, paddingLeft: 10, paddingBottom: 0, alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0, borderColor: 'pink' }}
                    onPress={() => {
                        VARIAVEL_GLOBAL.INDICE_GLOBAL_IMAGENS_VIDEOS = -1;
                        VARIAVEL_GLOBAL.CONTADOR_GLOBAL = 55;
                        navigation.navigate("TelaPrincipal", { produto })
                    }}
                >
                    {/* <Icon name='arrow-left' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]} /> */}
                    <Icon name='arrow-left' style={[Estilo.icones_medio]} />
                </TouchableOpacity>
                {/*****************************************/}

                <View style={{ flexDirection: 'row', width: '70%', height: 30, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 0, borderColor: 'pink' }} >

                    <TouchableOpacity style={{ width: '25%', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'ORANGE' }}
                        onPress={() => {
                            setimagensEvideos(true);

                            //    navigation.navigate("CameraFoto", { URL_FOTOS_2 });
                            navigation.navigate("CameraFoto", VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT);

                        }}
                    >
                        <Icon name='camera' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]} />
                        <Text style={{ fontSize: 10, color: 'white' }} >Fotografar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '25%', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'ORANGE' }}
                        onPress={() => {
                            setimagensEvideos(true);
                            navigation.navigate("Videos");
                        }}
                    >
                        <Icon name='video-camera' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]} />
                        <Text style={{ fontSize: 10, color: 'white' }} >Filmar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ width: '25%', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'ORANGE' }}
                        onPress={async () => {
                            setimagensEvideos(true);

                            var CAMINHO;

                            //navigation.navigate("Videos")
                            //setListaImagemVideo(elements);
                            //ABRIR_ARQUIVO();

                            /////////////////////////////////////// DocumentPicker.types.allFiles   , DocumentPicker.types.video*/
                            // Pick a single file
                            try {
                                const res = await DocumentPicker.pick({
                                    type: [DocumentPicker.types.images, DocumentPicker.types.video],
                                });
                                console.log(
                                    res.uri,
                                    res.type, // mime type
                                    res.name,
                                    res.size);
                                //CAMINHO = res.uri;

                                //CAMINHO = CAMINHO.replace('content://','file:///');
                                // CAMINHO = CAMINHO.replace(' ','');
                                // CAMINHO = CAMINHO+'.jpg';
                                //setarquivoDoCell(CAMINHO);
                                CAMINHO = await TRANFORMAR_P_CAMINHO_ABSOLUTO(res.uri);
                                //alert(CAMINHO);
                                //console.log(CAMINHO);

                                if (
                                    CAMINHO.toUpperCase().includes('.JPEG') ||
                                    CAMINHO.toUpperCase().includes('.JPG') ||
                                    CAMINHO.toUpperCase().includes('.PNG')
                                ) {

                                    /**/
                                    //CAMINHO = CAMINHO+'|';   VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT
                                    // ARRY_URL_IMAGENS.push(CAMINHO);
                                    VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.push(CAMINHO);
                                    //alert(ARRY_URL_IMAGENS);
                                    let URL_FOTOS = "";
                                    // for (var i = 0; i < ARRY_URL_IMAGENS.length; i++) {
                                    for (var i = 0; i < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length; i++) {

                                        URL_FOTOS += VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i] + '|';

                                    }//for
                                    navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS });
                                    //nome_da_funcao();




                                    //} else if (CAMINHO.includes('video%')) {
                                } else if (CAMINHO.includes('.mp4')) {

                                    ARRY_URL_VIDEOS.push(CAMINHO);
                                    //alert(ARRY_URL_VIDEOS_DO_CELL);
                                    let URL_VIDEOS = "";
                                    for (var i = 0; i < ARRY_URL_VIDEOS.length; i++) {

                                        URL_VIDEOS += ARRY_URL_VIDEOS[i] + '|';

                                    }//for
                                    navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS });


                                } else {
                                    alert('ARQUIVO INVÁLIDO');
                                }

                                /*
                                // TESTANDO NÃO APAGAR ABAIXO  //
                                RNFetchBlob.fs
                                    .stat(res.uri)
                                    .then((stats) => {
                                        console.log(stats.path);
                                        //alert(stats.path);
                                        //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
                                        CAMINHO = stats.path;
                                        //alert(CAMINHO);
                                        CAMINHO = 'file:///'+CAMINHO+'|';
                                        //setarquivoDoCell(CAMINHO);

                                        CAMINHO = CAMINHO.replace("undefined","");

                                        //alert(CAMINHO)

                                        if (CAMINHO.includes('.jpg')) {


                                            ARRY_URL_IMAGENS.push(CAMINHO);
                                            //alert(ARRY_URL_IMAGENS_DO_CELL);

                                            alert(ARRY_URL_IMAGENS);

                                            let  URL_FOTOS
                                            for(var i = 0; i < ARRY_URL_IMAGENS.length; i++){
                                              
                                              URL_FOTOS += ARRY_URL_IMAGENS[i];

                                            }//for
                                            
                                            //alert(URL_FOTOS);

                                            navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS });

                                        } else if (CAMINHO.includes('.mp4')) {

                                            ARRY_URL_VIDEOS_DO_CELL.push(CAMINHO);
                                           
                                            for(var i = 0; i < ARRY_URL_VIDEOS_DO_CELL.length; i++){

                                                URL_VIDEOS += ARRY_URL_VIDEOS_DO_CELL[i];

                                            }//for

                                            navigation.navigate("Postar", { URL_FOTOS, URL_VIDEOS });

                                        } else { 'FORMATO INVÁLIDO' }


                                        
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                // TESTANDO NÃO APAGAR ACIMA  */


                            } catch (err) {
                                if (DocumentPicker.isCancel(err)) {
                                    // User cancelled the picker, exit any dialogs or menus and move on
                                } else {
                                    throw err;
                                }
                            }

                            ///////////////////////////////////////

                        }}
                    >
                        <Icon name='folder-open-o' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]} />
                        <Text style={{ fontSize: 10, color: 'white' }}>Arquivo</Text>
                    </TouchableOpacity>



                </View>


            </View>

            <View style={{ flexDirection: 'row', width: '100%', height: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>
                <View style={[Estilo.borda_geral, style = { width: '90%', justifyContent: 'flex-start', borderWidth: 0.5, borderColor: 'white' }]}>
                </View>
            </View>




            {/*******************************************************************************************************/}



            {/**/}
            {/*PAINEL DE ROLAGEM VERTICAL ABAIXO*/}
            <View style={{ width: '100%', height: '10%', padding: 2, borderWidth: 0, borderColor: 'blue' }}>
                {/* <ImageLista IMAGE={ARRY_URL_IMAGENS[0]} /> */}

                {/* imagensEvideos ?

                    <ScrollView horizontal={true} style={{ borderWidth: 0, borderColor: 'orange', backgroundColor: 'gray', height: 'auto' }} >
                               {nome_da_funcao()}
                    </ScrollView>

                    :

                    <ScrollView horizontal={true} style={{ borderWidth: 0, borderColor: 'orange', backgroundColor: 'gray', height: 'auto' }} >
                    </ScrollView> */}


                <ScrollView horizontal={true} style={{ borderWidth: 0, borderColor: 'orange', backgroundColor: 'gray', height: 'auto' }} >
                    {nome_da_funcao()}
                </ScrollView>



            </View>
            {/*PAINEL DE ROLAGEM VERTICAL ACIMA */}

            {/* DAQUI PRA BAIXO EM CONSTRUÇÃO */}


            <View style={{ width: '100%', paddingTop: 5, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 20, color: 'white' }} > Defina a Sua Venda  </Text>
            </View>

            {/*VIEW DO SCROLL ABAIXO */}
            <ScrollView>
                <View style={{ width: '99%', height: 1000, borderWidth: 0, borderColor: 'yellow' }} >

                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} > Sexo  </Text>
                        <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                    </View>


                    <View style={{ width: '100%', height: 30, paddingTop: 0, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', width: 'auto', paddingTop: 5, borderWidth: 0, borderColor: 'red' }}>

                            <View style={{ width: '10%' }} />
                            <Icon style={{ fontSize: 18, color: corMacho ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 18, color: corMacho ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                onPress={() => {

                                    // setcorMacho(oldState => !oldState);
                                    setcorMacho(oldState => !oldState ? categorias_Objetos.Obj_Macho = "Machos" : categorias_Objetos.Obj_Macho = "");
                                    // alert(categorias_Objetos.Obj_Macho);


                                }}
                            > Machos</Text>

                            <View style={{ width: '30%' }} />

                            <Icon style={{ fontSize: 18, color: corFemea ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 18, color: corFemea ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                onPress={() => {
                                    // setcorFemea(oldState => !oldState) 
                                    setcorFemea(oldState => !oldState ? categorias_Objetos.Obj_Femea = "Fêmea" : categorias_Objetos.Obj_Femea = "");
                                }}
                            > Fêmeas </Text>
                            <View style={{ width: '10%' }} />

                        </View>

                    </View>

                    <View></View>

                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 19, color: 'white' }} > Idade Meses  </Text>
                        <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                    </View>


                    {/****************************************/}

                    <View style={{ width: '100%', height: 30, paddingTop: 0, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'white' }}>

                            <View style={{ flexDirection: 'row', width: 'auto', height: 30, paddingTop: 5, borderWidth: 0, borderColor: 'red' }}>

                                <View style={{ width: '0%' }} />
                                <Icon style={{ fontSize: 16, color: cor_0_12 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: cor_0_12 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_0_12(oldState => !oldState ? categorias_Objetos.Obj__0_12 = "0 à 12" : categorias_Objetos.Obj__0_12 = "") }}
                                > 0 à 12 </Text>
                                <View style={{ width: '4%' }} />
                                <Icon style={{ fontSize: 16, color: cor_12_24 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: cor_12_24 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_12_24(oldState => !oldState ? categorias_Objetos.Obj__12_24 = "12 à 24" : categorias_Objetos.Obj__12_24 = "") }}
                                > 12 à 24 </Text>
                                <View style={{ width: '4%' }} />
                                <Icon style={{ fontSize: 16, color: cor_24_36 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: cor_24_36 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_24_36(oldState => !oldState ? categorias_Objetos.Obj__24_36 = "24 à 36" : categorias_Objetos.Obj__24_36 = "") }}
                                > 24 à 36 </Text>
                                <View style={{ width: '4%' }} />
                                <Icon style={{ fontSize: 16, color: corAcima_36 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corAcima_36 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcorAcima_36(oldState => !oldState ? categorias_Objetos.Obj_Acima_36 = "Acima 36" : categorias_Objetos.Obj_Acima_36 = "") }}
                                >Acima 36</Text>

                            </View>

                        </View>

                    </View>

                    {/****************************************/}

                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} > Outras Eras  </Text>
                    </View>


                    <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'white' }}>

                        <View style={{ flexDirection: 'row', width: '100%', height: 40, paddingTop: 5, borderWidth: 0, borderColor: 'white' }}>

                            <View style={{ width: '5%' }} />
                            <TextInputMask style={{ width: '40%', backgroundColor: 'white', borderRadius: 8, textAlign: 'center' }} /*onChangeText={outrasErasAnteriorF}*/

                                type={'only-numbers'}
                                value={outrasErasAnterior}
                                maxLength={18}
                                onChangeText={value => {
                                    outrasErasAnteriorF(value);
                                    //value = value.replace('R$', '');
                                    value = value.replace('.', '');
                                    value = value.replace(',', '.');
                                    outrasErasAnteriorF(Number(value));

                                }}

                            />


                            <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white', width: '10%', textAlign: 'center' }} > à  </Text>


                            <TextInputMask style={{ width: '40%', backgroundColor: 'white', borderRadius: 8, textAlign: 'center' }} onChangeText={outrasErasPosteriorF}

                                type={'only-numbers'}
                                value={outrasErasPosterior}
                                maxLength={18}
                                onChangeText={value => {
                                    outrasErasPosteriorF(value);
                                    //value = value.replace('R$', '');
                                    value = value.replace('.', '');
                                    value = value.replace(',', '.');
                                    outrasErasPosteriorF(Number(value));

                                }}

                            />


                            <View style={{ width: '5%' }} />

                        </View>

                    </View>

                    {/****************************************/}

                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} >Tipo de Gado  </Text>
                        <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                    </View>






                    <View style={{ flexDirection: 'row', width: '100%', height: 220, borderEndWidth: 0, borderColor: 'darkgreen' }} >

                        {/* COLUNA 1 */}
                        <View style={{ width: '50%', height: 300, paddingLeft: 20, borderEndWidth: 0, borderColor: 'darkorange' }} >

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorBezerros(oldState => !oldState ? categorias_Objetos.Obj_Bezerros = "Bezerros" : categorias_Objetos.Obj_Bezerros = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corBezerros ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corBezerros ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bezerros</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorGarrotes(oldState => !oldState ? categorias_Objetos.Obj_Garrotes = "Garrotes" : categorias_Objetos.Obj_Garrotes = "") }}
                            >

                                <Icon style={{ fontSize: 16, color: corGarrotes ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corGarrotes ? "#25E7DB" : "white", width: 'auto' }} name='check'> Garrotes</Text>

                            </TouchableOpacity>



                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorTourunos(oldState => !oldState ? categorias_Objetos.Obj_Tourunos = "Tourunos" : categorias_Objetos.Obj_Tourunos = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corTourunos ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corTourunos ? "#25E7DB" : "white", width: 'auto' }} name='check'> Tourunos</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorBois(oldState => !oldState ? categorias_Objetos.Obj_Bois = "Bois" : categorias_Objetos.Obj_Bois = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corBois ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corBois ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bois</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorBoisGordos(oldState => !oldState ? categorias_Objetos.Obj_BoisGordos = "Bois Gordos" : categorias_Objetos.Obj_BoisGordos = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corBoisGordos ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corBoisGordos ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bois Gordos</Text>
                            </TouchableOpacity>


                        </View>



                        {/* COLUNA 2 */}
                        <View style={{ width: '50%', height: 300, paddingLeft: 15, borderEndWidth: 0, borderColor: 'darkorange' }} >



                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorBezerras(oldState => !oldState ? categorias_Objetos.Obj_Bezerras = "Bezerras" : categorias_Objetos.Obj_Bezerras = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corBezerras ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corBezerras ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bezerras</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorNovilhas(oldState => !oldState ? categorias_Objetos.Obj_Novilhas = "Novilhas" : categorias_Objetos.Obj_Novilhas = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corNovilhas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corNovilhas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Novilhas</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorVacasBoiadeiras(oldState => !oldState ? categorias_Objetos.Obj_VacasBoiadeiras = "Vacas Boiadeiras" : categorias_Objetos.Obj_VacasBoiadeiras = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corVacasBoiadeiras ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corVacasBoiadeiras ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Boiadeiras</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorVacas(oldState => !oldState ? categorias_Objetos.Obj_Vacas = "Vacas" : categorias_Objetos.Obj_Vacas = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corVacas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corVacas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorVacasGordas(oldState => !oldState ? categorias_Objetos.Obj_VacasGordas = "Vacas Gordas" : categorias_Objetos.Obj_VacasGordas = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corVacasGordas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corVacasGordas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Gordas</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorVacasPrenhas(oldState => !oldState ? categorias_Objetos.Obj_VacasPrenhas = "Vacas Prenhas" : categorias_Objetos.Obj_VacasPrenhas = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corVacasPrenhas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corVacasPrenhas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Prenhas</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                                onPress={() => { setcorVacasParidas(oldState => !oldState ? categorias_Objetos.Obj_VacasParidas = "Vacas Paridas" : categorias_Objetos.Obj_VacasParidas = "") }}
                            >
                                <Icon style={{ fontSize: 16, color: corVacasParidas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 16, color: corVacasParidas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Paridas</Text>
                            </TouchableOpacity>


                        </View>

                    </View>


                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} >Descriçoes Gerais</Text>
                    </View>

                    <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                        <TextInput style={{ width: '90%', backgroundColor: 'white', borderRadius: 8 }}
                            multiline={true} flexWrap='wrap' textAlign={'center'} size={15}
                            onChangeText={descricoesGeraisF}
                        />
                    </View>


                    <View style={{ height: 20 }} />


                    <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'green' }}>

                        <View style={{ flexDirection: 'row', width: 'auto', height: 60, paddingTop: 0, borderWidth: 0, borderColor: 'white' }}>



                            <View style={{ width: '40%' }}>
                                <Text style={{ textAlign: 'center', color: 'white' }} >Preço Sugerido</Text>
                                {/*
                                <TextInput style={{ width: '100%', height: 35, backgroundColor: 'white', borderRadius: 8 }} >
                                   onChangeText={precoSugeridoF}
                               </TextInput>
                                 */}


                                <TextInputMask style={{ width: '100%', height: 35, textAlign: 'center', backgroundColor: 'white', borderRadius: 8 }}

                                    type={'money'}
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: '',
                                        suffixUnit: ''
                                    }}

                                    value={precoSugerido = precoSugerido.replace(/[R$]/g, '')}
                                    maxLength={18}
                                    onChangeText={value => {
                                        precoSugeridoF(value);
                                        // precoSugeridoF("777,77");
                                    }}
                                />

                            </View>


                            <View style={{ width: '10%' }} />


                            <View style={{ width: '40%' }}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>Quant. Cabeças </Text>
                                {/*<TextInput style={{ width: '100%', height: 35, backgroundColor: 'white', borderRadius: 8 }} onChangeText={quantidadeCabecasOuPesosF} /> */}

                                <TextInputMask style={{ width: '100%', height: 35, textAlign: 'center', backgroundColor: 'white', borderRadius: 8 }}

                                    type={'only-numbers'}
                                    value={quantidadeCabecasOuPesos}
                                    maxLength={18}
                                    onChangeText={value => {
                                        quantidadeCabecasOuPesosF(value);
                                        //value = value.replace('R$', '');
                                        value = value.replace('.', '');
                                        value = value.replace(',', '.');
                                        quantidadeCabecasOuPesosF(Number(value));

                                    }}

                                />

                            </View>

                        </View>



                    </View>



                    <View style={{ height: 15 }} />

                    <View style={{ width: '100%', height: 'auto', alignItems: 'center', alignContent: 'center', borderWidth: 0, borderColor: 'green' }} >

                        {/*...touchProps   key={5} id={'EuMesmo'} */}
                        <TouchableHighlight style={{ width: '35%', height: 40, alignItems: 'center', paddingTop: 10, borderWidth: 1, borderRadius: 10, borderColor: 'white' }}

                            onPress={async () => {
                                // let SE_TEM_IMAGEM_OU_VIDEO = VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length + VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT.length;

                                if (
                                    !URL_FOTOS.toUpperCase().includes(".JPEG") &&
                                    !URL_FOTOS.toUpperCase().includes(".JPG") &&
                                    !URL_FOTOS.toUpperCase().includes(".PNG") &&
                                    !URL_VIDEOS.toUpperCase().includes(".MP4")
                                ) {
                                    alert("Falta Imagens ou Videos !");
                                } else {
                                    //  alert("VAI REALIZAR A POSTAGEM !  ");

                                    //CÓDIGO PRINCIPAL ABAIXO do ON-PRESS
                                    var MACHO = "";
                                    var FEMEA = "";
                                    var IDADE_DO_GADO = "";
                                    var TIPOS_DE_GADOS_MACHOS = "";
                                    var TIPOS_DE_GADOS_FEMEAS = "";

                                    var ARRAY_KEYS = Object.keys(categorias_Objetos)

                                    ARRAY_KEYS.map((empty, index) => {

                                        if (index == 0) {
                                            MACHO = JSON.stringify(categorias_Objetos[ARRAY_KEYS[0]]).replace(/['"]+/g, '')
                                        }
                                        if (index == 1) {
                                            FEMEA = JSON.stringify(categorias_Objetos[ARRAY_KEYS[1]]).replace(/['"]+/g, '')
                                        }
                                        if (index >= 2 && index <= 5) {
                                            IDADE_DO_GADO += JSON.stringify(categorias_Objetos[ARRAY_KEYS[index]]).replace(/['"]+/g, '')
                                        }
                                        if (index >= 6 && index <= 10) {
                                            TIPOS_DE_GADOS_MACHOS += JSON.stringify(categorias_Objetos[ARRAY_KEYS[index]]).replace(/['"]+/g, '')
                                        }
                                        if (index >= 11 && index <= 17) {
                                            TIPOS_DE_GADOS_FEMEAS += JSON.stringify(categorias_Objetos[ARRAY_KEYS[index]]).replace(/['"]+/g, '')
                                        }

                                    });

                                    // console.log(MACHO + "  " + FEMEA + "  " + IDADE_DO_GADO + "  " + TIPOS_DE_GADOS_MACHOS + "  " + TIPOS_DE_GADOS_FEMEAS);

                                    if (MACHO + FEMEA !== "") {

                                        //LIMPAR VARIAVEIS QUE SÓ TEM VALOR ZERO ABAIXO
                                        if (outrasErasAnterior == '0') { outrasErasAnterior = ""; }
                                        if (outrasErasPosterior == '0') { outrasErasPosterior = ""; }
                                        if (quantidadeCabecasOuPesos == '0') { quantidadeCabecasOuPesos = ""; }
                                        //LIMPAR VARIAVEIS QUE SÓ TEM VALOR ZERO ACIMA



                                        if (((IDADE_DO_GADO + outrasErasAnterior + outrasErasPosterior) !== "")) {

                                            if ((TIPOS_DE_GADOS_MACHOS) !== "" || (TIPOS_DE_GADOS_FEMEAS) !== "") {

                                                if (
                                                    MACHO !== "" && TIPOS_DE_GADOS_MACHOS !== "" && FEMEA !== "" && TIPOS_DE_GADOS_FEMEAS !== ""
                                                    || MACHO !== "" && TIPOS_DE_GADOS_MACHOS !== "" && FEMEA === "" && TIPOS_DE_GADOS_FEMEAS === ""
                                                    || MACHO === "" && TIPOS_DE_GADOS_MACHOS === "" && FEMEA !== "" && TIPOS_DE_GADOS_FEMEAS !== ""

                                                ) {

                                                    if (descricoesGerais != "") {

                                                        if (precoSugerido != "") {

                                                            if (quantidadeCabecasOuPesos != "") {




                                                                //TAREFAZ AQUI ABAIXO
                                                                await CONTANDO_QUANTIDADE_DE_POSTAGENS();
                                                                // console.log(VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS);
                                                                await PEGAR_NUMERO_DO_CELL();// GOBACK HERE

                                                                if (VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS > VARIAVEL_GLOBAL.PARAMETROS_QUANTIDADE_DE_POSTAGEMS) {
                                                                    VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "PUBLICACAO";
                                                                    VARIAVEL_GLOBAL.PUBLICACAO_EM_PROCESSO = "ENVIANDO";
                                                                    // venda_status_J = 'pendente';
                                                                    const produto = { IMAGENS: VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT, VIDEOS: VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT }
                                                                    navigation.navigate("Tabela_planos", { precoSugerido, quantidadeCabecasOuPesos, produto });
                                                                }//if
                                                                //TAREFAZ AQUI ACIMA




                                                            } else { alert("Quantidade de Cabeças Não Preenchido !") }

                                                        } else { alert("Preço Sugerido Não foi Preenchido !") }

                                                    } else { alert("Descrição Não foi Preenchido !") }

                                                } else { alert("Sexo do Gado Incompativo com os Tipos de Gado !") }

                                            } else { alert("Falta Escolher Tipo de Gado !") }

                                        } else { alert("Falta Escolher Idade do Gado !") }

                                    } else { alert("Falta Escolher o Sexo do Gado !") }
                                    //CÓDIGO PRINCIPAL ACIMA do ON-PRESS


                                }







                                /**********************************************************************************************/
                                //DESATIVAR ESSA LINHA DEPOIS ABAIXO é USADO SÓ PARA PRODUÇÃO ESSE TRECHO ABAIXO                             

                                // await CONTANDO_QUANTIDADE_DE_POSTAGENS();
                                // // console.log(VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS);
                                // await PEGAR_NUMERO_DO_CELL();// GOBACK HERE

                                // if (VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS > VARIAVEL_GLOBAL.PARAMETROS_QUANTIDADE_DE_POSTAGEMS) {
                                //     VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "PUBLICACAO";
                                //     // venda_status_J = 'pendente';
                                //     const produto = { IMAGENS: VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT, VIDEOS: VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT }
                                //     navigation.navigate("Tabela_planos", { precoSugerido, quantidadeCabecasOuPesos, produto });
                                // }//if

                                //DESATIVAR ESSA LINHA DEPOIS ACIMA é USADO SÓ PARA PRODUÇÃO ESSE TRECHO ACIMA    
                                /**********************************************************************************************/





                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >Postar</Text>
                        </TouchableHighlight>


                    </View>


                    {/******** ATIVAR SOMENTE PRA TESTE ABAIXO *********
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'yellow' }} >

                        <Image source={{ uri: arquivoDoCell }} style={{ width: '95%', height: '100%' }} />

                    </View>
                     /******** ATIVAR SOMENTE PRA TESTE ACIMA *********/}

                    {false ?
                        <View>
                            <Text style={{ textAlign: 'left', color: 'white' }}>LATITUDE : {userPosition.latitude} </Text>
                            <Text style={{ textAlign: 'left', color: 'white' }}>LONGITUDE: {userPosition.longitude} </Text>
                        </View>
                        :
                        []
                    }


                </View>





                {/*VIEW DO SCROLL ACIMA */}
            </ScrollView>



            {/*CAIXA DO  NUMERO DO CELULAR ABAIXO */}
            {caixaNumeroCelularVisivel && (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', borderWidth: 0, borderColor: 'yellow' }} >

                    <View style={{ width: '100%', height: 280, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A3E4A', borderRadius: 25, borderWidth: 1, borderColor: 'white' }}>

                        <View style={{ width: '70%' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}> Coloque o Nº do Celular </Text>

                            {/*
                            <TextInput placeholder="DD + Número" size={15} style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 8, fontSize: 25 }} textAlign={'center'}
                                onChangeText={MASCARA_PARA_O_COMPOENTES}
                            >{variavelTelefone}</TextInput>
                        */}

                            <TextInputMask placeholder="DD + Número" size={15} style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 8, fontSize: 25 }} textAlign={'center'}


                                type={'cel-phone'}
                                //   value={variavelTelefone = "(12) 34567-8901"}
                                value={variavelTelefone}
                                maxLength={18}
                                onChangeText={value => {
                                    setVariavelTelefone(value);
                                    /*
                                    //value = value.replace('R$', '');
                                    value = value.replace('.', '');
                                    value = value.replace(',', '.');
                                    setVariavelTelefone(Number(value));
                                    */
                                }}

                            />


                        </View>


                        <View style={{ height: 10 }} />
                        <View style={{ flexDirection: 'row', width: '100%', height: 'auto' }}  >

                            <View style={{ width: '12%' }} />

                            <TouchableHighlight style={{ width: '35%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                onPress={async () => {


                                    var regex = new RegExp(/\(\d{2}\)\s\d{5,5}-?\d{4}/g);//REGEX PARA TELEFONE CELULAR
                                    var VALIDAR_CELULAR = variavelTelefone.match(regex);

                                    if (VALIDAR_CELULAR !== null) {


                                        // var telefone = { NUMERO_CELL_J: variavelTelefone }

                                        /*********************************************************************************************************************/
                                        //alert( JSON.stringify( telefone.NUMERO_CELL_J ));
                                        // telefone = JSON.stringify(telefone.NUMERO_CELL_J);
                                        var retorno = await VERIFICAR_SE_CELULAR_JA_ESTA_CADASTRADO_NO_BANCO_DE_DADOS(variavelTelefone)
                                        // //[{"numero_telefone_J":"(12) 34567-8901"}]

                                        var DADO_RETORNO_STRING = JSON.stringify(retorno.data);
                                        if (DADO_RETORNO_STRING != "[]" && VARIAVEL_GLOBAL.LIBERAR_GRAVACAO_TELEFONE_SEM_NUMERO == false) {

                                            alert("Já Existe um Usuário Cadastrado com Esse numero ! ");

                                        } else {

                                            var telefone = { NUMERO_CELL_J: variavelTelefone }
                                            await GRAVAR_NUMERO_DO_CELL(telefone, false);
                                            await ARMAZENAR_POSTAGEM_PRIMEIRA_ETAPA();
                                            setCaixaNumeroCelularVisivel(false);
                                            VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;

                                        }//else INTERNO	
                                        /*********************************************************************************************************************/

                                        // var telefone = { NUMERO_CELL_J: variavelTelefone }
                                        // GRAVAR_NUMERO_DO_CELL(telefone);
                                        // setCaixaNumeroCelularVisivel(false);
                                        // ARMAZENAR_POSTAGEM_PRIMEIRA_ETAPA();
                                    } else { alert("Formato Inválido de Celular !"); }


                                }}
                            >
                                <Text style={{ fontSize: 15, color: '#fff' }} >OK</Text>
                            </TouchableHighlight>
                            <View style={{ width: '6%' }} />
                            <TouchableHighlight style={{ width: '35%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                onPress={() => { setCaixaNumeroCelularVisivel(false) }}
                            >
                                <Text style={{ fontSize: 15, color: '#fff' }} >Cancelar</Text>
                            </TouchableHighlight>

                            <View style={{ width: '12%' }} />


                        </View>


                        {/* Recuperação de Uso do Aplicativo pelo Uso do Número do Telefone */}

                        <View style={{ height: '5%' }} />
                        <View style={{ width: '100%', alignItems: 'center' }} >

                            <Text style={{ fontSize: 14, color: '#25E7DB' }}>Já é Cadastrado ! Recuperar Acesso</Text>
                            <View style={{ height: '5%' }} />


                            <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', borderWidth: 0, borderColor: 'red' }}>

                                {ocultarMostrarClique && (
                                    <View style={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
                                        <TouchableHighlight style={{ width: '25%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                            onPress={() => {
                                                //alert("MOSTRAR E OCULTAR COMPONENTE");
                                                setOcultarMostrarClique(oldState => !oldState);
                                                setOcultarMostrarEnvioCodigo(oldState => !oldState);
                                            }}
                                        >
                                            <Text style={{ fontSize: 15, color: '#fff' }}>Click Aqui</Text>
                                        </TouchableHighlight>
                                    </View>
                                )}


                                {ocultarMostrarEnvioCodigo && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 'auto' }}  >

                                        {ocultarMostrarCaixaTexto && (

                                            <TextInputMask size={10} placeholder="CÓDIGO SEGURANÇA" textAlign={'center'}

                                                style={{ width: '42%', height: 45, alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderRadius: 15 }}

                                                type={'only-numbers'}
                                                value={codigoDeSeguranca}//1567
                                                maxLength={5}
                                                onChangeText={value => {
                                                    setCodigoDeSeguranca(value);
                                                }}

                                            />
                                        )}

                                        <View style={{ width: '3%' }} />

                                        <View style={{ width: '50%', justifyContent: 'center' }} >
                                            <TouchableHighlight style={{ width: '100%', height: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                                onPress={async () => {
                                                    //alert("RECUPERAR SENHA");


                                                    //var GerarEnviarCodigo = "Gerar Código";

                                                    if (gerarEnviarCodigo.includes("Gerar Código")) {

                                                        // GerarEnviarCodigo = "Enviar Código";
                                                        setGerarEnviarCodigo("Enviar Código Segurança");
                                                        setOcultarMostrarCaixaTexto(true);
                                                        VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                        // alert("Foi Enviado um Código de Verificação para " + variavelTelefone);



                                                        //ENVIANDO TELEFONE PARA GERAR CÓDIGO DE DESBLOQUEIO ABAIXO
                                                        try { //alert(IP_DO_SERVIDOR);
                                                            //response = await Axios.get('http://192.168.0.102:3000/gerar_codigo_de_desbloqueio', {
                                                            await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + "gerar_codigo_de_desbloqueio", {
                                                                params: { numero_telefone: variavelTelefone }
                                                            });


                                                        } catch (exception) { alert(exception.message); return 0 } finally { alert("Foi Enviado um Código de Verificação para " + variavelTelefone); }
                                                        //ENVIANDO TELEFONE PARA GERAR CÓDIGO DE DESBLOQUEIO ACIMA




                                                    } else if (gerarEnviarCodigo.includes("Enviar Código")) {



                                                        var resposta_zero_ou_menos_um;


                                                        //ENVIANDO O CÓDIGO DE DESBLOQUEIO RECEBIDO POR SMS ABAIXO
                                                        try { //alert(IP_DO_SERVIDOR);
                                                            //response = await Axios.get('http://192.168.0.102:3000/gerar_codigo_de_desbloqueio', {
                                                            resposta_zero_ou_menos_um = await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + "recebendo_e_validando_codigo_de_desbloqueio", {
                                                                params: {
                                                                    numero_telefone: variavelTelefone,
                                                                    codigo_de_desbloqueio: codigoDeSeguranca
                                                                }
                                                            });

                                                            //  alert( resposta_zero_ou_menos_um.data.condicao );
                                                            resposta_zero_ou_menos_um = resposta_zero_ou_menos_um.data.condicao
                                                            //  alert( resposta_zero_ou_menos_um );

                                                        } catch (exception) { alert(exception.message)/**/ }
                                                        //ENVIANDO O CÓDIGO DE DESBLOQUEIO RECEBIDO POR SMS ACIMA


                                                        if (resposta_zero_ou_menos_um > -1) {


                                                            // gerarEnviarCodigo = "Enviar Código";
                                                            setGerarEnviarCodigo("Gerar Código Recuperação ");

                                                            setOcultarMostrarClique(oldState => !oldState);
                                                            setOcultarMostrarEnvioCodigo(oldState => !oldState);

                                                            alert("Enviando Código de Verificação...");
                                                            //COMUNICANDO COM O SERVIDOR TENTANDO LIBERAR O USO DO APLICATIVO

                                                            setOcultarMostrarCaixaTexto(false);

                                                            //DEPOIS DA LIBERAÇÃO DO USO DO APLICATIVO FAZER ISSO ABAIXO
                                                            //IMPLEMENTAR GRAVAÇÃO DO TELEFONE NO CELULAR PARA USAR O APLICATIVO
                                                            // alert(variavelTelefone);
                                                            var telefone = { NUMERO_CELL_J: variavelTelefone.replace(/\"/g, '') }
                                                            await GRAVAR_NUMERO_DO_CELL(telefone, true);
                                                            var TELA_QUE_CHAMOU = props.tela_chamada;
                                                            if (TELA_QUE_CHAMOU == "tela_proposta") {
                                                                await props.OCULTAR_TELA_TELEFONE_PROPOSTA_remoto();
                                                                VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                                navigation.goBack(null);
                                                            } else if (TELA_QUE_CHAMOU == "tela_DetalhesProdutos") {
                                                                await props.OCULTAR_TELA_TELEFONE_FUNCAO_REMOTA();
                                                                VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                            }
                                                            //DEPOIS DA LIBERAÇÃO DO USO DO APLICATIVO FAZER ISSO ACIMA


                                                        } else {

                                                            alert("CÓDIGO DE SEGURANÇA ESTÁ ERRADO !, TENTE NOVAMENTE ! ")
                                                        }

                                                    }

                                                }}
                                            >
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 13, color: '#fff', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{gerarEnviarCodigo}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )}


                            </View>

                        </View>

                        {/* Recuperação de Uso do Aplicativo pelo Uso do Número do Telefone */}


                    </View>




                </View>
            )}


            {/*CAIXA DO  NUMERO DO CELULAR ACIMA */}



            {/* </Animated.View> */}

        </SafeAreaView>
    )




    async function PEGAR_NUMERO_DO_CELL() { /*REMOVER DEPOIS =>*/  /*variavelTelefone = '(67)-9-9324-4226'; setVariavelTelefone(variavelTelefone); */
        //Recuperando dados da POSTAGEM
        const data = await AsyncStorage.getItem('NUMERO_CELL');

        /**/
        try {

            //alert(data);
            var obj_JSON = JSON.parse(data);
            //alert(obj_JSON.URL_VIDEOS_DADOS_J);
            //var DADO_CONVERTIDOS_PRA_ARRAY = pegar_somente_valores_de_JSON(obj_JSON);
            //alert(DADO_CONVERTIDOS_PRA_ARRAY);
            variavelTelefone = Object.values(obj_JSON);

            //alert("AQUI 789 "+variavelTelefone)

            //alert("JÁ TEM NUMERO GRAVADO, VAI GRAVAR POSTAGEM KROCK")
            ARMAZENAR_POSTAGEM_PRIMEIRA_ETAPA();

        } catch (error) {
            //alert('NÃO TEM NUMERO GRAVADOS, VAI CHAMAR CAIXA DE POR CELULAR'); 
            setCaixaNumeroCelularVisivel(true);

        }
    }








    async function GRAVAR_NUMERO_DO_CELL(data_object, STORAGE_SOMENTE) {


        // alert("ESTÁ EXECUTANDO");


        if (STORAGE_SOMENTE == false) {

            /////////////////////////////////////////////////////////////////      
            var DEU_ERRO_SIM_OU_NAO = "NAO";

            try {

                Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'insert_cadastro_pessoal', {

                    params:
                    {
                        // data: data_completa_ingles(),
                        nome_completo: "",
                        cpf: "",
                        numero_telefone_J: data_object.NUMERO_CELL_J,
                        email: ""
                    }

                })
                // .catch(err => {
                //     // alert("DEU ERRO => " + err)//FUNCIONA QUANDO DÁ ERRO NO Axios
                //     alert("FALHA NA GRAVAÇÃO DO TELEFONE");
                //     DEU_ERRO_SIM_OU_NAO = "SIM";
                // });

                //ARMAZENANDO NO STORAGE DE DADOS ABAIXO
                await AsyncStorage.setItem('NUMERO_CELL', JSON.stringify(data_object))
                    .then(res => {
                        VARIAVEL_GLOBAL.TELEFONE = data_object.NUMERO_CELL_J;
                        VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                        alert("TELEFONE GRAVADO = " + VARIAVEL_GLOBAL.TELEFONE);
                    });


            } catch (erro) {

                console.log("#8654rfde erro " + erro);
                alert("#8654rfde erro " + erro);

            }

            /////////////////////////////////////////////////////////////////  
        }//IF


        if (STORAGE_SOMENTE == true) {
            //ARMAZENANDO NO STORAGE DE DADOS ABAIXO
            await AsyncStorage.setItem('NUMERO_CELL', JSON.stringify(data_object))
                .then(res => {
                    VARIAVEL_GLOBAL.TELEFONE = data_object.NUMERO_CELL_J;
                    alert("TELEFONE GRAVADO somente STORAGE = " + VARIAVEL_GLOBAL.TELEFONE);
                });
        }



    }
    ///////////////////////////////











    async function ARMAZENAR_POSTAGEM_PRIMEIRA_ETAPA() {


        if (VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS > VARIAVEL_GLOBAL.PARAMETROS_QUANTIDADE_DE_POSTAGEMS) {

            // venda_status_J = 'pendente';
            venda_status = 'pendente';

        }


        //variavelTelefone = variavelTelefone.replace("[", "").replace("]", "");

        //returns a random integer from 0 to 9999  in line  below
        var random = Math.floor(Math.random() * 10000);

        //Agrupar URLs das Imagens e Videos separando pelo caracter |   
        var URL_IMAGEN_DADOS = "";
        var URL_VIDEOS_DADOS = "";
        // for (var i = 0; i < ARRY_URL_IMAGENS.length; i++) {
        for (var i = 0; i < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length; i++) {

            URL_IMAGEN_DADOS += VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i] + "|";


        }//FOR

        for (var i = 0; i < ARRY_URL_VIDEOS.length; i++) {

            URL_VIDEOS_DADOS += ARRY_URL_VIDEOS[i] + "|";

        }//FOR

        // alert(URL_IMAGEN_DADOS);
        variavelTelefone = String(variavelTelefone);

        var numero_telefone_J = variavelTelefone;
        var id_J = data_hora_e_segundo_sem_separador() + random + "   ";
        var data_J = data_completa();

        var LATITUDE_J = userPosition.latitude;
        var LONGITUDE_J = userPosition.longitude;

        var URL_IMAGEN_DADOS_J = URL_IMAGEN_DADOS;
        var URL_VIDEOS_DADOS_J = URL_VIDEOS_DADOS;

        var corMacho_J = categorias_Objetos.Obj_Macho;
        var corFemea_J = categorias_Objetos.Obj_Femea;

        var cor_0_12_J = categorias_Objetos.Obj__0_12;
        var cor_12_24_J = categorias_Objetos.Obj__12_24;
        var cor_24_36_J = categorias_Objetos.Obj__24_36;
        var corAcima_36_J = categorias_Objetos.Obj_Acima_36;



        var outrasErasAnterior_J = outrasErasAnterior;
        var outrasErasPosterior_J = outrasErasPosterior;



        var corBezerros_J = categorias_Objetos.Obj_Bezerros;
        var corGarrotes_J = categorias_Objetos.Obj_Garrotes;
        var corTourunos_J = categorias_Objetos.Obj_Tourunos;
        var corBois_J = categorias_Objetos.Obj_Bois;
        var corBoisGordos_J = categorias_Objetos.Obj_BoisGordos;

        var corBezerras_J = categorias_Objetos.Obj_Bezerras;
        var corNovilhas_J = categorias_Objetos.Obj_Novilhas;
        var corVacasBoiadeiras_J = categorias_Objetos.Obj_VacasBoiadeiras;
        var corVacas_J = categorias_Objetos.Obj_Vacas;
        var corVacasGordas_J = categorias_Objetos.Obj_VacasGordas;
        var corVacasPrenhas_J = categorias_Objetos.Obj_VacasPrenhas;
        var corVacasParidas_J = categorias_Objetos.Obj_VacasParidas;



        var descricoesGerais_J = descricoesGerais;
        var precoSugerido_J = precoSugerido;
        var quantidadeCabecasOuPesos_J = quantidadeCabecasOuPesos;

        var aprovado_postagem_J = aprovado_postagem;
        var favorito_J = favorito;
        var venda_status_J = venda_status;
        var comprador_J = comprador;
        var ta_online_J = ta_online;

        var tempoPostagem_J = VARIAVEL_GLOBAL.tempoPostagem_G;

        // alert(dadosPostagem);

        // id_J = id_J.trim();
        id_J = id_J.replace(/\s+/g, "");

        VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE =
        {
            numero_telefone_J: numero_telefone_J,
            id_J: id_J,
            data_A: data_J,
            LATITUDE_A: LATITUDE_J,
            LONGITUDE_A: LONGITUDE_J,
            URL_IMAGEN_DADOS_J: URL_IMAGEN_DADOS_J,
            URL_VIDEOS_DADOS_J: URL_VIDEOS_DADOS_J,
            corMacho_A: corMacho_J,
            corFemea_A: corFemea_J,
            cor_0_12_A: cor_0_12_J,
            cor_12_24_A: cor_12_24_J,
            cor_24_36_A: cor_24_36_J,
            corAcima_36_A: corAcima_36_J,
            outrasErasAnterior_A: outrasErasAnterior_J,
            outrasErasPosterior_A: outrasErasPosterior_J,
            corBezerros_A: corBezerros_J,
            corGarrotes_A: corGarrotes_J,
            corTourunos_A: corTourunos_J,
            corBois_A: corBois_J,
            corBoisGordos_A: corBoisGordos_J,
            corBezerras_A: corBezerras_J,
            corNovilhas_A: corNovilhas_J,
            corVacasBoiadeiras_A: corVacasBoiadeiras_J,
            corVacas_A: corVacas_J,
            corVacasGordas_A: corVacasGordas_J,
            corVacasPrenhas_A: corVacasPrenhas_J,
            corVacasParidas_A: corVacasParidas_J,
            descricoesGerais_A: descricoesGerais_J,
            precoSugerido_A: precoSugerido_J,
            quantidadeCabecasOuPesos_A: quantidadeCabecasOuPesos_J,
            aprovado_postagem_A: aprovado_postagem_J,
            favorito_A: favorito_J,
            venda_status_A: venda_status_J,
            comprador_A: comprador_J,
            ta_online_A: ta_online_J,
            tempoPostagem_A: tempoPostagem_J
        }

        //vraaauuu
        // alert( JSON.stringify( VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE )  ); return 0;

        //Preencher o OBJETO JSON caso não esteja VAZIO ABAIXO
        dadosPostagem = await MOSTRAR_POSTAGENS();
        //alert("AQUI"+dadosPostagem);
        //Preencher o OBJETO JSON caso não esteja VAZIO ACIMA

        //dadosPostagem = dadosPostagem.replace("[", "").replace("]", "");

        //Convertendo pra Tipo JSON novamente
        dadosPostagem = await JSON.parse(dadosPostagem);


        //alert(dadosPostagem);

        // console.log("#1=>" + id_J);

        if (dadosPostagem != null) {

            //alert("JÁ TINHA DADOS GRAVADO ANTES !");

            //alert(dadosPostagem);

            /**/
            dadosPostagem.push({
                numero_telefone_J,
                id_J,
                data_J,
                LATITUDE_J,
                LONGITUDE_J,
                URL_IMAGEN_DADOS_J,
                URL_VIDEOS_DADOS_J,
                corMacho_J,
                corFemea_J,
                cor_0_12_J,
                cor_12_24_J,
                cor_24_36_J,
                corAcima_36_J,
                outrasErasAnterior_J,
                outrasErasPosterior_J,
                corBezerros_J,
                corGarrotes_J,
                corTourunos_J,
                corBois_J,
                corBoisGordos_J,
                corBezerras_J,
                corNovilhas_J,
                corVacasBoiadeiras_J,
                corVacas_J,
                corVacasGordas_J,
                corVacasPrenhas_J,
                corVacasParidas_J,
                descricoesGerais_J,
                precoSugerido_J,
                quantidadeCabecasOuPesos_J,
                aprovado_postagem_J,
                favorito_J,
                venda_status_J,
                comprador_J,
                ta_online_J,
                tempoPostagem_J
            });

        } else if (dadosPostagem === null) {

            //alert("VAI GRAVAR PELA PRIMEIRA VEZ");

            dadosPostagem = [{

                /*numero_telefone_J: "191",*/
                numero_telefone_J: variavelTelefone,
                id_J: data_hora_e_segundo_sem_separador() + random + "   ",
                data_J: data_completa(),

                LATITUDE_J: userPosition.latitude,
                LONGITUDE_J: userPosition.longitude,

                URL_IMAGEN_DADOS_J: URL_IMAGEN_DADOS,
                URL_VIDEOS_DADOS_J: URL_VIDEOS_DADOS,

                corMacho_J: categorias_Objetos.Obj_Macho,
                corFemea_J: categorias_Objetos.Obj_Femea,

                cor_0_12_J: categorias_Objetos.Obj__0_12,
                cor_12_24_J: categorias_Objetos.Obj__12_24,
                cor_24_36_J: categorias_Objetos.Obj__24_36,
                corAcima_36_J: categorias_Objetos.Obj_Acima_36,

                outrasErasAnterior_J: outrasErasAnterior,
                outrasErasPosterior_J: outrasErasPosterior,

                corBezerros_J: categorias_Objetos.Obj_Bezerros,
                corGarrotes_J: categorias_Objetos.Obj_Garrotes,
                corTourunos_J: categorias_Objetos.Obj_Tourunos,
                corBois_J: categorias_Objetos.Obj_Bois,
                corBoisGordos_J: categorias_Objetos.Obj_BoisGordos,

                corBezerras_J: categorias_Objetos.Obj_Bezerras,
                corNovilhas_J: categorias_Objetos.Obj_Novilhas,
                corVacasBoiadeiras_J: categorias_Objetos.Obj_VacasBoiadeiras,
                corVacas_J: categorias_Objetos.Obj_Vacas,
                corVacasGordas_J: categorias_Objetos.Obj_VacasGordas,
                corVacasPrenhas_J: categorias_Objetos.Obj_VacasPrenhas,
                corVacasParidas_J: categorias_Objetos.Obj_VacasParidas,


                descricoesGerais_J: descricoesGerais,
                precoSugerido_J: precoSugerido,
                quantidadeCabecasOuPesos_J: quantidadeCabecasOuPesos,

                aprovado_postagem_J: aprovado_postagem,
                favorito_J: favorito,
                venda_status_J: venda_status,
                comprador_J: comprador,
                ta_online_J: ta_online,

                tempoPostagem_J: VARIAVEL_GLOBAL.tempoPostagem_G
            }];



        }

        /*
        var DADO_CONVERTIDOS_PRA_ARRAY = pegar_somente_valores_de_JSON(dadosPostagem);
        var JSONNN = converter_Array_para_JSON(DADO_CONVERTIDOS_PRA_ARRAY);
        alert(DADO_CONVERTIDOS_PRA_ARRAY);
        */

        // console.log("#2=>" + id_J);

        ARMAZENAR_POSTAGEM_SEGUNTA_ETAPA(dadosPostagem);



        /*
        ///////////////////////////////////////////////////
        var nome_dos_campos_do_JSON    = pegar_somente_nome_dos_campos_de_JSON(dadosPostagem);
        var valores_do_arquivo_do_JSON = pegar_somente_valores_de_JSON(dadosPostagem);
        console.log(nome_dos_campos_do_JSON+"  /n/n/n  "+valores_do_arquivo_do_JSON);
        //////////////////////////////////////////////////
        */

    }







    async function ARMAZENAR_POSTAGEM_SEGUNTA_ETAPA(data_object) {

        try { //alert(Object.values(data_object));

            //ARMAZENANDO NO BANCO DE DADOS ABAIXO
            await AsyncStorage.setItem('POSTAGEM', JSON.stringify(data_object));
            //await AsyncStorage.setItem('POSTAGEM', toString(DADOS));
            // VARIAVEL_GLOBAL.BUSCAR_POSTAGENS = "SIM";



            // var JSON_POSTAGEM_STRING = JSON.stringify(data_object);
            // // return alert(JSON_POSTAGEM_STRING);
            // // return alert(data_object[0]);

            // await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'insert_postagens', {
            //     //{postagem:'{"cidade":"Nova Três"}'}
            //     params:
            //     {
            //         postagem: JSON_POSTAGEM_STRING
            //     }
            // });


            //TENTANDO IMPLEMENTAR ESSA LINHA 
            // VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  =  JSON.stringify(data_object);
            // VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  = "";
            // VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE  =  data_object;


            // alert(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE); return 0;

            if (VARIAVEL_GLOBAL.QUANTIDADE_DE_POSTAGEMS > VARIAVEL_GLOBAL.PARAMETROS_QUANTIDADE_DE_POSTAGEMS) {

                // alert("VAI CHAMAR FORMA DE PAGAMENTO");//
                // console.log("VAI CHAMAR FORMA DE PAGAMENTO");
                try {
                    await INSERINDO_NO_BANCO_DE_DADOS_POSTAGENS_OFF_LINE_2();
                } catch (error) { console.log(error); }


            } else {

                alert("GRAVADO COM SUCESSO !");//
                INSERINDO_NO_BANCO_DE_DADOS_POSTAGENS_OFF_LINE_2();

            }

        }
        catch (exception) {

            alert("FALHA NA GRAVAÇÃO !");
            //alert(exception);

        }
    }







    function MASCARA_PARA_O_COMPOENTES(parametro) {
        //alert(parametro)
        var mascara = FORMATAR_AO_DIGITAR_USANDO_MASCARA(parametro, '(00)-0-0000-0000');
        setVariavelTelefone(mascara);

    }



    /*
        function FORMATAR_P_MOEDA_AO_DIGITAR(parametro) {
    
            var mascara = FORMATAR_PARA_MOEDA_DEFINITIVO_AO_DIGITAR(parametro);
            precoSugeridoF(mascara);
    
        }
        */





    async function MOSTRAR_POSTAGENS() {

        var data;
        var RETORNO;
        /**/
        //try {
        //Recuperando dados da POSTAGEM
        data = await AsyncStorage.getItem('POSTAGEM');
        RETORNO = data;
        //} catch (error) { RETORNO = null; alert("NÃO TEM DADOS GRAVADO !") }

        return RETORNO;

    }







}//DA CLASSE PRINCIPAL


































//  <Image source={{ uri: arquivoDoCell }} style={{ width: '95%', height: 'auto' }} />
//  content://com.android.providers.media.documents/document/image%3A87258 image/jpeg 20200824_062428.jpg

// file:///data/user/0/com.mobiprojeto/cache/Camera/9587d1d7-fa88-4b5a-ad3a-4ad0232f4d04.jpg

/////////////////////////////////////
/////////////////////////////////////

///////////////////////////////////// async   await  |  type: [DocumentPicker.types.images],
/////////////////////////////////////


/*
async function ABRIR_ARQUIVO() {
    //alert('ABRINDO ARQUIVO');
    var CAMINHO = "";

    var FILLE = 'file:///';
    // Pick a single file
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images, DocumentPicker.types.video],
        });
        console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size);
        CAMINHO = res.uri;

        //CAMINHO = CAMINHO.replace('content://','file:///');
        // CAMINHO = CAMINHO.replace(' ','');
        // CAMINHO = CAMINHO+'.jpg';

        alert(CAMINHO);


    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }

    //alert(CAMINHO);
    //return CAMINHO;

}
*/



/*
<Checkbox
style={{ backgroundColor: checked ? "black" : "grey" }}
     onCheck={(event) => setChecked(event.target.checked)}
/>
*/






//CRIANDO ESTILOS ABAIXO NÃO RECOMENDADO MAS COLOCADO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {

        backgroundColor: 'rgba(200,200,2,0)',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 15,
        margin: 5,
        borderRadius: 10,

    },

    fontIcone: {

        fontSize: 24,
        color: '#fff',

    },

    fontBotao: {

        fontSize: 19,
        color: '#fff',

    },

});

