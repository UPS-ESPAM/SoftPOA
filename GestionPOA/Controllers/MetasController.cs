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
    public class MetasController : Controller
    {
        private PEDIEntities db = new PEDIEntities();
        // GET: Metas
        public ActionResult Metas()
        {
            var metas = db.spMetasDepartment(Convert.ToInt32(Session["department"])).ToList();
            return Json(new { listMetas = metas }, JsonRequestBehavior.AllowGet);
        }
        // GET: Metas/Programacion
        public ActionResult Programacion()
        {
            var metasProgramacion = db.spMetaAndProgramaciones(Convert.ToInt32(Session["department"])); 
            return Json(new { listMetasProgramacion = metasProgramacion }, JsonRequestBehavior.AllowGet);
        }
        // GET: Metas/Ejecucion
        public ActionResult Ejecucion()
        {
            var metasEjecucion = db.spMetaAndEjecucion(Convert.ToInt32(Session["department"]));
            return Json(new { listMetasEjecucionn = metasEjecucion }, JsonRequestBehavior.AllowGet);
        }
        // GET: Metas/MetaDetalle
        public ActionResult MetaDetalle(int id)
        {
            var detalle = db.spMetaDetalle(id).ToList();
            return Json(new { detalleMeta = detalle }, JsonRequestBehavior.AllowGet);
        }
        // GET: Metas/Observacion
        public ActionResult Observacion(int id)
        {
            var observacion = db.Metas.Where(m => m.id == id)
                                    .Select(m => new { id = m.id, Descripcion = m.Descripcion, Observacion= m.Observacion })
                                    .ToList();
            return Json(new { listObservacion = observacion }, JsonRequestBehavior.AllowGet);
        }
        // POST: Metas/ObservacionUpdate
        [HttpPost]
        public ActionResult ObservacionUpdate(int id, string observacion)
        {
            Metas _metas = new Metas();
            _metas = (from m in db.Metas
                            where m.id == id
                            select m).First();
            _metas.Observacion = observacion;
            db.SaveChanges();
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
