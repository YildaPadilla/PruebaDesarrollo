using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace TarjetaApi.Validaciones
{
    public class ValidacionTarjeta
    { 
        public string respuesta { get; set; }
        public String ValidarNumeroTarjeta(string numero)
        {
            Regex r = new Regex(@"^[0-9]{0,16}$");
            if (numero == "")
            {
                respuesta = "Por favor ingrese el número de tarjeta";
            }
            else if (!r.IsMatch(numero))
            {
                respuesta = "El número de tarjeta solo debe contener números";
            }
            else if (numero.Length < 16 || numero.Length > 16)
            {
                respuesta = "El número de la tarjeta debe contener 16 dígito";
            }
            else
            {
                respuesta = "";
            }
            return respuesta;
        }
        public String ValidarFechaVencimiento(string fechaVencimiento)
        {
            Regex r = new Regex(@"^[0-9]{0,2}[/]{0,1}[0-9]{0,2}$");
            Regex r1 = new Regex(@"^/\s+/g$");
            if (fechaVencimiento == "")
            {
                respuesta = "La fecha de vencimiento es requerida";
            }
            else if (!r.IsMatch(fechaVencimiento))
            {
                respuesta = "La fecha de vencimiento solo acepta 4 números y un /";
            }
            if (fechaVencimiento.Length <= 4 || fechaVencimiento.Length >= 6)
            {
                respuesta = "Fecha de vencimiento no valida";
            }
            else if (fechaVencimiento.Length == 5)
            {
                var remplazar = Regex.Replace(fechaVencimiento, @"^/\s+/g$", "");
                var mm = remplazar.Substring(0, 2);
                int mm1 = Convert.ToInt32(mm);
                var yy = remplazar.Substring(3, 2);
                var yy1 = Convert.ToInt32(yy);
                if (mm1 <= 0 || mm1 >= 13 || yy1 <= 21 || yy1 >= 28)
                {
                    respuesta = "Fecha de vencimiento no valida";
                }
            }
            else
            {
                respuesta = "";
            }
            return respuesta;
        }
        public String ValidarNombreTitular(string nombreTitular)
        {
            Regex r = new Regex(@"^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{0,20}$");
            if (nombreTitular == "")
            {
                respuesta = "El nombre del titular es requerido";
            }
            else if (!r.IsMatch(nombreTitular))
            {
                respuesta = "El nombre del titular solo recibe letras y espacios";
            }
            else if (nombreTitular.Length < 3 || nombreTitular.Length > 20)
            {
                respuesta = "El nombre del titular tiene la capacidad de 20 caracteres";
            }
            else
            {
                respuesta = "";
            }
            return respuesta;
        }
        public String ValidarCVV( string cvv)
        {
            Regex r = new Regex(@"^[0-9]{0,4}$");

            if (cvv == "")
            {
                respuesta = "El cvv es requerido";
            }
            else if (!r.IsMatch(cvv))
            {
                respuesta = "El cvv solo contiene 3 o 4 números";
            }
            else if (cvv.Length < 3 || cvv.Length > 4)
            {
                respuesta = "El cvv debe contener de 3 a 4 dígitos";
            }
            else
            {
                respuesta = "";
            }
            return respuesta;
        }
    }
}