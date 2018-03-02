angular.module('appGestion')
    .controller('ObjetivosEspecificosDepartamentosController', function (NgTableParams,SubsistemasServices, DepartamentosServices, ObjetivosEstrategicosServices, ObjetivosEspecificosServices, ObjetivosEspecificosDepartamentosServices) {
        var vm = this;
        listObjetivosEspecificosAsignados = [];
        vm.asignacionModal = {};
        cargarSubSistemas();
        cargarDepartamentos();  
        cargarTabla();
        function cargarSubSistemas() {
            SubsistemasServices.getSubsistemasPeriodo().then(function (d) {
                vm.arrOptionSelects = [];
                angular.forEach(d.data.listSistemas, function (value, key) {
                    vm.arrOptionSelects.push(value);
                });
            })
        }
        function cargarDepartamentos() {
            DepartamentosServices.getDepartamentos().then(function (d) {
                vm.arrOptionDepartamentos = [];
                angular.forEach(d.data.listdepartamentos, function (value, key) {
                    vm.arrOptionDepartamentos.push(value);
                });
            })
        }
        function cargarTabla() {
            ObjetivosEspecificosDepartamentosServices.GetAsignacionObjetivosEspecificos().then(function (d) {
                listObjetivosEspecificosAsignados = d.data.listObjeEspecificosDepartamento;
                vm.totalregistros = listObjetivosEspecificosAsignados.length;
                //llenar tabla
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: listObjetivosEspecificosAsignados.length,
                        getData: function (params) {
                            vm.listObjetivosEspecificosAsignados = listObjetivosEspecificosAsignados.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.listObjetivosEspecificosAsignados;
                        }
                    });
            })
        } 
        vm.modalAsignacionDepartamento = function (departamentoAsignada) {
            $('.modal ').insertAfter($('body'));
            vm.Departamento = departamentoAsignada.nombre_subunidad;
            vm.asignacionModal.id = departamentoAsignada.id;
            vm.asignacionModal.SubsistemaId = departamentoAsignada.SubsistemaId;
            vm.cargarObjetivosEstrategicos(departamentoAsignada.SubsistemaId);
            vm.asignacionModal.ObjetivosEstragicoId = departamentoAsignada.ObjetivosEstragicoId
            vm.cargarObjetivosEspecificos(departamentoAsignada.ObjetivosEstragicoId);
            vm.asignacionModal.ObjetivosEspecificosId = departamentoAsignada.ObjetivosEspecificosId;
        };  
        vm.cargarObjetivosEstrategicos = function (id) {
            if (id != null) {
                ObjetivosEstrategicosServices.getObjetivosEstrategicosBySubSistema(id).then(function (d) {
                    vm.arrOptionObjEstrategicos = [];
                    angular.forEach(d.data.listObjetivosEstrategicos, function (value, key) {
                        vm.arrOptionObjEstrategicos.push(value);
                    });
                })
            }
            else {
                vm.arrOptionObjEstrategicos = [];
            }
        }
        vm.cargarObjetivosEspecificos = function (id) {
            if (id != null) {
                ObjetivosEspecificosServices.getObjetivosEspecificosPeriodoActual(id).then(function (d) {
                    vm.arrOptionObjEspecificos = [];
                    angular.forEach(d.data.listObjetivoEspecificos, function (value, key) {
                        vm.arrOptionObjEspecificos.push(value);
                    });
                })
            }
            else {
                vm.arrOptionObjEspecificos = [];
            }
        }
        vm.addAsignacionObjetivoEspecifico = function () {
            var requestResponse = ObjetivosEspecificosDepartamentosServices.addAsignacionObjetivosEspecificos(vm.asignacion.id_subunidad, vm.asignacion.ObjetivosEspecificosId);
            requestResponse.then(function successCallback(response) {
                if (response.data.success == false) {
                    swal({
                        title: 'Error!',
                        text: response.data.mensaje,
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                } else {
                    vm.asignacion = {};
                    cargarTabla();
                    swal({
                        title: 'Correcto!',
                        text: response.data.mensaje,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })
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
        vm.updateAsignacionMeta = function () {
            var requestResponse = ObjetivosEspecificosDepartamentosServices.updateAsignacionObjetivosEspecificos(vm.asignacionModal.id, vm.asignacionModal.ObjetivosEspecificosId);
            Message(requestResponse);
            cargarTabla();
            $('.modal').modal('hide');
        }
        vm.deleteAsignacionDepartamento = function (id, index) {
            vm.listObjetivosEspecificosAsignados.splice(index, 1);
            vm.totalregistros -= 1;
            var requestResponse = ObjetivosEspecificosDepartamentosServices.deleteAsignacionObjetivosEspecificos(id);
            Message(requestResponse);
        }
        function Message(requestResponse) {
            requestResponse.then(function successCallback(response) {
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
    });