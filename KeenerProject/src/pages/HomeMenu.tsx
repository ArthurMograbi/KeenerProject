//Importando modulos externos
import * as React from "react";
import { Link } from "react-router-dom";
import { HeaderInCom } from '../components/CarbonComponents';

/* Implementação da tela de Home após o usuário fazer o login.
 * Como estamos numa implementação de one page navigation que
 * cobre o sistema inteiro, não é estritamente necessário lidar
 * com sessões pois todos os dados estão sendo transferidos em
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