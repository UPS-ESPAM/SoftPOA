using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;
using Newtonsoft.Json;

namespace GestionPOA.Controllers
{
    public class ObjetivosEspecificosController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: ObjetivosEspecificos/getObjetivosEspecificos
        public ActionResult getObjetivosEspecificos()
        {
            var  listaOEI = db.ObjetivosEstrategicos.Where(oe => oe.eliminado == false)
                                        .Select(c => new { ObjetivosEstragicoId = c.ObjetivosEstragicoId, Descripcion = c.Descripcion })
                                        .ToList();

            var listOE = from oEspecifico in db.ObjetivosEspecificos
                         from OEInstitucional in db.ObjetivosEstrategicos
                         where oEspecifico.ObjetivosEstragicoId == OEInstitucional.ObjetivosEstragicoId
                         where oEspecifico.eliminado == false
                         select new
                            {
                                ObjetivosEspecificosId = oEspecifico.ObjetivosEspecificosId,
                                ObjetivosEstragicoId = oEspecifico.ObjetivosEstragicoId,
                                Descripcion = oEspecifico.Descripcion,
                                DescripcionOEI = OEInstitucional.Descripcion
                            };
            return Json(new { listOEspecifico = listOE, listObjetivoEstrategico = listaOEI }, JsonRequestBehavior.AllowGet);
        }

        // GET: ObjetivosEspecificos/getObjetivosEspecificosByDepartamento
        public ActionResult getObjetivosEspecificosByDepartamento()
        {
            if (Convert.ToString(Session["POAorPEDI"])=="POA") {
                int _DepartamentoId = int.Parse(Session["department"].ToString());
                var listado = db.spObjetivosEspecificosbyDepartamento(_DepartamentoId).ToList();
                return Json(new { listObjetivoEspecificos = listado }, JsonRequestBehavior.AllowGet);
            }
            else {
                var listado = db.spObjetivosEspecificosbyDepartamentoPEDI().ToList();
                return Json(new { listObjetivoEspecificos = listado }, JsonRequestBehavior.AllowGet);
            }
           
        }

        // GET: ObjetivosEspecificos/getObjetivosEspecificosbyObjEstrategicoPeriodoActual
        public ActionResult getObjetivosEspecificosbyObjEstrategicoPeriodoActual(int id)
        {
            
            var listado = db.spObjetivosEspecificosConsult(id).ToList();

            return Json(new { listObjetivoEspecificos = listado }, JsonRequestBehavior.AllowGet);
        }

        // POST: ObjetivosEspecificos/Create
        [HttpPost]
        public ActionResult Create(ObjetivosEspecificos objetivosEspecificos)
        {

            db.ObjetivosEspecificos.Add(objetivosEspecificos);
            db.SaveChanges();
            return Json(new { mensaje = "Registrado correctamente" });
        }

        // POST: ObjetivosEspecificos/Update
        [HttpPost]
        public ActionResult Update(ObjetivosEspecificos objetivosEspecificos)
        {
            db.Entry(objetivosEspecificos).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { mensaje = "Registrado actualizado correctamente" });
        }

        // POST: ObjetivosEspecificos/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            ObjetivosEspecificos objetivosEspecificos = db.ObjetivosEspecificos.Where(s => s.ObjetivosEspecificosId == id).SingleOrDefault();
            objetivosEspecificos.eliminado = true;
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
