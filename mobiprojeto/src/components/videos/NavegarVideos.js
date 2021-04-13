import React, { PureComponent, useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from "@react-navigation/native";
//import { Icon } from 'react-native-vector-icons/Icon';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

//IMPORTAÇÕES ACIMA


//var andar = 0;
var URLs_Fotos = new Array();


//function PreencherLista(){setUrl_strings(String(URLs_Fotos[0]))}


//CLASSE PRINCIPAL DE EXECUÇÃO ABAIXO
export default function NavegarVideos(props) {



    var [andar, setAndar] = useState(0)

    var { URL_Video } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    //alert(URL_Video);

    return (


        <View style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'yellow' }}>



            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO  coloca dentro da View principal que fica dentro do return*/}
            <ScreenOrientation
                orientation={PORTRAIT}
                onChange={orientation => console.log('onChange', orientation)}
                onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
            />
            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA   coloca dentro da View principal que fica dentro do return */}


            <Text>EDERSON FELICIANO CORSATTO</Text>


            <VideoPlayer source={{ uri: URL_Video }}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />


        </View>
    )

}


// Later on in your styles..
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
