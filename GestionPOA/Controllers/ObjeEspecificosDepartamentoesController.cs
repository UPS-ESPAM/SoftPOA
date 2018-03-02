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
    public class ObjeEspecificosDepartamentoesController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: ObjeEspecificosDepartamentoes/GetAsignacionObjetivosEspecificos
        public ActionResult GetAsignacionObjetivosEspecificos()
        {
            var objeEspecificosDepartamento = db.spObjetivoEspecificoDepartamentosAsignadosSelect().ToList();
            return Json(new { listObjeEspecificosDepartamento = objeEspecificosDepartamento }, JsonRequestBehavior.AllowGet);
        }
        // POST: ObjeEspecificosDepartamentoes/Create
        [HttpPost]
        public ActionResult Create(int departamentoID,int objetivoEspecificoID)
        {
            var listaOD = db.ObjeEspecificosDepartamento.Where(od => od.eliminado == false)
                                                         .Where(od => od.ObjetivosEspecificosId == objetivoEspecificoID)
                                                         .Where(od => od.DepartamentoID == departamentoID)
                                       .Select(od => new { odId = od.id})
                                       .ToList();

            if (listaOD.Count > 0)
            {
                return Json(new { success = false, mensaje = "El objetivo especifico seleccionado a fue asignado a ese departamento" }, JsonRequestBehavior.AllowGet);
            }
            else {
                ObjeEspecificosDepartamento ObjeEspecificosdepartamento = new ObjeEspecificosDepartamento();
                ObjeEspecificosdepartamento.ObjetivosEspecificosId = objetivoEspecificoID;
                ObjeEspecificosdepartamento.DepartamentoID = departamentoID;
                ObjeEspecificosdepartamento.eliminado = false;
                db.ObjeEspecificosDepartamento.Add(ObjeEspecificosdepartamento);
                db.SaveChanges();
                return Json(new { mensaje = "Registrado correctamente" }, JsonRequestBehavior.AllowGet);
            }

        }
        // POST: ObjeEspecificosDepartamentoes/Update
        [HttpPost]
        public ActionResult Update(int id, int objetivosEspecificosId)
        {
            ObjeEspecificosDepartamento ObjeEspecificosdepartamento = db.ObjeEspecificosDepartamento.Where(s => s.id == id).SingleOrDefault();
            ObjeEspecificosdepartamento.ObjetivosEspecificosId = objetivosEspecificosId;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: ObjeEspecificosDepartamentoes/Delete
        [HttpPost]
        public ActionResult Delete(int id)
        {
            ObjeEspecificosDepartamento ObjeEspecificosdepartamento = db.ObjeEspecificosDepartamento.Where(s => s.id == id).SingleOrDefault();
            ObjeEspecificosdepartamento.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado eliminado correctamente" }, JsonRequestBehavior.AllowGet);
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
