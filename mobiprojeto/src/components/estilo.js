import { StyleSheet,Dimensions } from 'react-native'

import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default StyleSheet.create({

    App:{
        backgroundColor: '#2A3E49',
        /*backgroundColor: '#000',*/
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5

    },


    fonteGrande: {
        fontSize: 36,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Times',
    },

    fonteMedia: {
        padding: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },

    fontePequena: {
        padding: 10,
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
    },
 

 
    div_view_1:{
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',

        height:40,
        width:'100%',
        borderRadius: 5,
        /*borderBottomWidth: '80%',*/
        borderWidth: 0,
        borderColor:'#fff',
        backgroundColor: '#2A3E4A'  /*'#2A3E4A'*/


        
    },

    div_view_2:{
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-end',
       
        padding: 1,
        height:40,
        width:'59%',
        borderRadius: 5,
        /*borderBottomWidth:'80%',*/
        borderWidth: 0,
        borderColor:'#2A3E4A',
        /*backgroundColor: '#ccc', '#2A3E4A',*/
        
    },

    div_view_3:{
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        height:35,
        width:'100%',
        borderRadius: 5,
        /*borderBottomWidth: '80%',
        borderWidth: 1,*/
        borderColor:'#fff',
        backgroundColor: '#2A3E4A',
          
    },

    div_view_4:{
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        height:100,
        width:'100%',
        borderRadius: 5,
        /*borderBottomWidth: '80%',
        borderWidth: 1,*/
        borderColor:'#fff',
        backgroundColor: '#2A3E4A',
          
    },



    div_view_linha:{
       height:1,
       width:'90%',
       borderBottomColor: '#fff',
       borderBottomWidth: 1,
    },
    
    borda_geral:{
       borderWidth: 0,
       borderColor:'#fff',
    },

    Botao: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        padding: 15,
        borderRadius: 8
    },
    
    
    buttonText: {
        paddingRight: 10
    }, 
    Input:{

    },


    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
      },
      title: {
        fontSize: 19,
        fontWeight: 'bold'
      },
      activeTitle: {
        color: 'red'
      },

    fundo_cor_geral:{
       backgroundColor: '#2A3E4A',
       width:'54%',
       borderColor:'#fff'
    },

    icones_grande:{
        fontSize:30,
        color:'#fff',
        padding:2,
        borderWidth:0,
    },

    icones_medio:{
        fontSize:25,
        color:'#fff',
        padding:2,
    },

    icones_clicado:{
        color:'#25E7DB',
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-end',

    },


    icones_medio_cinza:{
        fontSize:25,
        color:'rgb(211,211,211)',
        padding:2,
    },


    icones_medio_vermelho:{
        fontSize:25,
        color:'rgb(255,0,0)',
        padding:2,
    },

    icones_medio_verde:{

        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-end',

        fontSize:25,
        color:'rgb(128,128,128)',
        padding:2,
    },


    /* FLEX BOX COLUNAS ABAIXO */
    
    /*COLUNA 1*/
    painel_1: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        width: '30%',
        /*height: 600*/
     },
     redbox_1: {
        width: '100%',
       /**/height: 100,
        backgroundColor: 'red',
        borderWidth: 1, color: '#fff',
     },
     bluebox_1: {
        width: '100%',
        /**/height: 100,
        backgroundColor: 'blue',
        borderWidth: 1, color: '#fff',
     },


    /*COLUNA 2*/
    painel_2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        width: '70%',
        height: 600
     },
     redbox_2: {
        width: '100%',
        /**/height: 100,
        backgroundColor: 'red',
        borderWidth: 1, color: '#fff',
     },
     bluebox_2: {
        width: '100%',
        /**/height: 100,
        backgroundColor: 'blue',
        borderWidth: 1, color: '#fff',
     },
    /* FLEX BOX COLUNAS ACIMA */ 
   

    panel_3:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
  
    },


     div_5:{


     },

     div_5_1:{


    },


    meu_de_baixo:{
        width: '100%',
        height: 50,

    },



    centralizar_horizontalmente:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pra_cima:{  /*topo_verticalmente */
        flexDirection: 'row',
        alignItems: 'flex-start',
       
    },

    pra_baixo_verticalmente:{
        flexDirection: 'row',
        alignItems: 'flex-end',
   
    },


    pra_esquerda:{
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    pra_direita:{
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    fontePequena_produto: {
        padding: 1,
        fontSize: 13,
        textAlign: 'left',
        color: 'gray',
    },
 
    fontePequena_produto_titulos: {
        padding: 1,
        fontSize: 16,
        textAlign: 'left',
        color: 'black',
    },

    
    fontePequenaIconSemClick: {
        padding: 0,
        fontSize: 20,
        flexDirection: 'row',
        alignItems:'center',
        textAlign: 'center',
        color: '#fff',
        borderWidth: 0,
    },

    fontePequenaIconComClick: {
        padding: 0,
        fontSize: 20,
        flexDirection: 'row',
        alignItems:'center',
        textAlign: 'center',
        color: '#25E7DB',
        /*color: 'rgb(20,220,255)',*/
        borderWidth: 0,
        
    },

    fontCorDoFundo: {
        padding: 0,
        fontSize: 20,
        flexDirection: 'row',
        alignItems:'center',
        textAlign: 'center',
        color: '#2A3E4A',
        borderWidth: 0,
        
    },

   


    /** DESIGN DO MENU ABAIXO **/

    menuPai:{
        //width: (Dimensions.get('window').width / 2),
        width: '65%',
        height: '100%',
         backgroundColor: '#2A3E4A',
       
    },
    
    menuIcones:{

    },

    menuTexto:{

    },

    menuDivisaoVisivel:{

    },

    menuDivisaoInvisivel:{

    },
   /** DESIGN DO MENU ACIMA **/



 /** DESIGN DA TELA CATEGORIA ABAIXO **/
   telaCategoria:{

        width:  '80%',
        height: '60%',
        backgroundColor: '#2A3E4A',
        borderRadius: 15,

   },

   fontMaiorCategoria:{
        fontSize:23,
        color:'#ffffff',
        textAlign: 'center',
   },

   fontMediaCategoria:{
        fontSize:20,
        color:'#ffffff',
        textAlign: 'center',
   },

   fontPequenaCategoria:{
        fontSize:15,
        color:'#ffffff',
        textAlign: 'center',
    },

   /** DESIGN DA TELA CATEGORIA ACIMA **/

/* DESIGN ABAS ABAIXO */
aba1:{

    borderTopLeftRadius:20,
    backgroundColor:'rgb(42,62,80)',

},

aba2:{

    borderTopRightRadius:20,
    backgroundColor:'rgb(57,85,102)', /* 57,85,102 | 70,105,125 | */

},

conteudoAbas1:{
    backgroundColor:'rgb(42,62,80)',

},

conteudoAbas2:{
    backgroundColor:'rgb(57,85,102)', 

},


/* DESIGN ABAS ACIMA */


para_tela_cheia:{
       width:  Dimensions.get('window').width,
       height: Dimensions.get('window').height,
 },

largura_tela:{
      width: Dimensions.get('window').width,
},

altura_tela:{
      height: Dimensions.get('window').height,
},



//////////////////////////////////////
circle:{
    width:36,
    height:36,
    borderRadius:18,   //half radius will make it cirlce,
    backgroundColor:'red'
   },
   count:{color:'#FFF'}
//////////////////////////////////////


});

//color: '#25E7DB',