import RNFetchBlob from 'react-native-fetch-blob';

import { Text, View } from 'react-native';

import Estilo from '../estilo'

//FUNÇÃO ABAIXO CONCATENA DOIS ARRAYS E REMOVE CONTEUDO REPETIDOS DOS ARRAYS
//PRA USAR USE => arrayUnique(array1.concat(array2));
function arrayUnique(array) {

    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;

};









//OUTRO METODO DE CONCATENAR ARRAY e REMOVER ITENS REPETIDOS NO ARRAY
//PRA USAR USE => arrayUnique_2(array1, array2);
function arrayUnique_2(a, b) {
    //var a = [1, 2, 3], b = [101, 2, 1, 10]
    var c = a.concat(b)
    var d = c.filter((item, pos) => c.indexOf(item) === pos)

    //console.log(d) // d is [1, 2, 3, 101, 10]
    return d;
}






function pegar_somente_valores_de_JSON(JSON) {

    return Object.values(JSON);

}




function pegar_somente_nome_dos_campos_de_JSON(JSON) {

    var keys = Object.keys(JSON);
    //console.log(keys);
    return keys;

}





function converter_Array_para_JSON(ARRAY) {

    var myJsonString = JSON.stringify(ARRAY);

}




function data_hora_e_segundo_completo_ingles() {

    var hoje = new Date();
    var data_hora_e_segundo_completo = hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-' + hoje.getDate() + ' ' + hoje.getHours() + ':' + hoje.getMinutes() + ':' + hoje.getSeconds();
    return data_hora_e_segundo_completo;
}






function data_hora_e_segundo_completo() {

    var hoje = new Date();
    var data_hora_e_segundo_completo = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear() + ' - ' + hoje.getHours() + ':' + hoje.getMinutes() + ':' + hoje.getSeconds();
    return data_hora_e_segundo_completo;
}




function data_completa_ingles() {

    var hoje = new Date();
    // var data_completa = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();
    // var data_completa = hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-' + hoje.getDate();
    var dia = (hoje.getDate()).toString();
    var mes = (hoje.getMonth() + 1).toString();
    var ano = (hoje.getFullYear()).toString();

    if (dia.length == 1) { dia = "0" + dia; }
    if (mes.length == 1) { mes = "0" + mes; }
    if (ano.length == 1) { ano = "0" + dia; }

    var data_completa = ano + '-' + mes + '-' + dia;

    return data_completa;
}





function data_completa() {

    var hoje = new Date();
    var data_completa = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();
    return data_completa;
}




function hora_e_segundo_completo() {

    var hoje = new Date();
    var hora_e_segundo_completo = hoje.getHours() + ':' + hoje.getMinutes() + ':' + hoje.getSeconds();
    return hora_e_segundo_completo;
}




function data_hora_e_segundo_sem_separador() {

    var hoje = new Date();
    var data_hora_e_segundo_sem_separador = hoje.getDate() + '' + (hoje.getMonth() + 1) + '' + hoje.getFullYear() + '' + hoje.getHours() + '' + hoje.getMinutes() + '' + hoje.getSeconds();
    return data_hora_e_segundo_sem_separador;
}









function FORMATAR_AO_DIGITAR_USANDO_MASCARA(TEXTO_RECEBIDO_OBJETO, RECEIVE_MASCARA) {


    //TEXTO_RECEBIDO = String(TEXTO_RECEBIDO_OBJETO.value); TROCADO PELA LINHA ABAIXO PARA TESTE 
    var TEXTO_RECEBIDO = String(TEXTO_RECEBIDO_OBJETO);
    TEXTO_RECEBIDO = TEXTO_RECEBIDO.replace(/\D/g, "");//DEIXAR SOMENTE NUMERO
    //alert(TEXTO_RECEBIDO);
    //var mascara = RECEIVE_MASCARA.split('').reverse().join('');


    var mascara = RECEIVE_MASCARA.split('').join('');
    TEXTO_RECEBIDO = TEXTO_RECEBIDO.split('').join('');


    for (var i = 0; i < TEXTO_RECEBIDO.length; i++) {

        var caracter_texto = TEXTO_RECEBIDO.charAt(i);  //console.log(c); 
        var caracter_mascara = mascara.charAt(i);  //console.log(caracter_mascara);
        var nume = 0;
        nume = 1 * caracter_texto;
        var asd = 0;
        asd = 1 * caracter_mascara;
        //alert("Mascara => " + caracter_mascara + " | Numero => " + caracter_texto + " | Indice => " + i);
        if (String(asd).includes("NaN") && String(nume) != "NaN") {
            //alert(asd+" <===> "+nume);
            //alert("Esquerda É NaN   e   DIREITA é NUMERO");
            TEXTO_RECEBIDO = INSERINDO_CARACTER_EM_DETERMINADA_POSICAO(TEXTO_RECEBIDO, caracter_mascara, i);
        }//do if

    }//do for

    //alert(TEXTO_RECEBIDO);
    /*
    if(TEXTO_RECEBIDO.includes(")")){
        TEXTO_RECEBIDO = INSERIR_CARACTER_EM_STRING(TEXTO_RECEBIDO, " " , 4);
    }
    */

    //document.getElementById(TEXTO_RECEBIDO_OBJETO.id).value = TEXTO_RECEBIDO; DESATIVADO PARA TESTE ESTA LINHA
    return TEXTO_RECEBIDO;

}
//INSERÇÃO DE MASCARA AO DIGITAR ACIMA




