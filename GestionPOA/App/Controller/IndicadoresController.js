﻿angular.module('appGestion')
    .controller('IndicadoresController', function ($scope, NgTableParams, IndicadoresServices) {

        var vm = this;
        cargarEstategias();
        vm.modalIndicadores = {};
        vm.detallesEstrategia = {}

        function cargarEstategias() {
            IndicadoresServices.getEstrategias().then(function (response) {
                vm.listadoEstrategias = response.data.listEstrategias;
            })
        }

        vm.cargarIndicadores = function (id, periocidad) {
            var requestResponse = IndicadoresServices.getIndicadores(id);
            requestResponse.then(function successCallback(response) {
                vm.appstate = 'showAdd';
                vm.listadoIndicadores = response.data.listIndicadores
                vm.modalIndicadores.EstrategiasId = id;
                vm.periocidad = periocidad;
            });
        }
        vm.detalleEstrategias = function (id) {
            var requestResponse = IndicadoresServices.getEstrategiaDetalle(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.detallesEstrategia.ObjetivoEstrategico = response.data.detalleEstrategia['0'].ObjetivoEstrategico;
                vm.detallesEstrategia.ObjetivoEspecifico = response.data.detalleEstrategia['0'].ObjetivoEspecifico;
            });
        }
        vm.ventanaIndicador = function () {
            $('.modal ').insertAfter($('body'));
            vm.modalIndicadores.Descripcion = "";
        };

        vm.ventanaModalIndicadores = function (indicadores) {
            $('.modal ').insertAfter($('body'));
            vm.modalIndicadores.Descripcion = indicadores.Descripcion;
            vm.modalIndicadores.IndicadorId = indicadores.IndicadorId;
        }

        vm.addIndicador = function () {
            var requestResponse = IndicadoresServices.addIndicadores(vm.modalIndicadores);
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
                vm.modalIndicadores.Descripcion  = "";
                $('.modal').modal('hide');
            });
        }

        vm.updateIndicador = function () {
            var requestResponse = IndicadoresServices.updateIndicadores(vm.modalIndicadores);
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
                vm.modalIndicadores.Descripcion = "";
                $('.modal').modal('hide');
            });
        }

        vm.deleteIndicador = function (id, index) {
            vm.listadoIndicadores.splice(index, 1);
            var requestResponse = IndicadoresServices.deleteIndicadores(id);
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
