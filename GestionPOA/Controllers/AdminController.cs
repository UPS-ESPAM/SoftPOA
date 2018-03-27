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
        public ActionResult POAorPEDI(string singIN)
        {
            if ((singIN == "POA") || (singIN == "PEDI"))
            {
                var status = db.POAorPEDI(singIN, Convert.ToInt32(Session["department"])).FirstOrDefault();
                Session["POAorPEDI"] = singIN;
                Session["Page"] = "verify";
                return Json(new { msj = "ok" }, JsonRequestBehavior.AllowGet);
            }
            else {
                return Json(new { msj = "No se pudo ingresar al sistema" }, JsonRequestBehavior.AllowGet);
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
                Session["rol"] = username.TipoRol;
                if (username.TipoRol != "Administrador")
                {
                    var rol = db.POAorPEDI("POA", username.id_departamento).FirstOrDefault();
                    if (rol=="Existe") {
                        Session["Page"] = "verify";
                        Session["POAorPEDI"] = "POA";
                    }
                    return Json(new { username, rol, tipo = "Usuario" }, JsonRequestBehavior.AllowGet);
                }
                else 
                {
                    var rol = db.POAorPEDI("POA", username.id_departamento).FirstOrDefault();
                    if (rol== "No Existe") {
                        Session["Page"] = "verify";
                        Session["POAorPEDI"] = "PEDI";
                    }
                    return Json(new { username, rol, tipo="Administrador" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "usuario y/o contraseña incorrecta");
            }
        }
    }
}