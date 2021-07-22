import { HeaderInCom, TextInputIn, ButtonIn } from '../components/CarbonComponents';
import * as React from "react";

var axios = require('axios');

export class ProdReg extends React.Component {
    //State armazena os dados da entrada
    state = { quant: 0, volume: 0, weight: 0, name: null }

    constructor(props) {
        super(props);

        //Fazendo o binding das funções necessárias para lidar com a entrada
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {                                       //Chamado quando qualquer input muda de valor
        var nxtState;
        switch (event.target.id) {                              //Dependendo de qual entrada o valor foi, designa ele ao seu recipiente correspondente
            case "text-input-4-sub":
                nxtState = { name: event.target.value }
                break;
            case "text-input-5-sub":
                nxtState = { quant: event.target.value }
                break;
            case "text-input-6-sub":
                nxtState = { volume: event.target.value }
                break;
            case "text-input-7-sub":
                nxtState = { weight: event.target.value }
                break;
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
                alert("Produto Registrado com Sucesso!")
            });
    }

    render() {
        return (
            <div className='main-cont'>
                <HeaderInCom />
                <form onSubmit={this.handleSubmit}>
                    <TextInputIn onChange={this.handleChange} txt="Nome" className='abs text-input-register' id='text-input-4' />
                    <TextInputIn onChange={this.handleChange} txt="Quantidade" className='abs text-input-register' id='text-input-5' />
                    <TextInputIn onChange={this.handleChange} txt="Volume" className='abs text-input-register' id='text-input-6' />
                    <TextInputIn onChange={this.handleChange} txt="Peso" className='abs text-input-register' id='text-input-7' />
                    <ButtonIn
                        className='abs'
                        id='button-submit-2'
                        kind="secondary"
                        txt="Enviar"
                        type="submit"
                    />
                </form>
            </div>
        )

    }
}

//<div className='abs' id='checkbox-1'></div>