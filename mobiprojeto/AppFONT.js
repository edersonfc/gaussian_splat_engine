import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';


//13052021
//Import react-native-splash-screen.
import SplashScreen from "react-native-splash-screen";

//13052021
// // import TelaSplash from './src/components/TelaSplash';
// import TelaSplash from './components/TelaSplash';


export default function AppFONT() {

  return (

    <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 40, fontFamily: 'Roboto-Medium' }}  >FONT DU TEXTO</Text>

    </View>

  )

}