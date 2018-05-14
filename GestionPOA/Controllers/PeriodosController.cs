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
    public class PeriodosController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Periodos
        public JsonResult getPeriodos()
        {
            var periodos = db.spSelectPeriodos().ToList();
            return Json(new { listPeriodos = periodos }, JsonRequestBehavior.AllowGet);
        }
        // GET: Periodos/SelectPeriodos
        public JsonResult SelectPeriodos()
        {
            var periodos = db.periodo.Where(p => p.eliminado == false)
                                .Select(p => new { idperiodo = p.periodoId, descripcion = p.Descripcion })
                                .ToList();

            return Json(new { SelectPeriodos = periodos }, JsonRequestBehavior.AllowGet);
        }
        // GET: Periodos/create
        public ActionResult create(string descripcion, DateTime inicio, DateTime fin)
        {
            periodo periodos = new periodo();
            periodos.Descripcion = descripcion;
            periodos.inicio = inicio;
            periodos.fin = fin;
            periodos.eliminado = false;
            periodos.estado = true;
            db.periodo.Add(periodos);
            db.SaveChanges();

            var idperiocidad = db.Periocidad.Where(p => p.eliminado == false)
                                     .Where(p => p.Periodo == "Anual")
                                    .Select(p => new { idPeriocidad = p.id })
                                    .FirstOrDefault();
            if (!db.Planificacion.Any(o => o.PeriocidadID == idperiocidad.idPeriocidad && o.DepartamentoID == Convert.ToInt32(Session["department"])))
            {
                Planificacion planifiacion = new Planificacion();
                planifiacion.DepartamentoID = Convert.ToInt32(Session["department"]);
                planifiacion.TipoPlanificacionId = 1;
                planifiacion.PeriocidadID = idperiocidad.idPeriocidad;
                planifiacion.fecha = DateTime.Now;
                planifiacion.eliminado = false;
                db.Planificacion.Add(planifiacion);
                db.SaveChanges();
            }         

            return Json(new { mensaje = "Periodos del PEDI registrados correctamente" }, JsonRequestBehavior.AllowGet);
        }
        // POST: Periodos/Update
        [HttpPost]
        public ActionResult Update(periodo periodo)
        {
            periodo periodos = db.periodo.Where(p => p.periodoId == periodo.periodoId).SingleOrDefault();
            periodos.Descripcion = periodo.Descripcion;
            periodos.inicio = periodo.inicio;
            periodos.fin = periodo.fin;
            periodos.eliminado = false;
            periodos.estado = periodo.estado;
            db.SaveChanges();
            return Json(new { mensaje = "Periodos del PEDI actualizado correctamente" }, JsonRequestBehavior.AllowGet);
        }
        // POST: Periodos/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            periodo periodos = db.periodo.Where(s => s.periodoId == id).SingleOrDefault();
            periodos.eliminado = true;
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
