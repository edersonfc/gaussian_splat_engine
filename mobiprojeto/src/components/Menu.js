import React, { useRef, useState, useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../context/UsersContext';

var MENU_LATERAL;

var LATITUDE_USUARIO;
var LONGITUDE_USUARIO;

var TELA_DE_ORIGEM_E_SITUACAO = "";

export default function Menu(param) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    LATITUDE_USUARIO = param.LARTITUDE;
    LONGITUDE_USUARIO = param.LORNGITUDE;

    //alert( LATITUDE_USUARIO+ " <=> "+LONGITUDE_USUARIO );


    const navigation = useNavigation();


    var ComprasVendas = '';



    ////DECLARAÇÃO DE STATES ABAIXO
    var [variavelTexto, setVariavelTexto] = useState('');

    const [muda_cor, setMuda_cor] = useState(false)

    const [exibe, setExibe] = useState(false)

    const inputRef = useRef();

    //Setar Valor Menor e Valor Maior
    var [valorMenor, setValorMenor] = useState('0')

    var [valorMaior, setValorMaior] = useState('300')


    const [muda_cor_comprar, setMuda_cor_comprar] = useState(false)

    const [muda_cor_compartulhar, setMuda_cor_compartulhar] = useState(false)

    ////DECLARAÇÃO DE STATES ACIMA



    return (


        <View key={'MenuLateral'} style={{
            width: '100%', height: '150%',
            backgroundColor: 'rgb(255,255,255,0)',
            position: 'absolute',
            top: 50, bottom: 0, left: 0, right: 0,

        }}>

            {/* <View style={[ Estilo.menuPai ]}> */}
            <View style={{ width: '67%', height: '100%', backgroundColor: '#2A3E4A', borderWidth: 0, borderColor: 'yellow', paddingLeft: 10, }} >
                <><Text style={[Estilo.fontePequena]}>MENU GERAL</Text></>
                <View>




                    {/*INICIO  DO MENU * 1 **********************************************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 0, width: '100%' }}  >

                        {muda_cor
                            ? <Icon name='check' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='check' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center' }} > Minhas Propostas  </Text>


                    </TouchableOpacity>
                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>



                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 0, width: '100%' }}
                        onPress={async () => {
                            //alert("MOSTRAR MINHAS POSTAGENS");
                            await AsyncStorage.setItem('TELA_PRA_VOLTAR', 'ComprasVendas');
                            { ComprasVendas = 'Postagens' }
                            navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO });
                        }}
                    >


                        {muda_cor
                            ? <Icon name='paper-plane' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '22%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='paper-plane' style={[Estilo.icones_grande, style = { width: '22%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '80%', textAlignVertical: 'center', padding: 0 }}



                        >
                            Minhas Postagens
                        </Text>


                    </TouchableOpacity>
                    {/*FINAL DO MENU** 1 *****************************************************************/}



                    {/*INICIO  DO MENU ***********************************************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }} >

                        {muda_cor
                            ? <Icon name='heart' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='heart' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }} />
                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center' }} > Favoritos  </Text>



                    </TouchableOpacity>
                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }}
                        onPress={async () => {
                            
                            // await AsyncStorage.setItem('TELA_PRA_VOLTAR', 'ComprasVendas');
                            VARIAVEL_GLOBAL.TELA_ORIGEM = "MenuDaTelaPrincipal";
                            VARIAVEL_GLOBAL.TELA_ATUAL  = "ProdDetalhes";

                            { ComprasVendas = 'Compras'; TELA_DE_ORIGEM_E_SITUACAO = 'Tela_Menu_Compras'; }
                            //alert(LONGITUDE_USUARIO);
                            navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO, TELA_DE_ORIGEM_E_SITUACAO })
                        }}
                    >

                        {muda_cor
                            ? <Icon name='cart-arrow-down' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='cart-arrow-down' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center', padding: 2 }}



                        >
                            Minhas Compras
              </Text>

                    </TouchableOpacity>


                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}

                    {/*FINAL DO MENU*******************************************************************/}



                    {/*INICIO  DO MENU ***********************************************************************************/}

                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }}
                        onPress={async () => {
                            await AsyncStorage.setItem('TELA_PRA_VOLTAR', 'ComprasVendas');
                        { ComprasVendas = 'Vendas'; /*TELA_DE_ORIGEM_E_SITUACAO = 'Tela_Menu_Vendas';*/ }
                            VARIAVEL_GLOBAL.TELA_ATUAL    = "ComprasVendas";
                            VARIAVEL_GLOBAL.TELA_ORIGEM   = "MenuDaTelaPrincipal";
                            VARIAVEL_GLOBAL.TELA_TERCEIRA = "Principal";
                            navigation.navigate("ComprasVendas", { ComprasVendas, LATITUDE_USUARIO, LONGITUDE_USUARIO, TELA_DE_ORIGEM_E_SITUACAO })
                        }}
                    >

                        {muda_cor
                            ? <Icon name='shopping-cart' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '15%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='shopping-cart' style={[Estilo.icones_grande, style = { width: '17%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center' }}>  Minhas Vendas   </Text>



                    </TouchableOpacity>
                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }}

                        onPress={() => {
                            //alert("CHAMAR TELA DE GRÁFICO");
                            // navigation.navigate("Estatistica", {});
                            navigation.navigate("Estatistica");
                        }}

                    >

                        <Icon name='bar-chart' nativeID=''
                            style={[Estilo.icones_grande, Estilo.icones_grande, style = { width: '20%' }]}
                            onPress={() => {

                                // alert("CHAMAR TELA DE GRÁFICO");
                                 // navigation.navigate("Estatistica", {});
                                navigation.navigate("Estatistica");

                            }
                            } />

                        {/* {muda_cor
                            ? <Icon name='bar-chart' nativeID=''
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='bar-chart' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                        } */}

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center', padding: 2 }} >
                            Estatística Compras
              </Text>

                    </TouchableOpacity>


                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}

                    {/*FINAL DO MENU*******************************************************************/}



                    {/*INICIO  DO MENU ***********************************************************************************/}

                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }} >

                        {muda_cor
                            ? <Icon name='share-alt' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='share-alt' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center' }} >
                            Compartilhados
</Text>

                    </TouchableOpacity>
                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%' }} >
                        {muda_cor
                            ? <Icon name='cogs' nativeID='Favorito'
                                style={[Estilo.icones_grande, Estilo.icones_clicado, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)

                                }
                                } />

                            : <Icon name='cogs' style={[Estilo.icones_grande, style = { width: '20%' }]}
                                onPress={() => {

                                    setMuda_cor(oldState => !oldState)


                                }
                                } />

                        }

                        <Text style={{ fontSize: 18, color: 'white', borderWidth: 0, width: '85%', textAlignVertical: 'center', padding: 2 }} >
                            Gerên. Preferências
</Text>

                    </TouchableOpacity>


                    {/**************************************************/}

                    <View style={{ height: 10, borderWidth: 0, padding: 10, borderColor: '#orange' }} >
                        <View style={{ borderWidth: 1, width: '100%', borderColor: '#fff' }}></View>
                    </View>

                    {/**************************************************/}

                    {/*FINAL DO MENU*******************************************************************/}



                </View>

            </View>

        </View>


    )
}

