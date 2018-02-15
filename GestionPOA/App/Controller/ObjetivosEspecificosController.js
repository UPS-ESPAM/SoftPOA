angular.module('appGestion')
    .controller('ObjetivosEspecificosController', function (ObjetivosEspecificosServices, NgTableParams) {
        
        var vm = this;
        cargar();
        listObjetivosEspecifico = [];
        vm.totalregistro = 0;
        vm.arrOptionSelects = [];
        vm.modalObjEspecificos = {}

        function cargar() {
            ObjetivosEspecificosServices.getObjetivosEspecificos().then(function (d) {
                listObjetivosEspecifico = d.data.listOEspecifico;
                vm.totalregistros = listObjetivosEspecifico.length;
                //para llenar select
                vm.arrOptionSelects = [];
                angular.forEach(d.data.listObjetivoEstrategico, function (value, key) {
                    vm.arrOptionSelects.push(value);
                });
                //llenar tabla
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: listObjetivosEspecifico.length,
                        getData: function (params) {
                            vm.listObjetivosEspecificos = listObjetivosEspecifico.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.listObjetivosEspecificos;
                        }
                    });
            })
        }

        vm.ventanaModalOE = function (objetivosEspecificos) {
            $('.modal ').insertAfter($('body'));
            vm.modalObjEspecificos.Descripcion = objetivosEspecificos.Descripcion; 
            vm.modalObjEspecificos.ObjetivosEspecificosId = objetivosEspecificos.ObjetivosEspecificosId;
            vm.modalObjEspecificos.ObjetivosEstragicoId = objetivosEspecificos.ObjetivosEstragicoId;
        };

        vm.addObjetivosEspecificos = function () {
            var requestResponse = ObjetivosEspecificosServices.addObjetivosEspecificos(vm.objetivosEspecificos);
            Message(requestResponse);
        }

        vm.updateObjetivosEspecificos = function () {
            var requestResponse = ObjetivosEspecificosServices.updateObjetivosEspecificos(vm.modalObjEspecificos);
            Message(requestResponse);
        }

        vm.deleteObjetivosEspecificos = function (id, index) {
            vm.listObjetivosEspecificos.splice(index, 1);
            vm.totalregistros -= 1;
            var requestResponse = ObjetivosEspecificosServices.deleteObjetivosEspecificos(id);
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
                vm.objetivosEspecificos = {};
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

