angular.module('appGestion')
    .controller('MetasController', function ($cookies,IntervalosServices, IndicadoresServices, MetasServices, ProgramacionesServices) {
        var vm = this;
       
        cargarIntervalos();
        cargarMetasProgramacion();
        cargarIndicadores();
        vm.arrOptionSelects = [];

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
            var requestResponse = MetasServices.updateIndicadores(vm.modalIndicadores);
            requestResponse.then(function successCallback(response) {
                var requestResponse = IndicadoresServices.getIndicadores(vm.modalIndicadores.EstrategiasId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoIndicadores = response.data.listIndicadores
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
            vm.listadoIndicadores.splice(index, 1);
            var requestResponse = MetasServices.deleteIndicadores(id);
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

        vm.updateMetasProgramacion = function (Programacion) {
            vm.arrayprogramacion = [];
            vm.arrayprogramacion.push(
                { id: Programacion.ID_I, valor: Programacion.I, MetasID: Programacion.MetaID},
                { id: Programacion.ID_II, valor: Programacion.II, MetasID: Programacion.MetaID },
                { id: Programacion.ID_III, valor: Programacion.III, MetasID: Programacion.MetaID },
                { id: Programacion.ID_IV, valor: Programacion.IV, MetasID: Programacion.MetaID },
            );
            var total = 0;
            for (var i = 0; i < vm.arrayprogramacion.length; i++) {
                var total = total + parseInt(vm.arrayprogramacion[i].valor) ;
            }
            if (total == 100) {
                var requestResponse = ProgramacionesServices.updateProgramaciones(vm.arrayprogramacion);
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