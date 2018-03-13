using GestionPOA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PusherServer;
using System.Net;
using System.Threading.Tasks;

namespace GestionPOA.Controllers
{
    public class AlertasController : Controller
    {
        private PEDIEntities db = new PEDIEntities();
        // GET: Alertas/getCountAlert
        public ActionResult getCountAlert()
        {
            var alertCount = db.spCountPlanificacionEjecucion().FirstOrDefault();
            return Json(new { alertsCounts = alertCount }, JsonRequestBehavior.AllowGet);
        }
        // GET: Alertas/getAlertas
        public ActionResult getAlertas()
        {
            var alertas = db.spShowPlanificacionEjecucion().ToList();
            return Json(new { listAlertas = alertas }, JsonRequestBehavior.AllowGet);
        }
        // POST: Alertas/ReadAlert
        public ActionResult ReadAlert(int id)
        {
            var read = db.Programacion.Where(p => p.id == id).FirstOrDefault();
            read.ReadObservation = true;
            db.SaveChanges();
            return RedirectToAction("PushNotMsg", "Alertas");
            //return Json(new { Read = "Read" }, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        public async Task<ActionResult> Push()
        {
            var options = new PusherOptions
            {
                Cluster = "us2",
                Encrypted = true
            };
            var alertCount = db.spCountPlanificacionEjecucion().FirstOrDefault();
            var pusher = new Pusher(
              "463842",
              "2d3d0104ac56bd6b98b9",
              "8d5cacc838de9bacbe1f",
              options);

            var result = await pusher.TriggerAsync(
              "my-channel",
              "my-event",
              new { message = alertCount });
         return Json(new { Read = "Ejecución actualizada correctamente" }, JsonRequestBehavior.AllowGet);
        }
        //[HttpPost]
        public async Task<ActionResult> PushNotMsg()
        {
            var options = new PusherOptions
            {
                Cluster = "us2",
                Encrypted = true
            };
            var alertCount = db.spCountPlanificacionEjecucion().FirstOrDefault();
            var pusher = new Pusher(
              "463842",
              "2d3d0104ac56bd6b98b9",
              "8d5cacc838de9bacbe1f",
              options);

            var result = await pusher.TriggerAsync(
              "my-channel",
              "my-event",
              new { message = alertCount });
            return new HttpStatusCodeResult((int)HttpStatusCode.OK);
        }
    }
}
