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
                       "~/Scripts/plugins/alertify.min.js",
                       "~/Scripts/assets/js/demo.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                       "~/Scripts/angular.min.js",
                       "~/Scripts/angular-route.min.js",
                       "~/Scripts/angular-animate.min.js",
                       "~/Scripts/angular-touch.min.js",
                       "~/Scripts/ng-table.min.js",
                       "~/Scripts/angular-input-masks-standalone.js",
                       "~/Scripts/cookies.js",
                       "~/Scripts/angular-pusher.js"
                      
                       ));
            bundles.Add(new StyleBundle("~/Content/plantillaCss").Include(
                     "~/Content/assets/css/bootstrap.min.css",
                      "~/Content/plugins/semantic.min.css",
                      "~/Content/plugins/alertify.min.css",
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
