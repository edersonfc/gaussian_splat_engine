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



export const View_1 = styled.View`
     width:  ${props => props.largura}px;
     height: ${props => props.altura}px;
     
     justifyContent: center;
     alignItems:     center;
     position:       absolute;
     backgroundColor: #FFF;
     `;


export const View_2 = styled.View`
     width:  ${props => props.largura}px;
     height: ${props => props.altura}px;
`;

export const View_3 = styled.View`

     flexDirection: column;
     width:  ${props => props.largura}px;
     height: ${props => props.altura}px;
     /* backgroundColor: #36BE54; */
     background: ${props => props.cor_fundo}; 
     alignItems: center;
     justifyContent: center;
     `;


export const View_4 = styled.View`
  /* width:  ${props => props.largura}px; */
     height: ${props => props.altura}px;
`;




export const Txt_1 = styled.Text`
    width:  ${props => props.largura}px;
 /* height: ${props => props.altura}px; */

    color: #FFF;
    fontSize: 25px;
    fontWeight: bold;
    textAlign: center;
    borderWidth: 0px;
    borderColor: #777000
`;


export const Txt_2 = styled.Text`
    width:  ${props => props.largura}px;
    height: ${props => props.altura}px;
    color: #FFF;
    fontSize: 20px;
    fontWeight: bold;

    alignItems: center;
    textAlign: center;
    justifyContent: center;

    borderWidth: 0px;
    borderColor: #777000
`;



export const ButtonCancelarTentarNovamente = styled.TouchableOpacity`
    width:  ${props => props.largura}px;
    height: ${props => props.altura}px;

    borderWidth:   2px;
    borderRadius: 30px;
    borderColor: #fff;
    textAlign: center;
    justifyContent: center;
    background: ${props => props.cor_fundo}; 
    `;



export const StyledIconFontAwesome = styled(IconFontAwesome)`
    width:  ${props => props.largura}px;
    height: ${props => props.altura}px;
    `;
