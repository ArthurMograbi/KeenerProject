declare var require: any

//Importando modulos externos
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importando modulos internos que implementam cada uma das rotas/páginas
import { ProdList } from './src/pages/ProductList';
import { MovList } from './src/pages/MovementList';
import { ProdReg } from './src/pages/ProductRegister';
import { MovReg } from './src/pages/MovementRegister';
import { ULogin } from './src/pages/UserLogin';
import { USignUp } from './src/pages/UserRegister';
import { Home } from './src/pages/HomeMenu';

/* Componente principal do App
 * Usa React Router DOM para implementar o padrão de One Page Navigation
 * Cada Route contêm um componente que corresponde a uma página
*/

export default function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/listagem_produtos">
                    <ProdList />
                </Route>
                <Route path="/listagem_fluxos">
                    <MovList/>
                </Route>
                <Route path="/registro_fluxos">
                    <MovReg />
                </Route>
                <Route path="/registro_produtos">
                    <ProdReg />
                </Route>
                <Route path="/sign_up">
                    <USignUp />
                </Route>
                <Route exact path="/">
                    <ULogin />
                </Route>
            </Switch>
        </Router>
    );
}

//Renderizar o aplicativo, inserindo o no elemento root
render(<App/>, document.getElementById('root'));