angular.module('appGestion')
    .controller('AccionesController', function (AccionesServices) {

        var vm = this;
        cargarMetas();

        function cargarMetas() {
            AccionesServices.getMetas().then(function (response) {
                vm.listadoMetas = response.data.listMetas;
            })
        }

        vm.cargarAcciones = function (id, meta) {
            var requestResponse = AccionesServices.getAcciones(id);
            requestResponse.then(function successCallback(response) {
                vm.appstate = 'showAdd';
                vm.listadoAcciones = response.data.listAcciones
                vm.modalAcciones.MetaID = id;
                vm.meta = meta;
            });
        }

        vm.ventanaAccion = function () {
            $('.modal ').insertAfter($('body'));
            vm.modalAcciones.Descripcion = "";
        };

        vm.ventanaModalAccion = function (indicadores) {
            $('.modal ').insertAfter($('body'));
            vm.modalAcciones.Descripcion = indicadores.Descripcion;
            vm.modalAcciones.id = indicadores.id;
        }

        vm.addAccion = function () {
            var requestResponse = AccionesServices.addAcciones(vm.modalAcciones);
            requestResponse.then(function successCallback(response) {
                var requestResponse = AccionesServices.getAcciones(vm.modalAcciones.MetaID);
                requestResponse.then(function successCallback(response) {
                    vm.listadoAcciones = response.data.listAcciones
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalAcciones.Descripcion = "";
                $('.modal').modal('hide');
            });
        }

        vm.updateAccion = function () {
            var requestResponse = AccionesServices.updateAcciones(vm.modalAcciones);
            requestResponse.then(function successCallback(response) {
                var requestResponse = AccionesServices.getAcciones(vm.modalAcciones.MetaID);
                requestResponse.then(function successCallback(response) {
                    vm.listadoAcciones = response.data.listAcciones
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalAcciones.Descripcion = "";
                $('.modal').modal('hide');
            });
        }

        vm.deleteAccion = function (id, index) {
            vm.listadoAcciones.splice(index, 1);
            var requestResponse = AccionesServices.deleteAcciones(id);
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