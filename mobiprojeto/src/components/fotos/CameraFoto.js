import React, { PureComponent, useState, useEffect, useContext } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from "@react-navigation/native";
//import { Icon } from 'react-native-vector-icons/Icon';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import ImageResizer from 'react-native-image-resizer';


import GlobalContext from '../../context/UsersContext';



const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);

var data;

//var URL = '';

var ARRY_URL_IMAGENS = new Array();

var IncrementoDecremento = -1;

var andar = -1;



export default function CameraFoto(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);


    //IMPLEMENTANDO EM AUDITORIA ABAIXO
    useEffect(() => {
        var { URL_FOTOS_2 } = props.route.params;

        try {
            if (URL_FOTOS_2.includes("zerar_postagem")) {

                // ARRY_URL_IMAGENS.length = 0;
                VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length = 0;
                //alert(ARRY_URL_IMAGENS)

                URL_FOTOS_2 = "";

            }//IF
        } catch (error) { }

    }, []);
    //IMPLEMENTANDO EM AUDITORIA ACIMA




    //alert(ARRAY_TELA_POSTAGEN);
    /*
        if(ARRY_URL_IMAGENS.length <= 0){
    
            alert('TÁ VAZIO');
    
        }//IF
        else{
            alert('TEM ALGO');
        }
    */

    //ARRY_URL_IMAGENS.length = 0;  
    //ARRY_URL_IMAGENS = ARRY_URL_IMAGENS;


    /*
           //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ABAIXO 
           useEffect(() => {
    
            ARRY_URL_IMAGENS.length = 0;
    
            for(var i = 0; i < ARRAY_TELA_POSTAGEN.length; i++){
                ARRY_URL_IMAGENS.push(ARRAY_TELA_POSTAGEN[i]);
            }
    
    
        }, []);
        //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ACIMA
    */


    const [tirarFoto, setTirarFoto] = useState(true)
    const [navegarFoto, setNavegarFoto] = useState(false)

    const [url_strings, setUrl_strings] = useState('')

    const navigation = useNavigation();

    takePicture = async function (camera) {
        //const options = { quality: 0.5, base64: true };
        //const options = { maxFileSize: 40400, quality:RNCamera.Constants.VideoQuality['480p'] , base64: false  };//ESSE SUBSTITUI A LINHA DE CIMA QUE ESTÁ COM A QUALIDADE MUITO ALTA DE 0.5

        // data = await camera.takePictureAsync(null);
       DIMINUINDO_RESOLUCAO_DA_IMAGEM(await camera.takePictureAsync(null), true)// INSERIDO 31 03 2021

    
        //eslint-disable-next-line
        // console.log(data.uri);
        // console.log("TIPO "+ data );
        // console.log(data.uri);
        //alert(data.uri);
        //    IncrementoDecremento = IncrementoDecremento + 1;
        //     andar = andar + 1;
        //     URL = data.uri;
        //     URLS_DAS_FOTOS(URL);
        //     setUrl_strings(ARRY_URL_IMAGENS[IncrementoDecremento])
        //     /*navigation.navigate("Postar",{URL})*/
        //     setTirarFoto(oldState => !oldState)
        //     setNavegarFoto(oldState => !oldState)

       
    };





    //DIMINUINDO A RESOLUÇÃO DA IMAGEM ABAIXO
    async function DIMINUINDO_RESOLUCAO_DA_IMAGEM(photo, resize = false) {

        /* Resize photo if required */
        if (photo != null && resize == true) {

            //console.log(photo);

            const resize = () => {
                return new Promise((resolve, reject) => {
                    // ImageResizer.createResizedImage(photo.uri, 240, 240, 'JPEG', 90, 0).then((response) => {
                    // ImageResizer.createResizedImage(photo.uri, 960, 1280, 'JPEG', 90, 0).then((response) => {
                    ImageResizer.createResizedImage(photo.uri, 1280, 960, 'JPEG', 90, 0).then((response) => {    
                        resolve(response);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }
            await resize().then(async (response) => {

                // console.log(response);
                // console.log(photo.uri = response.uri);

                photo.uri = await response.uri
                data = photo.uri
                // console.log(data.uri);
                // alert(data.uri);
                IncrementoDecremento = IncrementoDecremento + 1;
                andar = andar + 1;
                // URL = data.uri;
                URL = data;
                console.log(URL);
                // URLS_DAS_FOTOS(URL,VARIAVEL_GLOBAL); // TROCADO PELO LINHA ABAIXO
                VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.push(URL);
                // setUrl_strings(ARRY_URL_IMAGENS[IncrementoDecremento])
                setUrl_strings(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[IncrementoDecremento])
                setTirarFoto(oldState => !oldState)
                setNavegarFoto(oldState => !oldState)


            }, error => {
                // Handle error
                console.log(error);
            });
        }//IF
        // this.props.onSelectedPhoto({
        //     photo: photo != null ? photo.uri : null
        // });
        // this.props.navigator.dismissModal();
    }
    //DIMINUINDO A RESOLUÇÃO DA IMAGEM ACIMA




    return (


        <View style={styles.container}>



            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO  coloca dentro da View principal que fica dentro do return*/}
            <ScreenOrientation
              orientation={LANDSCAPE_LEFT}
                // orientation={PORTRAIT}
                onChange={orientation => console.log('onChange', orientation)}
                onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
            />
            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA   coloca dentro da View principal que fica dentro do return */}



            {tirarFoto &&
                <RNCamera
                    style={[styles.preview, style = { backgroundColor: 'orange' }]}

                    //style={Platform.OS === "ios" ? createPostStyle.previewIOS : createPostStyle.previewAndroid}
                    //pictureSize
                    // ratio='1:0' // FOI DESATIVADO ESSA LINHA POIS ESTÁ DISTORCENDO TOTALMENTE A IMAGEM
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (

                            <View style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }} >

                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        //onPress={() => this.takePicture(camera)
                                        onPress={() => {

                                            takePicture(camera)
                                            //alert(data.uri)

                                        }
                                        }
                                        style={styles.capture}>
                                        <Text style={styles.fontBotao}  > Tirar Foto </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        );
                    }}
                </RNCamera>

            }

            {/*NAVEGADOR DAS FOTOS ABAIXO*/}
            {navegarFoto &&   /* PRINCIPAL NAVEGAÇÃO */

                /*<View style={[ style={ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray'}, {transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]}  ]}  >*/
                <View style={[style = { width: '100%', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray' }]}  >


                    {/*TELA DA IMAGEN ABAIXO*/}
                    <Image style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        //source={{ uri: produto.imagem_url }}
                        //source={{ uri: ARRY_URL_IMAGENS[IncrementoDecremento] }}
                        source={{ uri: url_strings }}
                    />
                    {/*TELA DA IMAGEN ACIMA*/}



                    {/*BOTÕES CONTROLE ABAIXO*/}
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(230,200,50,0)', position: 'absolute', paddingBottom: '0%', paddingTop: '43%' }} >
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'rgba(0,72,204,0.0)' }} >


                                <TouchableOpacity style={{ width: '20%' }}
                                    //onPress={() => this.takePicture(camera)
                                    onPress={() => {

                                        andar = andar - 1;

                                        if (andar > -1) {
                                            // setUrl_strings(ARRY_URL_IMAGENS[andar])
                                            setUrl_strings(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[andar])
                                        } else {
                                            andar = andar + 1;
                                            alert('Essa é a Primeira Imagem')

                                        }

                                    }
                                    }
                                    style={styles.capture}>
                                    <Icon name='arrow-left' style={styles.fontIcone} />

                                </TouchableOpacity>

                                {/**********/}

                                <TouchableOpacity style={{ width: '20%' }}
                                    //onPress={() => this.takePicture(camera)
                                    onPress={() => {

                                        setTirarFoto(oldState => !oldState)
                                        setNavegarFoto(oldState => !oldState)
                                    }
                                    }
                                    style={styles.capture}>
                                    <Text style={styles.fontBotao} > Mais Fotos </Text>

                                </TouchableOpacity>


                                {/**********/}


                                <TouchableOpacity style={{ width: '20%' }}
                                    //onPress={() => this.takePicture(camera)
                                    onPress={() => {

                                        //ARRY_URL_IMAGENS.splice(andar)
                                        // ARRY_URL_IMAGENS.splice(ARRY_URL_IMAGENS.indexOf(ARRY_URL_IMAGENS[andar]), 1);
                                        VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.splice(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.indexOf(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[andar]), 1);

                                        alert('Imagem Apagada')

                                        andar = andar - 1;

                                        if (andar == -1) {

                                            andar = andar + 1;
                                            // setUrl_strings(ARRY_URL_IMAGENS[andar])
                                            setUrl_strings(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[andar])

                                        } else {
                                            // setUrl_strings(ARRY_URL_IMAGENS[andar])
                                            setUrl_strings(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[andar])
                                        }


                                    }
                                    }
                                    style={styles.capture}>
                                    <Text style={styles.fontBotao} >Apagar</Text>

                                </TouchableOpacity>

                                {/**********/}
                                <TouchableOpacity style={{ width: '20%' }}
                                    //onPress={() => this.takePicture(camera)
                                    onPress={() => {

                                        /*  */
                                        var URL_FOTOS = '';
                                        // for (var i = 0; i < ARRY_URL_IMAGENS.length; i++) {
                                        for (var i = 0; i < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length; i++) {
                                            // URL_FOTOS += ARRY_URL_IMAGENS[i] + '|';
                                            URL_FOTOS += VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[i] + '|';
                                        }
                                        navigation.navigate("Postar", { URL_FOTOS })
                                        //alert(URL_FOTOS)
                                        //ESSE METODO ACIMA COMENTADO FOI TROCADO PELO METODO ABAIXO  */

                                        /* 
                                       for(var i = 0; i < ARRY_URL_IMAGENS.length; i++){
                                           ARRY_URL_IMAGENS.insert(ARRY_URL_IMAGENS[i]+'|');
                                         }
                                         var URL_FOTOS = ARRY_URL_IMAGENS;
                                        
                                         navigation.navigate("Postar",{URL_FOTOS})
                                         //alert(URL)
                                         */


                                    }
                                    }
                                    style={styles.capture}>
                                    <Text style={styles.fontBotao}  >Gravar Fotos</Text>

                                </TouchableOpacity>


                                {/**********/}


                                <TouchableOpacity style={{ width: '20%' }}
                                    //onPress={() => this.takePicture(camera)
                                    onPress={() => {

                                        andar = andar + 1;

                                        // if (andar < ARRY_URL_IMAGENS.length) {
                                            if (andar < VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.length) {
                                            // setUrl_strings(ARRY_URL_IMAGENS[andar])
                                            setUrl_strings(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT[andar])
                                        } else {
                                            andar = andar - 1;
                                            alert('Esta é a Ultima Imagem')

                                        }

                                    }
                                    }
                                    style={styles.capture}>
                                    <Icon name='arrow-right' style={styles.fontIcone} />
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                    {/*BOTÕES CONTROLE ACIMA*/}



                </View>/* PRINCIPAL NAVEGAÇÃO */

            }
            {/*NAVEGADOR DAS FOTOS ACIMA*/}



        </View>


    );


    //{transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]}



}

function URLS_DAS_FOTOS(URLS_PARAMETRO,  VARIAVEL_GLOBAL) {

   

    // ARRY_URL_IMAGENS.push(URLS_PARAMETRO);
    VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT.push(URLS_PARAMETRO);
    //alert(URLs_Fotos);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {

        backgroundColor: 'rgba(200,200,2,0)',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 15,
        margin: 5,
        borderRadius: 10,

    },

    fontIcone: {

        fontSize: 24,
        color: '#fff',

    },

    fontBotao: {

        fontSize: 19,
        color: '#fff',

    },




});