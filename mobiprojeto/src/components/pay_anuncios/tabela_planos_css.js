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


export const ContainerPrincipal = styled.View`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;
        background: ${props => props.cor_fundo};
        align-items: center;

        borderWidth: 0px;
        border-color: #FFF555;  
`;

export const View_1 = styled.View`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;
        height: auto;
        borderWidth: 0px;
        
        align-items: center;
       `;

       
//        export const View_2 = styled.View`
       export const View_2 = styled.TouchableOpacity`
               flex-direction: row;
               width:  ${props => props.largura}px;
               height: ${props => props.altura}px;

               alignItems: center;
               borderWidth: 0px;   
               
                 /**/ background:#7676;
              `;
              




              export const View_3 = styled.View`
                      flex-direction: row;
                      width:  ${props => props.largura}px;
                      height: ${props => props.altura}px;
                      borderWidth: 0px;           
                     `;





       export const View_borda = styled.View`
                width:  ${props => props.largura}px;
                height: ${props => props.altura}px;
                borderWidth: 1px;
                border-color: #FFF;  
       `;


export const View_touchable_1 = styled.TouchableOpacity`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;
        borderWidth: 1px;
        border-color: ${props => props.cor_borda};
        borderRadius: 25px;

        justifyContent:center;
        textAlign:center;
`;



export const View_touchable_2 = styled.TouchableOpacity`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;
        borderWidth: 1px;
        border-color: ${props => props.cor_borda};
        borderRadius: 25px;

        justifyContent:center;
        textAlign:center;
`;




export const Txt_1 = styled.Text`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;

        font-Size:25px;
        color:'rgba(255,255,255,0.9)';
        textAlign:center;
`;


export const Txt_2 = styled.Text`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;

        font-Size:25px;
     
        color: ${props => props.selected ? '#25E7DB' : 'rgba(255,255,255,0.9)'};

         textAlign: ${props => props.alinhamento}
`;   



export const Txt_3 = styled.Text`
        width:  ${props => props.largura}px;
        height: ${props => props.altura}px;

        font-Size:20px;
        color:yellow;

        textAlign:center;
`;


export const Txt_4 = styled.Text`

        /*
        width:auto;

        height: ${props => props.altura}px;
        */

        font-Size:20px;
        color:  ${props => props.cor_txt};

        border-color: #999333;
        border-width: 0px;

        padding:0px;

        justifyContent:center;
        textAlign:center;

        /* background:#7676; */
`;


export const StyledIconFontAwesome = styled(IconFontAwesome)`
         width:  ${props => props.largura}px;
        font-Size:28px;
        textAlign:left;
        paddingLeft:20px;
        color:'rgba(255,255,255,0.9)';
        border-color: #999333;
        border-width: 0px;
       
`;



export const StyledIconFontAwesome_2 = styled(IconFontAwesome)`
         width:  ${props => props.largura}px;
        font-Size:25px;
        textAlign:center;
        /* color:'rgba(255,255,255,0.9)'; */

        color: ${props => props.selected ? '#25E7DB' : 'rgba(255,255,255,0.9)'};

        border-color: #999333;
        border-width: 0px;
       
`;