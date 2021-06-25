import React, { PureComponent, useState, useEffect, useContext } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from "@react-navigation/native";
//import { Icon } from 'react-native-vector-icons/Icon';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

import GlobalContext from '../../context/UsersContext';

//IMPORTAÇÕES ACIMA


//var andar = 0;
var URLs_Fotos = new Array();


//function PreencherLista(){setUrl_strings(String(URLs_Fotos[0]))}



//CLASSE PRINCIPAL DE EXECUÇÃO ABAIXO
export default function navegacaoFotos(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    var [andar, setAndar] = useState(-1);


    const [tirarFoto, setTirarFoto] = useState(true)
    const [navegarFoto, setNavegarFoto] = useState(false)
    var [url_strings, setUrl_strings] = useState('file:///')
    const navigation = useNavigation();



    var produto = '';


    /* PEGANDO RETORNO DA VARIAVEL PELA CHAMADA DE TELA ABAIXO */
    var { ARRY_URL_IMAGENS } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    var { IMAGENS } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    var { index_id } = props.route.params; // utilizar a {} para desestruturar a variável pesquisarCompras que está dentro de params
    //alert(typeof(ARRY_URL_IMAGENS))
    // alert(ARRY_URL_IMAGENS)
    //alert(index_id)

    /* PEGANDO RETORNO DA VARIAVEL PELA CHAMADA DE TELA ACIMA */

    //ARRY_URL_IMAGENS.length = 0;
    //ARRY_URL_IMAGENS = URL.split("|");


    /**/
    //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ABAIXO 
    useEffect(() => {

        //   if (URL.includes('|')) {
        //ARRY_URL_IMAGENS = URL.split("|");
        //alert(ARRY_URL_IMAGENS[1]);
        //setUrl_strings(String(ARRY_URL_IMAGENS[0]));
        //alert(ARRY_URL_IMAGENS);
        //url_strings = String(ARRY_URL_IMAGENS[0]);
        //alert(ARRY_URL_IMAGENS);

        //}

        //PreencherLista();

        setAndar(index_id);

        setUrl_strings(IMAGENS);


    }, []);
    //RESPONSÁVEL POR CARREGAR PRIMEIRO TODAS DAS FUNÇÕES DO APLICATIVO ACIMA




    const [ largura_tela,      setLargura_tela  ] = useState(Dimensions.get('window').width);
    const [ altura_tela,       setAltura_tela   ] = useState(Dimensions.get('window').height);

    const [ altura_20_porcento, setAltura_20_porcento  ] = useState(0);

        useEffect(() => {

            setAltura_20_porcento( ((largura_tela * 20) / 100) );

        });

 




    return (


        <View style={styles.container}>



            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO  coloca dentro da View principal que fica dentro do return*/}
            <ScreenOrientation
                orientation={LANDSCAPE_LEFT}
                // orientation={PORTRAIT}
                // onChange={orientation => console.log('onChange', orientation)}
                // onDeviceChange={orientation => console.log('onDeviceChange', orientation) }
           
            />
            {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA   coloca dentro da View principal que fica dentro do return */}


            {/* { SETAR_ALTURA_DA_FAIXA_DE_NAVEGACAO() } */}
       


            {/*NAVEGADOR DAS FOTOS ABAIXO*/}
            { /*  {navegarFoto &&    PRINCIPAL NAVEGAÇÃO */}

            {/*<View style={[ style={ width: '100%', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray'}, {transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]}  ]}  >*/}
            <View style={[style = { width: '100%', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray' }]}  >


                {/*TELA DA IMAGEN ABAIXO*/}
                <Image style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: url_strings }}
                />
                {/*TELA DA IMAGEN ACIMA*/}


                {/* paddingTop: '142%' => POSIÇÃO RETRATO */}
                {/*BOTÕES CONTROLE ABAIXO  rgba(230,200,50,0)  */}
                <View style={{ justifyContent: 'flex-end',  width: '100%', height: '100%', backgroundColor: 'rgba(230,200,50,0)', position: 'absolute', paddingBottom: '0%' /*, paddingTop: '41%'*/ }} >
                    <View style={{ width: '100%', height: altura_20_porcento, alignItems: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', alignContent: 'center', backgroundColor: 'rgba(0,72,204,0.0)' }} >


                            <TouchableOpacity style={{ width: '20%' }}
                                //onPress={() => this.takePicture(camera)
                                onPress={() => {
                                    
                                    
                                    setAndar(andar = andar - 1);
                                    if (andar > -1) {
                                        setUrl_strings(ARRY_URL_IMAGENS[andar])
                                    } else {
                                        //andar = andar + 1;
                                        setAndar(andar = andar + 1);
                                        alert('Essa é a Primeira Imagem')

                                    }


                                } }
                               
                                style={styles.capture}>
                                <Icon name='arrow-left' style={styles.fontIcone} />

                            </TouchableOpacity>



                            <TouchableOpacity style={{ width: '20%' }}
                               
                                onPress={() => {

                                    /* */
                                    ARRY_URL_IMAGENS.splice(ARRY_URL_IMAGENS.indexOf(ARRY_URL_IMAGENS[andar]), 1);

                                    alert('Imagem Apagada')
                                    andar = andar - 1;
                                    setAndar(andar);

                                    if (andar == -1) {
                                        andar = andar + 1;
                                        setAndar(andar);
                                        setUrl_strings(ARRY_URL_IMAGENS[andar])

                                    } else {
                                        setUrl_strings(ARRY_URL_IMAGENS[andar])
                                    }
                                   
                                    // alert( JSON.stringify(VARIAVEL_GLOBAL.LISTAIMAGENS_CONTEXT)  );
                                   

                                } }
                               
                                style={styles.capture}>
                                <Text style={styles.fontBotao} >Apagar{/*andar*/} {/*tamanho_array = {ARRY_URL_IMAGENS.length*/} </Text>

                            </TouchableOpacity>

                            {/**********/}
                            <TouchableOpacity style={{ width: '20%' }}
                                //onPress={() => this.takePicture(camera)
                                onPress={() => {

                                    var URL_FOTOS = '';
                                    for (var i = 0; i < ARRY_URL_IMAGENS.length; i++) {
                                        URL_FOTOS += ARRY_URL_IMAGENS[i] + '|';
                                    }

                                    // alert(VARIAVEL_GLOBAL.TELA_ATUAL + " | " + VARIAVEL_GLOBAL.TELA_ORIGEM + " | " + VARIAVEL_GLOBAL.TELA_TERCEIRA)

                                    if (VARIAVEL_GLOBAL.TELA_ORIGEM == "Postar") {

                                        VARIAVEL_GLOBAL.TELA_ATUAL = "Postar";
                                        VARIAVEL_GLOBAL.TELA_ORIGEM = "navegacaoFotos";
                                        VARIAVEL_GLOBAL.TELA_TERCEIRA = "Principal";

                                        //alert("Voltar Para a Tela => Postar")
                                        navigation.navigate("Postar", { URL_FOTOS })
                                        //alert(" tela ATUAL => "+VARIAVEL_GLOBAL.TELA_ATUAL+" |  tela ORIGEM => "+VARIAVEL_GLOBAL.TELA_ORIGEM);

                                        //navigation.goBack(URL_FOTOS);//funciona perfeitamente esse voltar
                                        //alert(URL_FOTOS)

                                    }//IF


                                    if (VARIAVEL_GLOBAL.TELA_ORIGEM == "Principal" || VARIAVEL_GLOBAL.TELA_ORIGEM == "ComprasVendas") {

                                        navigation.goBack(URL_FOTOS); //ATIVAR DEPOIS

                                        // alert(VARIAVEL_GLOBAL.TELA_ATUAL + " | " + VARIAVEL_GLOBAL.TELA_ORIGEM + " | " + VARIAVEL_GLOBAL.TELA_TERCEIRA)

                                    }

                                }
                                }
                                style={styles.capture}>
                                <Text style={styles.fontBotao}  >Voltar</Text>

                            </TouchableOpacity>


                            {/**********/}


                            <TouchableOpacity style={{ width: '20%' }}
                                //onPress={() => this.takePicture(camera)
                                onPress={() => {

                                    andar = andar + 1;
                                    setAndar(andar);

                                    //alert(andar);

                                    if (andar <= (ARRY_URL_IMAGENS.length - 1)) {
                                        setUrl_strings(ARRY_URL_IMAGENS[andar])
                                    } else {
                                        andar = andar - 1;
                                        setAndar(andar);
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



            </View>{/* PRINCIPAL NAVEGAÇÃO */}


            {/*NAVEGADOR DAS FOTOS ACIMA*/}



        </View>


    );

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
