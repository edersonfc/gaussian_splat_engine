import React from 'react';

const StateContext = React.createContext();
 
// export default StateContext;




function StateContext(){
 
    const[idade, setIdade] = useState('')
    const [ voltarParaTelaPostar, setVoltarParaTelaPostar ] = useState(false);
 
    return (
        <MyContext.Provider value={{ voltarParaTelaPostar, setVoltarParaTelaPostar , idade, setIdade}}>
        </MyContext.Provider>
    )
}
export default StateContext