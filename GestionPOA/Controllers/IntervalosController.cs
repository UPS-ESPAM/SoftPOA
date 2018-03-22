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
            var POAorPEDI = Convert.ToString(Session["POAorPEDI"]);
            var intervalos = from pl in db.Planificacion
                             join tp in db.TipoPlanificacion on pl.TipoPlanificacionId equals tp.TipoPlanificacionId
                             join p in db.Periocidad on pl.PeriocidadID equals p.id
                             join i in db.intervalo on p.id equals i.PeriodoId
                             where p.eliminado == false
                             where i.eliminado == false
                             where pl.DepartamentoID == iddeparment
                             where tp.Descripcion == POAorPEDI
                             orderby i.Descripcion ascending
                             select new
                                  {
                                      id = i.id,
                                      descripcion = i.Descripcion,
                                      periocidad= p.Periodo
                                  };

            return Json(new { listIntervalos = intervalos }, JsonRequestBehavior.AllowGet);
        }
        // GET: Intervalos
        public ActionResult GetIntervalos(int id)
        {

            var intervalos = db.intervalo.Where(i => i.eliminado == false)
                                        .Where(i => i.PeriodoId == id)
                                        .OrderByDescending(i => i.Orden)
                                        .Select(p => new { id = p.id, Descripcion = p.Descripcion, PeriodoId= p.PeriodoId, Orden=p.Orden })
                                        .ToList();
            return Json(new { lisIntervalosxPeriocidad = intervalos }, JsonRequestBehavior.AllowGet);
        }
        // POST: Intervalos/Create
        [HttpPost]
        public JsonResult Create(intervalo intervalos)
        {
            db.intervalo.Add(intervalos);
            db.SaveChanges();
            return Json(new { mensaje = "Intervalo registrado correctamente" });
        }
        // POST: Intervalos/Update
        [HttpPost]
        public ActionResult Update(int id, int orden, string _intervalo)
        {
            intervalo invertalos = db.intervalo.Where(i => i.id == id).SingleOrDefault();
            invertalos.Orden = orden;
            invertalos.Descripcion = _intervalo;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Intervalos/Delete
        [HttpPost]
        public ActionResult Delete(int id)
        {
            intervalo invertalos = db.intervalo.Where(i => i.id == id).SingleOrDefault();
            invertalos.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado eliminado correctamente" }, JsonRequestBehavior.AllowGet);
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
