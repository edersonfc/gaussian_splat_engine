import React, { useEffect, useRef, useState, useContext } from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity, TouchableHighlight, Alert, ScrollView, Dimensions, Share } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";

import { arrayUnique_2, MOEDA_P_DOUBLE_OU_FLOAT, DOUBLE_OU_FLOAT_P_MOEDA } from './CALCULO_E_FORMATACAO/FORMATACAO';

import Video from 'react-native-video';

//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

import GlobalContext from '../context/UsersContext';

import Celular_colocar from './Celular_colocar';


// import { CANCELAR_VENDA_OU_COMPRA_EXPORTAR } from './components/ProdutosEtiquetas';
import { CANCELAR_VENDA_OU_COMPRA } from './ProdutosEtiquetas';


import LicencaExpirada from './LicencaExpirada';



var ESTATUS_SE_TA_ONLINE_OU_OFFLINE = "";
var favoritos_numeros_de_cells = "";


const screenWidth = Math.round(Dimensions.get('window').width);//=>PEGANDO A LARGURA DA TELA
//const screenHeight = Math.round(Dimensions.get('window').height);


export default function DetalhesProdutos(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // var IP_DO_SERVIDOR = "http://192.168.0.102:3000/";
    var IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;


    /*
    var cor_fundo_faixa = '34,43,53,1'; //COR MAIS ESCURA
    var cor_linha_divisiria_abaixo = '34,43,53,1'; //COR MAIS ESCURA
    */

    var cor_fundo_faixa = '43,68,74,1';  //COR MAIS CLARA
    var cor_linha_divisiria_abaixo = '43,68,74,1'; //COR MAIS CLARA

    var borda_radius = 15;


    const { produtos } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params

    const { URL_ENVIADA } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params

    const { INDICE_PRINCIPAL_JSON } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params

    const { DISTANCIA } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params

    const { NUMERO_CELL_DO_USUARIO } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params


    //IMPLEMENTADO EM 09/12/2020
    var { TELA_DE_ORIGEM_E_SITUACAO } = props.route.params // utilizar a {} para desestruturar a variável produto que está dentro de params
    //alert(TELA_DE_ORIGEM_E_SITUACAO);
    //alert(TELA_DE_ORIGEM_E_SITUACAO);



    //alert(URL_ENVIADA);
    // alert(INDICE_PRINCIPAL_JSON);


    const navigation = useNavigation();


    //PEGAR LISTA DE FAVORITOS NO BANCO DE DADOS REMOTO ABAIXO

    //PEGAR LISTA DE FAVORITOS NO BANCO DE DADOS REMOTO ACIMA

    const [muda_cor, setMuda_cor] = useState(false)
    const [fecharTelaDetalhe, setFecharTelaDetalhe] = useState(true);
    var [icone_foto_video, setIcone_foto_video] = useState(true);


    //GERANDO ARRAY DE IMAGENS ABAIXO
    var ARRAY_DE_IMAGENS_E_VIDEOS = [];
    var URL_IMAGENS = produtos.URL_IMAGEN_DADOS_J.split("|");
    var URL_VIDEOS = produtos.URL_VIDEOS_DADOS_J.split("|");
    URL_IMAGENS.pop();
    URL_VIDEOS.pop();
    /*
    URL_IMAGEN_DADOS_J: "",
    URL_VIDEOS_DADOS_J: "", 
    */
    //alert(URL_IMAGENS);
    //alert(URL_VIDEOS);
    ARRAY_DE_IMAGENS_E_VIDEOS = arrayUnique_2(URL_IMAGENS, URL_VIDEOS);
    //alert(ARRAY_DE_IMAGENS_E_VIDEOS);
    //GERANDO ARRAY DE IMAGENS ACIMA



    /*
        var values = ARRAY_DE_IMAGENS_E_VIDEOS.map.call( function(obj) {
   
           if(obj.values(".jpg") || obj.values(".png") ){
                  setIcone_fotos(true);
           }else{ setIcone_fotos(false); }
       
           //return obj.value;
         });
   */



    /*   
    useEffect(  () => { 
        function EXIBIR_ICONE_FOTO_VIDEO(paramentro){
    
        for(var x = 0; x < ARRAY_DE_IMAGENS_E_VIDEOS.length; x++ ){  
            //alert("MOSTRANDO OU ESCONDENDO ");
            var paramentro = ARRAY_DE_IMAGENS_E_VIDEOS[x];
            if( paramentro.includes(".jpg") || paramentro.includes(".png") ){
                   setIcone_foto_video(true);
            }else{ setIcone_foto_video(false);  }//IF ELSE
        }//FOR  
        
    }//function EXIBIR_ICONE_FOTO_VIDEO(
    
    },[]);
    */

    //SEXO DO GADO
    var SEXO_DO_GADO = "";

    const [sexo_gado_states, setSexo_gado_states] = useState(SEXO_DO_GADO)
    const [eras_idades_states, setEras_idades_states] = useState(ERAS_IDADES)
    const [tipos_de_gados_states, setTipos_de_gados_states] = useState(TIPOS_DE_GADOS)

    /*
    if (produtos.corMacho_J === true || produtos.corMacho_J === "true") { SEXO_DO_GADO = " Macho  "; }//IF
    if (produtos.corFemea_J === true || produtos.corFemea_J === "true") { SEXO_DO_GADO += " Fêmea  "; }//IF
    */
    SEXO_DO_GADO = produtos.corMacho_J + " " + produtos.corFemea_J;


    //ERAS DO GADO
    var ERAS_IDADES = "";
    /*
    if (produtos.cor_0_12_J === true || produtos.cor_0_12_J === "true") { ERAS_IDADES = " 0 à 12 "; }//IF
    if (produtos.cor_12_24_J === true || produtos.cor_12_24_J === "true") { ERAS_IDADES += "  12 à 24 "; }//IF
    if (produtos.cor_24_36_J === true || produtos.cor_24_36_J === "true") { ERAS_IDADES += "  24 à 36 "; }//IF
    if (produtos.corAcima_36_J === true || produtos.corAcima_36_J === "true") { ERAS_IDADES += "  Acima 36 "; }//IF
    */
    ERAS_IDADES = produtos.cor_0_12_J + " " + produtos.cor_12_24_J + " " + produtos.cor_24_36_J + " " + produtos.corAcima_36_J;

    if (produtos.outrasErasAnterior_J != "" && produtos.outrasErasPosterior_J != "") { ERAS_IDADES += "  " + produtos.outrasErasAnterior_J + " à " + produtos.outrasErasPosterior_J }//IF


    //TIPOS DE GADO
    var TIPOS_DE_GADOS = "";
    /*
    if (produtos.corBezerros_J === true || produtos.corBezerros_J === "true") { TIPOS_DE_GADOS = "  Bezerros  "; }//IF
    if (produtos.corGarrotes_J === true || produtos.corGarrotes_J === "true") { TIPOS_DE_GADOS += "  Garrotes  "; }//IF
    if (produtos.corTourunos_J === true || produtos.corTourunos_J === "true") { TIPOS_DE_GADOS += "  Tourunos  "; }//IF
    if (produtos.corBois_J === true || produtos.corBois_J === "true") { TIPOS_DE_GADOS += "  Bois  "; }//IF
    if (produtos.corBoisGordos_J === true || produtos.corBoisGordos_J === "true") { TIPOS_DE_GADOS += "  Bois Gordos  "; }//IF

    if (produtos.corBezerras_J === true || produtos.corBezerras_J === "true") { TIPOS_DE_GADOS += "  Bezerras  "; }//IF
    if (produtos.corNovilhas_J === true || produtos.corNovilhas_J === "true") { TIPOS_DE_GADOS += "  Novilhas  "; }//IF
    if (produtos.corVacasBoiadeiras_J === true || produtos.corVacasBoiadeiras_J === "true") { TIPOS_DE_GADOS += "  Vacas Boiadeiras  "; }//IF
    if (produtos.corVacas_J === true || produtos.corVacas_J === "true") { TIPOS_DE_GADOS += "  Vacas  "; }//IF
    if (produtos.corVacasGordas_J === true || produtos.corVacasGordas_J === "true") { TIPOS_DE_GADOS += "  Vacas Gordas  "; }//IF
    if (produtos.corVacasPrenhas_J === true || produtos.corVacasPrenhas_J === "true") { TIPOS_DE_GADOS += "  Vacas Prenhas  "; }//IF
    if (produtos.corVacasParidas_J === true || produtos.corVacasParidas_J === "true") { TIPOS_DE_GADOS += "  Vacas Paridas  "; }//IF
    */
    TIPOS_DE_GADOS = produtos.corBezerros_J + " " + produtos.corGarrotes_J + " " + produtos.corTourunos_J + " " + produtos.corBois_J + " " + produtos.corBoisGordos_J + " " + produtos.corBezerras_J + " " + produtos.corNovilhas_J + " " +
        produtos.corVacasBoiadeiras_J + " " + produtos.corVacas_J + " " + produtos.corVacasGordas_J + " " + produtos.corVacasPrenhas_J + " " + produtos.corVacasParidas_J;

    // alert(SEXO_DO_GADO);
    //alert(SEXO_DO_GADO);
    //alert(ERAS_IDADES);
    //alert( TIPOS_DE_GADOS );



    /**/

    async function pegar_ip() {

        try {
            IP_DO_SERVIDOR = await AsyncStorage.getItem('IP_CONEXAO');
            //alert(IP_DO_SERVIDOR);
        } catch (error) { }


    }//function pegar_ip()


    //Implementado em 07/12/2020 ABAIXO

    useEffect(() => {

        //setInterval( VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE(), 10000);//function
        VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE();//function

    }, []);


    async function VERIFICAR_ESTATUS_SE_TA_ONLINE_OU_OFFLINE() {

        try {
            //ESTATUS_SE_TA_ONLINE_OU_OFFLINE = await AsyncStorage.getItem('ESTATUS_SE_TA_ONLINE');
            ESTATUS_SE_TA_ONLINE_OU_OFFLINE = VARIAVEL_GLOBAL.CONEXAO_DO_APP.toString();
            //alert(ESTATUS_SE_TA_ONLINE_OU_OFFLINE);

            if (ESTATUS_SE_TA_ONLINE_OU_OFFLINE.toString() === 'ON-LINE') {

                VERIFICAR_LISTA_DE_FAVORITOS_NO_BANCO_DE_DADOS_REMOTO();

            }//IF

        } catch (exception) { alert(exception); }

    }
    //Implementado em 07/12/2020 ACIMA


    const [comprador_ou_vendedor, setComprador_ou_vendedor] = useState(false);

    const [fazer_ou_ver_proposta, setFazer_ou_ver_proposta] = useState("");

    const [comprar_ou_deletar, setComprar_ou_deletar] = useState("");


    const [ativar_publicacao, setAtivar_publicacao] = useState(true);


    useEffect(() => {

        setSexo_gado_states(SEXO_DO_GADO);
        setEras_idades_states(ERAS_IDADES);
        setTipos_de_gados_states(TIPOS_DE_GADOS);
        pegar_ip();

        // alert(produtos.numero_telefone_J)

        if (produtos.numero_telefone_J.toString() === NUMERO_CELL_DO_USUARIO.toString()) {

            //alert("FOI VOCÊ QUEM POSTOU ESSA POSTAGEM");
            setComprador_ou_vendedor(false);
            setFazer_ou_ver_proposta("Ver Propostas");
            setComprar_ou_deletar("Apagar Postagem");

            if (produtos.venda_status_J.includes("requerida")) {

                setComprar_ou_deletar("Vendido");
            }//IF INTERNO SE FOI VENDIDO


            if (produtos.venda_status_J.includes("pendente") || produtos.venda_status_J.includes("expirada")) {

                setAtivar_publicacao(false);

            }



        } else { //alert("NÃO FOI VOCÊ QUEM POSTOU ESSA POSTAGEM");


            setComprador_ou_vendedor(true);
            setFazer_ou_ver_proposta("Fazer Proposta");
            setComprar_ou_deletar("Comprar");

            if (produtos.venda_status_J.includes("requerida")) {

                setComprar_ou_deletar("Comprado");
            }//IF INTERNO SE FOI COMPRADO

        }//IF


    }, []);



    {/*aqw(FOTO_OU_VIDEO = ARRAY_DE_IMAGENS_E_VIDEOS[index])*/ }

    const [colocar_celular_visivel_or_invisivel, setColocar_celular_visivel_or_invisivel] = useState(false);



    function OCULTAR_TELA_TELEFONE() {
        setColocar_celular_visivel_or_invisivel(false);
    }









    function QUANTIDADES_VEZES_PRECOS(quantidades, precos) {

        var preco_em_double = MOEDA_P_DOUBLE_OU_FLOAT(precos);
        var total_double = quantidades * preco_em_double;
        var valor_moeda = DOUBLE_OU_FLOAT_P_MOEDA(total_double, /*'R$'*/'');

        // alert(valor_moeda);
        return valor_moeda;

    }



    const [licencaExpiradaFalseOrTrue, setLicencaExpiradaFalseOrTrue] = useState(false);


    function MOSTRAR_TELA_EXPIRACAO_LICENCA() {

        setLicencaExpiradaFalseOrTrue(false);

    }






    //TENTANDO IMPLEMENTAR METODOS DE COMPARTILHAMENTO ABAIXO
    // const ShareExample = () => {
    const onShare = async (PARAMETRO) => {
        try {
            const result = await Share.share({
                message:
                    // 'React Native | A framework for building native apps using React',
                    // 'Aplicativo de Compra e Venda de Gado ! ' + PARAMETRO,
                    PARAMETRO,

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    //TENTANDO IMPLEMENTAR METODOS DE COMPARTILHAMENTO ACIMA






    return (


        <View style={{ alignItems: 'center', justifyContent: 'flex-start', height: '100%', position: 'absolute', backgroundColor: 'rgb(255,255,255,0)', width: '100%' }}>

            {/*#2A3E4A*/}

            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#2A3E4A',
                borderRadius: 1,
                borderColor: '#fff',
                borderWidth: 0,

            }} >



                <View style={{ flexDirection: 'row', width: '100%', padding: 4, height: 70 }}

                    //EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ABAIXO  ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO
                    {...(() => {



                    })()}
                ///EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ACIMA   
                >

                    <TouchableOpacity style={{ width: '21%', borderWidth: 0, height: 55, paddingLeft: 10, paddingTop: 5, alignItems: 'flex-start', justifyContent: 'flex-start' }}

                        onPress={async () => {


                            if (VARIAVEL_GLOBAL.TELA_TERCEIRA === "nenhuma" || VARIAVEL_GLOBAL.TELA_ORIGEM === "Principal") {
                                // if (tela_pra_voltar.includes('Principal')) {

                                VARIAVEL_GLOBAL.TELA_ATUAL = "Principal";
                                VARIAVEL_GLOBAL.TELA_ORIGEM = "nenhuma";
                                VARIAVEL_GLOBAL.TELA_TERCEIRA = "nenhuma";

                                navigation.navigate("TelaPrincipal", { produtos })
                                //navigation.goBack("null",{ produtos });//funciona perfeitamente esse voltar

                            }

                            else if (VARIAVEL_GLOBAL.TELA_TERCEIRA === "ComprasVendas" || VARIAVEL_GLOBAL.TELA_ORIGEM === "ComprasVendas") {


                                VARIAVEL_GLOBAL.TELA_ATUAL = "ComprasVendas";
                                VARIAVEL_GLOBAL.TELA_ORIGEM = "MenuDaTelaPrincipal";
                                VARIAVEL_GLOBAL.TELA_TERCEIRA = "Principal";


                                var ComprasVendas = "Compras";//IN CONSTRUCTIONS

                                var LATITUDE_USUARIO = await AsyncStorage.getItem('LATITUDE')
                                var LONGITUDE_USUARIO = await AsyncStorage.getItem('LONGITUDE')

                                //alert(LATITUDE_USUARIO+"   |   "+LONGITUDE_USUARIO);

                                // alert(VARIAVEL_GLOBAL.TELA_ATUAL + " | " + VARIAVEL_GLOBAL.TELA_ORIGEM + " | " + VARIAVEL_GLOBAL.TELA_TERCEIRA)

                                navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO, TELA_DE_ORIGEM_E_SITUACAO })

                            }

                            //    alert(VARIAVEL_GLOBAL.TELA_ATUAL + " | " + VARIAVEL_GLOBAL.TELA_ORIGEM + " | " + VARIAVEL_GLOBAL.TELA_TERCEIRA)
                        }}

                    >
                        <Icon name='arrow-left' style={Estilo.icones_medio} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ width: '20%', borderWidth: 0, height: 55, padding: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                        {muda_cor
                            ? <Icon name='heart' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado]}
                                onPress={async () => {

                                    //setMuda_cor(oldState => !oldState)
                                    //alert("É FAVORITO");

                                    if (ESTATUS_SE_TA_ONLINE_OU_OFFLINE.toString() === 'ON-LINE') {

                                        try {
                                            setMuda_cor(false);
                                            favoritos_numeros_de_cells = favoritos_numeros_de_cells.replace('"', '').replace('"', '');
                                            //alert(favoritos_numeros_de_cells);
                                            favoritos_numeros_de_cells = favoritos_numeros_de_cells.replace(NUMERO_CELL_DO_USUARIO + "|", '');

                                            var id_J = produtos.id_J;

                                            //await api.get('/update_favorito', {
                                            await Axios.get(IP_DO_SERVIDOR + 'update_favorito', {
                                                params: {
                                                    //numero_telefone_J: numero_telefone_J,
                                                    id_J: id_J,
                                                    favoritos_numeros_de_cells: favoritos_numeros_de_cells
                                                }
                                            });


                                        } catch (error) { setMuda_cor(true); alert("FALHA AO FAVORITAR"); }

                                    }//IF



                                    //////////******************** */
                                }
                                } />

                            : <Icon name='heart' style={[Estilo.icones_grande]}
                                onPress={async () => {

                                    if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {
                                        //setMuda_cor(oldState => !oldState)
                                        //alert("NÃO É FAVORITO");
                                        //alert(favoritos_numeros_de_cells);

                                        if (ESTATUS_SE_TA_ONLINE_OU_OFFLINE === 'ON-LINE') {

                                            try {
                                                setMuda_cor(true);
                                                favoritos_numeros_de_cells = favoritos_numeros_de_cells.replace('"', '').replace('"', '');
                                                //alert(favoritos_numeros_de_cells);
                                                favoritos_numeros_de_cells = favoritos_numeros_de_cells + NUMERO_CELL_DO_USUARIO + "|";

                                                var id_J = produtos.id_J;

                                                // alert(id_J+"  |  "+favoritos_numeros_de_cells);

                                                //await api.get('/update_favorito', {
                                                await Axios.get(IP_DO_SERVIDOR + 'update_favorito', {
                                                    params: {
                                                        //numero_telefone_J: numero_telefone_J,
                                                        id_J: id_J,
                                                        favoritos_numeros_de_cells: favoritos_numeros_de_cells
                                                    }
                                                });


                                            } catch (error) { setMuda_cor(false); alert("FALHA AO FAVORITAR"); }

                                        }//IF


                                    } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                                        setLicencaExpiradaFalseOrTrue(true);

                                    }


                                }
                                } />

                        }
                        <Text style={{ fontSize: 10, color: '#fff' }} >Favoritar</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={{ width: '26%', borderWidth: 0, height: 55, padding: 4, alignItems: 'center', justifyContent: 'flex-end' }}
                        onPress={() => {
                            // alert(produtos.numero_telefone_J + "  ###  " + NUMERO_CELL_DO_USUARIO);


                            // var IMAGEM = 'LINK COMPARTILHADO DA MENSAGEM !';
                            var IMAGEM_OU_VIDEO = ARRAY_DE_IMAGENS_E_VIDEOS[0];

                            var PAGINAS_PARTE_INICIAL = "<html> <body> <img src=" + IMAGEM_OU_VIDEO + " alt='GadoApp' width='500' height='600'> </body> </html>"
                            onShare(PAGINAS_PARTE_INICIAL);


                        }}
                    >
                        <Icon name='share-alt' style={Estilo.icones_grande} />

                        <Text style={{ fontSize: 10, color: '#fff' }} >Compartilhar</Text>

                    </TouchableOpacity>

                    {comprador_ou_vendedor ?
                        <TouchableOpacity style={{ width: '26%', borderWidth: 0, height: 55, padding: 4, alignItems: 'center', justifyContent: 'flex-end' }}
                            onPress={() => {

                                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {

                                    var index = parseInt(INDICE_PRINCIPAL_JSON);
                                    var numero_telefone = produtos.numero_telefone_J;
                                    var id_da_postagem = produtos.id_J;
                                    var numero_telefone_comprador = '{"NUMERO_CELL_J":"' + NUMERO_CELL_DO_USUARIO + '"}';//ESTA LINHA CONCERTA A FORMATAÇÃO DO Nº DO CELULAR PONDO DENTRO OBJETO JSON NESSE FORMATO PARA NÃO DAR ERRO NA GRAVAÇÃO DO BANCO DE DADOS
                                    //alert(index+"  #  "+numero_telefone +"  #  "+  id_da_postagem +"  #  "+  numero_telefone_comprador)
                                    navigation.navigate("EnvioPropostasCompras", { index, numero_telefone, id_da_postagem, numero_telefone_comprador });
                                    VARIAVEL_GLOBAL.FAZER_PROPOSTA = fazer_ou_ver_proposta;
                                    /**/

                                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                                    setLicencaExpiradaFalseOrTrue(true);

                                }

                                VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta";

                            }}
                        >
                            <Icon name='cart-arrow-down' style={Estilo.icones_grande} />

                            <Text style={{ fontSize: 10, color: '#fff' }} >Comprar</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{ width: '26%', borderWidth: 0, height: 55, padding: 4, alignItems: 'center', justifyContent: 'flex-end' }}
                            onPress={() => {

                                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {


                                    if (comprar_ou_deletar === "Vendido") {

                                        CANCELAMENTO_DE_COMPRA_E_VENDA();

                                    } else {

                                        DELETAR_POSTAGEM_NO_BANCO_DE_DADOS();

                                    }



                                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {
                                    setLicencaExpiradaFalseOrTrue(true);
                                }

                            }}
                        >
                            <Icon name='trash-o' style={Estilo.icones_grande} />

                            <Text style={{ fontSize: 10, color: '#fff' }} >Apagar</Text>

                        </TouchableOpacity>
                    }




                </View>

                {/* _________________________________ */}
                <View style={{ width: '100%', height: 15, borderWidth: 0, borderColor: '#fff', alignItems: 'center' }} >
                    <View style={{ width: '80%', height: 1, borderWidth: 1, borderColor: '#fff' }} >
                    </View>

                </View>



                {/* IMAGEM AQUI ABAIXO LOOP COM MAP ABAIXO */}

                <ScrollView horizontal={true} style={{ borderWidth: 0, borderColor: "orange", width: 'auto' }}>



                    {ARRAY_DE_IMAGENS_E_VIDEOS.map((ARRAY_DE_IMAGENS_E_VIDEOSS, index) => (


                        <TouchableOpacity key={index} style={{ width: (screenWidth - 30), height: '100%', padding: 5, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }}



                            onPress={() => {
                                //alert(ARRAY_DE_IMAGENS_E_VIDEOS[index]);
                                var FOTO_OU_VIDEO = ARRAY_DE_IMAGENS_E_VIDEOS[index];



                                if (FOTO_OU_VIDEO.includes(".JPEG") || FOTO_OU_VIDEO.includes(".png")) {

                                    // alert("VAI CHAMAR TELA DE NAVEGAÇÃO")
                                    var ARRY_URL_IMAGENS = URL_IMAGENS;
                                    var IMAGENS = ARRAY_DE_IMAGENS_E_VIDEOS[index];
                                    var index_id = index;


                                    navigation.navigate("navegacaoFotos", { ARRY_URL_IMAGENS, IMAGENS, index_id }) //ATIVAR DEPOIS
                                    // alert(VARIAVEL_GLOBAL.TELA_ATUAL+" | "+VARIAVEL_GLOBAL.TELA_ORIGEM+" | "+VARIAVEL_GLOBAL.TELA_TERCEIRA)


                                } else {

                                    URL_Video = FOTO_OU_VIDEO;
                                    VARIAVEL_GLOBAL.TELA_ATUAL = "NavegarVideos",
                                        // VARIAVEL_GLOBAL.TELA_ORIGEM = "ProdDetalhes";
                                        navigation.navigate("NavegarVideos", { URL_Video })
                                }
                            }}


                            ///EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ABAIXO
                            {...(() => {

                                var valor = ARRAY_DE_IMAGENS_E_VIDEOS[index];
                                if (valor.includes(".JPEG") || valor.includes(".png")) {
                                    //setIcone_foto_video(true);
                                    icone_foto_video = true;
                                    container_foto_video = true;
                                } else {
                                    //setIcone_foto_video(false);  
                                    icone_foto_video = false;
                                    container_foto_video = false;
                                }//IF

                            })()}
                        ///EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ACIMA width: screenWidth


                        >

                            {
                                container_foto_video ? //source={{ uri: ARRAY_DE_IMAGENS_E_VIDEOS[index] }}
                                    <Image key={index} style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        source={{ uri: ARRAY_DE_IMAGENS_E_VIDEOS[index] }}
                                    />
                                    :
                                    <Video key={index} style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        source={{ uri: ARRAY_DE_IMAGENS_E_VIDEOS[index] }}
                                    />
                            }


                            {icone_foto_video
                                ?
                                <View key={index + "foto"} style={{ flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', borderWidth: 0, borderColor: 'red' }} >
                                    <Icon name='camera' style={[style = { fontSize: 100, color: 'rgba(255,255,255,0.7)', borderWidth: 0, borderColor: 'green' }]} />
                                </View>
                                :
                                <View key={index + "video"} style={{ flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', borderWidth: 0, borderColor: 'red' }} >
                                    <Icon name='video-camera' style={[style = { fontSize: 100, color: 'rgba(255,255,255,0.8)', borderWidth: 0, borderColor: 'green' }]} />
                                </View>
                            }


                        </TouchableOpacity>



                    ))}

                </ScrollView>
                {/* IMAGEM AQUI ABAIXO LOOP COM MAP ACIMA */}



                {/*IN CONSTRUCTION  ABAIXO      <TouchableHighlight></TouchableHighlight>   */}

                {ativar_publicacao ?

                    <View style={{ flexDirection: 'row', padding: '1%' }} >
                        <View style={{ width: '5%' }} />
                        <TouchableHighlight style={{ width: '42%', height: 40, alignItems: 'center', paddingTop: 10, borderWidth: 1, borderRadius: 10, borderColor: 'white' }}
                            onPress={async () => {


                                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {



                                    if (comprador_ou_vendedor === true) {
                                        //var index = parseInt(INDICE_PRINCIPAL_JSON);
                                        var numero_telefone = produtos.numero_telefone_J;
                                        var id_da_postagem = produtos.id_J;
                                        var numero_telefone_comprador = '{"NUMERO_CELL_J":"' + NUMERO_CELL_DO_USUARIO + '"}';//ESTA LINHA CONCERTA A FORMATAÇÃO DO Nº DO CELULAR PONDO DENTRO OBJETO JSON NESSE FORMATO PARA NÃO DAR ERRO NA GRAVAÇÃO DO BANCO DE DADOS
                                        // alert("VAI COMPRAR DIRETO");
                                        //alert( index+"   "+numero_telefone+"   "+id_da_postagem );
                                        var numero_telefone_J = numero_telefone;
                                        var id_J = id_da_postagem;
                                        try {


                                            if (NUMERO_CELL_DO_USUARIO != "" && comprar_ou_deletar != "Comprado" && comprar_ou_deletar != "Vendido") {

                                                //alert(numero_telefone_comprador);

                                                Alert.alert(
                                                    //title
                                                    'Atenção !',
                                                    //body
                                                    //'I am two option alert. Do you want to cancel me ?',
                                                    'Deseja Realizar esta Compra !',
                                                    [
                                                        {
                                                            text: 'Sim',
                                                            onPress: async () => {
                                                                //TAREFAZ AQUI ABAIXO

                                                                // try {

                                                                var retorno = await Axios.get(IP_DO_SERVIDOR + 'comprar_direto', {
                                                                    params: {
                                                                        numero_telefone_J: numero_telefone_J,
                                                                        id_J: id_J,
                                                                        comprador_J: numero_telefone_comprador
                                                                    }
                                                                    // }, setComprar_ou_deletar("Comprado"), alert("Compra Realizada... Entraremos em Contato !") ); //TROCADO PELAS 7 LINHAS ABAIXO

                                                                });

                                                                if ((await retorno.data.status.toString()) === "sucesso") {

                                                                    setComprar_ou_deletar("Comprado");
                                                                    alert("Compra Realizada... Entraremos em Contato !");

                                                                } else if ((await retorno.data.status.toString()) === "falha") {

                                                                    alert("Falha ao Comprar, Tente novamente !");

                                                                }


                                                                // } catch (error) { alert("Falha ao Comprar, Tente novamente !"); }

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

                                            } else {
                                                //alert("Cadastre o Telefone pra poder Comprar ou Vender !");
                                                if (NUMERO_CELL_DO_USUARIO.toString() === "" && comprar_ou_deletar != "Comprado" && comprar_ou_deletar != "Vendido") {
                                                    setColocar_celular_visivel_or_invisivel(true);
                                                } else {

                                                    CANCELAMENTO_DE_COMPRA_E_VENDA();

                                                }
                                            }

                                        } catch (error) { "493@g#=> " + error }

                                    } else {

                                        if (comprar_ou_deletar.toString() === "Comprado" || comprar_ou_deletar.toString() === "Vendido") {

                                            //alert("Deseja Realmente Cancelar essa Compra e Venda !!! ");
                                            CANCELAMENTO_DE_COMPRA_E_VENDA();

                                        } else {

                                            DELETAR_POSTAGEM_NO_BANCO_DE_DADOS();

                                        }

                                    }//ELSE IF


                                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                                    setLicencaExpiradaFalseOrTrue(true);

                                }


                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >{comprar_ou_deletar}</Text>

                        </TouchableHighlight>
                        <View style={{ width: '5%' }} />
                        <TouchableHighlight style={{ width: '42%', height: 40, alignItems: 'center', paddingTop: 10, borderWidth: 1, borderRadius: 10, borderColor: 'white' }}
                            onPress={() => {


                                if (VARIAVEL_GLOBAL.LICENCA_USO === "liberado" || VARIAVEL_GLOBAL.TELEFONE === "SEM_TELEFONE_USUARIO") {

                                    var index = parseInt(INDICE_PRINCIPAL_JSON);
                                    var numero_telefone = produtos.numero_telefone_J;
                                    var id_da_postagem = produtos.id_J;
                                    var numero_telefone_comprador = '{"NUMERO_CELL_J":"' + NUMERO_CELL_DO_USUARIO + '"}';//ESTA LINHA CONCERTA A FORMATAÇÃO DO Nº DO CELULAR PONDO DENTRO OBJETO JSON NESSE FORMATO PARA NÃO DAR ERRO NA GRAVAÇÃO DO BANCO DE DADOS
                                    VARIAVEL_GLOBAL.FAZER_PROPOSTA = fazer_ou_ver_proposta;

                                    if (VARIAVEL_GLOBAL.TELEFONE != "SEM_TELEFONE_USUARIO" || VARIAVEL_GLOBAL.TELEFONE != "") {
                                        VARIAVEL_GLOBAL.NOTIFICACAO_RECEIVER_IDENTIFICACAO = "Atualizar-Tela-Proposta"; //OBSERVER
                                    }

                                    VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE = produtos;

                                    navigation.navigate("EnvioPropostasCompras", { index, numero_telefone, id_da_postagem, numero_telefone_comprador });



                                } else if (VARIAVEL_GLOBAL.LICENCA_USO === "bloqueado") {

                                    setLicencaExpiradaFalseOrTrue(true);

                                }




                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >{fazer_ou_ver_proposta}</Text>
                        </TouchableHighlight>
                        <View style={{ width: '5%' }} />
                    </View>

                    :

                    <View style={{ flexDirection: 'row', padding: '1%', width: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'white' }} >

                        <TouchableOpacity style={{ width: '60%', height: 40, alignItems: 'center', borderWidth: 1, justifyContent: 'center', borderRadius: 10, borderColor: 'yellow' }}

                            onPress={async () => {


                                /***********************************************************************/
                                VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE = await produtos;

                                const produto = { IMAGENS: VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT, VIDEOS: VARIAVEL_GLOBAL.LISTAVIDEOS_CONTEXT }

                                VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "ATIVAR PUBLICACAO";
                                // alert( JSON.stringify(produtos) );
                                // alert( produtos.precoSugerido_J );
                                // alert( produtos.quantidadeCabecasOuPesos_J );
                                const precoSugerido = produtos.precoSugerido_J;
                                const quantidadeCabecasOuPesos = produtos.quantidadeCabecasOuPesos_J;
                                navigation.navigate("Tabela_planos", { precoSugerido, quantidadeCabecasOuPesos, produto });

                                /***********************************************************************/
                            }}
                        >
                            <Text style={{ fontSize: 20, color: 'yellow' }} >Ativar Publicação</Text>
                        </TouchableOpacity>

                    </View>
                }



                {/*IN CONSTRUCTION  ACIMA*/}





                {/* _________________C________________ */}
                <View style={{ width: '100%', height: 15, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }} >
                    <View style={{ width: '80%', height: 1, borderWidth: 1, borderColor: '#fff' }} >
                    </View>
                </View>
                {/* _________________B________________ */}






                <ScrollView  >

                    <View style={{ flexDirection: 'column', width: "100%", alignContent: "center", alignItems: "center", justifyContent: 'center' }} >

                        <View style={{ width: "95%", height: 700 }} >


                            <View style={{ height: 15 }} />


                            <View style={{ flexDirection: 'row', width: '100%', padding: 1, borderWidth: 0, borderColor: 'red', borderRadius: borda_radius, backgroundColor: 'rgba(' + cor_fundo_faixa + ')' }} >

                                <View style={{ width: '10%', padding: 0, borderWidth: 0, borderColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='map-marker' style={Estilo.icones_medio} />
                                </View >

                                <View style={{ width: '30%', padding: 0, borderWidth: 0, borderColor: 'yellow', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={Estilo.fonteMedia} >{DISTANCIA} KM </Text>
                                </View>

                                <View style={{ width: '60%', padding: 0, borderWidth: 0, borderColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ height: 5 }} />
                                    <Text style={{ color: 'white', fontSize: 20, marginVertical: 0, textAlign: "center", padding: 0, borderWidth: 0 }}>  Preço Avista  </Text>
                                    <Text style={{ color: 'white', fontSize: 18, marginVertical: 0, textAlign: "center", padding: 0, borderWidth: 0 }}>{"R$ " + produtos.precoSugerido_J} / UNIDADE </Text>

                                    <Text style={{ color: 'white', fontSize: 15, marginVertical: 0, textAlign: "center", padding: 0, borderWidth: 0 }} >  Quantidade: {" " + produtos.quantidadeCabecasOuPesos_J} </Text>
                                    <Text style={{ color: 'white', fontSize: 15, marginVertical: 0, textAlign: "center", padding: 0, borderWidth: 0 }} >  Total: {"R$ " + QUANTIDADES_VEZES_PRECOS(produtos.quantidadeCabecasOuPesos_J, produtos.precoSugerido_J)} </Text>

                                    <View style={{ height: 10 }} />
                                </View>

                            </View>


                            {/*   <Text style={Estilo.fonteMedia} > Preço Avista  </Text> */}


                            {/* _________________________________ */}
                            <View style={{ width: '100%', height: 10, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }} >
                                <View style={{ width: '80%', height: 0, borderWidth: 0, borderColor: '#fff' }} >
                                </View>
                            </View>

                            <View style={{ height: 1 }} />


                            <View style={{ borderRadius: borda_radius, backgroundColor: 'rgba(' + cor_fundo_faixa + ')' }}>

                                <View tyle={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: '#fff', padding: 0 }}>
                                    <Text style={[Estilo.fonteMedia, style = { borderWidth: 0 }]} >Sexo</Text>
                                </View>
                                <View style={{ width: '100%', height: 0, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }} >
                                    <View style={{ width: '80%', height: 5, borderWidth: 0, backgroundColor: 'rgba(' + cor_linha_divisiria_abaixo + ')' }} >
                                    </View>
                                </View>
                                {/* _________________________________ */}
                                <Text style={{ color: 'white', fontSize: 25, width: '100%', textAlign: 'center' }} > {sexo_gado_states} </Text>
                                <View style={{ height: 10 }} />
                            </View>


                            <View style={{ height: 5 }} />

                            <View style={{ height: 7 }} />


                            <View style={{ borderRadius: borda_radius, backgroundColor: 'rgba(' + cor_fundo_faixa + ')' }}>

                                <View tyle={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: '#fff' }}><Text style={Estilo.fonteMedia} >Idades Meses</Text></View>
                                <View style={{ width: '100%', height: 0, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }} >
                                    <View style={{ width: '80%', height: 0, borderWidth: 3, borderColor: 'rgba(' + cor_linha_divisiria_abaixo + ')' }} >
                                    </View>
                                </View>

                                {/* _________________________________ */}
                                <Text style={{ color: 'white', fontSize: 25, width: '100%', textAlign: 'center' }} > {eras_idades_states} </Text>
                                <View style={{ height: 15 }} />
                            </View>


                            <View style={{ height: 5 }} />




                            <View style={{ height: 5 }} />
                            <View style={{ borderRadius: borda_radius, backgroundColor: 'rgba(' + cor_fundo_faixa + ')' }}>
                                <View style={{ height: 15 }} />

                                <View tyle={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: '#fff' }}><Text style={Estilo.fonteMedia} >Tipos de Gado</Text></View>
                                <View style={{ width: '100%', height: 0, borderWidth: 0, borderColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }} >
                                    <View style={{ width: '80%', height: 1, borderWidth: 3, borderColor: 'rgba(' + cor_linha_divisiria_abaixo + ')' }} >
                                    </View>
                                </View>
                                {/* _________________________________ */}
                                <Text style={{ color: 'white', fontSize: 25, width: '100%', textAlign: 'center' }} > {tipos_de_gados_states} </Text>
                                <View style={{ height: 20 }} />
                            </View>

                            <View style={{ height: 10 }} />


                            <View style={{ borderRadius: borda_radius, backgroundColor: 'rgba(' + cor_fundo_faixa + ')' }}>

                                <View tyle={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: '#fff' }}><Text style={Estilo.fonteMedia} >Descrição</Text></View>
                                <View style={{ width: '100%', height: 0, borderWidth: 0, borderColor: 'rgba(' + cor_linha_divisiria_abaixo + ')', alignItems: 'center', justifyContent: 'flex-end' }} >
                                    <View style={{ width: '80%', height: 1, borderWidth: 3, borderColor: 'rgba(' + cor_linha_divisiria_abaixo + ')' }} >
                                    </View>
                                </View>

                                <View style={{ width: '100%', padding: 0, borderWidth: 0, borderColor: 'yellow', justifyContent: 'flex-start' }}>
                                    <Text style={Estilo.fonteMedia} >
                                        {produtos.descricoesGerais_J}
                                    </Text>
                                </View>
                                <View style={{ height: 5 }} />
                            </View>



                        </View>

                    </View>
                </ScrollView>


            </View>



            {colocar_celular_visivel_or_invisivel && (
                <Celular_colocar tela_chamada={"tela_DetalhesProdutos"} OCULTAR_TELA_TELEFONE_FUNCAO_REMOTA={OCULTAR_TELA_TELEFONE} />
            )}


            {licencaExpiradaFalseOrTrue && (<LicencaExpirada REMOTO_MOSTRAR_TELA_EXPIRACAO_LICENCA={MOSTRAR_TELA_EXPIRACAO_LICENCA} />)}



        </View>



    )//DO RETURN



    async function VERIFICAR_LISTA_DE_FAVORITOS_NO_BANCO_DE_DADOS_REMOTO() {

        //alert("TÁ CHAMANDO");


        var numero_telefone = produtos.numero_telefone_J;
        var id_da_postagem = produtos.id_J;

        //alert(numero_telefone+"   |  "+id_da_postagem+"  |  "+NUMERO_CELL_DO_USUARIO);
        //alert( typeof numero_telefone);
        //alert( typeof id_da_postagem);
        //alert( typeof NUMERO_CELL_DO_USUARIO);

        //console.log(id_da_postagem);

        //PUXANDO TODO O FAVORITO DO BANCO DE DADOS REMOTO por um determinado id_J ABAIXO
        //const response = await api.get('/pesquisar_favorito', {
        const response = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_favorito', {
            params: {
                numero_telefone: numero_telefone,
                id_J: id_da_postagem,
                //NUMERO_CELL_DO_USUARIO: NUMERO_CELL_DO_USUARIO
            }
        });



        try {
            //alert( JSON.stringify(response.data[0].favorito_J) );
            favoritos_numeros_de_cells = JSON.stringify(response.data[0].favorito_J);
            //alert(favoritos_numeros_de_cells);

        } catch (erro) { alert(erro); }
        //PUXANDO TODO O FAVORITO DO BANCO DE DADOS REMOTO por um determinado id_J ACIMA

        if (favoritos_numeros_de_cells.includes(NUMERO_CELL_DO_USUARIO)) {

            //alert("JÁ É FAVORITO");
            setMuda_cor(true);

        } else {
            //alert("AINDA NÃO É FAVORITO");
            setMuda_cor(false);
        }

    }//function







    //DELETAR POSTAGEM NO BANCO DE DADOS ABAIXO
    function DELETAR_POSTAGEM_NO_BANCO_DE_DADOS() {

        /**********************************************************/
        //alert("FOI MANTIDO PRESSIONADO");
        Alert.alert(
            //title
            'Atenção !',
            //body
            //'I am two option alert. Do you want to cancel me ?',
            'Deseja Apagar essa Postagem ?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {


                        //TESTE ABAIXO
                        var id_postagem = produtos.id_J;
                        // const data = await AsyncStorage.getItem('POSTAGEM');
                        // var obj_JSON = JSON.parse(data); //Trocado pela proxima linha Abaixo
                        var obj_JSON = JSON.parse(VARIAVEL_GLOBAL.TODOS_OS_PRODUTOS);
                        //alert(obj_JSON[1].id_J);
                        //REMOVER ITEM PELO INDICE DO OBJETO JSON
                        //obj_JSON.splice(obj_JSON.indexOf(obj_JSON[6]), 1);
                        //alert(data.length);


                        //alert( Object.keys(obj_JSON) );
                        //alert( produtos.id_J );


                        //PERCORRENDO JSON com MAP  ABAIXO
                        //   Object.keys(obj_JSON).forEach(function (item) {   
                        obj_JSON.map((obj_JSON_AS, item) => {
                            //console.log(item + " = " + obj_JSON[item].id_J);

                            if (obj_JSON[item].id_J.toString() === id_postagem.toString()) {

                                //REMOVER ITEM PELO INDICE DO OBJETO JSON
                                obj_JSON.splice(obj_JSON.indexOf(obj_JSON[item]), 1);
                                //console.log("ESSE É O ITEM QUE TEM QUE REMOVER => "+id_postagem);
                                REMOVER_DA_MEMORIA(obj_JSON);

                            }//IF

                        });
                        //console.log(data);
                        //PERCORRENDO JSON com MAP  ACIMA



                        //alert("APAGAR POSTAGEM DO BANCO DE DADOS !!!");
                        /******************************/
                        var id_postagem = produtos.id_J;
                        try {
                            await Axios.get(IP_DO_SERVIDOR + 'deletar_postagem_do_banco_de_dados', {
                                params: {
                                    id_J: id_postagem
                                }
                            });

                            // navigation.goBack(null);
                            /********************************************/
                            VARIAVEL_GLOBAL.TELA_ATUAL = "ComprasVendas";
                            VARIAVEL_GLOBAL.TELA_ORIGEM = "MenuDaTelaPrincipal";
                            VARIAVEL_GLOBAL.TELA_TERCEIRA = "Principal";
                            // { ComprasVendas = 'Postagens' }
                            const LATITUDE_USUARIO = VARIAVEL_GLOBAL.LATITUDE;
                            const LONGITUDE_USUARIO = VARIAVEL_GLOBAL.LONGITUDE;
                            const ComprasVendas = 'Postagens';
                            VARIAVEL_GLOBAL.SOMENTE_UMA_VEZ = true;
                            navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO });
                            /********************************************/

                        } catch (error) { alert("FALHA AO REMOVER POSTAGEM !!!"); }


                        try {
                            Axios.get(IP_DO_SERVIDOR + 'deletar_proposta_do_banco_de_dados', {
                                params: {
                                    id_J: id_postagem
                                }
                            });
                        } catch (error) { alert("FALHA AO REMOVER PROPOSTA !!!"); }
                        /******************************/



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
        /**********************************************************/



        async function REMOVER_DA_MEMORIA(obj_JSON) {

            //REMOVER TODOS ITENS DO ASYNCSTORAGE
            await AsyncStorage.removeItem('POSTAGEM');
            //ARMAZENANDO NO BANCO DE DADOS ABAIXO
            await AsyncStorage.setItem('POSTAGEM', JSON.stringify(obj_JSON));

        }//IF


    }//DELETAR_POSTAGEM_NO_BANCO_DE_DADOS()
    //DELETAR POSTAGEM NO BANCO DE DADOS ACIMA


    //CANCELAMENTO_DE_COMPRA_E_VENDA ABAIXO
    function CANCELAMENTO_DE_COMPRA_E_VENDA() {


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //   var CELULAR_COMPRADOR_OU_VENDEDOR = produtos[index].numero_telefone_J;
        //   var ID_DA_POSTAGEM = produtos[index].id_J;
        //   var USUARIO_DO_TELEFONE = numero_telefone_usuario;

        var CELULAR_COMPRADOR_OU_VENDEDOR = "";
        var ID_DA_POSTAGEM = JSON.stringify(VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE.id_J).replace(/(\")/g, '');;

        /*******************/
        var compra_ou_venda = "";

        if ( comprar_ou_deletar.toString()  === "Comprado") {

            compra_ou_venda = "Compra";
            CELULAR_COMPRADOR_OU_VENDEDOR = JSON.stringify(JSON.parse(VARIAVEL_GLOBAL.TODOS_OS_PRODUTOS)[INDICE_PRINCIPAL_JSON].numero_telefone_J).replace(/(\")|(\s)/g, '');

        } else {
            compra_ou_venda = "Venda";

            CELULAR_COMPRADOR_OU_VENDEDOR = VARIAVEL_GLOBAL.TELEFONE;

        }
        /*******************/


        //const twoOptionAlertHandler = () => {
        Alert.alert(
            //title
            'Atenção !',
            //body
            //'I am two option alert. Do you want to cancel me ?',
            'Deseja Cancelar esta ' + compra_ou_venda + ' !',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        //  // CANCELAR_VENDA_OU_COMPRA(IP_DO_SERVIDOR, compra_ou_venda, CELULAR_COMPRADOR_OU_VENDEDOR, ID_DA_POSTAGEM, USUARIO_DO_TELEFONE);
                        //ProdutosEtiquetas.
                        //CANCELAR_VENDA_OU_COMPRA(IP_DO_SERVIDOR, compra_ou_venda, CELULAR_COMPRADOR_OU_VENDEDOR, ID_DA_POSTAGEM, USUARIO_DO_TELEFONE);
                        //console.log(  JSON.stringify( JSON.parse( VARIAVEL_GLOBAL.TODOS_OS_PRODUTOS )[INDICE_PRINCIPAL_JSON])  );

                        // alert(ID_DA_POSTAGEM);

                        //   ////////////////////////////
                        Axios.get(IP_DO_SERVIDOR + 'cancelar_compra_venda', {
                            params: {
                                numero_telefone_J: VARIAVEL_GLOBAL.TELEFONE,
                                id_J: ID_DA_POSTAGEM,
                                comprador_J: CELULAR_COMPRADOR_OU_VENDEDOR
                            }

                        });
                        //   ///////////////////////////

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
        //};
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////

    }
    //CANCELAMENTO_DE_COMPRA_E_VENDA ACIMA



}// CHAVE DO METODO PRINCIPAL


