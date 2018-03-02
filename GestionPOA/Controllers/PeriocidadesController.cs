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
    public class PeriocidadesController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Periocidades/GetPeriocidades
        public ActionResult GetPeriocidades()
        {
            var periocidiades = db.Periocidad.Where(p => p.eliminado == false)
                                                .Where(p => p.estado == true)
                                                .Select(p => new { id = p.id, Periodo = p.Periodo })
                                                .ToList();
            return Json(new { listperiocidiades = periocidiades }, JsonRequestBehavior.AllowGet);
        }
        // POST: Periocidades/Create
        [HttpPost]
        public ActionResult Create(string periodo)
        {
            var periocidiad = db.Periocidad.Where(p => p.eliminado == false)
                                       .Where(p => p.estado == true)
                                       .Where(p => p.Periodo == periodo)
                                       .Select(p => new { id = p.id })
                                       .ToList();

            if (periocidiad.Count > 0)
            {
                return Json(new { success = false, mensaje = "La periocidad " + periodo + " ya se encuentra registrada" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Periocidad periocidiades = new Periocidad();
                periocidiades.Periodo = periodo;
                periocidiades.estado = true;
                periocidiades.eliminado = false;
                db.Periocidad.Add(periocidiades);
                db.SaveChanges();
                return Json(new { mensaje = "Periocidad Registrada correctamente" }, JsonRequestBehavior.AllowGet);
            }

        }
        // POST: Periocidades/Update
        [HttpPost]
        public ActionResult Update(int id, int objetivosEspecificosId)
        {
            ObjeEspecificosDepartamento ObjeEspecificosdepartamento = db.ObjeEspecificosDepartamento.Where(s => s.id == id).SingleOrDefault();
            ObjeEspecificosdepartamento.ObjetivosEspecificosId = objetivosEspecificosId;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Periocidades/Delete
        [HttpPost]
        public ActionResult Delete(int id)
        {
            ObjeEspecificosDepartamento ObjeEspecificosdepartamento = db.ObjeEspecificosDepartamento.Where(s => s.id == id).SingleOrDefault();
            ObjeEspecificosdepartamento.eliminado = true;
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
