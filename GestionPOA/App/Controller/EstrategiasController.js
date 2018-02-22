angular.module('appGestion')
    .controller('EstrategiasController', function (NgTableParams, EstrategiasServices) {

        var vm = this;
        cargarObjetivosEspecificos();
        vm.modalEstrategia = {};
        function cargarObjetivosEspecificos() {
            EstrategiasServices.getObjetivosEspecificosAsignados().then(function (response) {
                vm.listadoObjetivoEspecifico = response.data.listObjetivoEspecificos;
            })
        }

        vm.cargarEstrategia = function (id, ObjetivoEspecifico) {
            var requestResponse = EstrategiasServices.getEstrategias(id);
            
            requestResponse.then(function successCallback(response) {
                vm.appstate = 'showAdd';
                debugger
                vm.listadoEstrategia = response.data.listaEstrategia
                vm.modalEstrategia.ObjetivosEspecificosId = id;
                vm.ObjetivoEspecifico = ObjetivoEspecifico;
            });
        }

        vm.ventanaEstrategia = function () {
            $('.modal ').insertAfter($('body'));
            vm.modalEstrategia.Descripcion = "";
        };

        vm.ventanaModalEstrategia = function (estrategia) {
            debugger
            $('.modal ').insertAfter($('body'));
            vm.modalEstrategia.Descripcion = estrategia.Descripcion;
            vm.modalEstrategia.EstrategiasId = estrategia.EstrategiasId;
            vm.modalEstrategia.PlanificacionId = estrategia.PlanificacionId;

        }

        vm.addEstrategia = function () {
            debugger
            var requestResponse = EstrategiasServices.addEstrategia(vm.modalEstrategia);
            requestResponse.then(function successCallback(response) {
                var requestResponse = EstrategiasServices.getEstrategias(vm.modalEstrategia.ObjetivosEspecificosId);
                requestResponse.then(function successCallback(response) { 
                    
                    vm.listadoEstrategia = response.data.listaEstrategia
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalEstrategia.Descripcion = "";
                $('.modal').modal('hide');
            });
        }

        vm.updateEstrategia = function () {
            var requestResponse = EstrategiasServices.updateEstrategia(vm.modalEstrategia);
            requestResponse.then(function successCallback(response) {
                var requestResponse = EstrategiasServices.getEstrategias(vm.modalEstrategia.ObjetivosEspecificosId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoEstrategia = response.data.listaEstrategia
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalEstrategia.Descripcion = "";
                $('.modal').modal('hide');
            });
        }

        vm.deleteEstrategia = function (id, index) {
            vm.listadoEstrategia.splice(index, 1);
            var requestResponse = EstrategiasServices.deleteEstrategia(id);
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            });
        }
    });
