angular.module('appGestion')
    .controller('InformacionAdicionalController', function (InformacionAdicionalServices) {
        var ctlInfo = this;
        ctlInfo.listFormulasCalculos = [];
        ctlInfo.modalUpdateFormulaCalculo = { 'eliminado': 0 };
        ctlInfo.modalFormulaCalculo = { 'eliminado': 0 };
        ctlInfo.SearchFormulasCalculos = function cargarFormulasCalculos(id, meta) {
            InformacionAdicionalServices.getFormulaCalculo(id).then(function (d) {
                ctlInfo.listFormulasCalculos = d.data.listFormulaCalculo;
                ctlInfo.meta = meta;
                ctlInfo.modalFormulaCalculo.metasId = id;
                ctlInfo.appstate = 'showAdd';
            })
        }
        ctlInfo.ventanaFormulaCalculo = function () {
            $('.modal ').insertAfter($('body'));
        }
        ctlInfo.addFormulaCalculo = function () {
            var requestResponse = InformacionAdicionalServices.addFormulaCalculo(ctlInfo.modalFormulaCalculo);
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                ctlInfo.SearchFormulasCalculos(ctlInfo.modalFormulaCalculo.metasId, ctlInfo.meta)
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
        ctlInfo.deleteFormulaCalculo = function (id, $index) {
            ctlInfo.listFormulasCalculos.splice($index, 1);
            var requestResponse = InformacionAdicionalServices.deleteFormulaCalculo(id);
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }, function errorCallback(response) {
                    swal({
                        title: 'Error!',
                        text: 'Error',
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                });
            });
        }
        ctlInfo.updateVentanaModal = function (formulacalculo) {
            $('.modal ').insertAfter($('body'));
            ctlInfo.modalUpdateFormulaCalculo.FormulaCalculo = formulacalculo.FormulaCalculo;
            ctlInfo.modalUpdateFormulaCalculo.LineaBase = formulacalculo.LineaBase;
            ctlInfo.modalUpdateFormulaCalculo.metasId = formulacalculo.metasId;
            ctlInfo.modalUpdateFormulaCalculo.id = formulacalculo.id;
            ctlInfo.modalUpdateFormulaCalculo.MetodoEvaluacion =  formulacalculo.MetodoEvaluacion;
        }
        ctlInfo.updateFormulaCalculo = function () {
            var requestResponse = InformacionAdicionalServices.updateFormulaCalculo(ctlInfo.modalUpdateFormulaCalculo);
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                ctlInfo.SearchFormulasCalculos(ctlInfo.modalUpdateFormulaCalculo.metasId, ctlInfo.meta)
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

