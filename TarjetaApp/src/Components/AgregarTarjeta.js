import { useForm } from "../hooks/useForm";
import VistaTarjeta from "./VistaTarjeta"
import './style.css';

const initialForm = {
    nummeroTarjeta: "",
    fechaVencimiento: "",
    nombreTitular: "",
    cvv: ""
};

const validationsForm = (form) => {
    let errors = {};
    if (!form.nummeroTarjeta.trim()) {
        errors.nummeroTarjeta = "Por favor ingrese el número de tarjeta";
    } else if (form.nummeroTarjeta.length < 16) {
        errors.nummeroTarjeta = "El campo debe contener 16 números";
    }

    if (!form.fechaVencimiento.trim()) {
        errors.fechaVencimiento = "Por favor ingrese la fecha de vencimiento";
    }else if(form.fechaVencimiento.length <= 4 || form.fechaVencimiento.length >= 6){
        
        errors.fechaVencimiento = "Fecha no valida";
    }else if (form.fechaVencimiento.length == 5 ) {
        let r = form.fechaVencimiento.replace(/\s+/g, '');
        let mm = r.substring(0,2);
        let yy = r.substring(3,5);
        if(mm <= 0 ||mm >= 13 || yy <= 21 || yy >= 28){
            errors.fechaVencimiento = "Fecha no valida"
        }
    }

    if (!form.nombreTitular.trim()) {
        errors.nombreTitular = "Por favor ingrese el nombre titular";
    }

    if (!form.cvv.trim()) {
        errors.cvv = "Por favor ingrese el cvv";
    } else if (form.cvv.length <= 2 || form.cvv.length > 4) {
        errors.cvv = "El cvv debe contener de 3 a 4 dígitos"
    }

    return errors;
};

const AgregarTarjeta = () => {
    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleCancel
    } = useForm(initialForm, validationsForm);

    return (
        <div>
            <div id="caja">
                <VistaTarjeta
                    nummeroTarjeta={form.nummeroTarjeta ? form.nummeroTarjeta : "0000 0000 0000 0000"}
                    fechaVencimiento={form.fechaVencimiento ? form.fechaVencimiento : "06/24"}
                    nombreTitular={form.nombreTitular ? form.nombreTitular : "Maria Cepeda"}
                    cvv={form.cvv}
                />
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <div className="pedazo">
                                <label for="nummeroTarjeta">Número de Tarjeta</label>
                                <input type="text"
                                    name="nummeroTarjeta"
                                    placeholder="0000 0000 0000 0000"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={form.nummeroTarjeta}
                                    pattern="^[0-9]{0,16}"
                                    required />
                                {errors.nummeroTarjeta && <span>{errors.nummeroTarjeta}</span>}
                            </div>

                            <div className="pedazo">
                                <label for="fechaVencimiento">Fecha de Vencimiento</label>
                                <input type="text"
                                    name="fechaVencimiento"
                                    placeholder="MM/YY Ej:01/24"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={form.fechaVencimiento}
                                    pattern="[0-9]{0,2}[/]{0,1}[0-9]{0,2}"
                                    required />
                                {errors.fechaVencimiento && <span>{errors.fechaVencimiento}</span>}
                            </div>
                        </div>
                        <div>
                            <div className="pedazo">
                                <label for="nombreTitular">Nombre Titular</label>
                                <input type="text"
                                    name="nombreTitular"
                                    placeholder="Maria Perez"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={form.nombreTitular}
                                    pattern="[A-Za-zÑñÁáÉéÍíÓóÚú\s]{0,20}"
                                    required />
                                {errors.nombreTitular && <span>{errors.nombreTitular}</span>}
                            </div>
                            <div className="pedazo">
                                <label for="cvv">CVV</label>
                                <input type="text"
                                    name="cvv"
                                    placeholder="0000"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={form.cvv}
                                    pattern="[0-9]{0,4}"
                                    required />
                                {errors.cvv && <span>{errors.cvv}</span>}
                            </div>
                        </div>

                        <div>
                            <input type="submit" value="Agregar Tarjeta" />
                            <input  value="Cancelar" onClick={handleCancel}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarTarjeta;