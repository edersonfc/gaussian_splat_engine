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


import { TextInputMask } from 'react-native-masked-text';


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



export const ViewSeta = styled.TouchableOpacity`

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


export const ViewButtons = styled.View`

width:  ${(LARGURA * 80) / 100}px;
height: ${(ALTURA * 15) / 100}px;

flex-direction: row;

border-color: #fff;
border-width: 0px;
align-items: center;
justify-content: space-between;
top: 0;
`;


export const ViewBorda = styled.View`
    width:  ${(LARGURA * 60) / 100}px;
    height: 10px;
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
        width:  ${(LARGURA * 85) / 100}px;
        height: 25px;
        borderWidth: 0px;
        font-size:13px;
        /*font-weight: bold;*/
        color:'rgba(255,255,255,0.9)';
        background:#2A3E4A;
`;


export const StyledIconFontAwesome = styled(IconFontAwesome)`
        width:  ${(LARGURA * 92) / 100}px;
        font-Size:25px;
        color:'rgba(255,255,255,0.9)';
        border-color: #999333;
        border-width: 0px;
`;

var TESTE = 0

export const TextInputMaskCaixa = styled(TextInputMask)`

        width: ${props => props.largura * ALTURA }px;
        height:40px;
        borderWidth:1px;
        padding: 0px;
        font-size:24px;
        text-align: center;
        justify-content: center;
        backgroundColor: #FFF;
        borderRadius:10px;
    `;




export const ButtonCancelarPagar = styled.TouchableOpacity`
        width:  ${(LARGURA * 35) / 100}px;
        height: ${(ALTURA * 6) / 100}px;

        flex-direction: row;

        font-size:20px;
        border-color: #fff;
        /*background: #FF5353;*/
        background: ${props => props.cor_fundo}; 

        /* background: ${({ iconColor }) => iconColor ? iconColor : '#fff'}; */
        
        border-width: 1px;
        borderRadius: 25px;
        align-items: center;
        justify-content: center;
        top: 0;
`;



export const ButtonPagar = styled.TouchableOpacity`
        width:  ${(LARGURA * 35) / 100}px;
        height: ${(ALTURA * 6) / 100}px;

        flex-direction: row;

        font-size:20px;
        border-color: #fff;
        background: #36BE54;
        border-width: 1px;
        borderRadius: 25px;
        align-items: center;
        justify-content: center;
        top: 0;
`;