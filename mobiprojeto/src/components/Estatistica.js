import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Alert,
    TextInput, ScrollView, PermissionsAndroid, TouchableHighlight,
    LogBox
} from 'react-native';


import Estilo from './estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";


//DO BANCO DE DADOS IMPORTAÇÃO
import Axios from 'axios';

//CONTEXT_4
import GlobalContext from '../context/UsersContext';

//npm i --save react-native-pie
//  OU
//npm i --save react-native-pie @react-native-community/art
// import Pie from 'react-native-pie';


// https://formidable.com/open-source/victory/docs/victory-pie/
// npm install victory-native --save
// npm install react-native-svg --save
import { VictoryPie } from 'victory-native';


import DatePicker from 'react-native-datepicker'
// import DatePicker from '@react-native-community/datetimepicker'


import { EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES, EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES, data_completa_ingles } from '../components/CALCULO_E_FORMATACAO/FORMATACAO';


//Metodo de Geração de Cor Aleatória
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)


// const graphicData = [
//     { y: 10, x: '5%' },
//     { y: 90, x: '90% ' },
//     { y: 50, x: '50% ' },
//     { y: 20, x: '20% ' },
//     { y: 70, x: '70% ' },
// ]


// const graphicData = [
//     { y: 35, x: '5%' },
//     { y: 45, x: '90% ' },
//     { y: 20, x: '50% ' },
// ]


// const data = [35, 45, 80];
var data;
data = [35, 45, 80];



