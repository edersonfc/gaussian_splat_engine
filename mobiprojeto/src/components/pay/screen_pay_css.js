import styled from 'styled-components/native';
// import styled, { keyframes } from 'styled-components';

import { Dimensions } from 'react-native';

import React, { useEffect, useRef, useState, useContext } from 'react';

//SITE DE TODOS OS ICONE PARA O REACT-NATIVE
//https://oblador.github.io/react-native-vector-icons/
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

//SITE DE TABELAS DE CORES HTML ABAIXO
//https://www.homehost.com.br/blog/tutoriais/tabela-de-cores-html/


var LARGURA = Math.round(Dimensions.get('window').width);
var ALTURA = Math.round(Dimensions.get('window').height);

////////////////////////////////////////////////////////////////////////////

// assets: ['./android/app/src/main/assets/fonts/']



export const ContainerPrincipal = styled.View`

        width:  ${LARGURA}px;
        height: ${ALTURA}px;
        
        background-color: #2A3E4A;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        position: absolute;
        top: 0;
        /* opacity: 0.7; */

`;


export const ViewSeta = styled.View`

        width:  ${(LARGURA * 100) / 100}px;
        height: ${(ALTURA * 7) / 100}px;
        border-color: #fff;
        border-width: 0px;
        align-items: center;
        justify-content: center;
        top: 0;
       

`;


export const ViewTitulo_1 = styled.View`

        width:  ${(LARGURA * 90) / 100}px;
        height: ${(ALTURA * 4) / 100}px;
        border-color: #fff;
        border-width: 0px;
        align-items: center;
        justify-content: center;
        top: 0;
 `;

export const ViewTitulo_2 = styled.View`

        width:  ${(LARGURA * 90) / 100}px;
        height: ${(ALTURA * 4) / 100}px;
        font-size:20px;
        border-color: #fff;
        border-width: 0px;
        align-items: center;
        justify-content: center;
        top: 0;
 `;

export const ViewTaxa = styled.View`

        width:  ${(LARGURA * 90) / 100}px;
        height: ${(ALTURA * 15) / 100}px;
        font-size:20px;
        border-color: #fff;
        border-width: 1px;
        borderRadius: 12px;
        align-items: center;
        justify-content: center;
        top: 0;
 `;


export const ViewBorda = styled.View`
    width:  ${(LARGURA * 60) / 100}px;
    height: 10px;
    borderBottomWidth: 1px;
    border-color: #fffFFF;
 `;
 
 export const ViewFinal = styled.View`
     width:  ${(LARGURA * 90) / 100}px;
     justify-content: center;
     alignItems: center;
     borderBottomWidth: 1px;
     border-color: #fffFFF;
  `;

export const ViewEspacoAltura = styled.View`
     height: 2%;
 `;


export const Txt_1 = styled.Text`
        font-size:18px;
        /*font-weight: bold;*/
        color:'rgba(255,255,255,0.9)';
        background:#2A3E4A;
`;


export const Txt_2 = styled.Text`
        font-size:18px;
        /*font-weight: bold;*/
        color:'rgba(255,255,255,0.9)';
        background:#2A3E4A;
`;


export const Txt_3 = styled.Text`
        font-size:70px;
        color:'rgba(255,255,255,0.9)';
        background:#2A3E4A;
`;


export const Txt_4 = styled.Text`
        font-size:18px;
        color:'rgba(255,255,255,0.9)';
        background:#2A3E4A;
`;


export const Txt_5 = styled.Text`
        font-size:18px;
        color:'rgba(255,255,255,0.9)';
        
`;


export const Txt_6 = styled.Text`
        font-size:18px;
        color:'rgba(255,255,255,0.9)';
`;


export const Txt_7 = styled.Text`
        font-size:25px;
        font-weight: bold;
        color:'rgba(255,255,255,0.9)';
`;


export const Txt_8 = styled.Text`
        width:  ${(LARGURA * 90) / 100}px;
        border-width: 1px;
        justify-content: center;
        align-items: center;
        font-size:20px;
        font-weight: bold;
        color:'rgba(255,255,255,0.9)';
`;



export const ButtonCartao = styled.TouchableOpacity`
        width:  ${(LARGURA * 90) / 100}px;
        height: ${(ALTURA * 6) / 100}px;

        flex-direction: row;

        font-size:20px;
        border-color: #fff;
        background: #36BE54;
        border-width: 1px;
        borderRadius: 12px;
        align-items: center;
        justify-content: center;
        top: 0;
`;





export const ButtonGerarBoleto = styled.TouchableOpacity`
        width:  ${(LARGURA * 90) / 100}px;
        height: ${(ALTURA * 6) / 100}px;

        flex-direction: row;

        font-size:20px;
        border-color: #fff;
        background: #36BE54;
        border-width: 1px;
        borderRadius: 12px;
        align-items: center;
        justify-content: center;
        top: 0;
`;







export const StyledIconFontAwesome = styled(IconFontAwesome)`
        width:  ${(LARGURA * 92) / 100}px;
        font-Size:25px;
        color:'rgba(255,255,255,0.9)';
        border-color: #999333;
        border-width: 0px;
`;


export const StyledIconFontAwesome_2 = styled(IconFontAwesome)`
        width:  ${(LARGURA * 10) / 100}px;
        font-Size:25px;
        color:'rgba(255,255,255,0.9)';
        border-color: #999333;
        border-width: 0px;
`;

