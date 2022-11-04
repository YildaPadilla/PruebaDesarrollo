import { useState } from "react";
import axios from "axios";

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const esValido = e.target.validity.valid;
        if (esValido) {
            setForm({
                ...form,
                [name]: value
            })
        }
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if (Object.keys(errors).length === 0) {
            const data = { 
                nummeroTarjeta: form.nummeroTarjeta,
                fechaVencimiento: form.fechaVencimiento,
                nombreTitular: form.nombreTitular,
                cvv: form.cvv
            };        

            alert("Enviando Formulario");
        
            var r = axios.post('https://localhost:44386/api/Tarjetas/PostTarjeta', data)
              .then(res => res.data);        
              console.log(data);
              console.log(r);    
               
              setForm(initialForm);
        } else {
            return alert("Los datos no fueron enviados");
        }
    };

    const handleCancel = (e) => {
        setForm(initialForm);
        errors.nummeroTarjeta = " ";
        errors.fechaVencimiento = " ";
        errors.nombreTitular = " ";
        errors.cvv = " ";
    }

    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleCancel
    };
};
