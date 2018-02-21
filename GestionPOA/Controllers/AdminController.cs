using GestionPOA.Models;
using GestionPOA.MyClass;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace GestionPOA.Controllers
{
    public class AdminController : Controller
    {
        private PEDIEntities db = new PEDIEntities();
        private F_Encriptacion encrypt = new F_Encriptacion();

        public ActionResult Index()
        {
            var page = Session["Page"];
            if ( Convert.ToString(page) == "verify")
            {
                return View("Index");
            }
            else {
                return RedirectToAction("Login","Admin");
            }
        }

        public ActionResult Login()
        {
            var page = Session["Page"];
            if (Convert.ToString(page) != "verify")
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Admin");
            }
            
        }
        public ActionResult Logout()
        {
            Session.Clear();
            return Json(new { msj = "Sesión Cerrada" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Logearse(string usuario, string password)
        {
            var claveEncrypt = encrypt.Encriptar(password);
            var username =  db.spLoginIngreso(usuario, claveEncrypt).FirstOrDefault(); 
            if (username != null )
            {
                Session["user"] = username.usuario;
                Session["departamento"] = username.departamento;
                Session["department"] = username.id_departamento;
                Session["Page"] = "verify";
                return Json(new { username }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "usuario y/o contraseña incorrecta");
            }
        }
    }
}