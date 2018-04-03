angular.module('appGestion')
    .controller('SubsistemasController', function (SubsistemasServices, NgTableParams, PeriodosServices) {
        var vm = this;
        cargar();
        cargarPlanificion();
        listSubsistema = [];
        vm.totalregistros = 0;
        vm.modalsubsistema = {}
        function cargar() {
            SubsistemasServices.getSubsistemas().then(function (d) {
                listSubsistema = d.data.list;
                vm.totalregistros = listSubsistema.length;
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                {
                    total: listSubsistema.length, 
                    getData: function (params) {
                        vm.listSubsistemas = listSubsistema.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return vm.listSubsistemas;
                    }
                });
            })
        }
        function cargarPlanificion() {
            PeriodosServices.SelectPeriodos().then(function (d) {
                //para llenar select              
                vm.arrOptionPlanifiacion = [];
                angular.forEach(d.data.SelectPeriodos, function (value, key) {
                    vm.arrOptionPlanifiacion.push(value);
                });
            });
        }
        vm.ventanaModalSubsistema = function (subsistema) {
            $('.modal ').insertAfter($('body'));
            vm.modalsubsistema.Descripcion = subsistema.Descripcion;
            vm.modalsubsistema.SubsistemaId = subsistema.SubsistemaId;
        };
        vm.addSubsistema = function () {
            var requestResponse = SubsistemasServices.addSubsistemas(vm.subsistema);
            requestResponse.then(function successCallback(response) {
                if (response.data.mensaje == 'Error') {
                    swal({
                        title: 'Error!',
                        text: 'Debe realizar las respectivas configuraciones!',
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                } else {
                    cargar();
                    swal({
                        title: 'Correcto!',
                        text: response.data.mensaje,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })
                    vm.subsistema = {};
                    $('.modal').modal('hide');
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
        vm.updateSubsistema = function () {
            var requestResponse = SubsistemasServices.updateSubsistemas(vm.modalsubsistema);
            Message(requestResponse);
        }
        vm.deleteSubsistema = function (id, index) {
            vm.listSubsistemas.splice(index, 1);
            vm.totalregistros -= 1;
            var requestResponse = SubsistemasServices.deleteSubsistemas(id);
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
                vm.subsistema = {};
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

