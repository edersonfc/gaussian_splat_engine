import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

//npm install react-native-webview
import { WebView } from 'react-native-webview';

function LoadingIndicatorView() {
  return <ActivityIndicator color='#009b88' size='large'  />
}


//13052021
//Import react-native-splash-screen.
import SplashScreen from "react-native-splash-screen";


//13052021
// // import TelaSplash from './src/components/TelaSplash';
// import TelaSplash from './components/TelaSplash';


export default function TERMOS_DE_USO(param) {

  const [largura_tela, setLargura_tela] = useState(Dimensions.get('window').width);
  const [altura_tela, setAltura_tela]   = useState(Dimensions.get('window').height);


  //   navigator.serviceWorker.getRegistrations().then(function(registrations) {
  //     for (let registration of registrations) {
  //         registration.unregister();
  //     }
  //  });


  return (


    <View style={{ height: '100%', width: '100%', alignItems: 'center', position: 'absolute', backgroundColor: 'rgb(255,255,255)' }}>

      {/******************************* CONTEINER PRINCIPAL COMEÇA NA LINHA ACIMA *************************************/}

      {/*****/}
      <View style={{ height: altura_tela * 0.09, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F4F4F' }}>
        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium' }}  >Termos de Condições de Uso</Text>
        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium' }}  >e Política de Privacidade</Text>
      </View>


      {/*****/}
      <View style={{ height: altura_tela * 0.70, width: '90%', borderWidth: 0, borderTopLeftRadius: 30, backgroundColor: '#fff' }}>

        <WebView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          originWhitelist={['*']}

          source={{ uri: "https://mobilegadoapp.web.app" }}// => SERVIDOR DA DIGITALOCEAN
          // source={{ uri: "https://gadoapp.online:8080/termos_de_uso/" }}// => SERVIDOR DA DIGITALOCEAN
          // source={{ uri: "http://159.89.87.76:8080/termos_de_uso/" }}// => SERVIDOR DA DIGITALOCEAN
        // source={{ uri: "http://192.168.0.107:8080/termos_de_uso/" }}// => SERVIDOR DA DIGITALOCEAN

        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}


        />

      </View>

      {/* fontFamily: 'OpenSans-ExtraBold',  , fontFamily: 'Roboto-Medium'  */}

      {/*****/}
      <View style={{ height: altura_tela * 0.06, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <View style={{ height: 3, width: '80%', borderTopWidth: 2, borderColor: '#C0C0C0' }}></View>
        <Text style={{ fontSize: 22, fontFamily: 'OpenSans-ExtraBold', color: 'blue' }}  >Li e Aceito os Termos de Uso !</Text>
      </View>




      {/*****/}
      <View style={{ height: altura_tela * 0.10, flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%', width: '100%', justifyContent: 'space-between', backgroundColor: 'white' }} >

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


      {/******************************* CONTEINER PRINCIPAL FECHAMENTO NA LINHA ABAIXO *************************************/}

    </View>



  )

}