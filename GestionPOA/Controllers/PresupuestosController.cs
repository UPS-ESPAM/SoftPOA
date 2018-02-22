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
    public class PresupuestosController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Presupuestos
        public ActionResult Index()
        {
            var presupuesto = db.Presupuesto.Include(p => p.Metas);
            return View(presupuesto.ToList());
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
