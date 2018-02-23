angular.module('appGestion')
    .controller('MetasController', function ($cookies,IntervalosServices, MetasServices, ProgramacionesServices) {
        var vm = this;
        vm.detallesMeta = {};
        cargarIntervalos();
        cargarMetasProgramacion();
        cargarMetaEjecución();
        vm.deparmentID = $cookies.deparmentID;

        function cargarIntervalos() {
            IntervalosServices.getIntervalos().then(function (response) {
                vm.listadoIntervalos = response.data.listIntervalos;
            })
        }
        
        function cargarMetasProgramacion() {
            MetasServices.getMetasProgramacion().then(function (response) {
                vm.listadoMetasProgramaciones = response.data.listMetasProgramacion;
            })
        }

        function cargarMetaEjecución() {
                MetasServices.getMetasEjecucion().then(function (response) {
                vm.listadoMetasEjecucion = response.data.listMetasEjecucionn;
            })
        }

        vm.detalleMeta = function (id) {
            var requestResponse = MetasServices.getDetalleMeta(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.detallesMeta.ObjetivoEstrategico = response.data.detalleMeta['0'].Objetivo_Estrategico;
                vm.detallesMeta.ObjetivoEspecifico = response.data.detalleMeta['0'].Objetivo_Especifico;
                vm.detallesMeta.Estrategia = response.data.detalleMeta['0'].Estrategia;
                vm.detallesMeta.Indicador = response.data.detalleMeta['0'].Indicador;
            });
        }
        vm.addObservacion = function (id) {
             $('.modal ').insertAfter($('body'));
        }
        vm.updateMetasProgramacion = function (Programacion) {
            vm.arrayprogramacion = [];
            vm.arrayprogramacion.push(
                { id: Programacion.ID_I, valor: Programacion.I, MetasID: Programacion.MetaID},
                { id: Programacion.ID_II, valor: Programacion.II, MetasID: Programacion.MetaID },
                { id: Programacion.ID_III, valor: Programacion.III, MetasID: Programacion.MetaID },
                { id: Programacion.ID_IV, valor: Programacion.IV, MetasID: Programacion.MetaID },
            );
        
            if (vm.deparmentID == 8) {
                var requestResponse = ProgramacionesServices.updateProgramacionesPEDI(vm.arrayprogramacion);
                Message(requestResponse);
            } else {
                var total = 0;
                for (var i = 0; i < vm.arrayprogramacion.length; i++) {
                    var total = total + parseInt(vm.arrayprogramacion[i].valor);
                }
                if (total == 100) {
                    var requestResponse = ProgramacionesServices.updateProgramacionesPOA(vm.arrayprogramacion, Programacion.MetaID, Programacion.Presupuesto );
                    Message(requestResponse);
                } else {
                    $.notify({
                        icon: "notifications",
                        message: "<b>Error: </b> La suma de la planificación es menor o mayor a 100%"
                    }, {
                            type: 'danger',
                            timer: 10,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        }
                    );
                }
            }

        }

        vm.updateMetasEjecucion = function (Ejecucion) {
            debugger
            vm.arrayejecucion = [];
            vm.arrayejecucion.push(
                { id: Ejecucion.ID_I, valor: Ejecucion.I, MetasID: Ejecucion.MetaID },
                { id: Ejecucion.ID_II, valor: Ejecucion.II, MetasID: Ejecucion.MetaID },
                { id: Ejecucion.ID_III, valor: Ejecucion.III, MetasID: Ejecucion.MetaID },
                { id: Ejecucion.ID_IV, valor: Ejecucion.IV, MetasID: Ejecucion.MetaID },
            );
            if (vm.deparmentID == 8) {
                var requestResponse = ProgramacionesServices.updateEjecucionPEDI(vm.arrayejecucion);
                Message(requestResponse);
            } else {
                var requestResponse = ProgramacionesServices.updateEjecucionPOA(vm.arrayejecucion, Ejecucion.MetaID, Ejecucion.P_Ejecutado);
                    Message(requestResponse);
            }
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