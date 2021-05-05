import React, { createContext, useState } from 'react';
import { Dimensions } from 'react-native';

// const screenWidth  = Math.round(Dimensions.get('window').width);//=>PEGANDO A LARGURA DA TELA
// const screenHeight = Math.round(Dimensions.get('window').height);

//TODOS PARAMETROS IMPORTANTES RELACIONADO A SITUAÇÃO DOS PRODUTOS ABAIXO
var OBJETOS_JSON =
 {
     LIBERAR_GRAVACAO_TELEFONE_SEM_NUMERO:false,
     TELEFONE:"SEM_TELEFONE_USUARIO",
     FAZER_PROPOSTA:"",
     NOTIFICACAO_RECEIVER_IDENTIFICACAO:"NENHUMA_NOTIFICACAO_AGORA",
     BUSCAR_POSTAGENS: "SIM", 
     BUSCAR_NOTIFICACAO: true,  
     TELA_ATUAL: "Principal",
     TELA_ORIGEM: "nenhuma",
     TELA_TERCEIRA: "nenhuma",

     PROPOSTAS_RECEBIDAS:0,
     PROPOSTAS_ENVIADAS:0,
     PROPOSTAS_ACEITAS:0,
     VENDAS_RECENTES:0,

     ESTA_VENDIDO_OU_COMPRADO:"NAO",
     VENDA_OU_COMPRA_CONSUMADA:"NAO",

     CONEXAO_DO_APP:"OFF-LINE",
     NUMERO_IP:"",

     TODOS_OS_PRODUTOS:"",
     PRODUTO_JSON_SENDO_MANIPULADO_ATUALMENTE:"",

     LISTAIMAGENS_CONTEXT:[],
     LISTAVIDEOS_CONTEXT:[],

     CONTADOR_GLOBAL:60,

     LICENCA_USO:"SEM_CADASTRO",

     LARGURA_DA_TELA: Math.round(Dimensions.get('window').width),
     ALTURA_DA_TELA:  Math.round(Dimensions.get('window').height)
};
/**/
//TODOS PARAMETROS IMPORTANTES RELACIONADO A SITUAÇÃO DOS PRODUTOS ACIMA



//const GlobalContext = createContext({VARIAVEL_GLOBAL: array}); 
const GlobalContext = createContext({VARIAVEL_GLOBAL: OBJETOS_JSON});

export const Globalprovider = ({ children }) => (
    <GlobalContext.Provider value={{ VARIAVEL_GLOBAL: OBJETOS_JSON }} >
       {children}
    </GlobalContext.Provider>
);


  
export default GlobalContext;
