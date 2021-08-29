//FOI DESATIVADO ACIMA O REPRODUTOR DE VIDEO E TROCADO PELO  CÓDIGO ABAIXO

/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/


import React, { useState, useRef, useEffect, useContext } from 'react';
import { LogBox, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
//npm install react-native-webview
import { WebView } from 'react-native-webview';
// import GlobalContext from '../../context/UsersContext';
import HTMLView from 'react-native-htmlview';
// const VideoPlayer = (props) => {

//import GlobalContext from '../../context/UsersContext';

import GlobalContext from '../../context/UsersContext';


import VideoPlayer from 'react-native-video-controls';




let NavegarVideos = (props) => {//#1#

    // export default function NavegarVideos(props) {


    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    // LANDSCAPE_LEFT   PORTRAIT
    const [posicaoPaisagem, setPosicaoPaisagem] = useState('PORTRAIT');
    const [posicao, setPosicao] = useState(true);
    const [paddinDoVideo, setPaddinDoVideo] = useState('0%');

    /*****************************************************************/
    const navigation = useNavigation();//#1#
    var [andar, setAndar] = useState(0);//#1#
    let { URL_Video } = props.route.params;//#1# // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    let { URL_REMOTA_BOOLEAN } = props.route.params;
    //alert(URL_Video);//#1#
    /*****************************************************************/
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);
    const [E_BUFFER, setE_BUFFER] = useState(true);




    const [stadoUrl, setStadoUrl] = useState("");
    const [url_remota_url_boolean_stado, setUrl_remota_url_boolean_stado] = useState(URL_REMOTA_BOOLEAN);

    const [renderDaTela, setRenderDaTela] = useState(true);

    const [botaoExcluirBoolean, setBotaoExcluirBoolean] = useState(false);

    useEffect(() => {

        setRenderDaTela(true);
        setStadoUrl(URL_Video);

    }, [renderDaTela, stadoUrl, url_remota_url_boolean_stado]);


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

    //TENTANDO IMPLEMENTAR BUFFER AQUI ABAIXO


    // const onBuffer = (data) => {
    //     if (E_BUFFER) {
    //         setE_BUFFER(data.onBuffer);
    //     }
    //     return true;
    // };

    const onBuffer = () => {
        // setIsBuffering(true);
        return true;
    };


    //TENTANDO IMPLEMENTAR BUFFER AQUI ACIMA
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
                setPaddinDoVideo('0%');
            } else if (posicao === false) {
                setPosicaoPaisagem('PORTRAIT');
                setPaddinDoVideo('50%');

            }//else if
        }//function MUDAR_POSICAO()
        MUDAR_POSICAO();

    }, [posicao]);




    useEffect(() => {

        // alert(VARIAVEL_GLOBAL.TELA_ORIGEM);
        // alert(VARIAVEL_GLOBAL.TELA_ATUAL);

        if (VARIAVEL_GLOBAL.TELA_ATUAL === "Postar") {

            setBotaoExcluirBoolean(true);
            // alert(VARIAVEL_GLOBAL.TELA_ATUAL);

        } else {

            setBotaoExcluirBoolean(false);

        }


    }, [botaoExcluirBoolean]);





    // useEffect(() => {

    //     // URL_Video = "http://192.168.0.107:3000/video?url_caminho=" + URL_Video;
    //     URL_Video = "http://192.168.0.107:3000/video_stream_perfeito?url_caminho=" + URL_Video;


    // });




    const [htmlConteudo, setHtmlConteudo] = useState('');
    /*
        useEffect(() => {
    
            setHtmlConteudo(
                '<!DOCTYPE html> ' +
    
                '<head>' +
                '<meta charset="utf-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />' +  //BLOQUEA O ZOOM DO CONTAINER DO VÍDEO
    
                '</head>' +
                'EDERSON FELICIANO CORSATTO' +
                '<body style="background-color: black;" >' +
                // '<body style="background-color: blue; text-align:center; vertical-align:middle;" >' +
                ' <video controls autoplay  width="100%" height="100% >' +
    
                // '    <source  id="tela_video" src="http://192.168.0.107:3000/reproducao?url_caminho="' + URL_Video+ '" type="video/mp4"   />' +
                '    <source  id="tela_video" src="http://192.168.0.107:3000/video_stream?url_caminho="' + URL_Video + '" type="video/mp4"   />' +
    
                '  Your browser does not support the <code>video</code> element.' +
                ' </video>' +
                '</body>' +
                '</html>'
            );
    
        }, [posicao]);
    */


    function extrair_nome_de_Arquivo_da_url(Caminho) {
        //Caminho 	= Caminho.replace(/\/g, "/");
        Caminho = Caminho.replace("/\/g", "/");
        var Arquivo = Caminho.substring(Caminho.lastIndexOf('/') + 1);
        var Extensao = Arquivo.substring(Arquivo.lastIndexOf('.') + 1);
        return { arquivo: Arquivo, extensao: Extensao };
    }


    return (

        renderDaTela ? <View>

            <ScreenOrientation orientation={posicaoPaisagem} />



            {/* <View style={{
                height: '100%', width: '100%', borderWidth: 0, borderColor: 'yellow', borderTopLeftRadius: 0, backgroundColor: 'rgba(0,0,0,0.5)'
                , justifyContent: 'center'
                // ,alignItems: 'center'
                // ,paddingTop:paddinDoVideo
            }}>

                <WebView style={{ flex: 1, height: '100%', width: '100%', alignContent: 'center', justifyContent: 'center' }}

                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // originWhitelist={['*']}

                    source={{

                        // uri: "http://192.168.0.107:3000/reproducao?url_caminho=" + URL_Video  // => SOLICITA PAGINA HTML DO SERVIDOR COMO INTERMEDIÁRIO
                        uri: "http://192.168.0.107:3000/video?url_caminho=" + URL_Video
                        // uri: "https://gadoapp.online/video?url_caminho="+URL_Video
                        , headers: {
                            // 'url_caminho': URL_Video,
                            'Range': `bytes=0-1024/*`,
                            'Accept-Ranges': 'bytes',
                            'Content-Type': 'video/mp4',
                          },
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    style={{ marginTop: 0 }}
                />

            </View> */}



            {/*
/******************************************************************************************************
/******************************************************************************************************
*/}



            {/* QUARTO COMPONENTE SENDO IMPLEMENTADO E TESTE ABAIXO */}
            <View style={{
                height: '100%', width: '100%', borderWidth: 0, borderColor: 'yellow', borderTopLeftRadius: 0, backgroundColor: 'rgba(0,0,0,0.5)'
                , justifyContent: 'center'
                // ,alignItems: 'center'
                // ,paddingTop:paddinDoVideo
            }}>

                {/* https://exoplayer.dev/troubleshooting.html */}

                {url_remota_url_boolean_stado ?

                    <VideoPlayer
                        source={{
                            // uri: "https://gadoapp.online/video?url_caminho=" + URL_Video
                            uri: VARIAVEL_GLOBAL.NUMERO_IP + "video?url_caminho=" + URL_Video



                            // uri: "http://192.168.0.107:3000/video?url_caminho=" + URL_Video
                            // , headers: {
                            //     'Range': `bytes=0-`,
                            //     'Accept-Ranges': 'bytes',
                            //     'Content-Type': 'video/mp4',
                            // },
                        }}
                        // tapAnywhereToPause={false}
                        // toggleResizeModeOnFullscreen={false}
                        // isFullScreen={false}
                        // // thumbnail={imageUrl}
                        // disableBack={true}
                        // disableVolume={true}
                        // controlTimeout={5000}
                        // // paused={this.state.paused}

                        seekColor={'#576CEC'}
                        onError={err => console.log("ERRO AQUI REMOTO => " + JSON.stringify(err))}

                        style={ESTILO.video} />

                    :

                    <VideoPlayer
                        source={{ uri: URL_Video }}
                        // tapAnywhereToPause={false}
                        // toggleResizeModeOnFullscreen={false}
                        // isFullScreen={false}
                        // // thumbnail={imageUrl}
                        // disableBack={true}
                        // disableVolume={true}
                        // controlTimeout={5000}
                        // // paused={this.state.paused}

                        seekColor={'#576CEC'}
                        onError={err => console.log("ERRO AQUI LOCAL => " + JSON.stringify(err))}

                        style={ESTILO.video} />
                }

            </View>
            {/*  QUARTO COMPONENTE SENDO IMPLEMENTADO E TESTE ACIMA */}








            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 0, borderColor: 'yellow', position: 'absolute' }} >


                <TouchableOpacity style={{ flexDirection: 'row', width: '40%', justifyContent: 'center' }} onPress={() => {


                    navigation.goBack(null);  
                  

                }}   >
                    <Icon style={{ height: 50, marginLeft: 30, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='arrow-left' />
                    <Text style={{ height: 50, marginLeft: 5, fontSize: 15, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} >Voltar</Text>
                </TouchableOpacity>


                {botaoExcluirBoolean ?
                    <TouchableOpacity style={{ flexDirection: 'row', width: '20%', justifyContent: 'center' }}
                        onPress={async () => {

                            // alert("Apagar Esse Vídeo");
                            // IMAGENS_ARRAY.splice(IMAGENS_ARRAY.indexOf(IMAGENS_ARRAY[INDICE_DA_IMAGEM]), 1);
                            // VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.splice( VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.indexOf( VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS), 1);



                            // VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS = VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.filter(function (itens) {
                            //     return !itens.includes(URL_Video);
                            // });


                            // alert( VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS );


                            // alert( URL_Video );

                            // console.log(VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.length);

                            let ARRAY_LOCAL_VIDEO = [];

                            await Promise.all(VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.map(async (itens, indice) => {

                                if (itens !== URL_Video) {
                                    ARRAY_LOCAL_VIDEO.push(itens)

                                }//IF

                            }));//MAP

                            VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.length = 0;
                            VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS = ARRAY_LOCAL_VIDEO;
                            URL_Video = VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS;

                            navigation.navigate("Postar", { URL_Video });

                            // console.log(VARIAVEL_GLOBAL.URL_VIDEOS_DURANTE_POSTAGENS.length);

                        }}
                    >
                        <Icon style={{ height: 50, marginLeft: 30, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='trash' />
                        <Text style={{ height: 50, marginLeft: 5, fontSize: 15, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} >Excluir</Text>

                    </TouchableOpacity>
                    :
                    <View style={{ flexDirection: 'row', width: '20%', justifyContent: 'center' }} />
                }


                <TouchableOpacity style={{ flexDirection: 'row', width: '40%', justifyContent: 'center', borderWidth: 0, borderColor: 'green' }}
                    onPress={() => {
                        setPosicao(oldState => !oldState);
                        setIcone(oldState => !oldState);
                    }}  >

                    <Text style={{ height: 50, marginLeft: 0, fontSize: 15, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} >Girar</Text>
                    {icone ?
                        <Icon style={{ height: 50, marginLeft: 5, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='repeat' />
                        :
                        <Icon style={{ height: 50, marginLeft: 5, fontSize: 35, color: 'white', borderWidth: 0, borderColor: 'yellow', textAlignVertical: 'center' }} name='rotate-left' />
                    }
                </TouchableOpacity>


            </TouchableOpacity>


        </View >

            : []

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


const ESTILO = StyleSheet.create({

    videoContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
    video: {
        // position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        height: '100%',
        width: '100%',
    },

});



export default NavegarVideos;