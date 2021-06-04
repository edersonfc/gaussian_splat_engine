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
import { QUANTIDADES_VEZES_PRECOS, MOEDA_P_DOUBLE_OU_FLOAT } from '../CALCULO_E_FORMATACAO/FORMATACAO';


import {
    ContainerPrincipal, View_1, View_2, View_borda, StyledIconFontAwesome, View_touchable_1, Txt_1, Txt_2, Txt_3, Txt_4
} from './tabela_planos_css'


var LARGURA = Math.round(Dimensions.get('window').width);
var ALTURA = Math.round(Dimensions.get('window').height);


export default function Tabela_planos(params) {

    var mes_1_valor_tx = "59,90";
    var mes_3_valor_tx = "159,90";
    var mes_6_valor_tx = "299,90";
    var mes_12_valor_tx = "569,90";

    var COLUNA_1 = 0.10;
    var COLUNA_2 = 0.4;
    var COLUNA_3 = 0.10;
    var COLUNA_4 = 0.19;


    return (


        <ContainerPrincipal

            altura={ALTURA}
            largura={LARGURA}
            cor_fundo={'#2A3E4A'}

        >

            <View_1 altura={40} largura={LARGURA}  >
                <Txt_1 altura={60} largura={LARGURA}  >Escolha um Plano para {"\n"} esta publicação</Txt_1>
            </View_1>

            <View style={{ height: 30 }} />

            <View_1 altura={40} largura={LARGURA}  >
                <Txt_1 altura={30} largura={LARGURA} >Tabela de Preços</Txt_1>
            </View_1>

            <View style={{ height: 8 }} />

            <View_borda altura={1} largura={LARGURA * 0.8} />

            <View style={{ height: 10 }} />

            {/**********************************************************************************/}
            <View_2 altura={40} largura={LARGURA * 0.8}  >

                <View_2 altura={40} largura={LARGURA * COLUNA_1}  >
                    <StyledIconFontAwesome name='circle-thin' largura={LARGURA * COLUNA_1} />
                </View_2>

                <View_2 altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_2}  alinhamento={'left'} >1 Mês</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_3}  alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}>{mes_1_valor_tx}</Txt_2>
                </View_2>

            </View_2>


            {/**********************************************************************************/}
            <View_2 altura={40} largura={LARGURA * 0.8}  >

                <View_2 altura={40} largura={LARGURA * COLUNA_1}  >
                   <StyledIconFontAwesome name='circle-thin' largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'} >3 Mês</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_3}  alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_3_valor_tx}</Txt_2>
                </View_2>

            </View_2>



            {/**********************************************************************************/}
            <View_2 altura={40} largura={LARGURA * 0.8}  >

                <View_2 altura={40} largura={LARGURA * COLUNA_1}  >
                    <StyledIconFontAwesome name='circle-thin' largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'}  >6 Mês</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_3}  alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_6_valor_tx}</Txt_2>
                </View_2>

            </View_2>


            {/**********************************************************************************/}
            <View_2 altura={40} largura={LARGURA * 0.8}  >

                <View_2 altura={40} largura={LARGURA * COLUNA_1}  >
                   <StyledIconFontAwesome name='circle-thin' largura={LARGURA * COLUNA_1} />
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_2}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_2} alinhamento={'left'}  >12 Mês</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_3}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_3}  alinhamento={'right'} >R$</Txt_2>
                </View_2>
                <View_2 altura={40} largura={LARGURA * COLUNA_4}  >
                    <Txt_2 altura={30} largura={LARGURA * COLUNA_4} alinhamento={'right'}  >{mes_12_valor_tx}</Txt_2>
                </View_2>

            </View_2>

            <View style={{ height: 20 }} />

            <Txt_3 altura={70} largura={LARGURA} >
                ATENÇÃO ! {"\n"}
                Publicações que contém vídeos {"\n"}
                custa  50% porcento amais.
            </Txt_3>

            <View style={{ height: 20 }} />

            <Txt_3 altura={35} largura={LARGURA} >
                Esta Publicação não Contém Vídeos
            </Txt_3>

            <View style={{ height: 5 }} />

            <View_touchable_1 largura={LARGURA * 0.3} altura={ALTURA * 0.07} cor_borda={'#FFF'} >
                <Txt_4 cor_txt={'#FFF'} >
                    Editar
                </Txt_4>

            </View_touchable_1>

            <View style={{ height: 30 }} />

            <View_touchable_1 largura={LARGURA * 0.3} altura={ALTURA * 0.07} cor_borda={'#25E7DB'} >
                <Txt_4 cor_txt={'#25E7DB'} >
                    Postar
                </Txt_4>

            </View_touchable_1>


        </ContainerPrincipal>



    )


}



const estilo_nao_usado = StyleSheet.create({

    circle:{

        

    }

});