export default function Estatistica(props) {

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    const navigation = useNavigation();

    // // var graphicData;
    // var [graphicData, setGraphicData] = useState(data);

    // graphicData = data.map((y, index) => ({
    //     y,
    //     x: `${y}` + '%'
    // }));


    var numero_telefone_usuario = VARIAVEL_GLOBAL.TELEFONE;
    var IP_DO_SERVIDOR = VARIAVEL_GLOBAL.NUMERO_IP;


    var hoje = new Date();

    const [dataInicial, setDataInicial] = useState("01-01-" + hoje.getFullYear());
    // const [dataFinal, setDataFinal] = useState("08-04-2021");
    const [dataFinal, setDataFinal] = useState(EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(data_completa_ingles()));

    const [data, setData] = useState([]);
    // alert(datat);


    const [descricaoGrafico, setDescricaoGrafico] = useState("Percentual %");
    const [parametroPercentagem, setParametroPercentagem] = useState(true);



    // colorScale={["#F89A0E", "#377A4E", "#FF5353"]}
    const [postagem_cor, setPostagem_cor] = useState("#F89A0E");
    const [vendas_cor, setVendas_cor] = useState("#377A4E");
    const [compras_cor, setCompras_cor] = useState("#FF5353");



    const [porCabeca_clicado, setPorCabeca_clicado] = useState(true);
    // const [porCabecaNao_clicado, setPorCabecaNao_clicado] = useState(true);

    const [porNegociacao_clicado, setPorNegociacao_clicado] = useState(false);
    // const [porNegociacaoNao_clicado, setPorNegociacaoNao_clicado] = useState(false);


    const [alternarCabecasOuNegociacao, setAlternarCabecasOuNegociacao] = useState("cabecas");//Por Negociação



    // useEffect(() => {

    //     async function PESQUISAR_QUANTITATIVOS() {

    //     }

    //     PESQUISAR_QUANTITATIVOS();

    // }, [dataInicial, dataFinal]);









    useEffect(async () => {



        /********************************************************************************************************/
        var datos = "";
        var dataInicial_var = EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataInicial);
        var dataFinal_var = EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(dataFinal);

        if (alternarCabecasOuNegociacao.includes("cabecas")) {

            const response = await Axios.get(IP_DO_SERVIDOR + 'select_de_quantitativos_p_grafico', {
                //comprador_J: numero_telefone_comprador,
                params: {
                    numero_telefone_usuario: numero_telefone_usuario,
                    dataInicial_send: dataInicial_var,
                    dataFinal_send: dataFinal_var,
                    parametro_sql_send: "cabecas"
                }

            });

            //alert(JSON.stringify(response.data));
            // datos = JSON.stringify(response.data);
            datos = response.data;

            // alert(datos[0].POSTAGEM_QTDE_CABECAS);
            // alert(datos[0].VENDAS_QTDE_CABECAS);
            // alert(datos[0].COMPRAS_QTDE_CABECAS);

            // alert("GRAFICO POR CABEÇAS");

        }
        else if (alternarCabecasOuNegociacao.includes("negociacao")) {

            const response = await Axios.get(IP_DO_SERVIDOR + 'select_de_quantitativos_p_grafico', {
                //comprador_J: numero_telefone_comprador,
                params: {
                    numero_telefone_usuario: numero_telefone_usuario,
                    dataInicial_send: dataInicial_var,
                    dataFinal_send: dataFinal_var,
                    parametro_sql_send: "negociacao"
                }

            });

            //alert(JSON.stringify(response.data));
            // datos = JSON.stringify(response.data);
            datos = response.data;

            // alert(datos[0].POSTAGEM_QTDE_CABECAS);
            // alert(datos[0].VENDAS_QTDE_CABECAS);
            // alert(datos[0].COMPRAS_QTDE_CABECAS);

            // alert("GRAFICO POR NEGOCIAÇÃO");
        }

        var postagens = 0;
        var vendas = 0;
        var compras = 0;

        try { postagens = datos[0].POSTAGEM_QTDE_CABECAS; } catch (e) { postagens = 0; }
        try { vendas = datos[0].VENDAS_QTDE_CABECAS; } catch (e) { vendas = 0; }
        try { compras = datos[0].COMPRAS_QTDE_CABECAS; } catch (e) { compras = 0; }

        if (postagens == null || postagens == NaN) { postagens = 0; }
        if (vendas == null || vendas == NaN) { vendas = 0; }
        if (compras == null || compras == NaN) { compras = 0; }


        if (postagens == 0) { setPostagem_cor("#2A3E4A") } else { setPostagem_cor("#F89A0E") }

        if (vendas == 0) { setVendas_cor("#2A3E4A") } else { setVendas_cor("#377A4E") }

        if (compras == 0) { setCompras_cor("#2A3E4A") } else { setCompras_cor("#FF5353") }

        data[0] = postagens;
        data[1] = vendas;
        data[2] = compras;

        // setData( PORCENTAGEM(data) );// FOI DESATIVADO ESSA LINHA PORQUE NÃO PRECISOU

        //  alert(postagem + " | " + vendas + " | " + compras);
        // alert(data);
        /********************************************************************************************************/



        function PORCENTAGEM(ARRAY) {

            var ARRAY_2 = [];
            var somatorio = 0;
            var graphicData;

            //VALORES em PORCENTAGEM
            if (parametroPercentagem) {

                for (var i = 0; i < ARRAY.length; i++) {
                    somatorio += ARRAY[i];
                }//FOR


                // for (var j = 0; j < ARRAY.length; j++) {
                for (var j = (ARRAY.length - 1); j >= 0; j--) {
                    ARRAY_2[j] = (ARRAY[j] / somatorio) * 100;
                    //Arrendondando por Exemplo de 21.82 para 22 Removendo casas decimais pelo numero 0 em .toFixed(0) 
                    ARRAY_2[j] = ARRAY_2[j].toFixed(0);
                }//FOR

                //REVERTER ORNDEM DO ARRAY LINHA ABAIXO
                // ARRAY_2.reverse();// NÃO ESTÁ PRECISANDO USAR O REVERSE NESSA LINHA
                // console.log(ARRAY_2);

                graphicData = ARRAY_2.map((y, index) => ({
                    y,
                    x: `${y}` + '%'
                }));

                // setDescricaoGrafico("Percentual %");

                return graphicData;

            }//IF

            else {

                //VALORES em QUANTIDADE
                graphicData = ARRAY.map((y, index) => ({
                    y,
                    x: `${y}`
                }));

                // setDescricaoGrafico("Valores");

                return graphicData;

            }

        }
        /*********************************/


        if (alternarCabecasOuNegociacao.includes("cabecas")) {
            setPorCabeca_clicado(true);
            setPorNegociacao_clicado(false);
        }
        else if (alternarCabecasOuNegociacao.includes("negociacao")) {
            setPorCabeca_clicado(false);
            setPorNegociacao_clicado(true);
        }





        setData(PORCENTAGEM(data));
        /********************************************************************************************************/
    }, [dataInicial, dataFinal, parametroPercentagem, alternarCabecasOuNegociacao]);







    useEffect(() => {

        function ALTERNAR_VALOR_PERCENTUAL() {

            if (parametroPercentagem) { setDescricaoGrafico("Percentual %"); }
            else { setDescricaoGrafico("Valores"); }

        }

        ALTERNAR_VALOR_PERCENTUAL();

    }, [parametroPercentagem]);





    useEffect(() => {

        // created() {
        LogBox.ignoreLogs([
            'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
            'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
            'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
            'componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
            'componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
            '`useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`'
        ]);
        //   }

    }, [dataInicial, dataFinal]);










    return (

        <SafeAreaView style={[Estilo.App]}>


            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0, borderColor: 'pink', position: 'relative' }}
                onPress={() => {
                    var produto = "";
                    navigation.navigate("TelaPrincipal", { produto })
                    // navigation.goBack(null);
                }}
            >
                <Icon name='arrow-left' style={[Estilo.icones_medio, style = { backgroundColor: '#2A3E4A', fontSize: 28 }]}

                    onPress={() => {
                        var produto = "";
                        navigation.navigate("TelaPrincipal", { produto })
                        // navigation.goBack(null);
                    }}

                />

            </TouchableOpacity>

            {/* Linha Branca Abaixo */}
            <View style={{ width: '100%', alignItems: 'center' }} ><View style={{ width: '80%', borderWidth: 1, borderColor: 'white' }} ></View></View>
            {/* Linha Branca Acima */}

            <View style={{ height: 5 }} />

            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                <View style={[Estilo.borda_geral, style = { width: '70%', alignItems: 'center', justifyContent: 'flex-start', borderWidth: 0 }]}>
                    <Text style={{ fontSize: 20, color: 'white' }} >Interválo</Text>
                </View>

            </View>



            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                <View style={[Estilo.borda_geral, style = { width: '35%', height: 40, alignItems: 'center', justifyContent: 'flex-start', borderRadius: 10, borderWidth: 0 }]}>
                    {/* Colocando Data Inicial Abaixo */}
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={dataInicial} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Inicial"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        maxDate="01-01-2040"
                        confirmBtnText="Confirma"
                        cancelBtnText="Cancela"
                        customStyles={{
                            dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 1,
                                borderRadius: 10,
                                fontSize: 15,
                                color: 'white',
                                backgroundColor: 'white'
                            },
                        }}
                        onDateChange={(dataInicial) => {
                            setDataInicial(dataInicial);
                            // alert(dataInicial);
                        }}
                    />

                    {/* <TextInput style={{ width: '90%', backgroundColor: 'rgb(42,69,74)', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, fontSize: 15, color: 'white' }} >01/01/2020</TextInput> */}

                    {/* Colocando Data Inicial Acima */}
                </View>

                <View style={{ width: '10%' }} />

                <View style={[Estilo.borda_geral, style = { backgroundColor: 'rgb(42,69,74)', width: '35%', height: 40, alignItems: 'center', justifyContent: 'flex-start', borderRadius: 10, borderWidth: 0 }]}>
                    {/* Colocando Data Inicial Abaixo */}
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={dataFinal} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Final"
                        format="DD-MM-YYYY"
                        minDate="01-01-2021"
                        maxDate="01-01-2040"
                        confirmBtnText="Confirma"
                        cancelBtnText="Cancela"
                        customStyles={{
                            dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 1,
                                borderRadius: 10,
                                fontSize: 15,
                                backgroundColor: 'white'
                            },
                        }}
                        onDateChange={(dataFinal) => {
                            setDataFinal(dataFinal);
                            // alert(dataFinal);
                        }}
                    />
                    {/* <TextInput style={{ width: '90%', backgroundColor: 'rgb(42,69,74)', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, fontSize: 15, color: 'white' }} >05/09/2020</TextInput> */}
                    {/* Colocando Data Final Acima */}
                </View>

            </View>

            <View style={{ height: '3%' }} />



            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', borderWidth: 0 }}>


                {/*1 **********************************************************************************************************/}
                <View style={{ width: '18%', alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }} >
                    <View style={{ width: '100%', borderWidth: 1, borderColor: 'white' }} ></View>
                </View>

                {/************************************************************************************************************/}
                <View style={{ width: '3%' }} />

                {/*2 ***********************************************************************************************************/}
                <View style={{ width: '35%', borderWidth: 0, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontSize: 20 }}>{descricaoGrafico}</Text>
                </View>

                {/************************************************************************************************************/}
                <View style={{ width: '2%' }} />

                {/*3 ***********************************************************************************************************/}
                <View style={{ width: '18%', borderWidth: 0, borderColor: 'red', alignItems: 'flex-end' }} >
                    <View style={{ width: '100%', borderWidth: 1, borderColor: 'white' }} ></View>
                </View>

                {/************************************************************************************************************/}
                <View style={{ width: '2%' }} />

                {/*4 ***********************************************************************************************************/}
                <View style={{ width: '10%', borderWidth: 0, borderColor: 'red', alignItems: 'flex-start' }} >

                    <TouchableOpacity style={[Estilo.borda_geral, style = { width: '100%', justifyContent: 'flex-start', borderWidth: 0 }]}
                        onPress={() => {

                            setParametroPercentagem(oldState => !oldState);

                        }}
                    >
                        <Icon name='refresh' style={Estilo.fonteGrande} />
                    </TouchableOpacity>


                </View>

                {/************************************************************************************************************/}


            </View>

            <View style={{ height: '3%' }} />

            {/* <View style={{ width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>
                <Text style={{ color: 'white' }} >Quantitativos por Cabeças ou Negociação</Text>
            </View> */}


            {/* BOTÕES TIPO QUANTITATIVOS DE GRÁFICOS ABAIXO */}
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '110%', height: 'auto', justifyContent: 'center', borderWidth: 0 }}>

                <TouchableOpacity style={porCabeca_clicado ? EstiloBotaoClicado_1.container : EstiloBotaoNaoClicado_1.container}

                    onPress={() => {

                        // setParametroPercentagem(oldState => !oldState);
                        // setPorCabeca_clicado(true);
                        // setPorNegociacao_clicado(false);

                        //setAlternarCabecasOuNegociacao("Por Cabeças");
                        setAlternarCabecasOuNegociacao("cabecas");

                    }}

                >
                    <Text style={porCabeca_clicado ? EstiloBotaoClicado_1.text : EstiloBotaoNaoClicado_1.text}

                    // onPress={() => {

                    //     // setParametroPercentagem(oldState => !oldState);
                    //     // setPorCabeca_clicado(true);
                    //     // setPorNegociacao_clicado(false);
                    //     setAlternarCabecasOuNegociacao("Por Cabeças");

                    // }}
                    >Por Cabeças</Text>
                </TouchableOpacity>


                <TouchableOpacity style={porNegociacao_clicado ? EstiloBotaoClicado_2.container : EstiloBotaoNaoClicado_2.container}

                    onPress={() => {

                        // setParametroPercentagem(oldState => !oldState);
                        // setPorCabeca_clicado(false);
                        // setPorNegociacao_clicado(true);
                        // setAlternarCabecasOuNegociacao("Por Negociação");
                        setAlternarCabecasOuNegociacao("negociacao");

                    }}

                >
                    <Text style={porNegociacao_clicado ? EstiloBotaoClicado_2.text : EstiloBotaoNaoClicado_2.text}

                    //   onPress={() => {

                    //         // setParametroPercentagem(oldState => !oldState);
                    //         // setPorCabeca_clicado(false);
                    //         // setPorNegociacao_clicado(true);
                    //         setAlternarCabecasOuNegociacao("Por Negociação");

                    //     }}

                    >Por Negociação</Text>
                </TouchableOpacity>

            </View>
            {/* BOTÕES TIPO QUANTITATIVOS DE GRÁFICOS ACIMA   height: '54%', */}


            {/* O Gráfico Dentro do Container View começa Aqui Abaixo */}
            <View style={{ flexDirection: 'column', alignItems: 'center', width: '99%', height: '58%', justifyContent: 'center', borderWidthLeft: 5, borderWidthRight: 1 }}>



                <View style={{ with: '99%', borderwidth: 5, bordercolor: 'white', background: 'black' }}>

                    <VictoryPie
                        radius={150}

                        //   colorScale={["#F89A0E", "#377A4E", "#FF5353"]}
                        colorScale={[postagem_cor, vendas_cor, compras_cor]}
                        categories={["Postagens", "Vendas", "Compras"]}
                        padAngle={5}
                        labelRadius={100}

                        style={{ width: '99%', height: '58%', labels: { fontSize: 18, fill: "white", bold: 'white', borderwidth: 1 } }}

                        innerRadius={80}
                        // innerRadius={({ datum }) => datum.y * 0.7}
                        //data={PORCENTAGEM(data)}
                        data={data}

                    /* Estilo do Gráfico Abaixo */
                    />

                </View>


            </View>
            {/* O Gráfico Dentro do Container View começa Aqui Acima */}

            {/* <View style={{ height: '8%' }} /> */}


            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }} >


                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>

                    <View style={{ width: '33%', borderWidth: 0 }} >
                        <Text style={{ color: '#F89A0E', fontSize: 20 }}>Postagens</Text>
                    </View>

                    <View style={{ width: '33%', borderWidth: 0, alignItems: 'center' }} >
                        <Text style={{ color: '#377A4E', fontSize: 20 }}>Vendas</Text>
                    </View>

                    <View style={{ width: '33%', borderWidth: 0, borderColor: 'red', alignItems: 'flex-end' }} >
                        <Text style={{ color: '#FF5353', fontSize: 20 }}>Compras</Text>
                    </View>

                </View>


            </View>



        </SafeAreaView>


    )



}






const EstiloBotaoClicado_1 = StyleSheet.create({

    container: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopEndRadius: 20
        // borderWidth: 1,

    },
    text: {
        color: '#25E7DB',
        fontSize: 18,
    }
});



const EstiloBotaoNaoClicado_1 = StyleSheet.create({

    container: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderBottomWidth: 1

    },
    text: {
        color: '#FFF',
        fontSize: 18,
    }
});










const EstiloBotaoClicado_2 = StyleSheet.create({

    container: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderTopStartRadius: 20
        // borderWidth: 1,

    },
    text: {
        color: '#25E7DB',
        fontSize: 18,
    }
});



const EstiloBotaoNaoClicado_2 = StyleSheet.create({

    container: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderBottomWidth: 1

    },
    text: {
        color: '#FFF',
        fontSize: 18,
    }
});












const EstiloInterno = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#5D21D0'
        backgroundColor: '#2A3E49'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 30,
        // position: 'absolute'
        position: 'relative'
    }

});


//ESTILO DO CALENDÁRIO ABAIXO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        color: 'red'
    },
    datePickerStyle: {
        width: 150,
        marginTop: 0,

    },
});
    //ESTILO DO CALENDÁRIO ACIMA


