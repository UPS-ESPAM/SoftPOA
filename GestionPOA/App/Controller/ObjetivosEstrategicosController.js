angular.module('appGestion')
    .controller('ObjetivosEstrategicosController', function (ObjetivosEstrategicosServices, NgTableParams) {

        var vm = this;
        cargar();
        listObjetivosEstrategico = [];
        vm.totalregistro = 0;
        vm.arrOptionSelects = [];
        vm.modalObjetivoEstrategico = {}
        function cargar() {

            ObjetivosEstrategicosServices.getObjetivosEstrategicos().then(function (d) {
                listObjetivosEstrategico = d.data.listOE;
                listObjetivosEstrategico = $.parseJSON(listObjetivosEstrategico);
                vm.totalregistros = listObjetivosEstrategico.length;
                //para llenar select              
                vm.arrOptionSelects = [];
                angular.forEach(d.data.listaSistemas, function (value, key) {
                    vm.arrOptionSelects.push(value);
                });
                //llenar tabla
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                },
                    {
                        total: listObjetivosEstrategico.length,
                        getData: function (params) {
                            vm.listObjetivosEstrategico = listObjetivosEstrategico.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.listObjetivosEstrategico;
                        }
                    });
            })
        }

        vm.ModalObjetivosEstrategicos = function (ObjetivoEstrategico) {
            $('.modal ').insertAfter($('body'));
            vm.modalObjetivoEstrategico.Descripcion = ObjetivoEstrategico.Descripcion;
            vm.modalObjetivoEstrategico.SubsistemaId = ObjetivoEstrategico.SubsistemaId;
            vm.modalObjetivoEstrategico.ObjetivosEstragicoId = ObjetivoEstrategico.ObjetivosEstragicoId;
        };

        vm.addObjetivoEstrategico = function () {
            var requestResponse = ObjetivosEstrategicosServices.addObjetivoEstrategico(vm.ObjetivoEstrategico);
            Message(requestResponse);
        }

        vm.updateObjetivoEstrategico = function () {
            var requestResponse = ObjetivosEstrategicosServices.updateObjetivoEstrategico(vm.modalObjetivoEstrategico);
            Message(requestResponse);
        }

        vm.deleteObjetivoEstrategico = function (id, index) {
            vm.listObjetivosEstrategico.splice(index, 1);
            vm.totalregistros -= 1;
            var requestResponse = ObjetivosEstrategicosServices.deleteObjetivosEstrategicos(id);
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
                vm.ObjetivoEstrategico = {};
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

