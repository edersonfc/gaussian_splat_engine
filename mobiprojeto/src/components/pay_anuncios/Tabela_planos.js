import React, { useEffect, useRef, useState, useContext } from 'react';

import {
    View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, PermissionsAndroid, TouchableHighlight, Keyboard, Dimensions, Animated,
    cor_txt, StyleSheet

} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../context/UsersContext';

//npm i socket.io-client
import io from 'socket.io-client';

// import {QUANTIDADES_VEZES_PRECOS } from './CALCULO_E_FORMATACAO/FORMATACAO';
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT, DOUBLE_OU_FLOAT_P_MOEDA } from '../CALCULO_E_FORMATACAO/FORMATACAO';


import {
    ContainerPrincipal, View_1, View_2, View_borda, StyledIconFontAwesome, StyledIconFontAwesome_2, View_touchable_1, Txt_1, Txt_2, Txt_3, Txt_4
} from './tabela_planos_css'


var LARGURA = Math.round(Dimensions.get('window').width);
var ALTURA = Math.round(Dimensions.get('window').height);


var ARRAY_PLANO_VALOR_SELECIONADO = new Array();

var valor_do_plano = "";

var propostas = {

    precoSugerido: "",
    quantidadeCabecasOuPesos: "",
    imagens_ou_videos: "",
    valor_do_plano: valor_do_plano

}


