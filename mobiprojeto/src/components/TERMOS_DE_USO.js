import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//npm install react-native-webview
import { WebView } from 'react-native-webview';


//13052021
//Import react-native-splash-screen.
import SplashScreen from "react-native-splash-screen";

//13052021
// // import TelaSplash from './src/components/TelaSplash';
// import TelaSplash from './components/TelaSplash';


export default function TERMOS_DE_USO(param) {

  return (


    <View style={{ height: '100%', width: '100%', alignItems: 'center', position:'absolute', backgroundColor: 'rgb(228,229,233)' }}>

{/******************************* CONTEINER PRINCIPAL COMEÇA NA LINHA ACIMA *************************************/}

      {/*****/}
      <View style={{ height: '7%', width: '100%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F4F4F' }}>
        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium' }}  >Termos e Condições de Uso</Text>
      </View>


      {/*****/}
      <View style={{ height: '60%', width: '100%', borderWidth: 0, borderTopLeftRadius: 30, backgroundColor: '#fff' }}>

        <WebView 
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          originWhitelist={['*']}
          // source={{ uri: "http://159.89.87.76:3000/" }}// => SERVIDOR DA DIGITALOCEAN
          source={{ uri: "http://192.168.0.107:3000" }}// => SERVIDOR DA DIGITALOCEAN


          // source={{ uri: "https://www.campogrande.ms.gov.br/" }}// => SERVIDOR DA DIGITALOCEAN
       
       />

      </View>



      {/*****/}
      <View style={{ height: '5%', width: '100%', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}  >Li e Aceito os Termos de Uso !</Text>
      </View>




     {/*****/}
      <View style={{height: '7%', flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%',  width: '100%', justifyContent: 'space-between', backgroundColor: 'white' }} >

        <TouchableOpacity style={{ width: '45%', borderWidth: 0, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {

            param.REMOTO_NAO_ACEITAR_TERMOS_DE_USO_E_FECHAR_TELA();

          }} >
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium' }}  >Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '45%', borderWidth: 0, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00CED1' }}
          onPress={() => {

            param.REMOTO_ACEITAR_TERMOS_DE_USO_E_FECHAR_TELA();

          }} >
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium' }}  >Aceitar</Text>
        </TouchableOpacity>

      </View>

      {/*****/}
      {/* <View style={{ height: '5%', backgroundColor: '#fff' }}></View> */}


{/******************************* CONTEINER PRINCIPAL FECHAMENTO NA LINHA ABAIXO *************************************/}

    </View>

    

  )

}