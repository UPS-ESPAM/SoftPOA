angular.module('appGestion')
    .controller('CumplimientoOEstrategicoController', function (ObjetivosEstrategicosServices, NgTableParams) {
        var vm = this;
        cargar();
        function cargar() {

            ObjetivosEstrategicosServices.getCumplimintnoOEstrategicos().then(function (d) {
                CumplimientoObjetivosEstrategico = d.data.cumplimientoOEstrategico;
              //  CumplimientoObjetivosEstrategico = $.parseJSON(CumplimientoObjetivosEstrategico);
                vm.totalregistros = CumplimientoObjetivosEstrategico.length;
                //llenar tabla
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: CumplimientoObjetivosEstrategico.length,
                        getData: function (params) {
                            vm.CumplimientoObjetivosEstrategico = CumplimientoObjetivosEstrategico.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.CumplimientoObjetivosEstrategico;
                        }
                    });
            })
        }
    });