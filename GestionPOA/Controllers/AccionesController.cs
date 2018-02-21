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
    public class AccionesController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Acciones
        public ActionResult Acciones(int id)
        {
            var acciones = db.Acciones.Where(a => a.eliminado == false)
                                            .Where(a => a.MetaID == id)
                                            .Select(a => new { id = a.id, Descripcion = a.Descripcion })
                                            .ToList();
            return Json(new { listAcciones = acciones }, JsonRequestBehavior.AllowGet);
        }
        // POST: Acciones/Create
        [HttpPost]
        public ActionResult Create(Acciones acciones)
        {
            db.Acciones.Add(acciones);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: Acciones/Update
        [HttpPost]
        public ActionResult Update(Acciones acciones)
        {
            db.Entry(acciones).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Acciones/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Acciones acciones = db.Acciones.Where(a => a.id == id).SingleOrDefault();
            acciones.eliminado = true;
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
