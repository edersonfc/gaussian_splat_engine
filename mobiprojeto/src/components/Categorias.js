import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Alert } from 'react-native'

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';


//import Range from '@ptomasroos/react-native-multi-slider'

import RangeSlider from 'rn-range-slider';



export default function Categorias() {
    
    
    const [valueStart, setValueStart] = useState(0)

    const [muda_cor_checkado_macho, setMuda_cor_checkado_macho] = useState(false)

    const [muda_cor_checkado_bovino, setMuda_cor_checkado_bovino] = useState(false)

    const [muda_cor_checkado_femea, setMuda_cor_checkado_femea] = useState(false)

    const [muda_cor_checkado_equino, setMuda_cor_checkado_equino] = useState(false)

    const [muda_cor_checkado_suino, setMuda_cor_checkado_suino] = useState(false)

    /*const [fecharCategoria, setFecharCategoria] = useState(false)*/
    const [fecharTelaCategoria, setFecharTelaCategoria] = useState(true)

    const [valorMenor, setValorMenor] = useState(0)
    const [valorMaior, setValorMaior] = useState(300)











    return (


        <View style={{ alignItems: 'center', justifyContent: 'flex-start', height: 400, position: 'absolute', paddingTop: '17%' }}>

            {fecharTelaCategoria &&
                <View style={{
                    width: '99%',
                    height: '100%',
                    backgroundColor: '#2A3E4A',
                    borderRadius: 15,
                    borderColor: '#fff',
                    borderWidth: 1,

                }} >



                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, height: 40 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%', borderWidth: 0, height: 30 }} >
                            <Text style={[Estilo.fontMaiorCategoria, style = { paddingTop: 20 }]} >     Categorias</Text>
                        </View>
                        <View style={{ width: '10%', borderWidth: 0, height: 30 }} >
                            {fecharTelaCategoria
                                ? <Icon name='window-close' style={[Estilo.icones_medio]}
                                    onPress={() => {
                                        setFecharTelaCategoria(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='window-close' style={[Estilo.icones_medio, style = { borderWidth: 0 }]}
                                    onPress={() => {
                                        setFecharTelaCategoria(oldState => !oldState)
                                    }
                                    } />

                            }
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', borderWidth: 0, height: 15 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', borderWidth: 0, borderColor: '#fff', height: 2, backgroundColor: '#fff' }} ></View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', borderWidth: 0, height: 40 }} >
                        <Text style={Estilo.fontMediaCategoria} >Selecionar Todas Categorias</Text>
                    </View>


                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, height: 30 }} >
                        <View style={{ width: '50%', borderWidth: 0, height: 30 }} >
                            <Text style={Estilo.fontPequenaCategoria} >Sexo</Text>
                        </View>
                        <View style={{ width: '50%', borderWidth: 0, height: 30 }} >
                            <Text style={Estilo.fontPequenaCategoria} >Tipo</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, height: 30 }} >
                        <View style={{ width: '15%', borderWidth: 0, height: 30, alignItems: 'flex-end' }} >

                            {muda_cor_checkado_macho
                                ? <Icon name='check'
                                    style={[style = { color: '#25E7DB' }]}//#2A3E4A

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='check'
                                    style={[style = { color: '#2A3E4A' }]}

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)

                                    }
                                    } />

                            }

                        </View>
                        <View style={{ width: '30%', borderWidth: 0, height: 30, alignItems: 'flex-start' }} >
                            {muda_cor_checkado_macho
                                ? <Text style={[Estilo.fontePequenaIconComClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)
                                    }
                                    }
                                > Macho</Text>

                                : <Text style={[Estilo.fontePequenaIconSemClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)
                                    }
                                    }
                                > Macho</Text>
                            }
                        </View>
                        <View style={{ width: '15%', borderWidth: 0, height: 30, alignItems: 'flex-end' }} >
                            {muda_cor_checkado_bovino
                                ? <Icon name='check'
                                    style={[style = { color: '#25E7DB' }]}//#2A3E4A

                                    onPress={() => {
                                        setMuda_cor_checkado_bovino(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='check'
                                    style={[style = { color: '#2A3E4A' }]}

                                    onPress={() => {
                                        setMuda_cor_checkado_bovino(oldState => !oldState)

                                    }
                                    } />

                            }
                        </View>
                        <View style={{ width: '30%', borderWidth: 0, height: 30, alignItems: 'flex-start' }} >
                            {muda_cor_checkado_bovino
                                ? <Text style={[Estilo.fontePequenaIconComClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_bovino(oldState => !oldState)
                                    }
                                    }
                                > Bovinos</Text>

                                : <Text style={[Estilo.fontePequenaIconSemClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_bovino(oldState => !oldState)
                                    }
                                    }
                                > Bovinos</Text>
                            }
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, height: 30 }} >
                        <View style={{ width: '15%', borderWidth: 0, height: 30, alignItems: 'flex-end' }} >
                            {muda_cor_checkado_femea
                                ? <Icon name='check'
                                    style={[style = { color: '#25E7DB' }]}//#2A3E4A

                                    onPress={() => {
                                        setMuda_cor_checkado_femea(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='check'
                                    style={[style = { color: '#2A3E4A' }]}

                                    onPress={() => {
                                        setMuda_cor_checkado_femea(oldState => !oldState)

                                    }
                                    } />

                            }

                        </View>
                        <View style={{ width: '30%', borderWidth: 0, height: 30, alignItems: 'flex-start' }} >
                            {muda_cor_checkado_femea
                                ? <Text style={[Estilo.fontePequenaIconComClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_femea(oldState => !oldState)
                                    }
                                    }
                                > Fêmeas</Text>

                                : <Text style={[Estilo.fontePequenaIconSemClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_femea(oldState => !oldState)
                                    }
                                    }
                                > Fêmeas</Text>
                            }
                        </View>
                        <View style={{ width: '15%', borderWidth: 0, height: 30, alignItems: 'flex-end' }} >
                            {muda_cor_checkado_equino
                                ? <Icon name='check'
                                    style={[style = { color: '#25E7DB' }]}//#2A3E4A

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='check'
                                    style={[style = { color: '#2A3E4A' }]}

                                    onPress={() => {
                                        setMuda_cor_checkado_macho(oldState => !oldState)

                                    }
                                    } />

                            }

                        </View>
                        <View style={{ width: '30%', borderWidth: 0, height: 30, alignItems: 'flex-start' }} >
                            {muda_cor_checkado_equino
                                ? <Text style={[Estilo.fontePequenaIconComClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_equino(oldState => !oldState)
                                    }
                                    }
                                > Equinos</Text>

                                : <Text style={[Estilo.fontePequenaIconSemClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_equino(oldState => !oldState)
                                    }
                                    }
                                > Equinos</Text>
                            }
                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, height: 30 }} >
                        <View style={{ width: '20%', borderWidth: 0, height: 30 }} >
                            <Text></Text>
                        </View>
                        <View style={{ width: '25%', borderWidth: 0, height: 30 }} >
                            <Text></Text>
                        </View>

                        <View style={{ width: '15%', borderWidth: 0, height: 30, alignItems: 'flex-end' }} >
                            {muda_cor_checkado_suino
                                ? <Icon name='check'
                                    style={[style = { color: '#25E7DB' }]}//#2A3E4A

                                    onPress={() => {
                                        setMuda_cor_checkado_suino(oldState => !oldState)
                                    }
                                    } />

                                : <Icon name='check'
                                    style={[style = { color: '#2A3E4A' }]}

                                    onPress={() => {
                                        setMuda_cor_checkado_suino(oldState => !oldState)

                                    }
                                    } />

                            }

                        </View>
                        <View style={{ width: '30%', borderWidth: 0, height: 30, alignItems: 'flex-start' }} >
                            {muda_cor_checkado_suino
                                ? <Text style={[Estilo.fontePequenaIconComClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_suino(oldState => !oldState)
                                    }
                                    }
                                > Suinos</Text>

                                : <Text style={[Estilo.fontePequenaIconSemClick]}

                                    onPress={() => {
                                        setMuda_cor_checkado_suino(oldState => !oldState)
                                    }
                                    }
                                > Suinos</Text>
                            }
                        </View>
                    </View>


                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', borderWidth: 0, height: 10 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', borderWidth: 1, borderColor: '#fff', height: 1 }} ></View>
                    </View>


                    <View style={{ alignItems: 'center', justifyContent:'center', width: '100%', borderWidth: 0, height: 30 }} >
                        <Text style={Estilo.fontMediaCategoria} >Idade Meses</Text>
                    </View>


                    {/*****************************************************************************/}

                    {/* SLIDER MULTIPLO ABAIXO */}
                    <View style={{ with: '100%', flexDirection: 'row', alignItems:'center' ,borderWidth:0 }}>

                        <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style={ width: '20%' }]}>
                            <Text style={[Estilo.fonteMedia]}>
                                {/*valueStart*/}  {valorMenor}
                            </Text>
                        </View>


                        <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style={ width: '60%'} ]}>
                            {/*
                            <Range
                                style={[Estilo.borda_geral, { width: '100%', height: 70, padding: 15, margin: 15, }]}
                                customMarkerLeft={(e) => setValueStart(e.currentValue)}
                            />
                           */}
                           <View style={{width: '100%', height:40, alignItems:'center', justifyContent:'flex-start'}}>
                            <RangeSlider
                                style={[Estilo.borda_geral, Estilo.pra_cima, { width: '95%', height:32, alignItems:'center', justifyContent:'flex-start', padding: 0, margin: 0 }]}
                                gravity={'bottom'}
                                min={0}
                                labelStyle="none"
                                max={300}
                                step={1}
                                selectionColor="#25E7DB"
                                blankColor="#fff"
                                /*labelStyle={'bubble'}*/
                                onValueChanged={(low, high, fromUser) => {
                                    /**/
                                    setValorMenor(low)
                                    setValorMaior(high)

                                }}
                            />
                            </View>
                        </View>


                        <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style={ width: '20%'}]}>
                            <Text style={[Estilo.fonteMedia]}>
                            {valorMaior}
                            </Text>
                        </View>



                    </View>
                   {/* SLIDER MULTIPLO ACIMA */}
                    {/******************************************************************************/}



                </View >
            }

        </View >






    )
}

/*
function FECHAR_JANELA_REMOTAMENTE(PARAMETRO){
    alert(PARAMETRO)
}
*/

//flexDirection='row',

// export {FECHAR_JANELA_REMOTAMENTE}