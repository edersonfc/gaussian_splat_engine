import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, Animated, Image } from 'react-native';


//13052021
//Import react-native-splash-screen.
import SplashScreen from "react-native-splash-screen";

//13052021
// // import TelaSplash from './src/components/TelaSplash';
// import TelaSplash from './components/TelaSplash';


export default function PROPRIETARIO(param) {




  //ANIMAÇÃO DA TELA ABAIXO
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [visivel_falso_true, setVisivel_falso_true] = useState(false);
  // var SETENTA_PORCENTO_LARGURA_TELA = ((Largura_total_da_tela * 80) / 100);

  useEffect(async () => {

    Animated.timing(
      largura,
      {
        toValue: Math.round(Dimensions.get('window').width),
        duration: 1000,
        useNativeDriver: false
      }

    )
      .start(({ finished }) => {
        // completion callback
        setVisivel_falso_true(true);
      });

  }, []);
  //ANIMAÇÃO DA TELA ACIMA



  


  return (




    <View style={{
      height: Math.round(Dimensions.get('window').height),
      width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(255, 255, 255)', position: 'absolute'
    }}>


      <Animated.View style={{
        height: Math.round(Dimensions.get('window').height),
        width: largura, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(42, 62, 74)', position: 'absolute'
      }}>

        {visivel_falso_true && (
          <View style={{
            height: Math.round(Dimensions.get('window').height),
            width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(42, 62, 74)', position: 'absolute'
          }}>


            <Text style={{ fontSize: 40, color: 'white', fontFamily: 'Roboto-Medium' }}  >Software</Text>
            <Text style={{ fontSize: 40, color: 'white' }}  >Desenvolvido por</Text>
            <Text style={{ fontSize: 20, color: 'white' }}  >Ederson Feliciano Corsatto</Text>

            {/* <View style={{ height: '5%' }} />
            <Text style={{ fontSize: 40, color: 'white' }}  >Consultor Técnico</Text>
            <Text style={{ fontSize: 20, color: 'white' }}  >Gabriel Henrique Santos</Text> */}

            <View style={{ height: '5%' }} />

            <Text style={{ fontSize: 40, color: 'white', fontFamily: 'Roboto-Medium' }}  >Contato:</Text>
            <Text style={{ fontSize: 22, color: 'white' }}  >Fone: (67) 99324-4226</Text>
            <Text style={{ fontSize: 22, color: 'white' }}  >E-mail: edersonfc7@gmail.com</Text>

            <View style={{ height: '5%' }} />

            <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Roboto-Medium' }}  >Versão do App: 0.0.1.1</Text>

            <View style={{ height: '5%' }} />

            <TouchableOpacity style={[estilo.BOTAO_1]}
              onPress={() => {

                param.REMOTO_MOSTRAR_MOSTRAR_TELA_PROPRIETARIO(false);

              }}
            >
              <Text style={[estilo.TEXT_5]} >Fechar</Text>
            </TouchableOpacity>

            {/* <Image source={require('../../src/assets/images/owner.png')}  style={{width:'80%', height:'100%', borderWidth:1 }} /> */}

          </View>
        )}

      </Animated.View>

    </View>

  )

}


const estilo = StyleSheet.create({


  TEXT_5: {
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 25,
    color: 'rgba(255,255,255,0.9)'

  },

  BOTAO_1: {

    width: '50%',
    height: 50,

    alignContent: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'rgba(255,255,255,0.9)',
    // backgroundColor: BACKGROUND_COR,
  },

});