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
    public class IndicadoresController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Estrategias
        public ActionResult Estrategias()
        {
            var estrategias = db.Estrategias.Where(e => e.eliminado == false)
                                          .Select(e => new { EstrategiasId = e.EstrategiasId, Descripcion = e.Descripcion })
                                          .ToList();

            return Json(new { listEstrategias = estrategias }, JsonRequestBehavior.AllowGet);
        }
        // GET: Indicadores
        public ActionResult Indicadores(int id)
        {
            var indicadores = db.Indicadores.Where(i => i.eliminado == false)
                                            .Where(i => i.EstrategiasId == id)
                                            .Select(i => new { IndicadorId = i.IndicadorId, Descripcion = i.Descripcion })
                                            .ToList();
            return Json(new { listIndicadores = indicadores }, JsonRequestBehavior.AllowGet);
        }
        // POST: Indicadores/Create
        [HttpPost]
        public ActionResult Create(Indicadores indicadores)
        {
            db.Indicadores.Add(indicadores);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: Indicadores/Update
        [HttpPost]
        public ActionResult Update(Indicadores indicadores)
        {
            db.Entry(indicadores).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Indicadores/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Indicadores indicadores = db.Indicadores.Where(s => s.IndicadorId == id).SingleOrDefault();
            indicadores.eliminado = true;
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
