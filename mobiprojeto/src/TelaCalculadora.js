import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native'

import Estilo from './components/estilo'

import Icon from 'react-native-vector-icons/FontAwesome';

//import Icon from 'react-native-vector-icons/Feather';"

import RangeSlider from 'rn-range-slider';

//import { metodo_remoto } from './components/funcao_teste'

import Button from './components/Button'
import Display from './components/Display'


/* A RENDERIZAÇÃO DA TELA COMEÇA AQUI ABAIXO */

state = {
    displayValue: '0'
}

addDigit = n => {
    this.setState({ displayValue: n })
}

clearMemory = () => (
    this.setState({ displayValue: '0' })
)    

setOperation = operation => {


}


export default () => (


    <SafeAreaView style={[Estilo.App]}>

        <Display  value={this.state.displayValue} >

        </Display>

        <View>
            <View style={StyleSheet.buttons}>
                <Button label='AC' triple    onClick={this.clearMemory} />
                <Button label='/'  operation onClick={this.setOperation('/')} />
                <Button label='7' />
                <Button label='8' />
                <Button label='9' />
                <Button label='*' />
                <Button label='4' />
                <Button label='5' />
                <Button label='6' />
                <Button label='-' />
                <Button label='1' />
                <Button label='2' />
                <Button label='3' />
                <Button label='+' />
                <Button label='0' />
                <Button label='.' />
                <Button label='=' />
            </View >
        </View >

    </SafeAreaView >


)

/* A RENDERIZAÇÃO DA TELA COMEÇA AQUI ACIMA */

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

