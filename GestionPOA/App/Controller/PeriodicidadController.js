angular.module('appGestion')
    .controller('PeriodicidadController', function (PeriodicidadServices, IntervalosServices) {
        var vm = this;
        listadoIntervalos = [];
        vm.modalIntervalo = {};
        vm.modalupadteIntervalo = {};
        cargarPeriocidad();
        function cargarPeriocidad() {
            PeriodicidadServices.getPeriocidad().then(function (response) {
                vm.listPeriocidiades = response.data.listperiocidiades;
            })
        }
        vm.cargarIntervalos = function (id, periocidad) {
            var requestResponse = IntervalosServices.getIntervalosPeriocidad(id);
            requestResponse.then(function successCallback(response) {
                vm.appstate = 'showAdd';
                vm.listadoIntervalos = response.data.lisIntervalosxPeriocidad
                vm.modalIntervalo.PeriodoId = id;
                vm.periocidad = periocidad;
                vm.modalIntervalo.CampoPivot = periocidad;
            });
        }
        vm.IntervaloModal = function () {
            $('.modal ').insertAfter($('body'));
        }
        vm.addIntervalo = function () {
            var requestResponse = IntervalosServices.addIntervalos(vm.modalIntervalo)
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                $('.modal').modal('hide');
                cargarPeriocidad();
                vm.cargarIntervalos(vm.modalIntervalo.PeriodoId, vm.periocidad)
                vm.modalIntervalo.Descripcion = "";
                vm.modalIntervalo.Orden = "";
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: 'Error',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
            
        }
        vm.addPeriocidad = function () {
            var requestResponse = PeriodicidadServices.addPeriocidad(vm.Periodo)
            requestResponse.then(function successCallback(response) {
                if (response.data.success == false) {
                    swal({
                        title: 'Error!',
                        text: response.data.mensaje,
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    });
                } else {
                    vm.Periodo = " ";
                    swal({
                        title: 'Correcto!',
                        text: response.data.mensaje,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })
                    cargarPeriocidad();
                }
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: 'Error',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
        }
        vm.deleteIntervalo = function (id, index) {
            var requestResponse = IntervalosServices.deleteIntervalos(id)
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.listadoIntervalos.splice(index, 1);
                vm.totalregistros -= 1;
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: 'Error',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
        }
        vm.ventanaModalIntervalo = function (intervalo) {
            $('.modal ').insertAfter($('body'));
            vm.modalupadteIntervalo.Descripcion = intervalo.Descripcion;
            vm.modalupadteIntervalo.id = intervalo.id;
            vm.modalupadteIntervalo.Orden = intervalo.Orden;
        }
        vm.updateIntervalo = function () {
            var requestResponse = IntervalosServices.updateIntervalos(vm.modalupadteIntervalo.id, vm.modalupadteIntervalo.Orden, vm.modalupadteIntervalo.Descripcion)
            requestResponse.then(function successCallback(response) {
                swal({
                      title: 'Correcto!',
                      text: response.data.mensaje,
                      type: 'success',
                      confirmButtonClass: "btn btn-success",
                      buttonsStyling: false
                })
                vm.cargarIntervalos(vm.modalIntervalo.PeriodoId, vm.periocidad)
                $('.modal').modal('hide');
            });
        }
        vm.changeEstado = function (estado) {
            var requestResponse = PeriodicidadServices.UpdateEstado(estado)
                requestResponse.then(function successCallback(response) {
                if (response.data.mensaje == 'no') {
                    $.notify({
                                  icon: "notifications",
                                  message: "<b>Error: </b> No se puedo actulizar el estado"
                             },{
                                  type: 'danger',
                                  timer: 10,
                                  placement: {from: 'top',align: 'right'}
                             });
                } else {
                    $.notify({
                                 icon: "notifications",
                                 message: "<b>Correcto: </b> Estado actualizado correctamente"
                             },{
                                 type: 'success',
                                 timer: 10,
                                 placement: {from: 'top', align: 'right'}
                             });
                }
            }, function errorCallback(response) {
                $.notify({
                    icon: "notifications",
                    message: "<b>Error: </b> No se puedo actulizar el estado"
                }, {
                        type: 'danger',
                        timer: 10,
                        placement: { from: 'top', align: 'right' }
                    });
            });
        }
    });