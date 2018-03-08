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
    public class InformacionAdicionalsController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: InformacionAdicionals/getInformacionAdicional
        public ActionResult getInformacionAdicional(int id)
        {
            var informacioAdicional = db.InformacioAdicional.Where(i => i.metasId == id).Where(i => i.eliminado==false)
                                      .Select(i => new { id = i.id, FormulaCalculo = i.FormulaCalculo, LineaBase = i.LineaBase , metasId = i.metasId, MetodoEvaluacion = i.MetodoEvaluacion })
                                      .ToList();

            return Json(new { listFormulaCalculo = informacioAdicional }, JsonRequestBehavior.AllowGet);
        }
        // POST: InformacionAdicionals/Create
        [HttpPost]
        public JsonResult Create(InformacioAdicional informacionAdicional)
        {
            db.InformacioAdicional.Add(informacionAdicional);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: InformacionAdicionals/Update
        [HttpPost]
        public ActionResult Update(InformacioAdicional informacionAdicional)
        {
            db.Entry(informacionAdicional).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: InformacionAdicionals/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            InformacioAdicional informacionAdicional = db.InformacioAdicional.Where(i => i.id == id).SingleOrDefault();
            informacionAdicional.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado eliminado correctamente" });
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
