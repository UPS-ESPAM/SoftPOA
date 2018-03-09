using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;
using Newtonsoft.Json;

namespace GestionPOA.Controllers
{
    public class ObjetivosEstrategicosController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: ObjetivosEstrategicos/GetObjetivosEstrategicos
        public JsonResult GetObjetivosEstrategicos()
        {
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            var listaSistemas = db.Subsistema.Where(oe => oe.eliminado == false)
                                       .Select(c => new { SubsistemaId = c.SubsistemaId, Descripcion = c.Descripcion })
                                       .ToList();

            
            var listaObjEst = from OEInstitucional in db.ObjetivosEstrategicos join
                          ss in db.Subsistema 
                          on OEInstitucional.SubsistemaId equals ss.SubsistemaId
                         where OEInstitucional.eliminado == false
                         select new
                         {
                             ObjetivosEstragicoId = OEInstitucional.ObjetivosEstragicoId,
                             Descripcion = OEInstitucional.Descripcion,
                             DescripcionSubsistemas = ss.Descripcion ,
                             SubsistemaId = ss.SubsistemaId                             
                         };            
            var lists = JsonConvert.SerializeObject(listaObjEst, Formatting.None, jsSettings);
            return Json(new { listOE = lists , listaSistemas = listaSistemas }, JsonRequestBehavior.AllowGet);
        }


        // GET: ObjetivosEstrategicos/GetObjetivosEstrategicosPeriodoActual
        public JsonResult GetObjetivosEstrategicosPeriodoActual(int id)
        {
            var listObjetivosEstrategicos = db.spObjetivosEstrategicosConsult(id);

            return Json(new { listObjetivosEstrategicos = listObjetivosEstrategicos }, JsonRequestBehavior.AllowGet);
        }
        // GET: ObjetivosEstrategicos/GetCumplimientoObjetivosEstrategicos
        public JsonResult GetCumplimientoObjetivosEstrategicos()
        {
            var Cumplimiento = db.spPorcentajeOEstrategico();

            return Json(new { cumplimientoOEstrategico = Cumplimiento }, JsonRequestBehavior.AllowGet);
        }

        // GET: ObjetivosEstrategicos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ObjetivosEstrategicos objetivosEstrategicos = db.ObjetivosEstrategicos.Find(id);
            if (objetivosEstrategicos == null)
            {
                return HttpNotFound();
            }
            return View(objetivosEstrategicos);
        }

        // POST: ObjetivosEstrategicos/Create
        [HttpPost]
        public JsonResult Create(ObjetivosEstrategicos objetivosEstrategicos)
        {
            if (ModelState.IsValid)
            {
                db.ObjetivosEstrategicos.Add(objetivosEstrategicos);
            db.SaveChanges();
            
            }
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: ObjetivosEstrategicos/Update
        [HttpPost]
        public JsonResult Update(ObjetivosEstrategicos objetivosEstrategicos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(objetivosEstrategicos).State = EntityState.Modified;
                db.SaveChanges();                
            }
            return Json(new { mensaje = "Registrado actualizado correctamente" });

        }

        // POST: ObjetivosEstrategicos/Delete/5
        [HttpPost]
        public JsonResult Delete(int id)
        {
            ObjetivosEstrategicos _ObjetivosEstrategicos = new ObjetivosEstrategicos();

            _ObjetivosEstrategicos = (from oe in db.ObjetivosEstrategicos
                                      where oe.ObjetivosEstragicoId == id
                                      select oe).First();
            
            _ObjetivosEstrategicos.eliminado = true;
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
