import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

//IMPORTAÇÃO DO CONTEXTO e PROVIDER ABAIXO
//CONTEXT_1
import { Globalprovider } from './context/UsersContext';
//IMPORTAÇÃO DO CONTEXTO e PROVIDER ACIMA
/**/



function App() {


    // const [tela_splash_true_false, set_tela_splash_true_false] = useState(true);


    // function IntervaloEntreTelas() {

    //     {...(() => {

    //     setTimeout(() => {
    //         // randomNumber += 100
    //         // console.log(randomNumber);
    //         set_tela_splash_true_false(false);

    //     }, 3000);

    //     {
    //         tela_splash_true_false ?

    //             <TelaSplash />
    //             :
    //             <Routes />
    //     }

    //     })()}

    //     set_tela_splash_true_false(true);

    // }

 




    return (

        //<NavigationContainer>
        <>
            {/*CONTEXT_2*/}
            <Globalprovider>
                <StatusBar barStyle="light-content" backgroundColor="#2A3E4A" />

                <View style={{ backgroundColor: '#2A3E4A', flex: 1 }}>

                    {/* {IntervaloEntreTelas()} */}

                    <Routes />

                </View>

                {/*CONTEXT_3*/}
            </Globalprovider>
        </>
        //</NavigationContainer>



    )
};

export default App;