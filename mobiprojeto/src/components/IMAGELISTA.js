import React, { useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import Icon from 'react-native-vector-icons/FontAwesome';
import Estilo from './estilo'

import GlobalContext from '../context/UsersContext';

//<Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />

export default function IMAGELIST(param) {

    const navigation = useNavigation();

    const { VARIAVEL_GLOBAL } = useContext(GlobalContext);

    //var image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpDpfgxCLPybhBs19qw3y4HrFerq7IxVvoiw&usqp=CAU'

    return (
        /* */
        <TouchableOpacity style={{ width: 80, height: 'auto', borderWidth: 1, borderLeftWidth: 3, borderRightWidth: 3, borderColor: 'white' }}
            onPress={() => {
                // alert(param.IMAGE)
                var IMAGENS = param.IMAGE;
                var ARRY_URL_IMAGENS = param.LISTAIMAGENS;
                var index_id = param.index;
                // alert(ARRY_URL_IMAGENS)
                //alert(param.LISTAIMAGENS)
               navigation.navigate("navegacaoFotos", { ARRY_URL_IMAGENS, IMAGENS, index_id })

            }}  >
            <Image source={{ uri: param.IMAGE }} style={{ width: '95%', height: '100%' }} />
            
            
            <View style={{ flexDirection:'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', borderWidth:0, borderColor:'red' }} >
                <Icon name='camera' style={[ style = { fontSize:25, color: 'rgba(255,255,255,0.7)', borderWidth:0, borderColor:'green'  }]} />
            </View>

        </TouchableOpacity>
    )

    //alert(param.LISTAIMAGENS)  <Icon name='camera' style={[Estilo.icones_medio, style = { Color: 'rgba(255,255,255,0.2)' }]} />



}   