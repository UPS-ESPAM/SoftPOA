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

        // GET: Metas/MetasbyIndicador/5
        public ActionResult MetasbyIndicador(int id)
        {
            var metas = from m in db.Metas
                        join tc in db.TipoCalificacion on m.tipoCalificacionId equals tc.id
                         where m.eliminado == false && m.IndicadorId == id
                         select new
                         {
                             id = m.id,
                             IndicadorId = m.IndicadorId,
                             Observacion = m.Observacion,
                             Descripcion = m.Descripcion,
                             tipoCalificacionId = m.tipoCalificacionId,
                             eliminado = m.eliminado,
                             tipoCalificacion = tc.Descripcion
                         };
            var tipoCalificacion = from tc in db.TipoCalificacion
                                   where tc.eliminado == false
                                   select new
                                   {
                                       id = tc.id,
                                       Descripcion = tc.Descripcion
                                   };
            return Json(new { listMetas = metas, listTipoCalificacion = tipoCalificacion }, JsonRequestBehavior.AllowGet);
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

        // POST: Metas/Create
        [HttpPost]
        public ActionResult Create(Metas metas)
        {
            db.spMetasInsert(metas.IndicadorId,metas.Descripcion,metas.tipoCalificacionId);
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: Metas/Update
        [HttpPost]
        public ActionResult Update(int id, string descripcion, int idtipo)
        {
            Metas metas = db.Metas.Where(s => s.id == id).SingleOrDefault();
            metas.Descripcion = descripcion;
            metas.tipoCalificacionId = idtipo;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: Metas/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Metas metas = db.Metas.Where(s => s.id == id).SingleOrDefault();
            metas.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado eliminado correctamente" });
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

        // GET: Metas/MetasPlanificacion
        public ActionResult MetasPlanificacion()
        {
           var detalle = db.spPlanificacionConsultar().ToList();
            return Json(new { detallePlanificacion = detalle }, JsonRequestBehavior.AllowGet);
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
