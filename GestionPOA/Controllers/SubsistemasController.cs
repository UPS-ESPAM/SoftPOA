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
    public class SubsistemasController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Subsistemas
        public JsonResult GetSubsistema()
        {
            var listSibsistemas = db.Subsistema.Where(s => s.eliminado == false)
                                    .Select(s => new { SubsistemaId = s.SubsistemaId, Descripcion = s.Descripcion })
                                    .ToList();
   
            return Json(new { list = listSibsistemas }, JsonRequestBehavior.AllowGet);
        }

        // POST: Subsistemas/Create
        [HttpPost]
        public JsonResult Create(Subsistema subsistema)
        {
            db.Subsistema.Add(subsistema);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });  
        }

        // POST: Subsistemas/Update
        [HttpPost]
        public ActionResult Update(Subsistema subsistema)
        {
             db.Entry(subsistema).State = EntityState.Modified;
             db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Subsistemas/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Subsistema subsistema = db.Subsistema.Where(s => s.SubsistemaId == id).SingleOrDefault();
            subsistema.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado eliminado correctamente" });
        }

        // GET: Subsistemas/GetSubsistemaPeriodoActual
        public JsonResult GetSubsistemaPeriodoActual()
        {
            var listSibsistemas = db.spSubsistemaConsult();

            return Json(new { listSistemas = listSibsistemas }, JsonRequestBehavior.AllowGet);
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
