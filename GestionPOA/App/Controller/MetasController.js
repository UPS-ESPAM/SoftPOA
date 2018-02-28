angular.module('appGestion')
    .controller('MetasController', function ($cookies, IntervalosServices, MetasServices,
        ProgramacionesServices, EvidenciasServices, IndicadoresServices) {
        var vm = this;
        vm.detallesMeta = {};
        vm.observacion = {};
        vm.modalIndicador = {};
        vm.uploadfile = {};
        vm.file = {};
        cargarIntervalos();
        cargarMetasProgramacion();
        cargarIndicadores();
        vm.arrOptionSelects = [];
        vm.arrOptionObjEstrategicos = [];
        vm.listSistemas = {};
        listPlanificacion = [];
        function cargarIndicadores() {            
            IndicadoresServices.getIndicadoresByDepartamento().then(function (response) {
                vm.listadoIndicadores = response.data.listIndicadores;                
                
            })
        }       
        vm.cargarMetas = function (id, indicador) {
            var requestResponse = MetasServices.getMetasbyIndicador(id);
            requestResponse.then(function successCallback(response) {                
                vm.arrOptionSelects = [];
                angular.forEach(response.data.listTipoCalificacion, function (value, key) {
                    vm.arrOptionSelects.push(value);
                });
                vm.appstate = 'showAdd';
                vm.listadoMetas = response.data.listMetas
                vm.modalMetas.IndicadorId = id;
                vm.Indicador = indicador;
            });
        }
        vm.ventanaMeta = function () {
            $('.modal ').insertAfter($('body'));
            vm.modalMetas.Descripcion = "";
        };
        vm.ventanaModalMeta = function (metas) {            
            $('.modal ').insertAfter($('body'));
            vm.modalMetas.Descripcion = metas.Descripcion;
            vm.modalMetas.tipoCalificacionId = metas.tipoCalificacionId;
            vm.modalMetas.id = metas.id;
        }
        vm.addMetas = function () {
            debugger
            var requestResponse = MetasServices.addMetas(vm.modalMetas);
            requestResponse.then(function successCallback(response) {
                var requestResponse = MetasServices.getMetasbyIndicador(vm.modalMetas.IndicadorId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoMetas = response.data.listMetas
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalMetas.Descripcion = "";
                $('.modal').modal('hide');
            });
        }
        vm.updateMeta = function () {
            var requestResponse = MetasServices.updateMetas(vm.modalMetas.id, vm.modalMetas.Descripcion, vm.modalMetas.tipoCalificacionId );
            requestResponse.then(function successCallback(response) {
                var requestResponse = MetasServices.getMetasbyIndicador(vm.modalMetas.IndicadorId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoMetas = response.data.listMetas
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalMetas.Descripcion = "";
                $('.modal').modal('hide');
            });
        }
        vm.deleteMeta = function (id, index) {
            vm.listadoMetas.splice(index, 1);
            var requestResponse = MetasServices.deleteMetas(id);
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
        vm.detalleIndicador = function (id) {
            var requestResponse = IndicadoresServices.getIndicadorDetalle(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.modalIndicador.ObjetivoEstrategico = response.data.detalleIndicador['0'].Objetivo_Estrategico;
                vm.modalIndicador.ObjetivoEspecifico = response.data.detalleIndicador['0'].Objetivo_Especifico;
                vm.modalIndicador.Estrategia = response.data.detalleIndicador['0'].Estrategia;
            });
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
        vm.ObservacionDetalle = function (id) {
            var requestResponse = MetasServices.getMetasObservacion(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.observacion.id = response.data.listObservacion['0'].id;
                vm.observacion.Descripcion = response.data.listObservacion['0'].Descripcion;
                vm.observacion.Observacion = response.data.listObservacion['0'].Observacion;
            });
        }
        vm.EvidenciaUpload = function (id, meta, intervaloid) {
            $('.modal ').insertAfter($('body'));
            vm.uploadfile.idmeta = id
            vm.uploadfile.intervaloid = intervaloid
            vm.uploadfile.meta = meta
        }
        vm.updateObservacion = function () {
            var requestResponse = MetasServices.updateObservacionMeta(vm.observacion.id, vm.observacion.Observacion);
            Message(requestResponse);
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
        vm.uploadFile = function () {
            var fileInput = $('#file');
            var fileData = fileInput.prop("files")[0];
            EvidenciasServices.uploadFile(fileData, vm.uploadfile.idmeta, vm.uploadfile.intervaloid).then(function (res) {
                if (res.data.msj == "planificacion") {
                    swal({
                        title: 'Error!',
                        text: 'No se puede cargar evidencia porque la programación es 0',
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                    this.upload.reset();
                }else if (res.data.msj == "no") {
                    swal({
                        title: 'Error!',
                        text: 'Máximo de evidencias registradas 2',
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                    this.upload.reset();
                } else {
                    swal({
                        title: 'Correcto!',
                        text: res.data.msj,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })
                    $('.modal').modal('hide');
                    this.upload.reset();
                }
             
            })
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