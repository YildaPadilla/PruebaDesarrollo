using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TarjetaApi.Models
{
    public class TarjetaViewModel
    {
        public int? id { get; set; }
        public string nummeroTarjeta { get; set; }
        public string fechaVencimiento { get; set; }
        public string nombreTitular { get; set; }
        public string cvv { get; set; }
    }
   
}