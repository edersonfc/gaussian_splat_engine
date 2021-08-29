import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import Icon from 'react-native-vector-icons/FontAwesome';
import Estilo from './estilo'

//<Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />

export default function VIDEOLISTA(param) {

    const navigation = useNavigation();

    //var image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpDpfgxCLPybhBs19qw3y4HrFerq7IxVvoiw&usqp=CAU'

    return (
        /* */
        <TouchableOpacity style={{ width: 80, height: 'auto', borderWidth: 1, borderLeftWidth: 3, borderRightWidth: 3, borderColor: 'white' }}
            onPress={() => {

                var URL_Video = param.VIDEO;
                var index_id = param.index;
             
              
                param.SETAR_TELA_ATUAL_COMO_POSTAR_R();

                //navigation.navigate("navegacaoFotos", { ARRY_URL_IMAGENS , IMAGENS , index_id })
                navigation.navigate("NavegarVideos", { URL_Video , index_id })

            }}  >
            <Image source={{ uri: param.VIDEO }} style={{ width: '95%', height: '100%' }} />

            <View style={{ flexDirection:'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', borderWidth:0, borderColor:'red' }} >
                <Icon name='video-camera' style={[ style = { fontSize:25, color: 'rgba(255,255,255,0.8)', borderWidth:0, borderColor:'green'  }]} />
            </View>

        </TouchableOpacity>
    )

    //alert(param.LISTAIMAGENS)



}    