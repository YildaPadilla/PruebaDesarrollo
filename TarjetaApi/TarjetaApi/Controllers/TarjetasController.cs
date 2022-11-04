using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TarjetaApi.Models;
using TarjetaApi.Validaciones;

namespace TarjetaApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class TarjetasController : ApiController
    {
        private TarjetaDBEntities db = new TarjetaDBEntities();

        [HttpGet]
        [ActionName("GetTarjeta")]
        public IHttpActionResult GetTarjeta()
        {
            try
            {
                var t = db.Tarjeta.Select(x => new
                {
                    id = x.idTarjeta,
                    nummeroTarjeta = x.nummeroTarjeta.Substring(0, 2) + "**********" + x.nummeroTarjeta.Substring(12, 16),
                    x.fechaVencimiento,
                    x.nombreTitular,
                    x.cvv
                }).ToList();
                return Ok(t);
            }
            catch (Exception e)
            {
                return InternalServerError(e); 
                throw e;
            }           
        }

        [HttpGet]
        [ActionName("GetTarjetaId")]
        public IHttpActionResult GetTarjetaId(int? id)
        {
            try
            {
                var t = db.Tarjeta.Select(x => new
                {
                    id = x.idTarjeta,
                    nummeroTarjeta = x.nummeroTarjeta.Substring(0, 2) + "**********" + x.nummeroTarjeta.Substring(12, 16),
                    x.fechaVencimiento,
                    x.nombreTitular,
                    x.cvv
                }).Where(x => x.id == id).ToList();
                return Ok(t);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
                throw e;
            }
        }

        [HttpPost]
        [ActionName("PostTarjeta")]
        public IHttpActionResult PostTarjeta(TarjetaViewModel c)
        {
            using (TarjetaDBEntities db = new TarjetaDBEntities())
            {
                try
                {
                    ValidacionTarjeta v = new ValidacionTarjeta();
                    if (v.ValidarNumeroTarjeta(c.nummeroTarjeta) == "" && v.ValidarFechaVencimiento(c.fechaVencimiento) == "" 
                        && v.ValidarNombreTitular(c.nombreTitular) == "" && v.ValidarCVV(c.cvv) == "")
                    {
                        //var tarjetaExiste = db.Tarjeta.Where(x => x.nummeroTarjeta == c.nummeroTarjeta).Select(x => x.nummeroTarjeta);
                        //if (tarjetaExiste == null)
                        //{
                            var t = new Tarjeta()
                            {
                                nummeroTarjeta = c.nummeroTarjeta,
                                fechaVencimiento = c.fechaVencimiento,
                                nombreTitular = c.nombreTitular,
                                cvv = c.cvv
                            };
                            var tarjetaRef = db.Tarjeta.Add(t);
                            db.SaveChanges();
                            return Ok(tarjetaRef);
                        //}
                        //else
                        //{
                        //    return Ok("El número de tarjeta ya existe.");
                        //}
                    }
                    else
                    {
                        return BadRequest(v.respuesta);
                    }
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        [HttpPost]
        [ActionName("PutTarjeta")]
        public IHttpActionResult PutTarjeta(TarjetaViewModel c)
        {
            try
            {
                ValidacionTarjeta v = new ValidacionTarjeta();
                if (v.ValidarNumeroTarjeta(c.nummeroTarjeta) == "" && v.ValidarFechaVencimiento(c.fechaVencimiento) == ""
                    && v.ValidarNombreTitular(c.nombreTitular) == "" && v.ValidarCVV(c.cvv) == "")
                {
                    var tarjetaExiste = db.Tarjeta.Where(x => x.nummeroTarjeta == c.nummeroTarjeta).Select(x => x.nummeroTarjeta);
                    if (tarjetaExiste == null)
                    {
                        var tarjeta = (from t in db.Tarjeta
                               where t.idTarjeta == c.id
                               select t).FirstOrDefault();

                        tarjeta.nummeroTarjeta = c.nummeroTarjeta;
                        tarjeta.nombreTitular = c.nombreTitular;
                        tarjeta.fechaVencimiento = c.fechaVencimiento;
                        tarjeta.cvv = c.cvv;
                        db.SaveChanges();
                        return Ok(tarjeta);
                    }
                    else
                    {
                        return Ok("El número de tarjeta ya existe.");
                    }
                }
                else
                {
                    return BadRequest(v.respuesta);
                }
            }
            catch (Exception e)
            {
                InternalServerError(e);
                throw e;
            }


        }

        [HttpPost]
        [ActionName("DeleteTarjeta")]
        public IHttpActionResult DeleteTarjeta(int? id)
        {
            try
            {
                Tarjeta tarjeta = db.Tarjeta.Find(id);
                if (tarjeta == null)
                {
                    return NotFound();
                }

                var tarjetaRef = db.Tarjeta.Remove(tarjeta);
                db.SaveChanges();
                return Ok(tarjetaRef);

            }
            catch (Exception e)
            {
                return InternalServerError(e);
                throw e;
            }
        }
    }
}
