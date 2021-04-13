import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import Routes from './routes';

//IMPORTAÇÃO DO CONTEXTO e PROVIDER ABAIXO
//CONTEXT_1
import {Globalprovider} from './context/UsersContext';
//IMPORTAÇÃO DO CONTEXTO e PROVIDER ACIMA
/**/

function App() {


    return (

        //<NavigationContainer>
            <>
                {/*CONTEXT_2*/}
                <Globalprovider>
                    <StatusBar barStyle="light-content" backgroundColor="#2A3E4A" />

                    <View style={{ backgroundColor: '#2A3E4A', flex: 1 }}>
                        <Routes />
                    </View>

                 {/*CONTEXT_3*/}
                 </Globalprovider>                 
            </>
        //</NavigationContainer>



    )
};

export default App;