import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Estilo from './estilo';

import Icon from 'react-native-vector-icons/FontAwesome';

import DETALHES from './DetalhesProdutos';

//import TELA_PRINCIPAL from '../AppTest';

import { useNavigation } from "@react-navigation/native";

//import RNFetchBlob from 'react-native-fetch-blob'; //FOI DESATIVADO MAS TÁ FUNCIONANDO
//import { Thumbnail } from 'react-native-thumbnail-video';// FOI DESATIVADO SÓ FUNCIONA PRA YOUTUBE
import Video from 'react-native-video';
//import VideoPlayer from 'react-native-video-controls';


//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

import ImageResizer from 'react-native-image-resizer';


import { TRANFORMAR_P_CAMINHO_ABSOLUTO, REMOVER_ITENS_NULOS_DO_ARRAY, Distancia_entre_2_geolocalizacao, MOEDA_P_DOUBLE_OU_FLOAT, DOUBLE_OU_FLOAT_P_MOEDA } from './CALCULO_E_FORMATACAO/FORMATACAO';

import GlobalContext from '../context/UsersContext';




var ARRAY_PRODUTOS = [];


const state = { refreshing: false };



export default function ProdutosEtiquetas(param) {


  const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

  // var IP_DO_SERVIDOR = "http://192.168.0.102:3000"; /* NO COMPUTADOR IP REMOTO DE REDE INTERNA */
  var IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;

  /* */
  async function pegar_ip() {
    IP_DO_SERVIDOR = await AsyncStorage.getItem('IP_CONEXAO');
    //alert(IP_DO_SERVIDOR);
  }

  async function SETAR_LATITUDE_LONGITUDE(LATITUDE, LONGITUDE) {

    try {

      LATITUDE = String(LATITUDE);
      LONGITUDE = String(LONGITUDE);
      await AsyncStorage.setItem('LATITUDE', LATITUDE);
      await AsyncStorage.setItem('LONGITUDE', LONGITUDE);

    } catch (error) { alert('ERRO NA COORDENADA #%HTR32  ' + error); }

  }



  var [container_foto_video, setContainer_foto_video] = useState(true);

  var [compra_venda_cancelar, setCompra_venda_cancelar] = useState(true);

  /**/
  var produtosS = param.product;

  var ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO = [];
  var ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO = [];

  ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO.length = 0;
  ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO.length = 0;

  ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO = param.ARRAY_PRIMEIRAS_URL_IMAGENSS;
  ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO = param.ARRAY_PRIMEIRAS_URL_VIDEOSS;

  //alert( ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO.length+ " <=> "+ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO.length +"  ProdutosEtiquetas@#7-89" );

  var LATITUDE_USUARIO = param.LARTITUDE;
  var LONGITUDE_USUARIO = param.LORNGITUDE;

  //LATITUDE_USUARIO = "-20.798978";  //AUDITORIA TESTE
  //LONGITUDE_USUARIO = "-51.728514"; //AUDITORIA TESTE






  useEffect(() => {

    pegar_ip();
    SETAR_LATITUDE_LONGITUDE(LATITUDE_USUARIO, LONGITUDE_USUARIO);

  }, []);


  //IMPLEMENTADO EM 09/12/2020
  var TELA_DE_ORIGEM_E_SITUACAO = param.TELA_DE_ORIGEM_E_SITUACA
  //alert(TELA_DE_ORIGEM_E_SITUACAO);

  var [compra_ou_venda, setCompra_ou_venda] = useState('');

  var [deletar_postagem, setDeletar_postagem] = useState();

  var numero_telefone_usuario = param.numero_telefone_usuario;

  //console.log(numero_telefone_usuario);

  //console.log( LATITUDE_USUARIO+ " <=> "+LONGITUDE_USUARIO );

  var ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS = [];


  var DISTANCIA_ARRAY = [];
  //alert( LATITUDE_USUARIO+ " <=> "+LONGITUDE_USUARIO );


  var DESCRICAO_ARRAY = [];


  var ARRAY_ESTADO = [];


  var produtosss = [{
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
    comprado_J: ""
  }];

  /*alert( produtosS );  console.log(produtosS);  */



  if (produtosS != null) {
    produtosss = JSON.parse(produtosS);
    ARRAY_PRODUTOS = produtosss;

    //alert(  JSON.stringify(produtosss)  )

    //alert(   produtosss[0].numero_telefone_J )

    //setProdutos(produtosss);
  }

  //const [produtoss, setProdutos] = useState(produtosss);

  //alert(typeof produtosss );    

  //alert( Object.keys( produtosss ) );    

  const navigation = useNavigation();


  ////DECLARAÇÃO DE STATES ABAIXO
  var [variavelTexto, setVariavelTexto] = useState('');
  const [muda_cor, setMuda_cor] = useState(false);
  const [exibe, setExibe] = useState(false);
  const inputRef = useRef();
  var [valorMenor, setValorMenor] = useState('0');
  var [valorMaior, setValorMaior] = useState('300');
  const [muda_cor_comprar, setMuda_cor_comprar] = useState(false);
  const [muda_cor_compartulhar, setMuda_cor_compartulhar] = useState(false);
  const [exibeDetalheProdutos, setExibeDetalheProdutos] = useState(false);
  const [imagem_url_unica_View_visivel, setimagem_url_unica_View_visivel] = useState(true);
  const [imagem_url_unica, setimagem_url_unica] = useState([]);
  ////DECLARAÇÃO DE STATES ACIMA

  //<Text style={Estilo.centralizar_horizontalmente} >IMAGENS OU VIDEO AQUI</Text> ]]








  //PREENCHENDO PRIMEIRAS URLs de IMAGENS e VIDEOS pelo FOR ABAIXO
  for (var ii = 0; ii < ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO.length; ii++) {

    var URL_IMAGEM = "";
    var URL_VIDEO = "";

    try { URL_IMAGEM = ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[ii] } catch (error) { URL_IMAGEM = ""; }
    try { URL_VIDEO = ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO[ii] } catch (error) { URL_VIDEO = ""; }


    if (URL_IMAGEM.includes(".JPEG") || URL_IMAGEM.includes(".png")) {

      //setimagem_url_unica_View_visivel(true);
      ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS.push(String(ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[ii]).replace(" ", ""));
      //console.log(ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[ii]);


    } else if (URL_VIDEO.includes(".mp4")) {

      //setimagem_url_unica_View_visivel(false);
      ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS.push(String(ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO[ii]).replace(" ", ""));
      //console.log(ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[ii]);

    }//IF

    //console.log(ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[ii]);
    //alert(ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[ii]);

    //setimagem_url_unica_View_visivel(true);

    //produtos.LATITUDE_J

    //alert( produtosss[ii].LATITUDE_J +"   "+produtosss[ii].LONGITUDE_J );
    //console.log( LATITUDE_USUARIO );

    var val_distancia = "0";
    try {
      val_distancia = Distancia_entre_2_geolocalizacao(LATITUDE_USUARIO, produtosss[ii].LATITUDE_J, LONGITUDE_USUARIO, produtosss[ii].LONGITUDE_J);
    } catch (e) { val_distancia = "0"; }
    val_distancia = parseInt(val_distancia).toFixed(1);

    val_distancia = String(val_distancia).replace(".", ",");


    //REMOVER caso o Nº depois da Virgula for ZERO Abaixo
    var posi_virgula = val_distancia.indexOf(",");
    posi_virgula = posi_virgula + 1;
    var E_ZERO = val_distancia.substring(posi_virgula);
    //alert(E_ZERO);
    if (E_ZERO === "0") {
      val_distancia = val_distancia.substring(0, (posi_virgula - 1));
      //alert(val_distancia);
    }//IF
    //REMOVER caso o Nº depois da Virgula for ZERO Acima



    DISTANCIA_ARRAY.push(val_distancia);

    //  //COLOCANDO TRES PONTOS EM TEXTO GRANDE ABAIXO
    // var DESCRICAO = "";

    // try { DESCRICAO = produtosss[ii].descricoesGerais_J; } catch (e) { DESCRICAO = ""; }

    // var largura_tela = Dimensions.get('window').width;
    // var altura__tela = Dimensions.get('window').height;
    // //alert(largura_tela);

    // if (DESCRICAO.length > 26 && largura_tela < 400) {

    //   DESCRICAO = DESCRICAO.substring(0, 26);
    //   DESCRICAO = DESCRICAO + "..."
    //   //alert( DESCRICAO);
    //   DESCRICAO_ARRAY.push(DESCRICAO);
    // }//IF

    // DESCRICAO_ARRAY.push(DESCRICAO);
    // //COLOCANDO TRES PONTOS EM TEXTO GRANDE ACIMA


    ARRAY_ESTADO.push(true);

    //alert(DESCRICAO_ARRAY);

  }//FOR  
  //PREENCHENDO PRIMEIRAS URLs de IMAGENS e VIDEOS pelo FOR ACIMA  



  function COLOCAR_TRES_PONTOS_EM_TEXTO_GRANDE(ii) {

    //COLOCANDO TRES PONTOS EM TEXTO GRANDE ABAIXO
    var DESCRICAO = "";

    try { DESCRICAO = produtosss[ii].descricoesGerais_J; } catch (e) { DESCRICAO = ""; }

    var largura_tela = Dimensions.get('window').width;
    var altura__tela = Dimensions.get('window').height;
    //alert(largura_tela);

    if (DESCRICAO.length > 26 && largura_tela < 450) {

      DESCRICAO = DESCRICAO.substring(0, 26);
      DESCRICAO = DESCRICAO + "..."
      //alert( DESCRICAO);
      DESCRICAO_ARRAY.push(DESCRICAO);
    }//IF

    DESCRICAO_ARRAY.push(DESCRICAO);
    //COLOCANDO TRES PONTOS EM TEXTO GRANDE ACIMA

    return DESCRICAO;
  }



  //COLOCANDO MAIS DOIS ATRIBUTO NO JSON ABAIXO
  for (var i = 0; i < produtosss.length; i++) {
    produtosss[i] = { ...produtosss[i], mudarCor_J: true };
    produtosss[i] = { ...produtosss[i], visivel_J: true };
  }//FOR
  //console.log(produtosss);
  //alert  ( JSON.stringify( produtosss )  );
  //COLOCANDO MAIS UM ATRIBUTO NO JSON ACIMA


  const [produtoss, setProdutos] = useState(produtosss);


  useEffect(() => {

    //alert(ARRAY_ESTADO);
    if (TELA_DE_ORIGEM_E_SITUACAO === 'Tela_AppTest_POSTAGEM_SOMENTE') {
      //compra_venda_cancelar
      setCompra_venda_cancelar(true);
    }//IF
    else if (TELA_DE_ORIGEM_E_SITUACAO === 'Tela_Menu_Compras' || TELA_DE_ORIGEM_E_SITUACAO === 'Tela_Menu_Vendas') {
      //compra_venda_cancelar
      setCompra_venda_cancelar(false);

      if (TELA_DE_ORIGEM_E_SITUACAO.includes("Compras")) {

        setCompra_ou_venda("Compra");

      } else if (TELA_DE_ORIGEM_E_SITUACAO.includes("Vendas")) {

        setCompra_ou_venda("Venda");

      } //ELSE IF



    }//ELSE

    if (VARIAVEL_GLOBAL.TELA_ATUAL == "Principal") {

      setCompra_ou_venda("Postagem");
      setDeletar_postagem(true);

    } else { setDeletar_postagem(false); }

    setProdutos(produtosss);

    // alert(VARIAVEL_GLOBAL.TELA_ATUAL)


  }, []);



  //FOI DESATIVADO O CÓDIGO ABAIXO POR OUTRO MAIS EFICIENTE, MAS NÃO REMOVER ESSE METODO QUE USA FILTRO NO JSON ABAIXO
  //ATUALIZAR OBJETO JSON ABAIXO
  function atualizar_json(product, indice, array_descricao, array_distancia) {

    //alert(array_distancia);
    DESCRICAO_ARRAY = array_descricao;
    DISTANCIA_ARRAY = array_distancia;
    //alert(JSON.stringify(product.quantidadeCabecasOuPesos_J)+"  "+ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO)
    ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO.splice(ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO.indexOf(ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[indice]), 1);
    ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO.splice(ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO.indexOf(ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO[indice]), 1);
    DESCRICAO_ARRAY.splice(DESCRICAO_ARRAY.indexOf(DESCRICAO_ARRAY[indice]), 1);
    DISTANCIA_ARRAY.splice(DISTANCIA_ARRAY.indexOf(DISTANCIA_ARRAY[indice]), 1);

    ///ATUALIZAÇÃO NO ARRAY NO useState ABAIXO
    const newProducts = produtoss.filter(p => p.id_J !== product.id_J)
    setProdutos(newProducts);
    ///ATUALIZAÇÃO NO ARRAY NO useState ACIMA

    /*//ATUALIZAÇÃO NO ARRAY NO SEM O USO DO useState ABAIXO
    const newProducts = produtosss.filter(p => p.id_J !== product.id_J);
    produtosss = newProducts;
    *///ATUALIZAÇÃO NO ARRAY NO SEM O USO DO useState ACIMA

  };//function atualizar_json
  //ATUALIZAR OBJETO JSON ACIMA
  //FOI DESATIVADO O CÓDIGO ACIMA POR OUTRO MAIS EFICIENTE, MAS NÃO REMOVER ESSE METODO QUE USA FILTRO NO JSON ACIMA







  //useState COM ARRAY DE BOOLEAN
  const [estado_array, setEstado_array] = useState(ARRAY_ESTADO);

  //FUNÇÃO ALTERNAR COR COM CLIQUE E RE-CLIQUE no useState COM ARRAY DE BOOLEAN
  const alernarTrueFalse = (index) => {
    setEstado_array(prevState => prevState.map((item, idx) => idx === index ? !item : item))
  };





  //useState COM ARRAY DE BOOLEAN
  const [etiqueta_visivel_true_false_array, SetEtiqueta_visivel_true_false_array] = useState(ARRAY_ESTADO);

  const alernarTrueFalse2 = (index) => {
    SetEtiqueta_visivel_true_false_array(prevState => prevState.map((item, idx) => idx === index ? !item : item))
  };



  //IN CONSTRUCTION ABAIXO
  /*
  const modeOptions = ['contain', 'cover', 'stretch'].map(
    mode => ({ label: mode, value: mode })
  );
  
  const onlyScaleDownOptions = [false, true].map(
    onlyScaleDown => ({ label: onlyScaleDown.toString(), value: onlyScaleDown })
  );
  
  const targetSizeOptions = [
    { label: '80x80', value: 80 },
    { label: '5000x5000', value: 5000 },
  ];



  state = {
    mode: 'contain',
    onlyScaleDown: false,

    image: null,

    resizeTargetSize: 80,
    resizedImage: null,
  };
   

   const [onlyScaleDown    , setOnlyScaleDown ]    =  useState(false);

   const [image            , setImage ] =  useState(null);

   const [resizeTargetSize , setResizeTargetSize ] =  useState(80);

   const [resizedImage     , setResizedImage ] =  useState(null);



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //ImageResizer.createResizedImage(this.state.image.uri, resizeTargetSize, resizeTargetSize, 'JPEG', 100, 0, undefined, false, { mode, onlyScaleDown })
      ImageResizer.createResizedImage(uri, resizeTargetSize, resizeTargetSize, 'JPEG', 100, 0, undefined, false, { mode, onlyScaleDown })
      .then(resizedImage => {
        setResizedImage({ resizedImage });
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to resize the photo',
          'Check the console for full the error message',
        );
      });
  */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //IN CONSTRUCTION ACIMA



  /*
  return (ADD_VIEWS_DOS_PRODUTOS());
  function ADD_VIEWS_DOS_PRODUTOS() {
    */



  function VERIFICA_SE_A_POSTAGEM_E_DO_PROPRIO_USUARIO(ii) {

    // alert("IGUAL "+ii+"  "+produtosss[ii].numero_telefone_J);
    if (VARIAVEL_GLOBAL.TELEFONE == produtosss[ii].numero_telefone_J) {
      return false;
    }//IF
    else {
      return true;
    }

  }






  function QUANTIDADES_VEZES_PRECOS(quantidades, precos) {

    var preco_em_double = MOEDA_P_DOUBLE_OU_FLOAT(precos);
    var total_double = quantidades * preco_em_double;
    var valor_moeda = DOUBLE_OU_FLOAT_P_MOEDA(total_double, /*'R$'*/'');

    // alert(valor_moeda);
    return valor_moeda;

  }

  //PRIMEIRA PARTE PARA O FLATLIST
  //TODOS OS RENDES DA ETIQUETA FEITO AQUI ABAIXO
  const Item = ({ item: produtos, index, onPress, backgroundColor, textColor }) => (
    // <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //     <Text style={[styles.title, textColor]}>{item.title}</Text>
    // </TouchableOpacity>

    /**********************************************************************************/
    /**********************************************************************************/
    <>
      {etiqueta_visivel_true_false_array[index] && (

        <View name={"PAI" + index} key={"PAI" + index} style={[style = { flexDirection: 'row', width: '100%', height: 150, borderWidth: 5, borderColor: '#fff', borderRadius: 20, backgroundColor: 'white', marginBottom: 10 }]}>

          <View style={[style = { width: '40%', padding: 0, borderWidth: 0, borderRadius: 20 }]} >

            <TouchableOpacity style={[style = { width: '100%', height: '100%', borderWidth: 0, borderColor: 'red', borderRadius: 20 }, Estilo.centralizar_horizontalmente]}
              onPress={() => {
                alert("CLIQUE ESTÁ FUNCIONANDO " + index);


                var URL_ENVIADA = ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[index];
                // alert(URL_ENVIADA)

                if (VARIAVEL_GLOBAL.TELA_ATUAL == "Principal") {

                  VARIAVEL_GLOBAL.TELA_ORIGEM = "Principal";
                  VARIAVEL_GLOBAL.TELA_ATUAL = "ProdDetalhes";

                }


                var INDICE_PRINCIPAL_JSON = index;
                var DISTANCIA = DISTANCIA_ARRAY[index];

                try { numero_telefone_usuario = JSON.parse(numero_telefone_usuario); } catch (e) { numero_telefone_usuario = ""; }
                var NUMERO_CELL_DO_USUARIO = "";
                try { NUMERO_CELL_DO_USUARIO = Object.values(numero_telefone_usuario) } catch (e) { NUMERO_CELL_DO_USUARIO = ""; }

                //alert(index+"  #  "+numero_telefone +"  #  "+  id_da_postagem +"  #  "+  NUMERO_CELL_DO_USUARIO)
                //alert("FOI CLICADO NA IMAGEM e DEPOIS NÃO FUNCIONA A COMPRA DIRETA");
                VARIAVEL_GLOBAL.PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE = produtos;   //PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE
                TELA_DE_ORIGEM_E_SITUACAO = "Tela_ProdDetalhes_visualizacao";
                navigation.navigate("ProdDetalhes", { produtos, INDICE_PRINCIPAL_JSON, DISTANCIA, NUMERO_CELL_DO_USUARIO, TELA_DE_ORIGEM_E_SITUACAO });
                /* */

                //AUDITING
                //alert( URL_ENVIADA );
                //console.log(URL_ENVIADA);
                //alert( ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[index] );
                //console.log( ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[index] );

              }}

              //EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ABAIXO  ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO
              {...(() => {
                var valor = "";
                try { valor = ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[index] } catch (error) { URL_IMAGEM = ""; }
                if (valor === undefined) { valor = "" }
                //alert(valor);
                if (valor.includes(".JPEG") || valor.includes(".png")) {
                  //setContainer_foto_video(true);
                  container_foto_video = true;
                  //alert("IMAGEM");
                } else {
                  //setContainer_foto_video(false);  
                  container_foto_video = false;
                  //alert("VIDEO");
                }//IF


              })()}
            ///EXECUTANDO JAVASCRIPT DENTRO DE QUALQUER LUGAR DOS COMPONENTES ACIMA  
            /**/

            >


              {
                /* ATIVAR DEPOIS PORQUE ESTÁ FUNCIONANDO ABAIXO */ //  source={{ uri: ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[index] }}
                container_foto_video ?
                  <Image
                    key={index}
                    style={{ width: '99%', height: '99%', borderRadius: 10, resizeMode: 'cover' }}
                    source={{ uri: ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[index] }}

                    TELA_DE_ORIGEM_E_SITUACA={TELA_DE_ORIGEM_E_SITUACAO}

                  />
                  :
                  <Video key={index}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    source={{ uri: ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO[index] }}
                  />
                /* ATIVAR DEPOIS PORQUE ESTÁ FUNCIONANDO ACIMA */
              }




              {/* DESATIVAR DEPOIS ABAIXO     
<Image key={index + Math.random() * (10000 - 100) + 100}   //Image   Video
      style={{ width: '100%', height: '100%', borderRadius:10}}
      source={{ uri: ARRAY_QUE_VAI_MOSTRAR_AS_MINIATURAS[index] }}  //REF 5483
/>
DESATIVAR DEPOIS ACIMA */
              }





            </TouchableOpacity>
            {/* ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO */}
          </View>


          <View style={[Estilo.borda_geral, style = { width: '60%', padding: 5, height: 120, borderWidth: 1, borderColor: 'red' }, Estilo.borda_geral]}>


            <View style={[Estilo.borda_geral, style = { height: 28, flexDirection: 'row', width: '100%' }]} >

              <View style={[Estilo.borda_geral, style = { height: 28, width: '70%' }]} >
                {/* <Text style={[Estilo.fontePequena_produto_titulos, style = { borderWidth: 0 }]} >Avista</Text> */}
                <Text style={[Estilo.fontePequena_produto_titulos, style = { borderWidth: 0 }]} >Preços</Text>
              </View>

              <TouchableOpacity style={[Estilo.borda_geral, Estilo.pra_esquerda, Estilo.pra_cima, style = { width: '15%' }]} >

                {VERIFICA_SE_A_POSTAGEM_E_DO_PROPRIO_USUARIO(index) ?
                  // {compra_venda_cancelar ?

                  <Icon
                    name={
                      muda_cor_comprar ? 'shopping-cart' : 'shopping-cart'
                    }
                    style={[Estilo.icones_medio_cinza, Estilo.pra_cima]}

                    onPress={(e) => {
                      //funcaoClickBotao('Mostrar Esse Texto');
                      //setMuda_cor_comprar(oldState => !oldState)

                      var numero_telefone = item[index].numero_telefone_J;
                      var id_da_postagem = item[index].id_J;
                      var numero_telefone_comprador = numero_telefone_usuario;
                      VARIAVEL_GLOBAL.TELA_ORIGEM = "TelaPrincipal";
                      VARIAVEL_GLOBAL.FAZER_PROPOSTA = "Fazer";

                      //alert(index+"  #  "+numero_telefone +"  #  "+  id_da_postagem +"  #  "+  numero_telefone_comprador)
                      navigation.navigate("EnvioPropostasCompras", { index, numero_telefone, id_da_postagem, numero_telefone_comprador });

                    }
                    }
                  />

                  :
                  <Icon name='trash-o'
                    style={[Estilo.icones_medio_vermelho, Estilo.pra_cima]}

                    onPress={() => {

                      //alert(DESCRICAO_ARRAY);



                      //alert ( JSON.stringify( produtos )  );



                      /* */
                      //alert("Deseja Cancelar esta "+compra_ou_venda);
                      ////////////////////////////////////////////////////////////////////////////////////////////////////
                      ////////////////////////////////////////////////////////////////////////////////////////////////////
                      var CELULAR_COMPRADOR_OU_VENDEDOR = item[index].numero_telefone_J;
                      var ID_DA_POSTAGEM = item[index].id_J;
                      var USUARIO_DO_TELEFONE = numero_telefone_usuario;


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
                            onPress: () => {//console.log('Yes Pressed'), alert("Você Cancelou  "),
                              //atualizar_json(produtos, index, DESCRICAO_ARRAY, DISTANCIA_ARRAY)



                              // if(deletar_postagem == false){

                              alernarTrueFalse2(index),
                                CANCELAR_VENDA_OU_COMPRA(IP_DO_SERVIDOR, compra_ou_venda, CELULAR_COMPRADOR_OU_VENDEDOR, ID_DA_POSTAGEM, USUARIO_DO_TELEFONE)

                              // }else if(deletar_postagem == true){    }     


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


                    }
                    }
                  />
                }






                {/*******/}
              </TouchableOpacity>

              <TouchableOpacity style={[Estilo.borda_geral, Estilo.pra_direita, Estilo.pra_cima, style = { width: '15%', borderColor: 'red', borderWidth: 0 }]} >

                <Icon name='share-alt' style={[Estilo.icones_medio_cinza, style = { color: estado_array[index] ? "#BEBEBE" : "#696969" }]}
                  onPress={() => {

                    //alernarTrueFalse(index);

                    let IMAGEM = ARRAY_PRIMEIRAS_URL_IMAGENS_RECEBIDO[index];
                    let VIDEO = ARRAY_PRIMEIRAS_URL_VIDEOS_RECEBIDO[index];

                    if (IMAGEM != "") {

                      alert(IMAGEM);
                      //alert("IMAGEM ESTE LINK");

                    }//IF

                    if (VIDEO != "") {

                      alert(VIDEO);
                      //alert("VIDEO ESTE LINK");

                    }//IF





                  }
                  } />


              </TouchableOpacity>

            </View>

            <View style={{ borderWidth: 0 }}>
              <Text style={[Estilo.fontePequena_produto]} >{produtos.precoSugerido_J} / UNIDADE </Text>
            </View>

            <View style={{ flexDirection: 'row', borderWidth: 0 }}>

              <View style={{ flexDirection: 'row', width: '35%', borderWidth: 0 }} >
                <Text style={[style = { color: 'black' }]}  >Quant: </Text>
                <Text style={[Estilo.fontePequena_produto]}  >{produtos.quantidadeCabecasOuPesos_J}</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '65%', borderWidth: 0, paddingLeft: '3%' }} >
                <Text style={[style = { color: 'black' }]}  >Total</Text>
                <Text style={[Estilo.fontePequena_produto]}  >{QUANTIDADES_VEZES_PRECOS(produtos.quantidadeCabecasOuPesos_J, produtos.precoSugerido_J)}</Text>
              </View>

            </View>

            <View style={{ borderWidth: 0 }}>
              <Text style={[Estilo.fontePequena_produto_titulos]} >Descrição</Text>
            </View>

            <View style={{ borderWidth: 0 }}>

              {/* <Text style={[Estilo.fontePequena_produto]} >{DESCRICAO_ARRAY[index]}</Text>  */}
              <Text style={[Estilo.fontePequena_produto]} >{COLOCAR_TRES_PONTOS_EM_TEXTO_GRANDE(index)}</Text>
              {/* {<Text style={[Estilo.fontePequena_produto]} >{produtos.descricoesGerais_J}</Text>} */}

            </View>


            {/* Encapamento de View Abaixo */}
            <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, borderColor: 'orange' }}>

              <View style={[Estilo.centralizar_horizontalmente, style = { flexDirection: 'row', width: '15%', borderWidth: 0, borderColor: 'orange' }]} >
                <Icon name='map-marker' style={[Estilo.fontePequena_produto, style = { borderWidth: 0 }]} />
              </View>

              <View style={{ flexDirection: 'row', width: '85%', borderWidth: 0, borderColor: 'orange' }}>
                <Text style={[Estilo.fontePequena_produto_titulos]} >{DISTANCIA_ARRAY[index]} KM</Text>

              </View>

            </View>
            {/* Encapamento de View Acima  {produtos.LATITUDE_J} */}

          </View>

        </View>

      )}
    </>
    /**********************************************************************************/
    /**********************************************************************************/

  );
  //TODOS OS RENDERS DA ETIQUETA FEITO AQUI ACIMA




  return (


    <SafeAreaView style={[Estilo.App]} >

      {/*PAINEL DOS PRODUTOS INSERIDO AUTOMATICO ACIMA usando FLATLIST ABAIXO*/}

      <SafeAreaView style={stylesS.container}>
        <FlatList style={{ flex: 1 }}
          // data={DATA}
          data={produtosss}
          renderItem={Item}
          keyExtractor={(item) => item.id_J}
        // extraData={selectedId}
        />
      </SafeAreaView>
      {/*PAINEL DOS PRODUTOS INSERIDO AUTOMATICO ACIMA usando FLATLIST ACIMA*/}

      {exibeDetalheProdutos && (<DETALHES />)}

    </SafeAreaView>


  )//return PRINCIPAL

  //}//function ADD_VIEWS_DOS_PRODUTOS



  async function CANCELAR_VENDA_OU_COMPRA(IP_DO_SERVIDOR, compra_ou_venda, CELULAR_COMPRADOR_OU_VENDEDOR, ID_DA_POSTAGEM, USUARIO_DO_TELEFONE) {

    var txt_cell_usuario_JSON = JSON.parse(USUARIO_DO_TELEFONE);
    //alert(txt_cell_usuario_JSON.NUMERO_CELL_J); 
    //var numero_telefone_J = txt_cell_usuario_JSON.NUMERO_CELL_J;
    var numero_telefone_J = "";
    var id_J = ID_DA_POSTAGEM;
    var numero_telefone_comprador = "";

    var ComprasVendas = "";

    var TELA_DE_ORIGEM_E_SITUACAO = 'Tela_Menu_Compras';

    if (compra_ou_venda.includes('Compra')) {

      // alert("VAI CANCELAR COMPRA");
      numero_telefone_J = CELULAR_COMPRADOR_OU_VENDEDOR;

      numero_telefone_comprador = txt_cell_usuario_JSON.NUMERO_CELL_J;

      ComprasVendas = "Compras";

      TELA_DE_ORIGEM_E_SITUACAO = "Tela_ProdutosEtiquetas_Compras";

    } else if (compra_ou_venda.includes('Venda')) {

      //alert("VAI CANCELAR VENDA");
      numero_telefone_J = txt_cell_usuario_JSON.NUMERO_CELL_J;

      numero_telefone_comprador = CELULAR_COMPRADOR_OU_VENDEDOR;

      ComprasVendas = "Vendas";

      TELA_DE_ORIGEM_E_SITUACAO = "Tela_ProdutosEtiquetas_Vendas";

    }

    //alert(numero_telefone_J + "  #  " + id_J + "  #  " + numero_telefone_comprador);
    //await api.get('/comprar_direto', {
    Axios.get(IP_DO_SERVIDOR + 'cancelar_compra_venda', {
      params: {
        numero_telefone_J: numero_telefone_J,
        id_J: id_J,
        comprador_J: numero_telefone_comprador
      }

    });
    /* */

    setTimeout(function () {  //alert("DELAY ATRASO");
      navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO, TELA_DE_ORIGEM_E_SITUACAO });
      //alert(  ComprasVendas + "  #  " + LATITUDE_USUARIO + "  #  " + LONGITUDE_USUARIO + "  #  " + TELA_DE_ORIGEM_E_SITUACAO   );
    }, (5000));



  }//function







  /********************************************************************************/
  /********************************************************************************/


  //  async function CANCELAR_VENDA_OU_COMPRA_EXPORTAR(IP_DO_SERVIDOR, compra_ou_venda, CELULAR_COMPRADOR_OU_VENDEDOR, ID_DA_POSTAGEM, USUARIO_DO_TELEFONE) {

  //   var txt_cell_usuario_JSON = JSON.parse(USUARIO_DO_TELEFONE);
  //   //alert(txt_cell_usuario_JSON.NUMERO_CELL_J); 
  //   //var numero_telefone_J = txt_cell_usuario_JSON.NUMERO_CELL_J;
  //   var numero_telefone_J = "";
  //   var id_J = ID_DA_POSTAGEM;
  //   var numero_telefone_comprador = "";

  //   var ComprasVendas = "";

  //   var TELA_DE_ORIGEM_E_SITUACAO = 'Tela_Menu_Compras';

  //   if (compra_ou_venda.includes('Compra')) {

  //     // alert("VAI CANCELAR COMPRA");
  //     numero_telefone_J = CELULAR_COMPRADOR_OU_VENDEDOR;

  //     numero_telefone_comprador = txt_cell_usuario_JSON.NUMERO_CELL_J;

  //     ComprasVendas = "Compras";

  //     TELA_DE_ORIGEM_E_SITUACAO = "Tela_ProdutosEtiquetas_Compras";

  //   } else if (compra_ou_venda.includes('Venda')) {

  //     //alert("VAI CANCELAR VENDA");
  //     numero_telefone_J = txt_cell_usuario_JSON.NUMERO_CELL_J;

  //     numero_telefone_comprador = CELULAR_COMPRADOR_OU_VENDEDOR;

  //     ComprasVendas = "Vendas";

  //     TELA_DE_ORIGEM_E_SITUACAO = "Tela_ProdutosEtiquetas_Vendas";

  //   }

  //   //alert(numero_telefone_J + "  #  " + id_J + "  #  " + numero_telefone_comprador);
  //   //await api.get('/comprar_direto', {
  //   Axios.get(IP_DO_SERVIDOR + 'cancelar_compra_venda', {
  //     params: {
  //       numero_telefone_J: numero_telefone_J,
  //       id_J: id_J,
  //       comprador_J: numero_telefone_comprador
  //     }

  //   });




  //   setTimeout(function () {  //alert("DELAY ATRASO");
  //     navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO, TELA_DE_ORIGEM_E_SITUACAO });
  //     //alert(  ComprasVendas + "  #  " + LATITUDE_USUARIO + "  #  " + LONGITUDE_USUARIO + "  #  " + TELA_DE_ORIGEM_E_SITUACAO   );
  //   }, (5000));



  // }//function

  /********************************************************************************/
  /********************************************************************************/







}//EXPORT DEFAUT


const stylesS = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


