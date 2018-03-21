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
        public ActionResult Create(int idtipoplanificacion, int idperiocidad)
        {
            Planificacion Tplanificacion = new Planificacion();
            Tplanificacion.DepartamentoID = Convert.ToInt32(Session["department"]);
            Tplanificacion.TipoPlanificacionId = idtipoplanificacion;
            Tplanificacion.PeriocidadID = idperiocidad;
            Tplanificacion.fecha = DateTime.Now;
            Tplanificacion.eliminado = false;
            db.Planificacion.Add(Tplanificacion);
            db.SaveChanges();
            Session["Page"] = "verify";
            return Json(new { mensaje = "Planificación Registrada correctamente" }, JsonRequestBehavior.AllowGet);
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
