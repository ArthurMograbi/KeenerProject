import { TextInputIn,  ButtonIn } from '../components/CarbonComponents';
import * as React from "react";
import { Redirect, Link } from "react-router-dom"


const bcrypt = require('bcryptjs');             //Usando bcryptjs (um fork de bcrypt) para fazer o hashing das senhas
const axios = require('axios');


export class ULogin extends React.Component {
    state = { loginSuccess: false, username: null, password: null }     //O state armazena as entradas e também se o login foi feito com sucesso

    constructor(props) {
        super(props);
        //Fazendo o binding das funções necessárias para lidar com a entrada
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {                                                   //Chamado quando qualquer input muda de valor
        var nxtState;
        switch (event.target.id) {                                          
            case "text-input-8-sub":                                        //Dependendo de qual entrada o valor foi, designa ele ao seu recipiente correspondente
                nxtState = { username: event.target.value }         
                break;
            case "text-input-9-sub":
                nxtState = { password: event.target.value }
                break;
        }
        this.setState(nxtState);
    }

    handleSubmit(event) {                                                               //Chamado quando a form é submetida
        event.preventDefault();

        const self = this;                                                              //Passando o this desse contexto para uma const para ser usado dentro da resposta de bcrypt              
        const data = `username=${encodeURIComponent(this.state['username'])}&`;         //Gera uma única string a ser inserida no endereço para o axios
        
        axios.post(`/test/do_login/${data}`)
            .then(function (response) {
                bcrypt.compare(self.state.password,response.data).then(function (result) {          //Comparando a senha plaintext inserida pelo usuario com o hash do DB
                    console.log(result);
                    if(result) self.setState({ loginSuccess: true });                               //Se corresponderem, muda o state para true, causando o redirect para a tela de home
                });
            });
    }

    render() {
        return (
            <div className='login-cont'>                                                            
                {this.state.loginSuccess ? <Redirect to="/home"/>:<div/>}                           
                <form onSubmit={this.handleSubmit} className='login-form'>
                    <h2>Realize seu Login</h2>
                    <div className="break-medium" />
                    <TextInputIn onChange={this.handleChange} txt="Username" className="text-input-login" id='text-input-8' />
                    <div className="break-small" />
                    <TextInputIn onChange={this.handleChange} txt="Senha" className="text-input-login" id='text-input-9' />
                    <div className="break-medium"/>
                    <ButtonIn
                        id='button-submit-3'
                        kind="secondary"
                        txt="Continuar"
                        type="submit"
                    />
                    <Link id="sign-up-link" to="/sign_up">Crie sua conta!</Link>
                </form>
            </div>
        )

    }
}
