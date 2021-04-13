/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './src/App';//TELA QUE CHAMA AS TELAS

//import App from './src/AppTest';
//import App from './src/components/ProdutosEtiquetas';
//import App from './src/components/Menu';
//import App from './src/components/Categorias'
//import App from './src/components/DetalhesProdutos'
//import App from './src/components/ComprasVendas'
//import App from './src/components/Postar'
//import App from './src/components/EnvioPropostasCompras'


//NÃO MEXA DAQUI PRA BAIXO
/**/
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

