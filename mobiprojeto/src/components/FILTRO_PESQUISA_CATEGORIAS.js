import React, { useRef, useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, SafeAreaView, Alert, TextInput, TouchableOpacity, TouchableHighlight, Dimensions, Animated } from 'react-native'

import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import GlobalContext from '../context/UsersContext';

//import Range from '@ptomasroos/react-native-multi-slider'

import RangeSlider from 'rn-range-slider';

//OUTRO SLIDER ABAIXO
// LINK DO SITE ==> https://github.com/callstack/react-native-slider
//npm install @react-native-community/slider --save
import Slider from '@react-native-community/slider';
import { color } from 'react-native-reanimated';






var categorias_Objetos = {

    Obj_Macho: "",
    Obj_Femea: "",

    Obj__0_12: "",
    Obj__12_24: "",
    Obj__24_36: "",
    Obj_Acima_36: "",

    Obj_Bezerros: "",
    Obj_Garrotes: "",
    Obj_Tourunos: "",
    Obj_Bois: "",
    Obj_BoisGordos: "",

    Obj_Bezerras: "",
    Obj_Novilhas: "",
    Obj_VacasBoiadeiras: "",
    Obj_Vacas: "",
    Obj_VacasGordas: "",
    Obj_VacasPrenhas: "",
    Obj_VacasParidas: ""

}

