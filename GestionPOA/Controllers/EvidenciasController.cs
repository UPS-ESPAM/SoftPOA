using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;
using System.IO;

namespace GestionPOA.Controllers
{
    public class EvidenciasController : Controller
    {
        private PEDIEntities db = new PEDIEntities();

        // GET: Evidencias/upload
        public ActionResult upload()
        {

            var idmeta = Request.Form["id"];
            var IntervaloID = Request.Form["IntervaloID"];
            var meta = Convert.ToInt32(idmeta);
            var intervalo = Convert.ToInt32(IntervaloID);
            var programcion = db.Programacion.Where(p => p.MetaID == meta)
                           .Where(p => p.IntervaloId == intervalo)
                           .Select(p => new { id = p.id , planificado = p.planificado})
                           .SingleOrDefault();
            if (programcion.planificado == "0" ) {
                return Json(new { msj = "planificacion" }, JsonRequestBehavior.AllowGet);
            }
            
            foreach (string file in Request.Files)
            {
                var fileContent = Request.Files[file];
                if (fileContent != null && fileContent.ContentLength > 0)
                {

                    TimeSpan span = (DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));
                    double unixTime = span.TotalSeconds;
                    string año = Convert.ToString(DateTime.Today.Year);
                    string Extension = Path.GetExtension(fileContent.FileName).ToLower();
                    string nameFile = Session["departamento"] + "-Evidencia" + año + "-idM" + idmeta + "-idP" + programcion.id + "-" + unixTime + Extension;
                    var path = Path.Combine(Server.MapPath("~/App_Data/Evidencias/"), nameFile);
                    string[] allowedExtensions = { ".pdf" };
                    for (int count = 0; count < allowedExtensions.Length; count++)
                    {
                        if (Extension == allowedExtensions[count])
                        {
                            string evidencia = db.spEvidenciasInsert(programcion.id, nameFile).FirstOrDefault();
                            if (evidencia == "No ingresado")
                            {
                               return Json(new { msj = "no" }, JsonRequestBehavior.AllowGet);
                            } else {
                                fileContent.SaveAs(path);
                                return Json(new { msj = evidencia }, JsonRequestBehavior.AllowGet);
                            }
                            
                        }
                    }
                }
            }
            return Json(new { msj = "no" }, JsonRequestBehavior.AllowGet);
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
