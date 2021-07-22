import { DatePickerIn, HeaderInCom, TimePickerIn, TextInputIn, CheckBoxIn,ButtonIn } from '../components/CarbonComponents';
import * as React from "react";


var axios = require('axios');


export class MovReg extends React.Component {
    //State armazena os dados da entrada
    state = { pid: null, quant: 0, cost: 0, time: null, timezone: "BRT", date: null, imp: 0 }

    constructor(props) {
        super(props);

        //Fazendo o binding das funções necessárias para lidar com a entrada
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {                       //Chamado quando qualquer input muda de valor
        var nxtState;
        if (event.target) {
            switch (event.target.id) {          //Dependendo de qual entrada o valor foi, designa ele ao seu recipiente correspondente
                case "text-input-1-sub":
                    nxtState = { pid: event.target.value }
                    break;
                case "text-input-2-sub":
                    nxtState = { quant: event.target.value }
                    break;
                case "text-input-3-sub":
                    nxtState = { cost: event.target.value }
                    break;
                case "time-picker-1-sub":
                    nxtState = { time: event.target.value }
                    break;
                case "time-picker-1-sub-select":
                    nxtState = { timezone: event.target.value }
                    break;
                case "date-picker-1-sub":
                    nxtState = { date: event.target.value }
                    break;
            }
        } else {
            nxtState = { imp: !this.state.imp } //Caso especial para o tratamento do checkbox, o qual o carbon não implementou com metodo onChange
        }
        this.setState(nxtState);
    }

    handleSubmit(event) {                                                       //Chamado quando a form é submetida
        event.preventDefault();
        const data = Object.keys(this.state)                                    //Gera uma única string a ser inserida no endereço para o axios
            .map((key) => `${key}=${encodeURIComponent(this.state[key])}`)
            .join('&') + '&';
        axios.post(`/test/registro_fluxos/${data}`)
            .then((res) => {
                alert("Fluxo Registrado com Sucesso!")
            });
    }

    render() {
        return (
            <div className='main-cont'>
                <HeaderInCom />
                <form onSubmit={this.handleSubmit}>
                    <DatePickerIn onChange={this.handleChange} className='abs' id='date-picker-1'/>
                    <TimePickerIn onChange={this.handleChange} className='abs' id='time-picker-1' />
                    <TextInputIn  onChange={this.handleChange} txt="Product ID" className='abs text-input-register' id='text-input-1' />
                    <TextInputIn  onChange={this.handleChange} txt="Quantidade" className='abs text-input-register' id='text-input-2'/>
                    <TextInputIn  onChange={this.handleChange} txt="Custo" className='abs text-input-register' id='text-input-3'/>
                    <CheckBoxIn   onChange={this.handleChange} txt="Importado" className='abs' id='checkbox-1' />
                    <ButtonIn
                        className='abs'
                        id='button-submit-1'
                        kind="secondary"
                        txt="Enviar"
                        type="submit"
                    />
                </form>
            </div>
        )

    }
}
