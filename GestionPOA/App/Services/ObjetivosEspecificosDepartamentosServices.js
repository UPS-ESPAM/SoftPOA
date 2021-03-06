﻿angular.module('appGestion')
    .factory('ObjetivosEspecificosDepartamentosServices', ['$http', function ($http) {
        var fact = {};
        fact.GetAsignacionObjetivosEspecificos= function () {
            return $http.get('../ObjeEspecificosDepartamentoes/GetAsignacionObjetivosEspecificos');
        }
        fact.addAsignacionObjetivosEspecificos = function (departamentoID, objetivoEspecificoID) {
            var request = $http({
                method: 'POST',
                url: '../ObjeEspecificosDepartamentoes/Create',
                data: { 'departamentoID': departamentoID, 'objetivoEspecificoID': objetivoEspecificoID},
                dataType: "json"
            });
            return request;
        }
        fact.updateAsignacionObjetivosEspecificos = function (id, objetivosEspecificosId) {
            var request = $http({
                method: 'POST',
                url: '../ObjeEspecificosDepartamentoes/Update',
                data: { 'id': id, 'objetivosEspecificosId': objetivosEspecificosId },
                dataType: "json"
            });
            return request;
        }
        fact.deleteAsignacionObjetivosEspecificos = function (id) {
            var request = $http({
                method: 'POST',
                url: '../ObjeEspecificosDepartamentoes/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);