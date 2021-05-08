import React, { PureComponent, useState, useEffect, useContext } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import Axios from 'axios';
import GlobalContext from '../context/UsersContext';
import SendSMS from 'react-native-sms';

import { data_completa_ingles } from './CALCULO_E_FORMATACAO/FORMATACAO';
import fi from 'date-fns/esm/locale/fi/index.js';

export default function Celular_colocar(params) {

    // OCULTAR_TELA_TELEFONE_FUNCAO_REMOTA

    var [caixaNumeroCelularVisivel, setCaixaNumeroCelularVisivel] = useState(true);
    var [variavelTelefone, setVariavelTelefone] = useState("");

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    //METODOS ABAIXO

    async function GRAVAR_NUMERO_DO_CELL(data_object, STORAGE_SOMENTE) {

        // sdfsdfsd({{}})

        if (STORAGE_SOMENTE == false) {

            ///////////////////////////////////////////////////////////////////  
            var DEU_ERRO_SIM_OU_NAO = "NAO";

            try {

                await Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'insert_cadastro_pessoal', {
                    params:
                    {
                        nome_completo: "",
                        cpf: "",
                        numero_telefone_J: data_object.NUMERO_CELL_J,
                        email: ""
                    }
                })//Axios


            } catch (erro) {

                DEU_ERRO_SIM_OU_NAO = "SIM";
                // alert(erro);

            }

            // alert(STORAGE_SOMENTE);
            // alert(DEU_ERRO_SIM_OU_NAO);
            if (DEU_ERRO_SIM_OU_NAO == "NAO") {

                //ARMAZENANDO NO STORAGE DE DADOS ABAIXO
                await AsyncStorage.setItem('NUMERO_CELL', JSON.stringify(data_object))
                    .then(res => {

                        VARIAVEL_GLOBAL.TELEFONE = data_object.NUMERO_CELL_J;
                        alert("TELEFONE GRAVADO = " + VARIAVEL_GLOBAL.TELEFONE);

                    });

                    VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
            }
            /////////////////////////////////////////////////////////////////  


        }//IF



        if (STORAGE_SOMENTE == true) {

            VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
            //ARMAZENANDO NO STORAGE DE DADOS ABAIXO
            await AsyncStorage.setItem('NUMERO_CELL', JSON.stringify(data_object))
                .then(res => {

                    VARIAVEL_GLOBAL.TELEFONE = data_object.NUMERO_CELL_J;
                    alert("TELEFONE GRAVADO = " + VARIAVEL_GLOBAL.TELEFONE);
                });

        }


    }
    //METODOS ACIMA  #2A3E4A
    const navigation = useNavigation();





    async function VERIFICAR_SE_CELULAR_JA_ESTA_CADASTRADO_NO_BANCO_DE_DADOS(NUMERO_DE_TELEFONE_USUARIO) {

        //alert(NUMERO_DE_TELEFONE_USUARIO);
        //   const  resposta = await Axios.get(IP_DO_SERVIDOR + 'pesquisar_vendas_recentes', {
        const resposta = Axios.get(VARIAVEL_GLOBAL.NUMERO_IP + 'verificar_se_telefone_ja_esta_cadastrado', {

            params: { numero_telefone_J: NUMERO_DE_TELEFONE_USUARIO }

        });
        return resposta;
    }//function





    //ENVIO DE MENSAGEM SMS PELO CELULAR ABAIXO
    //some stuff
    function ENVIAR_SMS(telefone_numero) {
        SendSMS.send({
            // body: 'The default body of the SMS!',
            // body: 'SMS App BovSatMobile ! Para Recuperação de Uso, Digite esse Código:5478 no Caixa do App.',
            body: 'SMS App GadoMobile ! Para Recuperação de Uso, Digite esse Código:5478 no Caixa do App.',
            // recipients: ['0123456789', '9876543210'],
            // recipients: ['67998442660'],
            // recipients: ['+5567998442660'],
            //recipients: ['(67) 99211-3340'],
            recipients: [telefone_numero],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {

            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

        });
    }
    //ENVIO DE MENSAGEM DE SMS PELO CELULAR ACIMA


    var [ocultarMostrarClique, setOcultarMostrarClique] = useState(true);
    var [ocultarMostrarEnvioCodigo, setOcultarMostrarEnvioCodigo] = useState(false);
    var [ocultarMostrarCaixaTexto, setOcultarMostrarCaixaTexto] = useState(false);

    var [gerarEnviarCodigo, setGerarEnviarCodigo] = useState("Gerar Código Recuperação");




    return (


        <View style={{ width: '100%', height: '100%', position: 'absolute' }} >
            {/*CAIXA DO  NUMERO DO CELULAR ABAIXO    backgroundColor: 'rgba(0,0,0,0.8)'
            {caixaNumeroCelularVisivel && ( */}
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', borderWidth: 0, borderColor: 'yellow' }} >

                <View style={{ width: '100%', height: 280, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A3E4A', borderRadius: 25, borderWidth: 1, borderColor: 'white' }}>

                    <View style={{ width: '70%' }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}> Coloque o Nº do Celular </Text>


                        <TextInputMask placeholder="DD + Número" size={15} style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 8, fontSize: 25 }} textAlign={'center'}

                            type={'cel-phone'}
                            // value={variavelTelefone = "(67) 99324-4226"}
                            // value={variavelTelefone = "(12) 34567-8901"}
                            value={variavelTelefone}
                            maxLength={18}
                            onChangeText={value => {
                                setVariavelTelefone(value);

                            }}

                        />


                    </View>


                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: 'row', width: '100%', height: 'auto', borderWidth: 0 }}  >

                        <View style={{ width: '12%' }} />

                        <TouchableHighlight style={{ width: '35%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                            onPress={async () => {

                                var regex = new RegExp(/\(\d{2}\)\s\d{5,5}-?\d{4}/g);//REGEX PARA TELEFONE CELULAR
                                var VALIDAR_CELULAR = variavelTelefone.match(regex);

                                if (VALIDAR_CELULAR !== null) {

                                    var telefone = { NUMERO_CELL_J: variavelTelefone }

                                    var TELA_QUE_CHAMOU = params.tela_chamada;
                                    if (TELA_QUE_CHAMOU == "tela_proposta") {

                                        //alert(TELA_QUE_CHAMOU);

                                        //alert( JSON.stringify( telefone.NUMERO_CELL_J ));
                                        telefone = JSON.stringify(telefone.NUMERO_CELL_J);

                                        //alert(telefone);


                                        var retorno = await VERIFICAR_SE_CELULAR_JA_ESTA_CADASTRADO_NO_BANCO_DE_DADOS(telefone)
                                        //    var DADO_RETORNO_STRING = "";
                                        var DADO_RETORNO_STRING = JSON.stringify(retorno.data);


                                        if (DADO_RETORNO_STRING != "[]" && VARIAVEL_GLOBAL.LIBERAR_GRAVACAO_TELEFONE_SEM_NUMERO == false) {

                                            //alert("Ja kjjk => ! "+DADO_RETORNO_STRING);
                                            alert("Já Existe um Usuário Cadastrado com Esse numero ! " + telefone);
                                            // ENVIAR_SMS(telefone);

                                        } else {

                                            // alert("=> "+DADO_RETORNO_STRING+"  "+telefone);
                                            //alert("NÃO EXISTE VAI GRAVAR O NUMERO");
                                            //alert("Gravar TeleFone e Ocultar a Caixa de Dialogo pra Mostrar Tela Proposta.");
                                            var telefone = { NUMERO_CELL_J: variavelTelefone.replace(/\"/g, '') }
                                            //alert( JSON.stringify( telefone ) );
                                            GRAVAR_NUMERO_DO_CELL(telefone, false);
                                            VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                            params.OCULTAR_TELA_TELEFONE_PROPOSTA_remoto();

                                            // ENVIAR_SMS(telefone);

                                        }//else INTERNO

                                    }
                                    /*********************************************************************/

                                    else if (TELA_QUE_CHAMOU == "tela_DetalhesProdutos") {

                                        //alert(TELA_QUE_CHAMOU);

                                        //alert( JSON.stringify( telefone.NUMERO_CELL_J ));
                                        telefone = JSON.stringify(telefone.NUMERO_CELL_J);

                                        var retorno = await VERIFICAR_SE_CELULAR_JA_ESTA_CADASTRADO_NO_BANCO_DE_DADOS(telefone)


                                        var DADO_RETORNO_STRING = JSON.stringify(retorno.data);
                                        if (DADO_RETORNO_STRING != "[]" && VARIAVEL_GLOBAL.LIBERAR_GRAVACAO_TELEFONE_SEM_NUMERO == false) {

                                            alert("Já Existe um Usuário Cadastrado com Esse numero ! ");
                                            ENVIAR_SMS(telefone);

                                        } else {

                                            //alert("NÃO EXISTE VAI GRAVAR O NUMERO");
                                            //alert("Gravar TeleFone e Ocultar a Caixa de Dialogo pra Mostrar Tela Proposta.");
                                            var telefone = { NUMERO_CELL_J: variavelTelefone.replace(/\"/g, '') }
                                            //alert( JSON.stringify( telefone ) );
                                            GRAVAR_NUMERO_DO_CELL(telefone, false);
                                            VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                            params.OCULTAR_TELA_TELEFONE_PROPOSTA_remoto();

                                        }//else INTERNO


                                    }//else if
                                    // /**********************************************************************/


                                } else { alert("Formato Inválido de Celular !"); }



                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >OK</Text>
                        </TouchableHighlight>
                        <View style={{ width: '6%' }} />
                        <TouchableHighlight style={{ width: '35%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                            onPress={() => {

                                var TELA_QUE_CHAMOU = params.tela_chamada;
                                if (TELA_QUE_CHAMOU == "tela_proposta") {
                                    params.OCULTAR_TELA_TELEFONE_PROPOSTA_remoto();
                                    navigation.goBack(null);
                                } else if (TELA_QUE_CHAMOU == "tela_DetalhesProdutos") {
                                    VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                    params.OCULTAR_TELA_TELEFONE_FUNCAO_REMOTA();
                                }

                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#fff' }} >Cancelar</Text>
                        </TouchableHighlight>

                        <View style={{ width: '12%' }} />


                    </View>


                    {/* Recuperação de Uso do Aplicativo pelo Uso do Número do Telefone */}

                    <View style={{ height: '5%' }} />
                    <View style={{ width: '100%', alignItems: 'center' }} >

                        <Text style={{ fontSize: 14, color: '#25E7DB' }}>Já é Cadastrado ! Recuperar Acesso</Text>
                        <View style={{ height: '5%' }} />


                        <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', borderWidth: 0, borderColor: 'red' }}>

                            {ocultarMostrarClique && (
                                <View style={{ width: '100%', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
                                    <TouchableHighlight style={{ width: '25%', height: 35, color: 'white', fontSize: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                        onPress={() => {
                                            //alert("MOSTRAR E OCULTAR COMPONENTE");
                                            setOcultarMostrarClique(oldState => !oldState);
                                            setOcultarMostrarEnvioCodigo(oldState => !oldState);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, color: '#fff' }}>Click Aqui</Text>
                                    </TouchableHighlight>
                                </View>
                            )}


                            {ocultarMostrarEnvioCodigo && (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 'auto' }}  >

                                    {ocultarMostrarCaixaTexto && (
                                        <TextInput
                                            multiline={false} flexWrap='wrap' textAlign={'center'} placeholder={'CÓDIGO SEGURANÇA'} size={12} /*onChangeText={ } */
                                            style={{ width: '40%', height: 45, alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderRadius: 15 }}
                                        >
                                        </TextInput>
                                    )}

                                    <View style={{ width: '3%' }} />

                                    <View style={{ width: '50%', justifyContent: 'center' }} >
                                        <TouchableHighlight style={{ width: '100%', height: 35, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}
                                            onPress={async () => {
                                                //alert("RECUPERAR SENHA");


                                                //var GerarEnviarCodigo = "Gerar Código";

                                                if (gerarEnviarCodigo.includes("Gerar Código")) {

                                                    // GerarEnviarCodigo = "Enviar Código";
                                                    setGerarEnviarCodigo("Enviar Código Segurança");
                                                    setOcultarMostrarCaixaTexto(true);
                                                    VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                    alert("Foi Enviado um Código de Verificação para " + variavelTelefone);

                                                } else if (gerarEnviarCodigo.includes("Enviar Código")) {

                                                    // gerarEnviarCodigo = "Enviar Código";
                                                    setGerarEnviarCodigo("Gerar Código Recuperação");

                                                    setOcultarMostrarClique(oldState => !oldState);
                                                    setOcultarMostrarEnvioCodigo(oldState => !oldState);

                                                    alert("Enviando Código de Verificação...");
                                                    //COMUNICANDO COM O SERVIDOR TENTANDO LIBERAR O USO DO APLICATIVO

                                                    setOcultarMostrarCaixaTexto(false);

                                                    //DEPOIS DA LIBERAÇÃO DO USO DO APLICATIVO FAZER ISSO ABAIXO
                                                    //IMPLEMENTAR GRAVAÇÃO DO TELEFONE NO CELULAR PARA USAR O APLICATIVO
                                                    // alert(variavelTelefone);
                                                    var telefone = { NUMERO_CELL_J: variavelTelefone.replace(/\"/g, '') }
                                                    await GRAVAR_NUMERO_DO_CELL(telefone, true);
                                                    var TELA_QUE_CHAMOU = params.tela_chamada;
                                                    if (TELA_QUE_CHAMOU == "tela_proposta") {
                                                        VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                        params.OCULTAR_TELA_TELEFONE_PROPOSTA_remoto();
                                                        navigation.goBack(null);
                                                    } else if (TELA_QUE_CHAMOU == "tela_DetalhesProdutos") {
                                                        VARIAVEL_GLOBAL.BUSCAR_LICENCA = true;
                                                        params.OCULTAR_TELA_TELEFONE_FUNCAO_REMOTA();
                                                    }
                                                    //DEPOIS DA LIBERAÇÃO DO USO DO APLICATIVO FAZER ISSO ACIMA

                                                }

                                            }}
                                        >
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 13, color: '#fff', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{gerarEnviarCodigo}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )}


                        </View>

                    </View>

                    {/* Recuperação de Uso do Aplicativo pelo Uso do Número do Telefone */}

                </View>




            </View>
            {/*   )} */}
            {/*CAIXA DO  NUMERO DO CELULAR ACIMA */}

        </View>
    );

}