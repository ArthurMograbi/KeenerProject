import { HeaderInCom } from '../components/CarbonComponents';
import * as React from "react";
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "carbon-components-react";



var axios = require('axios');

// Os dados necessários para o header da tabela
const headerData = [
    { header: "Nome", key: "name" },
    { header: "Quantidade", key: "quantity" },
    { header: "Peso", key: "weight" },
    { header: "Volume", key: "volume" }
];

//Criar o tableRef necessário
const tableRef = React.createRef();

// Componente com a lista de movimentações de mercadoria 
export class ProdList extends React.Component {
    state = { res: null }                           //O state res armazena a resposta do servidor
    constructor(props) {
        super(props);
        axios                                       //Usando axios para obter os dados da tabela
            .get('/test/listar_produtos')
            .then(result => {
                console.log("Res:")
                console.log(result);
                this.setState({ res: JSON.parse(JSON.stringify(result)).data });        //Muda o state para os dados parsed, atualizando o render no processo
            });

    }
    render() {
        return (
            <div className='main-cont'>
                <HeaderInCom />
                {this.state.res == null ? "Loading..." :                                //Usando essa tecnica com o state, evitamos também o suspense e react.lazy
                    <DataTable
                        ref={tableRef}
                        rows={this.state.res}
                        headers={headerData}
                        isSortable
                        render={({ rows, headers, getHeaderProps }) => (
                            <TableContainer title="DataTable">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {headers.map(header => (
                                                <TableHeader
                                                    {...getHeaderProps({header})}
                                                >
                                                    {header.header}
                                                </TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow key={row.id}>
                                                {row.cells.map(cell => (
                                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    />
                }
            </div>
        )
        
        
    }
}