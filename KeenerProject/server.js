'use strict';
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const routes = require('./routes');

const app = express();

const staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

//Acessando as familias de rota
app.use('/test',routes);


//Conectando ao servidor mysql local
const username = "root";
const password = "example_password";

var con = mysql.createConnection({
    host: "localhost",
    user: username,
    password: password
});



/* Visando o escopo desse projeto, inclui essas queries de criação dos DBs
 * e Relações, para facilitar com testes e facilmente rodar em outra máquina.
 * Poderiam ser incluidos Triggers respectivos para incluir os itens adicionados
 * em fluxos para a relação de produtos, mas tal dependeria das regras de negócio
 */
const queries = [`CREATE DATABASE IF NOT EXISTS inventory`,
    `USE inventory`,
    `CREATE TABLE IF NOT EXISTS product(
        id int(11) UNSIGNED NOT NULL auto_increment,
        quantity MEDIUMINT NOT NULL,
        volume DECIMAL(10,3),
        weight DECIMAL(10,3),
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY  (id));`,
    `CREATE TABLE IF NOT EXISTS movement(
        id int(11) UNSIGNED NOT NULL auto_increment,
        productid int(11) UNSIGNED NOT NULL,
        quantity MEDIUMINT NOT NULL,
        isimport BIT NOT NULL,
        cost DECIMAL(10,2) NOT NULL,
        fromto VARCHAR(255) NOT NULL,
        mdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        FOREIGN KEY (productid) REFERENCES product(id));`,
    `CREATE TABLE IF NOT EXISTS users(
		id int(11) UNSIGNED NOT NULL auto_increment,
        username VARCHAR(20) NOT NULL,
        pw BINARY(60) NOT NULL,
        permissions BIT(4) NOT NULL,
        PRIMARY KEY  (id));`];

//As mensagens de retorno para maior claridade sobre se algum processo falhou
const query_sucess_returns = ["Database inventory created", "In inventory", "Table product created", "Table movement created","Table users created"];

con.connect((err)=>{                                        //Conectar ao servidor para realizar as queries
    if (err) throw err;                                     
    console.log("Connected to", con.host);
    for (let i = 0; i < queries.length; i++) {
        con.query(queries[i],                               //Itera sobre as queries e retorna as mensagens delas, caso tenham sucesso
            (err, result) => {                              
                if (err) throw err;
                console.log(query_sucess_returns[i]);
            }
        );
    } 
});

//Coloca a conexão com o servidor SQL no espaço global de app
app.set('con', con);

// Definido a porta do projeto no espaço global de app, que será process.env.PORT, caso exista, senão 3000
app.set('port', process.env.PORT || 3000);

//Configurando o aplicativo para usar o parsing de JSON do express
app.use(express.json());

//Pegando a porta definida anteriormente
var port = app.get('port')

//Começando o processo de listening na porta definida
var server = app.listen(port, () => {
    console.log('Listening on',port);
});
