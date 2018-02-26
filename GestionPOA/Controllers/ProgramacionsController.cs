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
        public ActionResult EjecucionUpdatePOA(List<clsProgramacion> programacion, int id, decimal valor)
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

            Presupuesto _presupuesto = new Presupuesto();
            _presupuesto = (from p in db.Presupuesto
                            where p.MetaID == id
                            select p).First();
            _presupuesto.Ejecutado = valor;
            db.SaveChanges();

            return Json(new { mensaje = "Ejecución actualizada correctamente" });
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
