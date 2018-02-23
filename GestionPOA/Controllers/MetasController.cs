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
