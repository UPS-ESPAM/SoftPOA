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
    public class DepartamentoesController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Departamentoes/Departamentos
        public ActionResult Departamentos()
        {

            var departamentos = db.spDepartamentoConsult().ToList();
            return Json(new { listdepartamentos = departamentos }, JsonRequestBehavior.AllowGet);
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
