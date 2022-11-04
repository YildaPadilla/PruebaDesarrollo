import { Component } from "react";
import './style.css';

export default class ListarTarjetas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tarjetas: []
        };
    }

    async componentDidMount() {
        let url = "https://localhost:44386/api/Tarjetas/GetTarjeta";

        const res = await fetch(url)
        const data = await res.json();
        this.setState({ tarjetas: data });
        console.log(data);
    }

    render() {
        const { tarjetas } = this.state;

        return (
            <div>
                <div className="listar">
                    <h3>Tarjetas</h3>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Número de Tarjeta</th>
                                <th scope="col">Nombre Titular</th>
                                <th scope="col">Fecha Vencimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tarjetas.map(t => {
                                    return (
                                        <tr className="trHover" key={t.idTarjeta}>
                                            <td>{t.nummeroTarjeta}</td>
                                            <td>{t.nombreTitular}</td>
                                            <td>{t.fechaVencimiento}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
