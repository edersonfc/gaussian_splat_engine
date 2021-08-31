import React, { Component, useCallback, useEffect, useRef, useState, useContext } from 'react'
import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, LogBox } from 'react-native'

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';


//import Range from '@ptomasroos/react-native-multi-slider'

// import FILTRO_CATEGORIA from './Categorias'

import FILTRO_PESQUISA_CATEGORIA from './FILTRO_PESQUISA_CATEGORIAS'

import RangeSlider from 'rn-range-slider';

import { useNavigation } from "@react-navigation/native";

import ProdutosEtiquetas from './ProdutosEtiquetas'


//IMPLEMENTAÇÃO DE 02/12/2020 ABAIXO

import AsyncStorage from '@react-native-async-storage/async-storage';

//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

import DatePicker from 'react-native-datepicker';

// import DatePicker from 'react-native-datepicker-modal'

// import DatePicker from '@react-native-community/datetimepicker'

// import ptBR from 'date-fns/locale/pt-BR';

import { EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES, EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES, data_completa_ingles } from '../components/CALCULO_E_FORMATACAO/FORMATACAO';

import GlobalContext from '../context/UsersContext';

var DADOS_COMPRA_VENDA = "";

var DADOS_TELEFONE = "";


var CHAMAR_ALTERNANCIA_BOOLEAN = false;

//IMPLEMENTAÇÃO DE 02/12/2020 ACIMA




