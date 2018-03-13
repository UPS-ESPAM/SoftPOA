angular.module('appGestion')
    .controller('AlertasController', function (AlertasServices) {
        var vm = this;
        cargarAlertas();
        function cargarAlertas() {
            AlertasServices.getAlertas().then(function (response) {
                vm.listAlertasss = response.data.listAlertas;
            })
        }
        vm.ShowObservacion = function (observacion, id) {
            AlertasServices.readAlertas(id).then(function (response) {r
                vm.justifacion = observacion;
            })
        }
    });
