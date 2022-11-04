import './style.css';
import chip1 from './image/chip.png'
import visa from './image/visa.png'

const VistaTarjeta = (props) => {
    
    return (
        <div className="caja">
            <div className='cajaTarjeta'>
                <div className="frente">
                    <div className="imagen">
                        <img src={chip1} alt="chip1"></img>
                        <img src={visa} alt="tarjeta"></img>
                    </div>
                    <div className="numeroTarjeta">{props.nummeroTarjeta}</div>
                    <div className="flexbox">
                        <div className="box">
                            <div className="nombreTitular">{props.nombreTitular}</div>
                        </div>
                        <div className="box">
                            <div className="">{props.fechaVencimiento}</div>
                        </div>
                    </div>
                </div>

                <div className="atras">
                    <div className="stripe"></div>
                    <div className="box">
                        <div className='cvv-box'>{props.cvv}</div>
                        <img src={visa} alt='cvv'></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VistaTarjeta;