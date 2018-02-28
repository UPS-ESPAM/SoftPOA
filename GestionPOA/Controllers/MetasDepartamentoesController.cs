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
    public class MetasDepartamentoesController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: MetasDepartamentoes/MetasAsignadas
        public ActionResult MetasAsignadas()
        {
            var listametasDepartamento = db.spMetasDepartamentosAsignadosConsult().ToList();
            return Json(new { listametasDepartamento = listametasDepartamento }, JsonRequestBehavior.AllowGet);
        }

        // POST: MetasDepartamentoes/Create
        [HttpPost]
        public ActionResult Create(int _MetasId, int _DepartamentoID)
        {
            MetasDepartamento metaDepartamento = new MetasDepartamento();

            metaDepartamento.MetasId = _MetasId;
            metaDepartamento.DepartamentoID = _DepartamentoID;
            metaDepartamento.fecha = DateTime.Now;
            metaDepartamento.eliminado = false;
            db.MetasDepartamento.Add(metaDepartamento);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: MetasDepartamentoes/Update
        [HttpPost]
        public ActionResult Update(int id, int _MetasId)
        {
            MetasDepartamento metaDepartamento = db.MetasDepartamento.Where(s => s.id == id).SingleOrDefault();
            metaDepartamento.MetasId = _MetasId;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: MetasDepartamentoes/Delete
        [HttpPost]
        public ActionResult Delete(int id)
        {
            MetasDepartamento metaDepartamento = db.MetasDepartamento.Where(s => s.id == id).SingleOrDefault();
            metaDepartamento.eliminado = true;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
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
