

import { Dimensions } from 'react-native';


import styled from 'styled-components/native';


var LARGURA_DA_TELA = Math.round(Dimensions.get('window').width);
var ALTURA_DA_TELA  = Math.round(Dimensions.get('window').height);


export const ContainerFundo = styled.View`

        width:  ${LARGURA_DA_TELA}px;
        height: ${ALTURA_DA_TELA}px;
        background-color: #2A3E4A;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        /* opacity: 0.7; */

`;




export const Texto = styled.Text`

        font-size:64px;
        border-width:0px;
      /*  font-family: 'Roboto-Medium'; */
        font-weight: bold;
        color:'rgba(183,185,184,1)';
        background:#2A3E4A;
        opacity: 1; 

        /*
        font-family: arial black;
        */
                     
`;