//Importando modulos externos
import * as React from "react";
import { Link } from "react-router-dom";
import { HeaderInCom } from '../components/CarbonComponents';

/* Implementa��o da tela de Home ap�s o usu�rio fazer o login.
 * Como estamos numa implementa��o de one page navigation que
 * cobre o sistema inteiro, n�o � estritamente necess�rio lidar
 * com sess�es pois todos os dados est�o sendo transferidos em
 * apenas um locus.
 */
export class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <HeaderInCom />
                <div className="break-big vflex" id="main-page-container">
                    <Link className="link-main-page" to="/listagem_produtos">Produtos</Link>
                    <div className="break-small" />
                    <Link className="link-main-page" to="/listagem_fluxos">Fluxos</Link>
                    <div className="break-small" />
                    <Link className="link-main-page" to="/registro_produtos">Registrar Produtos</Link>
                    <div className="break-small" />
                    <Link className="link-main-page" to="/registro_fluxos">Registrar Fluxos</Link>
                </div>
            </div>
       );
    }

}