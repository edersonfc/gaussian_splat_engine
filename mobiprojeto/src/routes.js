import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();


//import Incidents from "./pages/Incidents";
//import Detail    from "./pages/Detail";
import AppFONT from '../AppFONT';
// import TelaSplash from './components/TelaSplash';
import TelaPrincipal from './AppTest';
import EtiquetaProdutos from './components/ProdutosEtiquetas';
import ProdDetalhes from './components/DetalhesProdutos';
import ComprasVendas from './components/ComprasVendas';
import Postar from './components/Postar';
import EnvioPropostasCompras from './components/EnvioPropostasCompras';
import CameraFoto from './components/fotos/CameraFoto';
import navegacaoFotos from './components/fotos/navegacaoFotos';
import Videos from './components/videos/Videos';
import NavegarVideos from './components/videos/NavegarVideos';
import MAPA from './components/MAPA';
import MapaGoogle from './components/MapaGoogle';
import Estatistica from './components/Estatistica';
import Screen_pay from './components/pay/screen_pay';



import pay_credity_card from './components/pay/pay_credity_card';
import Tabela_planos from './components/pay_anuncios/Tabela_planos';



export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {/*
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
         */}
        

        {/* <AppStack.Screen name="AppFONT" component={AppFONT} /> */}

        {/* <AppStack.Screen name="TelaSplash" component={TelaSplash} /> */}

         <AppStack.Screen name="TelaPrincipal" component={TelaPrincipal} />
        {/* <AppStack.Screen name="EtiquetaProdutos" component={EtiquetaProdutos} />*/}
        <AppStack.Screen name="ProdDetalhes" component={ProdDetalhes} />
        <AppStack.Screen name="ComprasVendas" component={ComprasVendas} />
        <AppStack.Screen name="Postar" component={Postar} />
        <AppStack.Screen name="EnvioPropostasCompras" component={EnvioPropostasCompras} />
        <AppStack.Screen name="CameraFoto" component={CameraFoto} />
        {/*  Voltar CameraFoto    Aqui Depois  */}
        <AppStack.Screen name="navegacaoFotos" component={navegacaoFotos} />
        <AppStack.Screen name="Videos" component={Videos} />

        <AppStack.Screen name="NavegarVideos" component={NavegarVideos} />

        <AppStack.Screen name="MAPA" component={MAPA} />

        <AppStack.Screen name="MapaGoogle" component={MapaGoogle} />

        <AppStack.Screen name="Estatistica" component={Estatistica} />
 
        <AppStack.Screen name="Screen_pay" component={Screen_pay} />

        <AppStack.Screen name="pay_credity_card" component={pay_credity_card} />
        <AppStack.Screen name="Tabela_planos" component={Tabela_planos} />
 
        

      </AppStack.Navigator>
    </NavigationContainer>
  );
}