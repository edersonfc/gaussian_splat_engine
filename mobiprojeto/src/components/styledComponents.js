import styled from 'styled-components/native';
// import styled, { keyframes } from 'styled-components';

import { Dimensions } from 'react-native';


var ALTURA =  Math.round(Dimensions.get('window').height);

////////////////////////////////////////////////////////////////////////////

// assets: ['./android/app/src/main/assets/fonts/']



export const ContainerPrincipal = styled.View`

        width: 100%;
        height: ${ALTURA}px;
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
        font-family: 'Roboto-Medium';
        font-weight: bold;
        color:'rgba(183,185,184,1)';
        background:#2A3E4A;
        opacity: 1; 

        /*
        font-family: arial black;
        */
                     
`;

export const IconeContainerRoda = styled.Text`

        align-items: center;
        justify-content: center;
        background:#2A3E4A;
 
`;



//     // color: #ffffff36;
//     // /*background-image: url(clipart.png);*/
// 	// background-image: url(clipart_2.png);
//     // -webkit-background-clip: text;
//     // background-size: auto;



//     // z-index: -1;
//     // color: #0984e3;
//     `;



// export const Wheel = styled.View`

//     height: 65px;
//     animation: wheel 10s linear infinite alternate;



//         background-position: left 0 top -30px;


//         background-position: left 500px top -30px;;




//         transform: rotate(720deg);



// `;


// export const Dive = styled.View`

//     width: '50%';
//     height: '50%';
// text-align: center;
// border-width: 2;
// border-color: aliceblue;
// background-color:'#2A3E4A';



// `;