export default function Tabela_planos(props) {



    // alert(  JSON.stringify(params)  );  

    var { precoSugerido, quantidadeCabecasOuPesos, produto } = props.route.params;
    // alert( precoSugerido +"  #  "+ quantidadeCabecasOuPesos  +"  #  "+  JSON.stringify(produto)  ); 

    // 14-06-2021
    // console.log(JSON.stringify(produto));

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    var imagens_ou_videos = JSON.stringify(produto);

    const navigation = useNavigation();

    // var [mes_1_valor_tx, setMes_1_valor_tx]   = useState(59.90);
    // var [mes_3_valor_tx, setMes_3_valor_tx]   = useState(159.90);
    // var [mes_6_valor_tx, setMes_6_valor_tx]   = useState(299.90);
    // var [mes_12_valor_tx, setMes_12_valor_tx] = useState(569.90);

    var [mes_1_valor_tx, setMes_1_valor_tx] = useState(VARIAVEL_GLOBAL.TABELA_PRECOS_ANUNCIO.MES_1);
    var [mes_3_valor_tx, setMes_3_valor_tx] = useState(VARIAVEL_GLOBAL.TABELA_PRECOS_ANUNCIO.MES_3);
    var [mes_6_valor_tx, setMes_6_valor_tx] = useState(VARIAVEL_GLOBAL.TABELA_PRECOS_ANUNCIO.MES_6);
    var [mes_12_valor_tx, setMes_12_valor_tx] = useState(VARIAVEL_GLOBAL.TABELA_PRECOS_ANUNCIO.MES_12);

    var [contemNaoContemVideos, setContemNaoContemVideos] = useState("");



    // //CALCULO ABAIXO
    // var a = MOEDA_P_DOUBLE_OU_FLOAT(QUANTIDADES_VEZES_PRECOS(quantidadeCabecasOuPesos, precoSugerido ));
    //         alert(a);
    // //CALCULO ACIMA



    var COLUNA_1 = 0.10;
    var COLUNA_2 = 0.4;
    var COLUNA_3 = 0.10;
    var COLUNA_4 = 0.2;




    propostas = {

        precoSugerido: precoSugerido,
        quantidadeCabecasOuPesos: quantidadeCabecasOuPesos,
        imagens_ou_videos: imagens_ou_videos,
        valor_do_plano: ""

    }




    useEffect(() => {


        // alert( JSON.parse(propostas.imagens_ou_videos).IMAGENS.length );
        // alert( JSON.parse(propostas.imagens_ou_videos).VIDEOS.length );

        if (JSON.parse(propostas.imagens_ou_videos).VIDEOS.length > 0) {

            setMes_1_valor_tx((mes_1_valor_tx * 0.8) + mes_1_valor_tx);
            setMes_3_valor_tx((mes_3_valor_tx * 0.8) + mes_3_valor_tx);
            setMes_6_valor_tx((mes_6_valor_tx * 0.8) + mes_6_valor_tx);
            setMes_12_valor_tx((mes_12_valor_tx * 0.8) + mes_12_valor_tx);

            // alert(mes_1_valor_tx);

            setContemNaoContemVideos("Contém");

            ARRAY_PLANO_VALOR_SELECIONADO = [mes_1_valor_tx, mes_3_valor_tx, mes_6_valor_tx, mes_12_valor_tx];

        } else {

            setMes_1_valor_tx(mes_1_valor_tx);
            setMes_3_valor_tx(mes_3_valor_tx);
            setMes_6_valor_tx(mes_6_valor_tx);
            setMes_12_valor_tx(mes_12_valor_tx);

            setContemNaoContemVideos("não Contém");

            ARRAY_PLANO_VALOR_SELECIONADO = [mes_1_valor_tx, mes_3_valor_tx, mes_6_valor_tx, mes_12_valor_tx];

        }

        valor_do_plano = "";


    }, []);



    var ARRAY_SELECIONADOS = new Array();

    ARRAY_SELECIONADOS = [false, false, false, false]

    //useState COM ARRAY DE BOOLEAN
    const [estado_array, setEstado_array] = useState(ARRAY_SELECIONADOS);

    //FUNÇÃO ALTERNAR COR COM CLIQUE E RE-CLIQUE no useState COM ARRAY DE BOOLEAN


    // useEffect(() => {

    const alernarTrueFalse = (index) => {

        // setEstado_array(prevState => prevState.map((item, idx) => idx === index ? !item : item));
        ARRAY_SELECIONADOS.map((itens, i) => {

            if (index === i) {

                ARRAY_SELECIONADOS[i] = true;
                setEstado_array(ARRAY_SELECIONADOS);

                // alert(ARRAY_PLANO_VALOR_SELECIONADO[i]);
                valor_do_plano = DOUBLE_OU_FLOAT_P_MOEDA(ARRAY_PLANO_VALOR_SELECIONADO[i], 'R$');

                if (index === 0) { VARIAVEL_GLOBAL.tempoPostagem_G = 30 }
                else if (index === 1) { VARIAVEL_GLOBAL.tempoPostagem_G = 90 }
                else if (index === 2) { VARIAVEL_GLOBAL.tempoPostagem_G = 180 }
                else if (index === 3) { VARIAVEL_GLOBAL.tempoPostagem_G = 360 }

            } else {

                ARRAY_SELECIONADOS[i] = false;
                setEstado_array(ARRAY_SELECIONADOS);

            }


        });

    };





    propostas = {

        precoSugerido: precoSugerido,
        quantidadeCabecasOuPesos: quantidadeCabecasOuPesos,
        imagens_ou_videos: imagens_ou_videos,
        valor_do_plano: valor_do_plano

    }







    return (


        <ContainerPrincipal

            altura={ALTURA}
            largura={LARGURA}
            cor_fundo={'#2A3E4A'}

        >
            <View style={{ height: 10 }} />
            <StyledIconFontAwesome largura={LARGURA} name='arrow-left' onPress={(e) => { navigation.goBack(null); }} />


            <View_1 altura={40} largura={LARGURA}  >
                <Txt_1 altura={60} largura={LARGURA}  >Escolha um Plano para {"\n"} esta publicação</Txt_1>
            </View_1>

            <View style={{ height: 10 }} />

            <View_1 altura={40} largura={LARGURA}  >
                <Txt_1 altura={30} largura={LARGURA} >Tabela de Preços</Txt_1>
            </View_1>

            <View style={{ height: 8 }} />

            <View_borda altura={1} largura={LARGURA * 0.8} />

            <View style={{ height: 10 }} />

            {/**********************************************************************************/}
            <View_2 altura={50} largura={LARGURA * 0.8} >

                <View_2 onPress={() => { alernarTrueFalse(0); }} altura={40} largura={LARGURA * COLUNA_1} >
                    <StyledIconFontAwesome_2 selected={estado_array[0]} name={estado_array[0] ? 'check-circle' : 'circle-thin'} largura={LARGURA * COLUNA_1} />
                </View_2>

                <View_2 onPress={() => { alernarTrueFalse(0); }} altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 selected={estado_array[0]} altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'} >1 Mês</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(0); }} altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 selected={estado_array[0]} altura={30} largura={LARGURA * COLUNA_3} alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(0); }} altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 selected={estado_array[0]} altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}>{mes_1_valor_tx}</Txt_2>
                </View_2>

            </View_2>


            {/**********************************************************************************/}
            <View_2 altura={50} largura={LARGURA * 0.8}  >

                <View_2 onPress={() => { alernarTrueFalse(1); }} altura={40} largura={LARGURA * COLUNA_1}  >
                    <StyledIconFontAwesome_2 selected={estado_array[1]} name={estado_array[1] ? 'check-circle' : 'circle-thin'} largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(1); }} altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 selected={estado_array[1]} altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'} >3 Mês</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(1); }} altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 selected={estado_array[1]} altura={30} largura={LARGURA * COLUNA_3} alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(1); }} altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 selected={estado_array[1]} altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_3_valor_tx}</Txt_2>
                </View_2>

            </View_2>



            {/**********************************************************************************/}
            <View_2 altura={50} largura={LARGURA * 0.8}  >

                <View_2 onPress={() => { alernarTrueFalse(2); }} altura={40} largura={LARGURA * COLUNA_1}  >
                    <StyledIconFontAwesome_2 selected={estado_array[2]} name={estado_array[2] ? 'check-circle' : 'circle-thin'} largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(2); }} altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 selected={estado_array[2]} altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'}  >6 Mês</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(2); }} altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 selected={estado_array[2]} altura={30} largura={LARGURA * COLUNA_3} alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(2); }} altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 selected={estado_array[2]} altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_6_valor_tx}</Txt_2>
                </View_2>

            </View_2>


            {/**********************************************************************************/}
            <View_2 altura={50} largura={LARGURA * 0.8}  >

                <View_2 onPress={() => { alernarTrueFalse(3); }} altura={40} largura={LARGURA * COLUNA_1}  >
                    <StyledIconFontAwesome_2 selected={estado_array[3]} name={estado_array[3] ? 'check-circle' : 'circle-thin'} largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(3); }} altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 selected={estado_array[3]} altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'}  >12 Mês</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(3); }} altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 selected={estado_array[3]} altura={30} largura={LARGURA * COLUNA_3} alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 onPress={() => { alernarTrueFalse(3); }} altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 selected={estado_array[3]} altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_12_valor_tx}</Txt_2>
                </View_2>

            </View_2>

            <View style={{ height: 20 }} />

            <Txt_3 altura={70} largura={LARGURA} >
                ATENÇÃO ! {"\n"}
                Publicações que contém vídeos {"\n"}
                custa  50% porcento amais.
            </Txt_3>

            <View style={{ height: 10 }} />

            <Txt_3 altura={35} largura={LARGURA} >
                Esta Publicação {contemNaoContemVideos} Vídeos
            </Txt_3>

            <View style={{ height: 2 }} />

            <View_touchable_1 largura={LARGURA * 0.3} altura={ALTURA * 0.07} cor_borda={'#FFF'}
                onPress={(e) => { navigation.goBack(null); }}
            >
                <Txt_4 cor_txt={'#FFF'} >
                    Editar
                </Txt_4>

            </View_touchable_1>

            <View style={{ height: 10 }} />

            <View_touchable_1 largura={LARGURA * 0.3} altura={ALTURA * 0.07} cor_borda={'#25E7DB'}
                onPress={(e) => {

                    if (valor_do_plano === "") {

                        alert("É necessário Escolher um Plano na Tabela de Preços !");

                    } else {

                      ////ABAIXO FOI DESATIVADO OBSERVAR SE O CÓDIGO É DESNECESSARIO DEPOIS
                                // if (!VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA.includes("ATIVAR PUBLICACAO") &&
                                //     !VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA.includes("TAXA") ) {

                                //         alert(VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA);

                                //     VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA = "PUBLICACAO";
                                // }
                     ////ACIMA FOI DESATIVADO OBSERVAR SE O CÓDIGO É DESNECESSARIO DEPOIS

                                // alert("TIPO É => "+VARIAVEL_GLOBAL.COBRANCA_APP_PUBLICACAO_OU_TAXA);
                                // return 0;


                        navigation.navigate("Screen_pay", { propostas });
                        // alert(  JSON.stringify(  propostas  )  );
                        // alert( VARIAVEL_GLOBAL.tempoPostagem_G );
                    }

                }}
            >
                <Txt_4 cor_txt={'#25E7DB'} >
                    Postar
                </Txt_4>

            </View_touchable_1>


        </ContainerPrincipal>



    )


}



const estilo_nao_usado = StyleSheet.create({

    circle: {



    }

});