angular.module('appGestion')
    .controller('PeriodosController', function (PeriodosServices, NgTableParams, $filter) {
        var vm = this;
        listPeriodos = [];
        vm.modalPeriodos = {}
        vm.totalregistros = 0;
        cargar();
        function cargar() {
            PeriodosServices.getPeriodos().then(function (d) {
                listPeriodos = d.data.listPeriodos;
                vm.totalregistros = listPeriodos.length;
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: listPeriodos.length,
                        getData: function (params) {
                            vm.listPeriodos = listPeriodos.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.listPeriodos;
                        }
                    });
            })
        }
        vm.addPeriodo = function () {
            var requestResponse = PeriodosServices.addPeriodos(vm.periodo.Descripcion, vm.periodo.inicio,vm.periodo.fin);
            requestResponse.then(function successCallback(response) {
               cargar();
               swal({
                        title: 'Correcto!',
                        text: response.data.mensaje,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                })
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
        vm.ventanaModalPeriodo = function (periodos) {
            $('.modal ').insertAfter($('body'));
            vm.modalPeriodos.periodoId = periodos.periodoId;
            vm.modalPeriodos.Descripcion = periodos.Descripcion;
            vm.modalPeriodos.inicio = $filter('date')(periodos.inicio.substr(6, 13), 'dd/MM/yyyy');
            vm.modalPeriodos.fin = $filter('date')(periodos.fin.substr(6, 13), 'dd/MM/yyyy');
            vm.modalPeriodos.estado = periodos.estado;
        }
        vm.updatePeriodos = function () {
            var requestResponse = PeriodosServices.updatePeriodos(vm.modalPeriodos);
            Message(requestResponse);
        }
        vm.deletePeriodo = function (id, index) {
            var requestResponse = PeriodosServices.deletePeriodos(id);
            requestResponse.then(function successCallback(response) {r
                vm.listPeriodos.splice(index, 1);
                vm.totalregistros -= 1;
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            });
        }
        function Message(requestResponse) {
            requestResponse.then(function successCallback(response) {
                cargar();
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.periodo = {};
                $('.modal').modal('hide');
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
    });