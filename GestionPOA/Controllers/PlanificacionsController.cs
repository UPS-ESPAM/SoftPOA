using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;

namespace GestionPOA.Controllers
{
    public class PlanificacionsController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Planificacions/Create
        public ActionResult Create()
        {
            try
            {
                int idtipoplanificacio = 2;
                int idperiocidad = Convert.ToInt32(Session["Periodo"]);
                int departamento = Convert.ToInt32(Session["department"]);

                if (!db.Planificacion.Any(o => o.PeriocidadID == idperiocidad && o.DepartamentoID == departamento))
                {
                    Planificacion Tplanificacion = new Planificacion();
                    Tplanificacion.DepartamentoID = Convert.ToInt32(Session["department"]);
                    Tplanificacion.TipoPlanificacionId = idtipoplanificacio;
                    Tplanificacion.PeriocidadID = idperiocidad;
                    Tplanificacion.fecha = DateTime.Now;
                    Tplanificacion.eliminado = false;
                    db.Planificacion.Add(Tplanificacion);
                    db.SaveChanges();
                    Session["Page"] = "verify";
                    Session["POAorPEDI"] = "POA";
                    return Json(new { mensaje = "Planificación Registrada correctamente" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { mensaje = "Planificación, ya existente" }, JsonRequestBehavior.AllowGet);

                }


            }
            catch (Exception)
            {
                throw;
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
