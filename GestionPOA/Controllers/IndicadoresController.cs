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
            var estrategias = db.spEstrategiasDepartment(Convert.ToInt32(Session["department"]), Convert.ToString(Session["POAorPEDI"])).ToList();
            return Json(new { listEstrategias = estrategias }, JsonRequestBehavior.AllowGet);
        }
        // GET: Indicadores/EstrategiaDetalle
        public ActionResult EstrategiaDetalle(int id)
        {
            var detalle = from oe in db.ObjetivosEstrategicos
                              join oesp in db.ObjetivosEspecificos on oe.ObjetivosEstragicoId equals oesp.ObjetivosEstragicoId
                              join e in db.Estrategias on oesp.ObjetivosEspecificosId equals e.ObjetivosEspecificosId
                              where e.EstrategiasId == id
                              select new
                              {
                                  ObjetivoEstrategico = oe.Descripcion,
                                  ObjetivoEspecifico = oesp.Descripcion
                              };

            return Json(new { detalleEstrategia = detalle }, JsonRequestBehavior.AllowGet);
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

        // GET: Indicadores
        public ActionResult GetIndicadoresbyDepartament()
        {

            var indicadores = db.spIndicadoresDepartment(Convert.ToInt32(Session["department"]),Convert.ToString(Session["POAorPEDI"])).ToList();  
            return Json(new { listIndicadores = indicadores }, JsonRequestBehavior.AllowGet);
        }

        // GET: Indicadores/IndicadorDetalle
        public ActionResult IndicadorDetalle(int id)
        {
            var detalle = db.spIndicadorDetalle(id).ToList();
            return Json(new { detalleIndicador = detalle }, JsonRequestBehavior.AllowGet);
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