function INSERINDO_CARACTER_EM_DETERMINADA_POSICAO(TEXTO, CARACTER, position) {
    //var TEXTO = "abcdefg";
    //var b = ",";
    //var position = 5;
    var output = [TEXTO.slice(0, position), CARACTER, TEXTO.slice(position)].join('');
    //console.log(output);
    return output;
}






//CALCULAR DISTANCIA ENTRE 2 LATITUDES E 2 LONGITUDES ABAIXO
/*
var lat1 = 41.3879169;
var lon1 = 2.1699187;
var lat2 = 40.4167413;
var lon2 = -3.7032498;

Distancia = Dist(lat1, lon1, lat2, lon2); //Quilómetros de retorno
*/

function Distancia_entre_2_geolocalizacao(latitude_1, latitude_2, longitude_1, longitude_2) {
    rad = function (x) { return x * Math.PI / 180; }

    var R = 6378.137;                  //Raio da Terra no km (WGS84)
    var dLat = rad(latitude_2 - latitude_1);
    var dLong = rad(longitude_2 - longitude_1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(latitude_1)) * Math.cos(rad(latitude_2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3);                   //Retorno 3 casas decimais
}





//TRANSFORMANDO PARA CAMINHO ABSOLUTO ABAIXO  //
// É NECESSARIO IMPORTAR E ESTÁ SENDO IMPORTADO LÁ ENCIMA A BIBLIOTECA => import RNFetchBlob from 'react-native-fetch-blob';
async function TRANFORMAR_P_CAMINHO_ABSOLUTO(uri) {
    var CAMINHO;
    //alert(uri);

    //uri = "content://com.android.providers.media.documents/document/image%3A55976"

    await RNFetchBlob.fs.stat(uri).then((stats) => {
        //RNFetchBlob.fs.stat(res.this.uril).then((stats) => {  
        console.log(stats.path);
        //alert(stats.path);
        //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
        CAMINHO = stats.path;
        //alert(CAMINHO);
        CAMINHO = 'file:///' + CAMINHO;
        //setarquivoDoCell(CAMINHO);

    })
        .catch((err) => {
            console.log(err);
            alert(err);
            //alert("erro =>"+uri);
        });


    return CAMINHO;

}
//TRANSFORMANDO PARA CAMINHO ABSOLUTO ACIMA  


//REMOVE além de NULOS também VAZIOS e UNDEFINED
async function REMOVER_ITENS_NULOS_DO_ARRAY(someArray) {
    /* */
    var newArray = [];
    var element;
    for (element in someArray) {
        if ((someArray[element] != undefined) && (typeof someArray[element] != null) && (someArray[element] != "")) {
            newArray.push(someArray[element]);
        }//IF
    }//FOR

    return newArray;
    //alert ( newArray);

}





function extrair_nome_de_Arquivo_da_url(Caminho) {
    //Caminho 	= Caminho.replace(/\/g, "/");
    Caminho = Caminho.replace("/\/g", "/");
    var Arquivo = Caminho.substring(Caminho.lastIndexOf('/') + 1);
    var Extensao = Arquivo.substring(Arquivo.lastIndexOf('.') + 1);
    return { arquivo: Arquivo, extensao: Extensao };

    /*
    //Exemplo de utilização:
        var nome_do_arquivo = extrair_nome_de_Arquivo_da_url("/meus documentos/pessoais/carta.doc").arquivo;
        document.write(extrairArquivo("/meus documentos/pessoais/carta.doc").extensao);
    */
}




const Badge = ({ count }) => (
    <View style={Estilo.cirlce}>
        <Text style={Estilo.count}>{count}</Text>
    </View>
);







//FORMATAR PARA MOEDA AO DIGITAR ABAIXO
function FORMATAR_PARA_MOEDA_DEFINITIVO_AO_DIGITAR(VALOR_RECEBIDO_1) {

    /*
    var VALOR_RECEBIDO = String(VALOR_RECEBIDO_1);
    // alert(VALOR_RECEBIDO+"  T� FUNCIONANDO");
    var mascara = '2.000.000.000.000,00'.split('').reverse().join('');
    //var mascara = '1.111-85'.split('').reverse().join('');

    //DEIXAR  SOMENTE NUMERO AQUI ABAIXO
    VALOR_RECEBIDO = VALOR_RECEBIDO.replace('.', '').replace(',', '');
    //DEIXAR  SOMENTE NUMERO AQUI ACIMA

    var TEXTO_RECEBIDO = String(VALOR_RECEBIDO);
    var NUMERO_FORMATO_MOEDA = '';
    var j = 0;

    for (var i = 0; i < TEXTO_RECEBIDO.length; i++) {
        j++;

        var esquerda = '';
        var direita = '';
        var c = TEXTO_RECEBIDO.charAt(i);  //console.log(c); 
        var caracter_mascara = mascara.charAt(i);  //console.log(caracter_mascara);
        var asd = 0;
        asd = 2 * caracter_mascara;
        //console.log(asd); 

        if (String(asd).includes("NaN")) {
            //console.log('� LETRA = '+caracter_mascara+' INDICE = '+i);
            esquerda = TEXTO_RECEBIDO.substring(0, TEXTO_RECEBIDO.length - i);
            direita = TEXTO_RECEBIDO.substring(TEXTO_RECEBIDO.length - i);
            NUMERO_FORMATO_MOEDA = String(esquerda) + caracter_mascara + String(direita);
            TEXTO_RECEBIDO = NUMERO_FORMATO_MOEDA;
            //i = TEXTO_RECEBIDO.length + 5;
            //console.log(esquerda+" � esquerda");
            //console.log(direita+ " � direita");	
        }//do if

    }//do for

    if (TEXTO_RECEBIDO.length == 1) {

        TEXTO_RECEBIDO = '0,0' + String(TEXTO_RECEBIDO);

    } else if (TEXTO_RECEBIDO.length == 2) {

        TEXTO_RECEBIDO = '0,' + String(TEXTO_RECEBIDO);

    }

    //REMOVENDO EXCESSO DE ZEROS NA FRENTE DO VALOR CASO EXISTA ABAIXO		
    if (TEXTO_RECEBIDO.length == 5) {
        var t0 = TEXTO_RECEBIDO.charAt(0);
        if (String(t0).includes("0")) {  //alert("TEM ZERO NA PRIMEIRA FILA");
            TEXTO_RECEBIDO = TEXTO_RECEBIDO.substring(1);
        }//do if
    }//do if
    //REMOVENDO EXCESSO DE ZEROS NA FRENTE DO VALOR CASO EXISTA ACIMA
    //alert(TEXTO_RECEBIDO);
    return TEXTO_RECEBIDO;
    */


    //VALOR_RECEBIDO_1 = VALOR_RECEBIDO_1.replace( /\D/g , ""); //Remove tudo o que não é dígito
    //return VALOR_RECEBIDO_1;           

}
//FORMATAR PARA MOEDA AO DIGITAR ACIMA






function EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES(RECEBE_PARAMETRO) {

    var DATAS_INGLES = "";
    var DATAS_PORTUGUES = "";
    var ANO = "";
    var DIA = "";
    var MES = "";

    var regex;
    try {
        regex = new RegExp(/(\d{4}\-\d{2}\-\d{2})|(\d{2}\/\d{2}\/\d{4})|(\d{4}\-\d{1}\-\d{2})/g);
        //RECEBE_PARAMETRO = RECEBE_PARAMETRO.match(regex)[0];
        DATAS_INGLES = RECEBE_PARAMETRO.match(regex);
    } catch (e) { RECEBE_PARAMETRO = e; }

    try {

        for (var i = 0; i < DATAS_INGLES.length; i++) {

            DATAS_PORTUGUES = DATAS_INGLES[i].split("-");
            ANO = DATAS_PORTUGUES[0];
            MES = DATAS_PORTUGUES[1];
            DIA = DATAS_PORTUGUES[2];

            if (MES.length == 1) { MES = "0" + MES }
            if (DIA.length == 1) { DIA = "0" + DIA }

            DATAS_PORTUGUES = DIA + "-" + MES + "-" + ANO;

            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{1}\-\d{2})/g, DATAS_PORTUGUES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{2}\-\d{2})/g, DATAS_PORTUGUES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{1}\-\d{1})/g, DATAS_PORTUGUES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{4}\-\d{2}\-\d{1})/g, DATAS_PORTUGUES); } catch (error) { }

        }//FOR


    } catch (e) { }

    //alert(RECEBE_PARAMETRO);

    //DATA_CHEIA_INGLES = RECEBE_PARAMETRO;

    return RECEBE_PARAMETRO;
}








function EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES(RECEBE_PARAMETRO) {

    var DATAS_PORTUGUES = "";
    var DATAS_INGLES = "";
    var ANO = "";
    var DIA = "";
    var MES = "";

    var regex;
    try {
        // regex = new RegExp(/(\d{4}\-\d{2}\-\d{2})|(\d{2}\/\d{2}\/\d{4})|(\d{4}\-\d{1}\-\d{2})/g);
        regex = new RegExp(/(\d{2}\-\d{2}\-\d{4})|(\d{2}\/\d{2}\/\d{4})|(\d{2}\-\d{2}\-\d{2})|(\d{2}\/\d{2}\/\d{2})/g);
        //RECEBE_PARAMETRO = RECEBE_PARAMETRO.match(regex)[0];
        DATAS_PORTUGUES = RECEBE_PARAMETRO.match(regex);
    } catch (e) { RECEBE_PARAMETRO = e; }

    try {

        for (var i = 0; i < DATAS_PORTUGUES.length; i++) {

            DATAS_INGLES = DATAS_PORTUGUES[i].split("-");
            ANO = DATAS_INGLES[2];
            MES = DATAS_INGLES[1];
            DIA = DATAS_INGLES[0];

            if (MES.length == 1) { MES = "0" + MES }
            if (DIA.length == 1) { DIA = "0" + DIA }

            // DATAS_INGLES = DIA + "-" + MES + "-" + ANO;
            DATAS_INGLES = ANO + "-" + MES + "-" + DIA;

            // alert(DATAS_INGLES);
            // console.log(DATAS_INGLES);

            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{2}\-\d{1}\-\d{4})/g, DATAS_INGLES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{2}\-\d{2}\-\d{4})/g, DATAS_INGLES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{1}\-\d{1}\-\d{4})/g, DATAS_INGLES); } catch (error) { }
            try { RECEBE_PARAMETRO = RECEBE_PARAMETRO.replace(/(\d{1}\-\d{2}\-\d{4})/g, DATAS_INGLES); } catch (error) { }

        }//FOR




    } catch (e) { alert(e) }

    // alert(RECEBE_PARAMETRO);
    return RECEBE_PARAMETRO;

}