export default function FILTRO_PESQUISA_CATEGORIAS(props) {


    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);




    var [corMacho, setcorMacho] = useState(false);
    var [corFemea, setcorFemea] = useState(false);

    var [cor_0_12, setcor_0_12] = useState(false);
    var [cor_12_24, setcor_12_24] = useState(false);
    var [cor_24_36, setcor_24_36] = useState(false);
    var [corAcima_36, setcorAcima_36] = useState(false);


    var [corBezerros, setcorBezerros] = useState(false);
    var [corGarrotes, setcorGarrotes] = useState(false);
    var [corTourunos, setcorTourunos] = useState(false);
    var [corBois, setcorBois] = useState(false);
    var [corBoisGordos, setcorBoisGordos] = useState(false);

    var [corBezerras, setcorBezerras] = useState(false);
    var [corNovilhas, setcorNovilhas] = useState(false);
    var [corVacasBoiadeiras, setcorVacasBoiadeiras] = useState(false);
    var [corVacas, setcorVacas] = useState(false);
    var [corVacasGordas, setcorVacasGordas] = useState(false);
    var [corVacasPrenhas, setcorVacasPrenhas] = useState(false);
    var [corVacasParidas, setcorVacasParidas] = useState(false);








    const [objetosCategoria, setobjetosCategoria] = useState(categorias_Objetos);



    var [arquivoDoCell, setarquivoDoCell] = useState('file:///');


    //VARIAVEL DE DADOS ABAIXO  set
    var [outrasErasAnterior, setOutrasErasAnterior] = useState("");
    function outrasErasAnteriorF(outrasErasAnterior) { setOutrasErasAnterior(outrasErasAnterior); }

    var [outrasErasPosterior, setOutrasErasPosterior] = useState("");
    function outrasErasPosteriorF(outrasErasPosterior) { setOutrasErasPosterior(outrasErasPosterior); }

    var [descricoesGerais, setDescricoesGerais] = useState("");
    function descricoesGeraisF(descricoesGerais) { setDescricoesGerais(descricoesGerais); }

    var [precoSugerido, setPrecoSugerido] = useState("");
    function precoSugeridoF(precoSugerido) { setPrecoSugerido(precoSugerido); }

    var [quantidadeCabecasOuPesos, setQuantidadeCabecasOuPesos] = useState(0);
    function quantidadeCabecasOuPesosF(quantidadeCabecasOuPesos) { setQuantidadeCabecasOuPesos(quantidadeCabecasOuPesos); }




    // var corMacho_J = corMacho;
    // var corFemea_J = corFemea;
    // var cor_0_12_J = cor_0_12;
    // var cor_12_24_J = cor_12_24;
    // var cor_24_36_J = cor_24_36;
    // var corAcima_36_J = corAcima_36;

    // var outrasErasAnterior_J = outrasErasAnterior;
    // var outrasErasPosterior_J = outrasErasPosterior;

    // var corBezerros_J = corBezerros;
    // var corGarrotes_J = corGarrotes;
    // var corTourunos_J = corTourunos;
    // var corBois_J = corBois;
    // var corBoisGordos_J = corBoisGordos;
    // var corBezerras_J = corBezerras;
    // var corNovilhas_J = corNovilhas;
    // var corVacasBoiadeiras_J = corVacasBoiadeiras;
    // var corVacas_J = corVacas;
    // var corVacasGordas_J = corVacasGordas;
    // var corVacasPrenhas_J = corVacasPrenhas;
    // var corVacasParidas_J = corVacasParidas;

    // var descricoesGerais_J = descricoesGerais;
    // var precoSugerido_J = precoSugerido;
    // var quantidadeCabecasOuPesos_J = quantidadeCabecasOuPesos;






    //UseState do Amimated
    const [largura, setLargura] = useState(new Animated.Value(0));
    const [altura, setAltura] = useState(new Animated.Value(0));

    var Largura_total_da_tela = Math.round(Dimensions.get('window').width);
    var largura_noventa_e_sete_porcento = ((Largura_total_da_tela * 97) / 100);
    // console.log(largura_sesenta_e_sete_porcento);

    var Altura__total_da_tela = Math.round(Dimensions.get('window').height);
    var altura_oitenta_e_cinco_porcento = ((Altura__total_da_tela * 90) / 100);


    useEffect(() => {

        Animated.sequence([

            Animated.timing(
                largura,
                {
                    toValue: largura_noventa_e_sete_porcento,
                    duration: 900,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                altura,
                {
                    toValue: altura_oitenta_e_cinco_porcento,
                    duration: 300,
                    useNativeDriver: false
                }
            )

        ]).start();


    }, []);








    // var [valorDoSlider, setPesquisarGado] = useState('');
    // function pesquisarGadoF(varPesquisaGado) { setPesquisarGado(varPesquisaGado); }


    const [valorMenor, setValorMenor] = useState(0)

    const [DistanciaMaior, setValorMaior] = useState(300)

    function setarValorF(DistanciaMaior) {
        setValorMaior(Math.round(DistanciaMaior));
        VARIAVEL_GLOBAL.DISTANCIAS_PARA_O_FILTRO = DistanciaMaior;
    }




    //__________________________//__________________________//_______________________//

    const [iconSlider, setIconSlider] = useState();

    useEffect(() => {
        Icon.getImageSource('circle', 25, '#25E7DB')
            .then(setIconSlider);
    }, []);

    //__________________________//__________________________//_______________________//




    return (


        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: Altura__total_da_tela/*VARIAVEL_GLOBAL.ALTURA_DA_TELA*/, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)' }}>


            <Animated.View style={{
                backgroundColor: '#2A3E4A',
                borderRadius: 15,
                borderColor: '#fff',
                borderWidth: 1,
                width: largura/*'97%'*/,
                height: altura_oitenta_e_cinco_porcento/*'85%'*/,
                position: 'absolute'

            }} >



                {/*****************************************/}
                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, paddingRight: 7, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 0, borderColor: 'pink' }}
                    onPress={() => {
                        //    setFecharTelaCategoria(oldState => !oldState);
                        // setFecharTelaCategoria(false);
                        props.setExibeFiltroCategori(false);
                    }}

                >
                    <Icon name='window-close' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A' }]} />
                </TouchableOpacity>
                {/*****************************************/}


                <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} > Sexo  </Text>
                    <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                </View>


                <View style={{ width: '100%', height: 30, paddingTop: 0, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', width: 'auto', paddingTop: 5, borderWidth: 0, borderColor: 'orange' }}>

                        <View style={{ width: '10%' }} />
                        <Icon style={{ fontSize: 18, color: corMacho ? "#25E7DB" : "#2A3E4A" }} name='check' />
                        <Text style={{ fontSize: 18, color: corMacho ? "#25E7DB" : "white", width: 'auto' }} name='check'

                            onPress={useCallback(() => {

                                // setcorMacho(oldState => !oldState); 
                                setcorMacho(oldState => !oldState ? categorias_Objetos.Obj_Macho = "Machos" : categorias_Objetos.Obj_Macho = "");
                                // alert(categorias_Objetos.Obj_Macho);

                            }, [])}

                        > Machos</Text>

                        <View style={{ width: '30%' }} />

                        <Icon style={{ fontSize: 18, color: corFemea ? "#25E7DB" : "#2A3E4A" }} name='check' />
                        <Text style={{ fontSize: 18, color: corFemea ? "#25E7DB" : "white", width: 'auto' }} name='check'
                            onPress={() => {
                                //  setcorFemea(oldState => !oldState)
                                setcorFemea(oldState => !oldState ? categorias_Objetos.Obj_Femea = "Fêmea" : categorias_Objetos.Obj_Femea = "");
                            }}
                        > Fêmeas </Text>
                        <View style={{ width: '10%' }} />

                    </View>

                </View>

                <View></View>

                <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 19, color: 'white' }} > Idade Meses  </Text>
                    <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                </View>


                {/****************************************/}

                <View style={{ width: '100%', height: 30, paddingTop: 0, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'white' }}>

                        <View style={{ flexDirection: 'row', width: '95%', height: 30, paddingTop: 3, borderWidth: 0, borderColor: 'red', justifyContent: 'space-between' }}>



                            <View style={{ flexDirection: 'row', width: 'auto', borderRadius: 25, borderWidth: 0, borderColor: 'white' }}>
                                <Icon style={{ borderWidth: 0, fontSize: 16, color: cor_0_12 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ borderWidth: 0, fontSize: 15, color: cor_0_12 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_0_12(oldState => !oldState ? categorias_Objetos.Obj__0_12 = "0 á 12" : categorias_Objetos.Obj__0_12 = "") }}
                                > 0 à 12 </Text>
                                {/* <View style={{ width: '4%' }} /> */}
                            </View>


                            <View style={{ flexDirection: 'row', width: 'auto' }}>
                                <Icon style={{ fontSize: 16, color: cor_12_24 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 15, color: cor_12_24 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_12_24(oldState => !oldState ? categorias_Objetos.Obj__12_24 = "12 á 24" : categorias_Objetos.Obj__12_24 = "") }}
                                > 12 à 24 </Text>
                                {/* <View style={{ width: '4%' }} /> */}
                            </View>


                            <View style={{ flexDirection: 'row', width: 'auto' }}>
                                <Icon style={{ fontSize: 16, color: cor_24_36 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 15, color: cor_24_36 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcor_24_36(oldState => !oldState ? categorias_Objetos.Obj__24_36 = "24 á 36" : categorias_Objetos.Obj__24_36 = "") }}
                                > 24 à 36 </Text>
                                {/* <View style={{ width: '4%' }} /> */}
                            </View>


                            <View style={{ flexDirection: 'row', width: 'auto' }}>
                                <Icon style={{ fontSize: 16, color: corAcima_36 ? "#25E7DB" : "#2A3E4A" }} name='check' />
                                <Text style={{ fontSize: 15, color: corAcima_36 ? "#25E7DB" : "white", width: 'auto' }} name='check'
                                    onPress={() => { setcorAcima_36(oldState => !oldState ? categorias_Objetos.Obj_Acima_36 = "Acima 36" : categorias_Objetos.Obj_Acima_36 = "") }}
                                >Acima 36</Text>
                            </View>


                        </View>

                    </View>

                </View>

                {/***************** OUTRAS ERAS ABAIXO ***********************/}



                <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ width: '90%', borderBottomWidth: 1, borderColor: 'white', textAlign: 'center', fontSize: 19, color: 'white' }} >Raio de Distância KM</Text>
                </View>






                {/*****************************************************************************/}

                {/* SLIDER MULTIPLO ABAIXO */}
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>

                    <View style={[style = { width: '12%', borderWidth: 0 }]}>
                        <Text style={[Estilo.fonteMedia, style = { padding: 0, color: '#25E7DB' }]}>
                            {valorMenor}
                        </Text>
                    </View>


                    {/* <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style = { width: '65%', borderWidth: 1  }]}> */}


                    <View style={{ width: '70%', height: 40, alignItems: 'center', justifyContent: 'center', padding: 0, borderWidth: 0 }}>



                        {/* <RangeSlider
                                    style={[Estilo.borda_geral, Estilo.pra_cima, { width: '100%', height: 32, alignItems: 'center', justifyContent: 'flex-start', padding: 0, margin: 0 }]}
                                    gravity={'bottom'}
                                    min={0}
                                    labelStyle="none"
                                    max={3000}
                                    step={10}
                                    selectionColor="#25E7DB"
                                    blankColor="#fff"
                                    //labelStyle={'bubble'}
                                    onValueChanged={(low, high, fromUser) => {
                                       
                                        setValorMenor(low)
                                        setValorMaior(high)

                                    }}
                                />  */}





                        {/* OUTRO SLIDER ABAIXO */}
                        <Slider
                            //style={{ width: 200, height: 40 }}
                            style={[{ width: '100%', height: 32, alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0 }]}
                            minimumValue={0}
                            maximumValue={3000}
                            minimumTrackTintColor="#25E7DB"
                            // maximumTrackTintColor="#000000"
                            maximumTrackTintColor="#FFF"

                            thumbTintColor="#25E7DB"

                            thumbImage={iconSlider}

                            onValueChange={setarValorF}
                        />
                        {/* OUTRO SLIDER ACIMA */}


                    </View>


                    {/* </View> */}


                    <View style={[Estilo.borda_geral, Estilo.centralizar_horizontalmente, style = { width: 'auto', borderWidth: 0 }]}>
                        <Text style={[Estilo.fonteMedia, style = { padding: 0, color: '#25E7DB' }]}>
                            {DistanciaMaior}
                        </Text>
                    </View>



                </View>
                {/* SLIDER MULTIPLO ACIMA */}
                {/******************************************************************************/}




                {/*
                <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} > Outras Eras  </Text>
                </View>


                <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'white' }}>

                    <View style={{ flexDirection: 'row', width: '100%', height: 40, paddingTop: 5, borderWidth: 0, borderColor: 'white' }}>

                        <View style={{ width: '5%' }} />
                        <TextInput style={{ width: '40%', backgroundColor: 'white', borderRadius: 8 }} onChangeText={outrasErasAnteriorF} />
                        <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white', width: '10%', textAlign: 'center' }} > à  </Text>
                        <TextInput style={{ width: '40%', backgroundColor: 'white', borderRadius: 8 }} onChangeText={outrasErasPosteriorF} />
                        <View style={{ width: '5%' }} />

                    </View>

                </View>
            */}

                {/******************* OUTRAS ERAS ACIMA *********************/}

                <View style={{ width: '100%', paddingTop: 10, borderWidth: 0, borderColor: 'white', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ borderWidth: 0, borderColor: 'blue', fontSize: 16, color: 'white' }} >Tipo de Gado  </Text>
                    <View style={{ width: '90%', borderBottomColor: 'white', borderBottomWidth: 1 }} />
                </View>



                <View style={{ flexDirection: 'row', width: '100%', height: 220, borderEndWidth: 0, borderColor: 'darkgreen' }} >

                    {/* COLUNA 1 */}
                    <View style={{ width: '50%', height: 300, paddingLeft: 20, borderEndWidth: 0, borderColor: 'darkorange' }} >

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorBezerros(oldState => !oldState ? categorias_Objetos.Obj_Bezerros = "Bezerros" : categorias_Objetos.Obj_Bezerros = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corBezerros ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corBezerros ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bezerros</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorGarrotes(oldState => !oldState ? categorias_Objetos.Obj_Garrotes = "Garrotes" : categorias_Objetos.Obj_Garrotes = "") }}
                        >

                            <Icon style={{ fontSize: 16, color: corGarrotes ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corGarrotes ? "#25E7DB" : "white", width: 'auto' }} name='check'> Garrotes</Text>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorTourunos(oldState => !oldState ? categorias_Objetos.Obj_Tourunos = "Tourunos" : categorias_Objetos.Obj_Tourunos = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corTourunos ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corTourunos ? "#25E7DB" : "white", width: 'auto' }} name='check'> Tourunos</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorBois(oldState => !oldState ? categorias_Objetos.Obj_Bois = "Bois" : categorias_Objetos.Obj_Bois = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corBois ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corBois ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bois</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorBoisGordos(oldState => !oldState ? categorias_Objetos.Obj_BoisGordos = "Bois Gordos" : categorias_Objetos.Obj_BoisGordos = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corBoisGordos ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corBoisGordos ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bois Gordos</Text>
                        </TouchableOpacity>


                    </View>



                    {/* COLUNA 2 */}
                    <View style={{ width: '50%', height: 300, paddingLeft: 15, borderEndWidth: 0, borderColor: 'darkorange' }} >



                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorBezerras(oldState => !oldState ? categorias_Objetos.Obj_Bezerras = "Bezerras" : categorias_Objetos.Obj_Bezerras = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corBezerras ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corBezerras ? "#25E7DB" : "white", width: 'auto' }} name='check'> Bezerras</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorNovilhas(oldState => !oldState ? categorias_Objetos.Obj_Novilhas = "Novilhas" : categorias_Objetos.Obj_Novilhas = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corNovilhas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corNovilhas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Novilhas</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorVacasBoiadeiras(oldState => !oldState ? categorias_Objetos.Obj_VacasBoiadeiras = "Vacas Boiadeiras" : categorias_Objetos.Obj_VacasBoiadeiras = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corVacasBoiadeiras ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corVacasBoiadeiras ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Boiadeiras</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorVacas(oldState => !oldState ? categorias_Objetos.Obj_Vacas = "Vacas" : categorias_Objetos.Obj_Vacas = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corVacas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corVacas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorVacasGordas(oldState => !oldState ? categorias_Objetos.Obj_VacasGordas = "Vacas Gordas" : categorias_Objetos.Obj_VacasGordas = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corVacasGordas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corVacasGordas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Gordas</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorVacasPrenhas(oldState => !oldState ? categorias_Objetos.Obj_VacasPrenhas = "Vacas Prenhas" : categorias_Objetos.Obj_VacasPrenhas = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corVacasPrenhas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corVacasPrenhas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Prenhas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, borderEndWidth: 1 }}
                            onPress={() => { setcorVacasParidas(oldState => !oldState ? categorias_Objetos.Obj_VacasParidas = "Vacas Paridas" : categorias_Objetos.Obj_VacasParidas = "") }}
                        >
                            <Icon style={{ fontSize: 16, color: corVacasParidas ? "#25E7DB" : "#2A3E4A" }} name='check' />
                            <Text style={{ fontSize: 16, color: corVacasParidas ? "#25E7DB" : "white", width: 'auto' }} name='check'> Vacas Paridas</Text>
                        </TouchableOpacity>


                    </View>

                </View>


                <View style={{ alignItems: 'center' }} >

                    <TouchableHighlight style={{ width: '35%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                        onPress={() => {



                            var DADOS_DOS_FILTROS_FULLTEXT_SEARCH =
                                categorias_Objetos.Obj_Macho + " " +
                                categorias_Objetos.Obj_Femea + " " +
                                categorias_Objetos.Obj__0_12 + " " +
                                categorias_Objetos.Obj__12_24 + " " +
                                categorias_Objetos.Obj__24_36 + " " +
                                categorias_Objetos.Obj_Acima_36 + " " +
                                categorias_Objetos.Obj_Bezerros + " " +
                                categorias_Objetos.Obj_Garrotes + " " +
                                categorias_Objetos.Obj_Tourunos + " " +
                                categorias_Objetos.Obj_Bois + " " +
                                categorias_Objetos.Obj_BoisGordos + " " +
                                categorias_Objetos.Obj_Bezerras + " " +
                                categorias_Objetos.Obj_Novilhas + " " +
                                categorias_Objetos.Obj_VacasBoiadeiras + " " +
                                categorias_Objetos.Obj_Vacas + " " +
                                categorias_Objetos.Obj_VacasGordas + " " +
                                categorias_Objetos.Obj_VacasPrenhas + " " +
                                categorias_Objetos.Obj_VacasParidas;



               

                            let  flagVazioOuNao = DADOS_DOS_FILTROS_FULLTEXT_SEARCH.replace(/[\s]/g,"");
                            // let  flagVazioOuNao = DADOS_DOS_FILTROS_FULLTEXT_SEARCH;
                            // alert( flagVazioOuNao.length ); return 0;




                            // if (VARIAVEL_GLOBAL.TELA_ATUAL.toString() === "Principal") {
                            if (props.telaQueChamaOFiltro === "Principal"  && flagVazioOuNao.length > 0 ) {

                                // alert(DADOS_DOS_FILTROS_FULLTEXT_SEARCH);
                                // alert("TÁ CHAMANDO A TELA ERRADA !")
                                props.PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH_REMOTO(DADOS_DOS_FILTROS_FULLTEXT_SEARCH);

                                // } else if (VARIAVEL_GLOBAL.TELA_ATUAL.toString() === "ComprasVendas") {
                            } else if (props.telaQueChamaOFiltro === "ComprasVendas"  && flagVazioOuNao.length > 0 ) {
                                // alert("FILTRO NA TELA COMPRA E VENDA");
                                props.PESQUISAR_GADOBOVINO_FULLTEXT_SEARCH_REMOTO_2(DADOS_DOS_FILTROS_FULLTEXT_SEARCH);

                           
                            }else if (props.telaQueChamaOFiltro === "Principal"  && flagVazioOuNao.length <= 0 ) {

                                props.FILTRANDO_POR_DISTANCIA_REMOTO();

                            }




                            props.setExibeFiltroCategori(false);

                            // alert("== LISTA ==> " + DADOS_DOS_FILTROS_FULLTEXT_SEARCH);

                            //______________________//____________________________//
                            categorias_Objetos.Obj_Macho = "";
                            categorias_Objetos.Obj_Femea = "";
                            categorias_Objetos.Obj__0_12 = "";
                            categorias_Objetos.Obj__12_24 = "";
                            categorias_Objetos.Obj__24_36 = "";
                            categorias_Objetos.Obj_Acima_36 = "";
                            categorias_Objetos.Obj_Bezerros = "";
                            categorias_Objetos.Obj_Garrotes = "";
                            categorias_Objetos.Obj_Tourunos = "";
                            categorias_Objetos.Obj_Bois = "";
                            categorias_Objetos.Obj_BoisGordos = "";
                            categorias_Objetos.Obj_Bezerras = "";
                            categorias_Objetos.Obj_Novilhas = "";
                            categorias_Objetos.Obj_VacasBoiadeiras = "";
                            categorias_Objetos.Obj_Vacas = "";
                            categorias_Objetos.Obj_VacasGordas = "";
                            categorias_Objetos.Obj_VacasPrenhas = "";
                            categorias_Objetos.Obj_VacasParidas = "";
                            //_____________________//_____________________________//


                        }}
                    >
                        <Text style={{ fontSize: 15, color: '#fff' }} >Aplicar Filtro</Text>
                    </TouchableHighlight>

                </View>

            </Animated.View>


        </View >

    )



}