import { DatePickerIn, HeaderInCom, TimePickerIn, TextInputIn, CheckBoxIn, ButtonIn } from '../components/CarbonComponents';
import * as React from "react";
import { Redirect } from "react-router-dom"


const bcrypt = require('bcryptjs');                     //Usando bcryptjs (um fork de bcrypt) para fazer o hashing das senhas
const axios = require('axios');



export class USignUp extends React.Component {
    //O state armazena as entradas e também se o login foi feito com sucesso
    state = { loginSuccess: false, username: null, password: null }
    //Assumo nenhum prerequisito necessário para fazer o sign-up

    constructor(props) {
        super(props);
        //Fazendo o binding das funções necessárias para lidar com a entrada
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {                                               //Chamado quando qualquer input muda de valor
        var nxtState;
        switch (event.target.id) {                                      //Dependendo de qual entrada o valor foi, designa ele ao seu recipiente correspondente
            case "text-input-10-sub":
                nxtState = { username: event.target.value }
                break;
            case "text-input-11-sub":
                nxtState = { password: event.target.value }
                break;
        }
        this.setState(nxtState);
    }

    handleSubmit(event) {                                               //Chamado quando a form é submetida
        event.preventDefault();

        const self = this;                                              //Passando o this desse contexto para uma const para ser usado dentro da resposta de bcrypt

        bcrypt.hash(this.state['password'], 10, (err, hash) => {        //Criando um hash da senha para ser armazenado

            //Gera uma única string a ser inserida no endereço para o axios
            const data = `username=${encodeURIComponent(this.state['username'])}&hpw=${hash}&`; 

            axios.post(`/test/registrar_usuario/${data}`)               
                .then(function (response) {
                    //Caso não haja um erro (ex: usuario já existe) ele automaticamente faz login
                    self.setState({ loginSuccess: true });
                });
        })
    }

    render() {
        return (
            <div className='login-cont'>
                {this.state.loginSuccess ? <Redirect to="/home" /> : <div />}
                <form onSubmit={this.handleSubmit} className='login-form'>
                    <h2>Crie sua conta!</h2>
                    <div className="break-medium" />
                    <TextInputIn onChange={this.handleChange} txt="Username" className="text-input-login" id='text-input-10' />
                    <div className="break-small" />
                    <TextInputIn onChange={this.handleChange} txt="Senha" className="text-input-login" id='text-input-11' />
                    <div className="break-medium" />
                    <ButtonIn
                        id='button-submit-4'
                        kind="secondary"
                        txt="Continuar"
                        type="submit"
                    />
                </form>
            </div>
        )

    }
}

//<div className='abs' id='checkbox-1'></div>