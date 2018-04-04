angular.module('appGestion')
    .controller('AlertasController', function (AlertasServices) {
        var vm = this;
        cargarAlertas();
        function cargarAlertas() {
            AlertasServices.getAlertas().then(function (response) {
                vm.plani = [];
                vm.ejecu = [];
                vm.listAlertasss = response.data.listAlertas;
                vm.listAlertasss.forEach(function (element, index) {
                    switch (element.planificado) {
                        case '110':
                            vm.plani[index]= "Satisfactorio";
                            break;
                        case '220':
                            vm.plani[index]= "Medio Satisfactorio";
                            break;
                        case '330':
                            vm.plani[index] = "Deficiente";
                            break;
                        default:
                            vm.plani[index] = element.planificado + "%";
                    }
                });
                vm.listAlertasss.forEach(function (element, index) {
                    switch (element.ejecutado) {
                        case '110':
                            vm.ejecu[index] = "Satisfactorio";
                            break;
                        case '220':
                            vm.ejecu[index] = "Medio Satisfactorio";
                            break;
                        case '330':
                            vm.ejecu[index] = "Deficiente";
                            break;
                        default:
                            vm.ejecu[index] = element.ejecutado+"%";
                    }
                });
            })
        }
        vm.ShowObservacion = function (observacion, id) {
            AlertasServices.readAlertas(id).then(function (response) {
                vm.justifacion = observacion;
            })
        }
    });
