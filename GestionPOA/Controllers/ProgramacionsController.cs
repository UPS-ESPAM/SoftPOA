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
        
        // POST: Programacions/Update
        [HttpPost]
        public ActionResult Update(List<clsProgramacion> programacion)
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
