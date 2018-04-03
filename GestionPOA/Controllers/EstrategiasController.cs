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
    public class EstrategiasController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Estrategias/GetEstrategiasbyObjetivo/3
        public JsonResult GetEstrategiasbyObjetivo(int id)
        {
            int _DepartamentoId = int.Parse(Session["department"].ToString());
            if (Convert.ToString(Session["POAorPEDI"])=="POA") {
                var estrategias = db.spEstrategiasbyDepartamentoandObjetivoEspecifico(_DepartamentoId, id, Convert.ToString(Session["POAorPEDI"])).ToList();
                return Json(new { listaEstrategia = estrategias }, JsonRequestBehavior.AllowGet);
            }
            else {
                var estrategias = db.spEstrategiasbyDepartamentoandObjetivoEspecificoPEDI(_DepartamentoId, id, Convert.ToString(Session["POAorPEDI"])).ToList();
                return Json(new { listaEstrategia = estrategias }, JsonRequestBehavior.AllowGet);
            }
       
        }

        // GET: Estrategias/GetEstrategiasbyObjetivoPeriodoActual/3
        public JsonResult GetEstrategiasbyObjetivoPeriodoActual(int id)
        {
            var estrategias = db.spEstrategiasPeriodoActualConsult(id).ToList();
            return Json(new { listaEstrategia = estrategias }, JsonRequestBehavior.AllowGet);
        }
        // GET: Estrategias/Create
        public JsonResult Create(Estrategias estrategias)
        {
            int _DepartamentoId = int.Parse(Session["department"].ToString());
            if (Convert.ToString(Session["POAorPEDI"]) == "POA")
            {
               
                db.spEstrategiasInsert(estrategias.ObjetivosEspecificosId, estrategias.Descripcion, _DepartamentoId);
                return Json(new { mensaje = "Registrado correctamente" });
            }
            else
            {
                db.spEstrategiasInsertPEDI(estrategias.ObjetivosEspecificosId, estrategias.Descripcion, _DepartamentoId);
                return Json(new { mensaje = "Registrado correctamente" });
            }
        }


        // GET: Estrategias/Update/5
        public JsonResult Update(Estrategias estrategias)
        {
          
            if (estrategias != null)
            {
                db.Entry(estrategias).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { mensaje = "Registrado actualizado correctamente" });
            }
            else
            {
                return Json(new { mensaje = "Error, no actualizado" });
            }
        }



        // GET: Estrategias/Delete/5
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return Json(new { mensaje = "Error, no se pudo eliminar correctamente." });
            }
            Estrategias estrategias = db.Estrategias.Find(id);
            if (estrategias == null)
            {
                return Json(new { mensaje = "Error, no se pudo eliminar correctamente." });
            }
            else
            {
                estrategias.eliminado = true;
                db.SaveChanges();
            }
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
