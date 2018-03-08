using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;
using GestionPOA.MyClass;

namespace GestionPOA.Controllers
{
    public class ProgramacionsController : Controller
    {
        private PEDIEntities db = new PEDIEntities();



        //GET: Programacions/getCumplimiento
        public JsonResult getCumplimiento(int idmeta) {
             var cumplimientos = db.spPorcentajeCumplimiento(idmeta).FirstOrDefault();
             return Json(new { cumplimiento = cumplimientos }, JsonRequestBehavior.AllowGet);
        }
        
        // GET: Programacions/getObservacion
        public JsonResult getObservacion(int metaid, int id)
        {
            var observacion = db.Programacion.Where(p => p.eliminado == false)
                                                .Where(p => p.MetaID == metaid)
                                                .Where(p => p.IntervaloId == id)
                                    .Select(p => new { observacion = p.observacion })
                                    .ToList();

            return Json(new { observacion}, JsonRequestBehavior.AllowGet);
        }
        // POST: Programacions/planificacion
        public JsonResult planificacion(int idmeta, int id)
        {
            var planificacions = db.Programacion.Where(p => p.eliminado == false)
                                                 .Where(p => p.MetaID == idmeta)
                                                 .Where(p => p.IntervaloId == id)
                                                 .Select(p => new { planificacion = p.planificado})
                                                 .FirstOrDefault();

            return Json(new { planifiacion = planificacions }, JsonRequestBehavior.AllowGet);
        }
        // POST: Programacions/UpdatePEDI
        [HttpPost]
        public ActionResult UpdatePEDI(List<clsProgramacion> programacion)
        {
            Programacion _programacion = new Programacion();
            foreach (clsProgramacion element in programacion)
            {
                _programacion = (from p in db.Programacion
                                 where p.IntervaloId == element.id
                                 where p.MetaID==element.MetasID
                                 select p).First();

                _programacion.planificado = element.valor;
                db.SaveChanges();
            }
            return Json(new { mensaje = "Planificación actualizada correctamente" });
        }
        // POST: Programacions/EjecucionUpdatePEDI
        [HttpPost]
        public ActionResult EjecucionUpdatePEDI(List<clsProgramacion> programacion)
        {
            Programacion _programacion = new Programacion();
            foreach (clsProgramacion element in programacion)
            {
                _programacion = (from p in db.Programacion
                                 where p.IntervaloId == element.id
                                 where p.MetaID == element.MetasID
                                 select p).First();

                _programacion.ejecutado = element.valor;
                db.SaveChanges();
            }
            return Json(new { mensaje = "Ejecución actualizada correctamente" });
        }
        // POST: Programacions/UpdatePOA
        [HttpPost]
        public ActionResult UpdatePOA(List<clsProgramacion> programacion, int id, decimal valor)
        {
            Programacion _programacion = new Programacion();
            foreach (clsProgramacion element in programacion)
            {
                _programacion = (from p in db.Programacion
                                 where p.IntervaloId == element.id
                                 where p.MetaID == element.MetasID
                                 select p).First();

                _programacion.planificado = element.valor;
                db.SaveChanges();
            }

            Presupuesto _presupuesto = new Presupuesto();
            _presupuesto = (from p in db.Presupuesto
                             where p.MetaID == id
                             select p).First();
            _presupuesto.Planificado = valor;
            db.SaveChanges();

            return Json(new { mensaje = "Planificación actualizada correctamente" });
        }
        // POST: Programacions/EjecucionUpdatePOA
        [HttpPost]
        public ActionResult EjecucionUpdatePOA( int id,int MetasID, string valor, string observacion)
        {
            Programacion _programacion = new Programacion();
           
                _programacion = (from p in db.Programacion
                                 where p.IntervaloId == id
                                 where p.MetaID == MetasID
                                 select p).First();

                _programacion.ejecutado = valor;
                _programacion.observacion = observacion;
            db.SaveChanges();
            return Json(new { mensaje = "Ejecución actualizada correctamente" });
        }
        // POST: Programacions/UpdatePresupuesto
        [HttpPost]
        public ActionResult UpdatePresupuesto(int MetasID, decimal presupuesto)
        {

            Presupuesto _presupuesto = new Presupuesto();
            _presupuesto = (from p in db.Presupuesto
                            where p.MetaID == MetasID
                            select p).FirstOrDefault();
            _presupuesto.Ejecutado = presupuesto;
            db.SaveChanges();

            return Json(new { mensaje = "Presupuesto actualizado correctamente" });
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