export default function ComprasVendas(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // var IP_DO_SERVIDOR = "http://192.168.0.102:3000/";
    var IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;

    var hoje = new Date();
    const [dataInicial, setDataInicial] = useState("01-01-" + hoje.getFullYear());
    const [dataFinal, setDataFinal] = useState(EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(data_completa_ingles()));



    /* */
    async function pegar_ip() {
        IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;
        // IP_DO_SERVIDOR = await AsyncStorage.getItem('IP_CONEXAO');
        //alert(IP_DO_SERVIDOR);
    }

    useEffect(() => {

        pegar_ip();

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    }, []);



    var { ComprasVendas } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params

    //alert(ComprasVendas)
    //console.log(props.route.params)

    var { LATITUDE_USUARIO } = props.route.params;
    var { LONGITUDE_USUARIO } = props.route.params;

    var { TELA_DE_ORIGEM_E_SITUACAO } = props.route.params;
    //alert(TELA_DE_ORIGEM_E_SITUACAO)

    //alert(LATITUDE_USUARIO+"   "+LATITUDE_USUARIO);



    var numero_telefone_comprador = "";

    var produto = ''

    const [alternaComprasVendas, setAlternaComprasVendas] = useState('');
    const [comprasOuVendas, setComprasOuVendas] = useState('');

    const [comprasOuVendasFlag, setComprasOuVendasFlag] = useState(ComprasVendas);
    const [flagAlternar, setFlagAlternar] = useState(true);



    const [exibeFiltroCategoria, setExibeFiltroCategoria] = useState(false)

    const [exibe_botao_refresh, setExibe_botao_refresh] = useState(true)

    const [LARGURA_PORCENTAGEN_1, setLARGURA_PORCENTAGEN_1] = useState('28%')
    const [LARGURA_PORCENTAGEN_2, setLARGURA_PORCENTAGEN_2] = useState('22%')




    //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ABAIXO 
    useEffect(() => {



        if (CHAMAR_ALTERNANCIA_BOOLEAN === true) {

            // if (ComprasVendas == 'Vendas') {
            if (comprasOuVendasFlag.toString() === 'Vendas') {

                setComprasOuVendas('Vendas')
                setAlternaComprasVendas('Compras')
                setExibe_botao_refresh(true)
                setLARGURA_PORCENTAGEN_1("28%")
                setLARGURA_PORCENTAGEN_2("22%")

                setComprasOuVendasFlag('Compras');


                // } else if (ComprasVendas == 'Compras') {
            } else if (comprasOuVendasFlag.toString() === 'Compras') {

                setComprasOuVendas('Compras')
                setAlternaComprasVendas('Vendas')
                setExibe_botao_refresh(true)
                setLARGURA_PORCENTAGEN_1("28%")
                setLARGURA_PORCENTAGEN_2("22%")

                setComprasOuVendasFlag('Vendas');


                // } else if (ComprasVendas == 'Postagens') {
            } else if (comprasOuVendasFlag.toString() === 'Postagens') {

                setComprasOuVendas('Postagens')
                setExibe_botao_refresh(false)
                setLARGURA_PORCENTAGEN_1("30%")
                setLARGURA_PORCENTAGEN_2("20%")

            }

            CHAMAR_ALTERNANCIA_BOOLEAN === false;



        }//if (CHAMAR_ALTERNANCIA_BOOLEAN  == true) {

        ADICIONAR_PRODUTOS_por_ARRAY(true);

    }, [flagAlternar]);
    //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ACIMA








    useEffect(() => {


        ADICIONAR_PRODUTOS_por_ARRAY(true);

        // if (ComprasVendas == 'Vendas') {
        if (comprasOuVendasFlag.toString() === 'Vendas') {

            setComprasOuVendas('Vendas')
            setAlternaComprasVendas('Compras')

        } else if (comprasOuVendasFlag.toString() === 'Compras') {

            setComprasOuVendas('Compras')
            setAlternaComprasVendas('Vendas')

        } else if (comprasOuVendasFlag.toString() === 'Postagens') {

            setComprasOuVendas('Postagens')
            setExibe_botao_refresh(false)
            setLARGURA_PORCENTAGEN_1("30%")
            setLARGURA_PORCENTAGEN_2("20%")

        }


        // }, [comprasOuVendasFlag]);
    }, []);






    useEffect(() => {

        ADICIONAR_PRODUTOS_por_ARRAY(true);
        // alert("TÁ DISPARANDOY")
        VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = false;

    }, [dataInicial, dataFinal, VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ ]);






    const navigation = useNavigation();

    const [valueStart, setValueStart] = useState(0)
    const [muda_cor_checkado_macho, setMuda_cor_checkado_macho] = useState(false)


    //IMPLEMENTAÇÃO DE 02/12/2020 ABAIXO


    const [produtosS, setProdutos] = useState();
    var [ARRAY_PRIMEIRAS_URL_IMAGENS_2, setARRAY_PRIMEIRAS_URL_IMAGENS_2] = useState([]);
    var [ARRAY_PRIMEIRAS_URL_VIDEOS_2, setARRAY_PRIMEIRAS_URL_VIDEOSS_2] = useState([]);


    const [numero_de_cabecas, setNumero_de_cabecas] = useState(0);





    //NUMERO DE CELULAR PEGO NO INICIO DO CARREGAMENTO DA TELA ABAIXO
    async function PEGAR_NUMERO_DO_CELL_NO_CARREGAMENTO() {
        //Recuperando dados da POSTAGEM
        // const dados = numero_telefone_comprador_ou_vendedor = await AsyncStorage.getItem('NUMERO_CELL');
        // const dados = await AsyncStorage.getItem('NUMERO_CELL');

        // const dados =  {"NUMERO_CELL_J":"(12) 34567-8901"}"
        // "{\"NUMERO_CELL_J\":\"(12) 34567-8901\"}"
        const dados = { NUMERO_CELL_J: VARIAVEL_GLOBAL.TELEFONE[0] }
        //  console.log(JSON.stringify(dados));
        // alert(JSON.stringify(dados));

        try {
            //alert(data);
            var obj_JSON = JSON.parse(dados);
            numero_telefone_comprador = Object.values(obj_JSON);
            //alert(numero_telefone_comprador);
            DADOS_TELEFONE = numero_telefone_comprador;

            // PESQUISAR_MINHAS_COMPRAS_E_VENDAS();
            ADICIONAR_PRODUTOS_por_ARRAY(true);

        } catch (error) {
            //alert('NÃO TEM NUMERO GRAVADOS, VAI CHAMAR CAIXA DE POR CELULAR'); 
            //setCaixaNumeroCelularVisivel(true);
        }


    }
    //NUMERO DE CELULAR PEGO NO INICIO DO CARREGAMENTO DA TELA ACIMA



    function PESQUISAR_MINHAS_COMPRAS_E_VENDAS() {

        //var DADOS_COMPRA_VENDA = api.get('/pesquisar_compra_venda', {
        var DADOS_COMPRA_VENDA = Axios.get(IP_DO_SERVIDOR + 'pesquisar_compra_venda', {

            comprador_J: numero_telefone_comprador,
            ComprasVendas_J: ComprasVendas

        });

        //alert(  JSON.stringify( DADOS_COMPRA_VENDA ) );
        //alert(  Object.values(DADOS_COMPRA_VENDA.data[0]) );
        //alert(  Object.keys(DADOS_COMPRA_VENDA.data[0]) );

    }



    //VARIAVÉIS GLOBAIS ABAIXO
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

    var tempoPostagem;




    //ADICIONANDO PRODUTOS NA TELA GRAVADOS NO BANCO DE DADOS ABAIXO
    async function ADICIONAR_PRODUTOS_por_ARRAY(estado_da_conecao) {


        try {

            var datos = "";

            //if (estado_da_conecao) {
            //alert(estado_da_conecao);    NUMERO_CELL_J

            //BUSCANDO POSTAGENS NA INTERNET ABAIXO
            // DADOS_TELEFONE = await AsyncStorage.getItem('NUMERO_CELL');
            DADOS_TELEFONE = { NUMERO_CELL_J: VARIAVEL_GLOBAL.TELEFONE[0] };
            DADOS_TELEFONE = JSON.stringify(DADOS_TELEFONE);
            // alert( DADOS_TELEFONE );
            var DADOS_TELEFONE_VALOR = "";
            try {
                //var numero_telefone_J = obj_JSON[i].numero_telefone_J;
                //alert(typeof DADOS_TELEFONE);
                var DADOS_TELEFONE_JSON = JSON.parse(DADOS_TELEFONE);
                //alert(Object.values(DADOS_TELEFONE_JSON));
                DADOS_TELEFONE_VALOR = String(Object.values(DADOS_TELEFONE_JSON));
                //alert(DADOS_TELEFONE_VALOR+"  auditação 1@#");

            } catch (error) { /* alert("#3547wer " + error); */ }


            // ComprasVendas = comprasOuVendasFlag;
            // alert(DADOS_TELEFONE_VALOR+"  <=>  "+ComprasVendas);

            //console.log(comprasOuVendasFlag);

            //PESQUISAR_MINHAS_COMPRAS_E_VENDAS();
            /**/
            //    alert(DADOS_TELEFONE_VALOR)
            const response = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_compra_venda', {
                //comprador_J: numero_telefone_comprador,
                params: {
                    comprador_J: DADOS_TELEFONE_VALOR,
                    // ComprasVendas_J: ComprasVendas
                    ComprasVendas_J: comprasOuVendasFlag,
                    dataInicial_send: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataInicial),
                    dataFinal_send: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataFinal)
                }

            });

            //alert(JSON.stringify(response.data));
            datos = JSON.stringify(response.data);
            //    alert(datos)

            //}//IF

            var valor_unitario = "";
            var somatorioCabecas = 0;
            for (var count = 0; count < response.data.length; count++) {

                //somatorioCabecas = (somatorioCabecas + parseInt( JSON.stringify(response.data[count].quantidadeCabecasOuPesos_J) ));
                valor_unitario = JSON.stringify(response.data[count].quantidadeCabecasOuPesos_J);
                valor_unitario = valor_unitario.replace('"', '').replace('"', '');
                somatorioCabecas += parseInt(valor_unitario);
                //alert(valor_unitario);

            }//FOR   //quantidadeCabecasOuPesos_J
            setNumero_de_cabecas(somatorioCabecas);
            //alert( Object.values(JSON.stringify(response.data)) );
            //alert( JSON.stringify(response.data[0].quantidadeCabecasOuPesos_J) );
            /**/



            /*
            else {
              datos = await AsyncStorage.getItem('POSTAGEM');
              //console.log(datos);
            }
            */

            //alert("@#2"+datos);

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

                //alert(ARRAY_PRIMEIRAS_URL_VIDEOS_2);

            }//IF

            //alert(datos+"  auditação 3@#");

            setProdutos(datos);
            //alert(produtosS);
            setProdutosEtiquetasExibir(true);

        } catch (error) { /* */  alert("9#514@&$797 " + error); }

    }
    //ADICIONANDO PRODUTOS NA TELA GRAVADOS NO BANCO DE DADOS ACIMA 


    //IMPLEMENTAÇÃO DE 02/12/2020 ACIMA



    //alert( JSON.stringify(produtosS) );
    //alert(ARRAY_PRIMEIRAS_URL_IMAGENS_2);
    //alert(ARRAY_PRIMEIRAS_URL_VIDEOS_2);
    //alert(LATITUDE_USUARIO+"   "+LONGITUDE_USUARIO);
    //alert(DADOS_TELEFONE);


    const [produtosEtiquetasExibir, setProdutosEtiquetasExibir] = useState(false);





    //ESTILO DO CALENDÁRIO ABAIXO
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 20,
            color: 'red'
        },
        datePickerStyle: {
            width: 120,
            marginTop: 0,

        },
    });
    //ESTILO DO CALENDÁRIO ACIMA






    useEffect(() => {

        // created() {
        LogBox.ignoreLogs([
            'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
            'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
            'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
            'componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
            'componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
            '`useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`'
        ]);
        //   }

    }, [dataInicial, dataFinal]);





    const [corIconeFiltro, setCorIconeFiltro] = useState(false);

    async function PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH(variavelDaPesquisa) {

        // alert("FILTRAR TELA MINHAS COMPRAS E VENDAS");
        // alert(variavelDaPesquisa);


        /*******************************************************************************************************/
        var datos = "";
        // DADOS_TELEFONE = await AsyncStorage.getItem('NUMERO_CELL');
        DADOS_TELEFONE = { NUMERO_CELL_J: VARIAVEL_GLOBAL.TELEFONE[0] };
        DADOS_TELEFONE = JSON.stringify(DADOS_TELEFONE);
        // alert( DADOS_TELEFONE );
        var DADOS_TELEFONE_VALOR = "";
        try {
            //var numero_telefone_J = obj_JSON[i].numero_telefone_J;
            //alert(typeof DADOS_TELEFONE);
            var DADOS_TELEFONE_JSON = JSON.parse(DADOS_TELEFONE);
            //alert(Object.values(DADOS_TELEFONE_JSON));
            DADOS_TELEFONE_VALOR = String(Object.values(DADOS_TELEFONE_JSON));
            //alert(DADOS_TELEFONE_VALOR+"  auditação 1@#");
        } catch (error) { /* alert("#3547wer " + error); */ }
        /*******************************************************************************************************/




        var dados_da_pesquisa_FullTextSearch_1;

        const dados_da_pesquisa_FullTextSearch_2 = await Axios.get(IP_DO_SERVIDOR + 'pesquisa_full_text_search_3', {

            params: {
                
                // numero_telefone_usuario: DADOS_TELEFONE_VALOR,
                // DADOS_P_FULLTEXT_SEARCH: variavelDaPesquisa,
                // PARAMETRO: "TELA_COMPRA_E_VENDA",
                // DATA_INICIAL: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataInicial),
                // DATA_FINAL: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataFinal),
                // ComprasVendas_J: comprasOuVendasFlag

                //______________////______________//_________________//

                numero_telefone_usuario: DADOS_TELEFONE_VALOR,
                // LATITUDE: userPosition.latitude, // => ADICIONADO 30082021
                // LONGITUDE: userPosition.longitude, // => ADICIONADO 30082021
                LATITUDE: VARIAVEL_GLOBAL.LATITUDE, // => ADICIONADO 30082021
                LONGITUDE: VARIAVEL_GLOBAL.LONGITUDE, // => ADICIONADO 30082021
                DISTANCIA_PERIMETRO: VARIAVEL_GLOBAL.DISTANCIAS_PARA_O_FILTRO, // => ADICIONADO 30082021
                DADOS_P_FULLTEXT_SEARCH: variavelDaPesquisa,
                PARAMETRO: "TELA_COMPRA_E_VENDA",
                DATA_INICIAL: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataInicial),
                DATA_FINAL: EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataFinal),
                ComprasVendas_J: comprasOuVendasFlag




            }
            //} , {signal: abortCont.signal} );
        });


        dados_da_pesquisa_FullTextSearch_1 = await dados_da_pesquisa_FullTextSearch_2.data;

        // alert(  JSON.stringify(dados_da_pesquisa_FullTextSearch_1)  );
        datos = JSON.stringify(dados_da_pesquisa_FullTextSearch_1);

        // break;
        // alert(datos);


        /*******************************************************************************/
        /*******************************************************************************/
        try {

            var valor_unitario = "";
            var somatorioCabecas = 0;
            for (var count = 0; count < dados_da_pesquisa_FullTextSearch_2.data.length; count++) {

                //somatorioCabecas = (somatorioCabecas + parseInt( JSON.stringify(response.data[count].quantidadeCabecasOuPesos_J) ));
                valor_unitario = JSON.stringify(response.data[count].quantidadeCabecasOuPesos_J);
                valor_unitario = valor_unitario.replace('"', '').replace('"', '');
                somatorioCabecas += parseInt(valor_unitario);
                //alert(valor_unitario);

            }//FOR   //quantidadeCabecasOuPesos_J
            setNumero_de_cabecas(somatorioCabecas);
            //alert( Object.values(JSON.stringify(response.data)) );
            //alert( JSON.stringify(response.data[0].quantidadeCabecasOuPesos_J) );

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

            //alert(datos+"  auditação 45wq&$);
            setProdutos(datos);
            //alert(produtosS);
            setProdutosEtiquetasExibir(true);

        } catch (error) { /*   alert("86FFD#L&S328@95 " + error); */  console.log("efc e wpac "+error)}
        /*******************************************************************************/
        /*******************************************************************************/


    }










    return (

        <SafeAreaView style={[Estilo.App, style = { paddingLeft: 5 }]}>

            <View style={{ height: 35, width: '100%', paddingLeft: 10 }}>

                <TouchableOpacity style={[Estilo.borda_geral, style = { width: '25%', borderWidth: 0 }]}
                    onPress={() => {
                        //setFecharTelaDetalhe(oldState => !oldState)
                        //alert('FOI EXEUTADO')
                        VARIAVEL_GLOBAL.TELA_ATUAL = "Principal",
                            VARIAVEL_GLOBAL.TELA_ORIGEM = "nenhuma",
                            navigation.navigate("TelaPrincipal", { produto })
                    }}
                >
                    <Icon name='arrow-left' style={Estilo.icones_medio} />
                </TouchableOpacity>

                <View style={{ width: '100%', alignItems: 'center' }} ><View style={{ width: '80%', borderWidth: 1, borderColor: 'white' }} ></View></View>

            </View>

            <View style={{ flexDirection: 'row', width: '100%', height: 20, justifyContent: 'flex-end', borderWidth: 0 }}>


                <View style={[Estilo.borda_geral, style = { width: '22%', paddingLeft: 5, justifyContent: 'flex-end', alignItems: 'center', borderWidth: 0 }]}>
                    <Text style={{ color: 'white' }} >Categorias</Text>
                </View>

                <View style={[Estilo.borda_geral, style = { width: '26%', justifyContent: 'flex-start', borderWidth: 0 }]}>
                </View>

                <View style={[Estilo.borda_geral, style = { width: '28%', justifyContent: 'flex-start', borderWidth: 0 }]}>
                </View>

                <View style={[Estilo.borda_geral, style = { width: '27%', justifyContent: 'flex-end', alignItems: 'center', borderWidth: 0 }]}>
                    <Text style={{ color: 'white', justifyContent: 'flex-end' }} >{alternaComprasVendas}</Text>
                </View>

            </View>

            {/*************************************************************/}

            <View style={{ flexDirection: 'row', width: '100%', height: 50, justifyContent: 'flex-end', borderWidth: 0 }}>


                <TouchableOpacity style={[Estilo.borda_geral, style = { width: '20%', alignItems: 'flex-start', justifyContent: 'flex-start', borderWidth: 0 }]}
                    onPress={() => {

                        VARIAVEL_GLOBAL.TELA_ATUAL = "ComprasVendas";


                        if (!corIconeFiltro) {

                            setExibeFiltroCategoria(true);
                            filtro_ativado_sim_ou_nao = true;

                          
                        } else {

                            // CONECTANDO_AO_BANCO_DE_DADOS();
                            // ADICIONAR_PRODUTOS_por_ARRAY(true);
                            filtro_ativado_sim_ou_nao = false;

                        }


                        setCorIconeFiltro(oldState => !oldState);

                        // setExibeFiltroCategoria(oldState => !oldState);

                        VARIAVEL_GLOBAL.TELA_ATUAL = "ComprasVendas";

                    }}
                >
                    <Icon name='cogs' style={[Estilo.fonteGrande, style = { color: corIconeFiltro ? "#25E7DB" : "white" }]} />
                </TouchableOpacity>

                <View style={[Estilo.borda_geral, style = { width: '26%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 22, color: 'white' }} >Minhas</Text>
                </View>

                <View style={[Estilo.borda_geral, style = { width: LARGURA_PORCENTAGEN_1, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 22, color: '#25E7DB' }} >{comprasOuVendas}</Text>
                </View>

                {exibe_botao_refresh ?
                    <TouchableOpacity style={[Estilo.borda_geral, style = { width: LARGURA_PORCENTAGEN_2, justifyContent: 'flex-start', borderWidth: 0 }]}
                        onPress={() => {

                            setFlagAlternar(oldState => !oldState);
                            CHAMAR_ALTERNANCIA_BOOLEAN = true;
                            // ADICIONAR_PRODUTOS_por_ARRAY(true);

                        }}
                    >
                        <Icon name='refresh' style={Estilo.fonteGrande} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[Estilo.borda_geral, style = { width: LARGURA_PORCENTAGEN_2, justifyContent: 'flex-start', borderWidth: 0 }]}>
                    </TouchableOpacity>
                }

                <View style={[Estilo.borda_geral, style = { width: '2%', justifyContent: 'flex-start', borderWidth: 0 }]}>
                </View>


            </View>

            {/************************************************************/}
            <View style={{ flexDirection: 'row', width: '100%', height: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>
                <View style={[Estilo.borda_geral, style = { width: '90%', justifyContent: 'flex-start', borderWidth: 0 }]}>
                </View>
            </View>


            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                <View style={[Estilo.borda_geral, style = { width: '70%', alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 18, color: 'white' }} >Interválo</Text>
                </View>
                <View style={[Estilo.borda_geral, style = { width: '30%', alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 18, color: 'white' }} >Cabeças</Text>
                </View>

            </View>



            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                <View style={[Estilo.borda_geral, style = { width: '35%', height: 40, alignItems: 'center', justifyContent: 'flex-start', borderRadius: 10, borderWidth: 0 }]}>
                    {/* Colocando Data Inicial Abaixo */}
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={dataInicial} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Inicial"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        maxDate="01-01-2040"
                        confirmBtnText="Confirma"
                        cancelBtnText="Cancela"
                        customStyles={{
                            dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 1,
                                borderRadius: 10,
                                fontSize: 15,
                                color: 'white',
                                backgroundColor: 'white'
                            },
                        }}
                        onDateChange={(dataInicial) => {
                            setDataInicial(dataInicial);
                            // alert(dataInicial);
                        }}
                    />

                    {/* <TextInput style={{ width: '90%', backgroundColor: 'rgb(42,69,74)', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, fontSize: 15, color: 'white' }} >01/01/2020</TextInput> */}

                    {/* Colocando Data Inicial Acima */}
                </View>

                <View style={[Estilo.borda_geral, style = { backgroundColor: 'rgb(42,69,74)', width: '35%', height: 40, alignItems: 'center', justifyContent: 'flex-start', borderRadius: 10, borderWidth: 0 }]}>
                    {/* Colocando Data Inicial Abaixo */}
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={dataFinal} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Final"
                        format="DD-MM-YYYY"
                        minDate="01-01-2021"
                        maxDate="01-01-2040"
                        confirmBtnText="Confirma"
                        cancelBtnText="Cancela"
                        customStyles={{
                            dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 1,
                                borderRadius: 10,
                                fontSize: 15,
                                backgroundColor: 'white'
                            },
                        }}
                        onDateChange={(dataFinal) => {
                            setDataFinal(dataFinal);
                            // alert(dataFinal);
                        }}
                    />
                    {/* <TextInput style={{ width: '90%', backgroundColor: 'rgb(42,69,74)', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, fontSize: 15, color: 'white' }} >05/09/2020</TextInput> */}
                    {/* Colocando Data Final Acima */}
                </View>

                <View style={[Estilo.borda_geral, style = { width: '30%', alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 25, color: 'white' }} >{numero_de_cabecas}</Text>
                </View>

            </View>


            {/*************************/}
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                <View style={[Estilo.borda_geral, style = { width: '25%', alignItems: 'flex-start', justifyContent: 'flex-start', borderWidth: 0.5 }]}>
                </View>

                <View style={[Estilo.borda_geral, style = { width: '55%', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 18, color: 'white', alignItems: 'center', justifyContent: 'center' }} >Categoria Diversas</Text>
                </View>

                <View style={[Estilo.borda_geral, style = { width: '25%', alignItems: 'flex-start', justifyContent: 'flex-start', borderWidth: 0.5 }]}>
                </View>


            </View>

            {/*PAINEL DE ROLAGEM VERTICAL ABAIXO */}
            {/* FOI DESATIVADO O SCROLLVIEW ABAIXO PORQUE ESTÁ UTILIZANDO O FLATLIST EM <ProdutosEtiquetas em Outra TELA */}
            {/* <ScrollView style={{ paddingVertical: 1, borderWidth: 0, borderColor: 'orange',height: '1%'}} > */}
            {/*  <ProdutosEtiquetas />  */}

            {produtosEtiquetasExibir
                ?
                <ProdutosEtiquetas
                    product={produtosS} ARRAY_PRIMEIRAS_URL_IMAGENSS={ARRAY_PRIMEIRAS_URL_IMAGENS_2} ARRAY_PRIMEIRAS_URL_VIDEOSS={ARRAY_PRIMEIRAS_URL_VIDEOS_2}
                    LARTITUDE={LATITUDE_USUARIO} LORNGITUDE={LONGITUDE_USUARIO} numero_telefone_usuario={DADOS_TELEFONE} TELA_DE_ORIGEM_E_SITUACA={TELA_DE_ORIGEM_E_SITUACAO}
                />
                :
                <View></View>
            }

            {/* </ScrollView > */}
            {/* FOI DESATIVADO O SCROLLVIEW ACIMA PORQUE ESTÁ UTILIZANDO O FLATLIST EM <ProdutosEtiquetas em Outra TELA */}
            {/*PAINEL DE ROLAGEM VERTICAL ACIMA */}

            {/* {exibeFiltroCategoria && (<FILTRO_CATEGORIA />)} */}

            {exibeFiltroCategoria && (<FILTRO_PESQUISA_CATEGORIA
                setExibeFiltroCategori={setExibeFiltroCategoria}
                PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH_REMOTO_2={PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH}
                telaQueChamaOFiltro={"ComprasVendas"}
            />)}




        </SafeAreaView   >

    )




}