////FOI DESATIVADO O CÓDIGO ABAIXO O REPRODUTOR DE VIDEO E TROCADO PELO  CÓDIGO ABAIXO
// import React, { PureComponent, useState, useEffect } from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// import { useNavigation } from "@react-navigation/native";
// //import { Icon } from 'react-native-vector-icons/Icon';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import { color } from 'react-native-reanimated';

// import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';

// //IMPORTAÇÕES ACIMA


// //var andar = 0;
// var URLs_Fotos = new Array();


// function PreencherLista(){setUrl_strings(String(URLs_Fotos[0]))}


// //CLASSE PRINCIPAL DE EXECUÇÃO ABAIXO
// export default function NavegarVideos(props) {
//     var [andar, setAndar] = useState(0)
//     var { URL_Video } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
//     //alert(URL_Video);




//     return (


//         <View style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'yellow' }}>

//             {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO  coloca dentro da View principal que fica dentro do return*/}
//             <ScreenOrientation
//                 orientation={LANDSCAPE_LEFT}
//                 // orientation={PORTRAIT}
//                 // onChange={orientation => console.log('onChange', orientation)}
//                 // onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
//             />
//             {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA   coloca dentro da View principal que fica dentro do return */}


//             <VideoPlayer source={{ uri: URL_Video }}   // Can be a URL or a local file.
//                 ref={(ref) => {
//                     this.player = ref
//                 }}                                      // Store reference
//                 onBuffer={this.onBuffer}                // Callback when remote video is buffering
//                 onError={this.videoError}               // Callback when video cannot be loaded
//                 style={styles.backgroundVideo} />


//         </View>
//     )

// }


// // Later on in your styles..
// var styles = StyleSheet.create({
//     backgroundVideo: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
// });

//FOI DESATIVADO ACIMA O REPRODUTOR DE VIDEO E TROCADO PELO  CÓDIGO ABAIXO



/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/

import React, { useState, useRef, useEffect } from 'react';
import { LogBox, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';

import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Video from 'react-native-video';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";


// const VideoPlayer = (props) => {
const NavegarVideos = (props) => {//#1#
    // export default function NavegarVideos(props) {//#1#

    const [posicaoPaisagem, setPosicaoPaisagem] = useState('LANDSCAPE_LEFT');
    const [posicao, setPosicao] = useState(true);

    /*****************************************************************/

    const navigation = useNavigation();//#1#

    var [andar, setAndar] = useState(0);//#1#
    var { URL_Video } = props.route.params;//#1# // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    //alert(URL_Video);//#1#
    /*****************************************************************/


    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(false);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
    };



    var [icone, setIcone] = useState(false);


    useEffect(() => {

        function MUDAR_POSICAO() {

            if (posicao === true) {

                setPosicaoPaisagem('LANDSCAPE_LEFT');

            } else if (posicao === false) {

                setPosicaoPaisagem('PORTRAIT');

            }//else if

        }//function MUDAR_POSICAO()

        MUDAR_POSICAO();

    }, [posicao]);








    return (

        <View>

            <ScreenOrientation orientation={posicaoPaisagem} />
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={'cover'}
                source={{ uri: URL_Video }}
                style={styles.backgroundVideo}

                maxBitRate={5000}
            />


            <MediaControls
                isFullScreen={false}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={"red"}
                playerState={playerState}
                sliderStyle={{ containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />


            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 0, borderColor: 'yellow', position: 'absolute' }} >


                <TouchableOpacity style={{ flexDirection: 'row', width: '50%', justifyContent: 'center' }} onPress={() => { navigation.goBack(null); }}   >
                    <Icon style={{ height: 50, marginLeft: 30, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='arrow-left' />
                    <Text style={{ height: 50, marginLeft: 5, fontSize: 15, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} >Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', width: '50%', justifyContent: 'center', borderWidth: 0, borderColor: 'green' }}
                    onPress={() => {
                        setPosicao(oldState => !oldState);
                        setIcone(oldState => !oldState);

                    }}  >

                    {icone ?
                        <Icon style={{ height: 50, marginLeft: 20, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='repeat' />
                        :
                        <Icon style={{ height: 50, marginLeft: 20, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='rotate-left' />
                    }

                </TouchableOpacity>


            </TouchableOpacity>


        </View>

    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: '100%',
        width: '100%',
    },
    mediaControls: {
        height: '100%',
        flex: 1,
        alignSelf: 'center',
    },
});

// export default VideoPlayer;
export default NavegarVideos;