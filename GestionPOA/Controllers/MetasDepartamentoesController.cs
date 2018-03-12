using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GestionPOA.Models;
using System.Net.Mail;
using System.Net.Mime;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;

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

            var depCorreo = db.spDepartamentoCorreoConsult(_DepartamentoID).FirstOrDefault();
            var meta = db.Metas.Where(m => m.id == _MetasId)
                                    .Select(m => new { Descripcion = m.Descripcion })
                                    .FirstOrDefault();

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("upsdeveloper2018@gmail.com", "Dirección de Planificación", System.Text.Encoding.UTF8);
            mail.To.Add(depCorreo.Email);
            mail.To.Add(depCorreo.EmailInstitucional);
            mail.Subject = "Meta Asignada";
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = "La meta asiganda del PEDI fue: "+ meta.Descripcion + "";
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,//587
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential("upsdeveloper2018@gmail.com", "***ups***2018"),
                EnableSsl = true,
                Timeout = 10000
            };

            smtp.Send(mail);
            return Json(new { mensaje = "La meta fue asignada y notificada correctamente" });
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
