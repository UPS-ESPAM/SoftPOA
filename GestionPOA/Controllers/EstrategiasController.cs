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

        // GET: Estrategias
        public ActionResult Index()
        {
            var estrategias = db.Estrategias.Include(e => e.ObjetivosEspecificos).Include(e => e.Planificacion);
            return View(estrategias.ToList());
        }

        // GET: Estrategias/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Estrategias estrategias = db.Estrategias.Find(id);
            if (estrategias == null)
            {
                return HttpNotFound();
            }
            return View(estrategias);
        }

        // GET: Estrategias/Create
        public ActionResult Create()
        {
            ViewBag.ObjetivosEspecificosId = new SelectList(db.ObjetivosEspecificos, "ObjetivosEspecificosId", "Descripcion");
            ViewBag.PlanificacionId = new SelectList(db.Planificacion, "PlanificacionId", "PlanificacionId");
            return View();
        }

        // POST: Estrategias/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "EstrategiasId,ObjetivosEspecificosId,PlanificacionId,Descripcion,eliminado")] Estrategias estrategias)
        {
            if (ModelState.IsValid)
            {
                db.Estrategias.Add(estrategias);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ObjetivosEspecificosId = new SelectList(db.ObjetivosEspecificos, "ObjetivosEspecificosId", "Descripcion", estrategias.ObjetivosEspecificosId);
            ViewBag.PlanificacionId = new SelectList(db.Planificacion, "PlanificacionId", "PlanificacionId", estrategias.PlanificacionId);
            return View(estrategias);
        }

        // GET: Estrategias/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Estrategias estrategias = db.Estrategias.Find(id);
            if (estrategias == null)
            {
                return HttpNotFound();
            }
            ViewBag.ObjetivosEspecificosId = new SelectList(db.ObjetivosEspecificos, "ObjetivosEspecificosId", "Descripcion", estrategias.ObjetivosEspecificosId);
            ViewBag.PlanificacionId = new SelectList(db.Planificacion, "PlanificacionId", "PlanificacionId", estrategias.PlanificacionId);
            return View(estrategias);
        }

        // POST: Estrategias/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "EstrategiasId,ObjetivosEspecificosId,PlanificacionId,Descripcion,eliminado")] Estrategias estrategias)
        {
            if (ModelState.IsValid)
            {
                db.Entry(estrategias).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ObjetivosEspecificosId = new SelectList(db.ObjetivosEspecificos, "ObjetivosEspecificosId", "Descripcion", estrategias.ObjetivosEspecificosId);
            ViewBag.PlanificacionId = new SelectList(db.Planificacion, "PlanificacionId", "PlanificacionId", estrategias.PlanificacionId);
            return View(estrategias);
        }

        // GET: Estrategias/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Estrategias estrategias = db.Estrategias.Find(id);
            if (estrategias == null)
            {
                return HttpNotFound();
            }
            return View(estrategias);
        }

        // POST: Estrategias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Estrategias estrategias = db.Estrategias.Find(id);
            db.Estrategias.Remove(estrategias);
            db.SaveChanges();
            return RedirectToAction("Index");
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
