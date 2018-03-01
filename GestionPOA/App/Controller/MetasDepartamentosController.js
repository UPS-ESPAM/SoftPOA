angular.module('appGestion')
    .controller('MetasDepartamentosController', function (NgTableParams,$cookies, MetasDepartamentosServices, MetasServices,
        IndicadoresServices, SubsistemasServices, ObjetivosEstrategicosServices,
        ObjetivosEspecificosServices, EstrategiasServices, DepartamentosServices) {
        var vm = this;        
        vm.arrOptionSelects = [];
        vm.asignacionModal = {};
        listMetasAsignadas = [];
        vm.arrOptionObjEstrategicos = [];
        cargarSubSistemas();
        cargarDepartamentos();  
        cargarTabla();
        function cargarTabla() {
            MetasDepartamentosServices.getMetasDepartamentos().then(function (d) {   
                listMetasAsignadas = d.data.listametasDepartamento;
                vm.totalregistros = listMetasAsignadas.length;               
                //llenar tabla
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: listMetasAsignadas.length,
                        getData: function (params) {
                            vm.listMetasAsignadas = listMetasAsignadas.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.listMetasAsignadas;
                        }
                    });
            })
        }        
        vm.modalMetaAsignada = function (metaAsignada) {
            $('.modal ').insertAfter($('body'));
            vm.Departamento = metaAsignada.nombre_subunidad;
            vm.asignacionModal.id = metaAsignada.id;
            vm.asignacionModal.SubsistemaId = metaAsignada.SubsistemaId;
            vm.cargarObjetivosEstrategicos(metaAsignada.SubsistemaId);
            vm.cargarObjetivosEspecificos(metaAsignada.ObjetivosEstragicoId);
            vm.asignacionModal.ObjetivosEspecificosId = metaAsignada.ObjetivosEspecificosId;
            vm.cargarEstrategias(metaAsignada.ObjetivosEspecificosId);
            vm.asignacionModal.ObjetivosEstragicoId = metaAsignada.ObjetivosEstragicoId;
            vm.cargarIndicadores(metaAsignada.EstrategiasId);
            vm.asignacionModal.EstrategiasId = metaAsignada.EstrategiasId;
            vm.cargarMetasByIndicador(metaAsignada.indicadorID);
            vm.asignacionModal.IndicadorId = metaAsignada.indicadorID;
            vm.asignacionModal.MetaId = metaAsignada.metasID;
        };      
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
        vm.cargarEstrategias = function (id) {
            if (id != null) {
                EstrategiasServices.getOEstrategiasPeriodoActual(id).then(function (d) {
                    vm.arrOptionEstrategias = [];
                    angular.forEach(d.data.listaEstrategia, function (value, key) {
                        vm.arrOptionEstrategias.push(value);
                    });
                })
            }
            else {
                vm.arrOptionEstrategias = [];
            }
        }
        vm.cargarIndicadores = function (id) {
            if (id != null) {
                IndicadoresServices.getIndicadores(id).then(function (d) {
                    vm.arrOptionIndicadores = [];
                    angular.forEach(d.data.listIndicadores, function (value, key) {
                        vm.arrOptionIndicadores.push(value);
                    });
                })
            }
            else {
                vm.arrOptionIndicadores = [];
            }
        }
        vm.cargarMetasByIndicador = function (id) {
            if (id != null) {
                MetasServices.getMetasbyIndicador(id).then(function (d) {
                    vm.arrOptionMetas = [];
                    angular.forEach(d.data.listMetas, function (value, key) {
                        vm.arrOptionMetas.push(value);
                    });
                })
            }
            else {
                vm.arrOptionMetas = [];
            }
        }
        vm.addAsignacionMeta = function () {            
            var requestResponse = MetasDepartamentosServices.addMetasDepartamentos(vm.asignacion.MetaId, vm.asignacion.id_subunidad);
            Message(requestResponse);
        }
        vm.updateAsignacionMeta = function () {
            var requestResponse = MetasDepartamentosServices.updateMetasDepartamentos(vm.asignacionModal.id, vm.asignacionModal.MetaId);
            Message(requestResponse);
            $('.modal').modal('hide');

        }
        vm.deleteAsignacionMeta = function (id, index) {
            vm.listMetasAsignadas.splice(index, 1);
            vm.totalregistros -= 1;
            var requestResponse = MetasDepartamentosServices.deleteMetasDepartamentos(id);
            Message(requestResponse);
        }
        function Message(requestResponse) {
            requestResponse.then(function successCallback(response) {
                cargarTabla();
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