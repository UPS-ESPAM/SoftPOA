using System.Web;
using System.Web.Optimization;

namespace GestionPOA
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/plantillaJS").Include(
                       "~/Scripts/assets/js/jquery-3.1.1.min.js",
                       "~/Scripts/assets/js/jquery-ui.min.js",
                       "~/Scripts/plugins/semantic.min.js",
                       "~/Scripts/assets/js/bootstrap.min.js",
                       "~/Scripts/assets/js/material.min.js",
                       "~/Scripts/assets/js/perfect-scrollbar.jquery.min.js",
                       "~/Scripts/assets/js/jquery.validate.min.js",
                       "~/Scripts/assets/js/moment.min.js",
                       "~/Scripts/assets/js/chartist.min.js",
                       "~/Scripts/assets/js/jquery.bootstrap-wizard.js",
                       "~/Scripts/assets/js/bootstrap-notify.js",
                       "~/Scripts/assets/js/jquery.sharrre.js",
                       "~/Scripts/assets/js/bootstrap-datetimepicker.js",
                       "~/Scripts/assets/js/jquery-jvectormap.js",
                       "~/Scripts/assets/js/nouislider.min.js",
                       "~/Scripts/assets/js/jquery.select-bootstrap.js",
                       "~/Scripts/assets/js/jquery.datatables.js",
                       "~/Scripts/assets/js/sweetalert2.js",
                       "~/Scripts/assets/js/jasny-bootstrap.min.js",
                       "~/Scripts/assets/js/fullcalendar.min.js",
                       "~/Scripts/assets/js/jquery.tagsinput.js",
                       "~/Scripts/assets/js/material-dashboard.js",
                       "~/Scripts/assets/js/demo.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                       "~/Scripts/angular.min.js",
                       "~/Scripts/angular-route.min.js",
                       "~/Scripts/angular-animate.min.js",
                       "~/Scripts/angular-touch.min.js",
                       "~/Scripts/ng-table.min.js",
                       "~/Scripts/cookies.js",
                       "~/App/app.js",
                       "~/App/Services/SubsistemasServices.js",
                       "~/App/Services/ObjetivosEspecificosServices.js",
                       "~/App/Services/ObjetivosEstrategicosServices.js",
                       "~/App/Services/IndicadoresServices.js",
                       "~/App/Services/AccionesServices.js",
                       "~/App/Services/EstrategiasServices.js",
                       "~/App/Services/LoginServices.js",
                       "~/App/Services/MetasServices.js",
                       "~/App/Services/EvidenciasServices.js",
                       "~/App/Services/IntervalosServices.js",
                       "~/App/Services/ProgramacionesServices.js",
                       "~/App/Services/DepartamentosServices.js", 
                       "~/App/Services/MetasDepartamentosServices.js",
                       "~/App/Services/ObjetivosEspecificosDepartamentosServices.js", 
                       "~/App/Controller/SubsistemasController.js",
                       "~/App/Controller/ObjetivosEspecificosController.js",
                       "~/App/Controller/ObjetivosEstrategicosController.js",
                       "~/App/Controller/IndicadoresController.js",
                       "~/App/Controller/AccionesController.js",
                       "~/App/Controller/LoginController.js",
                       "~/App/Controller/MetasController.js",
                       "~/App/Controller/MetasDepartamentosController.js",
                       "~/App/Controller/ObjetivosEspecificosDepartamentosController.js", 
                       "~/App/Directivas/numbersOnly.js",
                       "~/App/Controller/EstrategiasController.js",
                       "~/App/Directivas/decimalOnly.js",
                       "~/App/Directivas/formatCurrency.js",
                       "~/App/Directivas/loader.js",
                        "~/App/Directivas/uploadFile.js"
                       ));
            bundles.Add(new StyleBundle("~/Content/plantillaCss").Include(
                     "~/Content/assets/css/bootstrap.min.css",
                      "~/Content/plugins/semantic.min.css",
                     "~/Content/assets/css/demo.css",
                     "~/Content/assets/css/material-dashboard.css"
                     ));

            bundles.Add(new StyleBundle("~/Content/plugins").Include(
                    "~/Content/plugins/modal.min.css",
                    "~/Content/plugins/icon.min.css"
                    ));

        }
    }
}