function MOEDA_P_DOUBLE_OU_FLOAT(valor_moeda) {

    valor_moeda = valor_moeda.split(",");
    var convertido_p_double_parte_1 = (valor_moeda[0]).toString().replace(/\W/g, "");
    var convertido_p_double_parte_2 = (valor_moeda[1]).toString();
    var retornoDouble = parseFloat(convertido_p_double_parte_1 + "." + convertido_p_double_parte_2);
    return retornoDouble;

}






function DOUBLE_OU_FLOAT_P_MOEDA(value, str_cifrao) {
    // function currencyFormatted(value, str_cifrao) {

    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};




function VALIDAR_CPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}






function QUANTIDADES_VEZES_PRECOS(quantidades, precos) {

    var preco_em_double = MOEDA_P_DOUBLE_OU_FLOAT(precos);
    var total_double = quantidades * preco_em_double;
    var valor_moeda = DOUBLE_OU_FLOAT_P_MOEDA(total_double, /*'R$'*/'');

    // alert(valor_moeda);
    return valor_moeda;

}




export {
    arrayUnique, arrayUnique_2, pegar_somente_valores_de_JSON, pegar_somente_nome_dos_campos_de_JSON, converter_Array_para_JSON,
    data_hora_e_segundo_completo, data_completa, hora_e_segundo_completo, data_hora_e_segundo_completo_ingles, data_hora_e_segundo_sem_separador, FORMATAR_AO_DIGITAR_USANDO_MASCARA,
    Distancia_entre_2_geolocalizacao, TRANFORMAR_P_CAMINHO_ABSOLUTO, REMOVER_ITENS_NULOS_DO_ARRAY, extrair_nome_de_Arquivo_da_url, Badge, FORMATAR_PARA_MOEDA_DEFINITIVO_AO_DIGITAR,
    data_completa_ingles, EXTRAIR_DATA_INGLES_E_CONVERTER_P_PORTUGUES, EXTRAIR_DATA_PORTUGUES_E_CONVERTER_P_INGLES, MOEDA_P_DOUBLE_OU_FLOAT, DOUBLE_OU_FLOAT_P_MOEDA,
    VALIDAR_CPF, QUANTIDADES_VEZES_PRECOS
}


