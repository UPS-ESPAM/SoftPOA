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
    public class IntervalosController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Intervalos
        public ActionResult Intervalos()
        {
            var iddeparment = Convert.ToInt32(Session["department"]);
            var intervalos = from pl in db.Planificacion
                              join p in db.Periocidad on pl.PeriocidadID equals p.id
                              join i in db.intervalo on p.id equals i.PeriodoId
                              where p.eliminado == false
                              where pl.DepartamentoID == iddeparment
                             select new
                                  {
                                      id = i.id,
                                      descripcion = i.Descripcion,
                                      periocidad= p.Periodo
                                  };

            return Json(new { listIntervalos = intervalos }, JsonRequestBehavior.AllowGet);
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
