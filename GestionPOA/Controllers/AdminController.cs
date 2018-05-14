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
                if (status== "No Existe") {
                    return Json(new { status }, JsonRequestBehavior.AllowGet);
                }
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
            var  periocidades = db.Periocidad
                .Select(c=> new { Periodo = c.Periodo, id=c.id, estado=c.estado , eliminado=c.eliminado})
                                .Where(p => p.estado == true && p.eliminado == false).SingleOrDefault();

            var username =  db.spLoginIngreso(usuario, claveEncrypt).FirstOrDefault(); 
            if (username != null )
            {
                Session["user"] = username.usuario;
                Session["departamento"] = username.departamento;
                Session["department"] = username.id_departamento;
                Session["Periodo"] = periocidades.id;
                Session["rol"] = username.TipoRol;
                var rol = db.POAorPEDI("POA", username.id_departamento).FirstOrDefault();
                string tipo = "";

                switch (username.TipoRol)
                {
                    case "Administrador":
                        tipo = "Administrador";
                        if (rol == "Existe")
                        {
                            Session["Page"] = "verify";
                            Session["POAorPEDI"] = "POA";
                        }
                        else
                        {
                            Session["Page"] = "verify";
                            Session["POAorPEDI"] = "PEDI";
                        }
                        break;
                    case "Usuario":
                        tipo = "Usuario";
                        if (rol == "Existe")
                        {
                            Session["Page"] = "verify";
                            Session["POAorPEDI"] = "POA";
                        }
                        else
                        {
                            Session["Page"] = "No verify";
                            Session["POAorPEDI"] = "POA";
                        }
                                            
                        break;
                    case "No autorizado":
                        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "No autorizado para ingresar al sistema");

                    default:
                        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "usuario y/o contraseña incorrecta");
                }
                return Json(new { username, rol, tipo }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "usuario y/o contraseña incorrecta");
            }
        }
    }
}