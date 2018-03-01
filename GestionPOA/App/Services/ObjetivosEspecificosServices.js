angular.module('appGestion')
    .factory('ObjetivosEspecificosServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEspecificos = function () {
            return $http.get('../ObjetivosEspecificos/getObjetivosEspecificos');
        }

        fact.getObjetivosEspecificosPeriodoActual = function (id) {
            return $http.get('../ObjetivosEspecificos/getObjetivosEspecificosbyObjEstrategicoPeriodoActual/'+id);
        }

        fact.addObjetivosEspecificos = function (objetivosEspecificos) {
            var request = $http({
                method: 'POST',
                url: '../ObjetivosEspecificos/Create',
                data: objetivosEspecificos,
                dataType: "json"
            });
            return request;
        }

        fact.updateObjetivosEspecificos = function (objetivosEspecificos) {
            var request = $http({
                method: 'POST',
                url: '../ObjetivosEspecificos/Update',
                data: objetivosEspecificos,
                dataType: "json"
            });
            return request;
        }

        fact.deleteObjetivosEspecificos = function (id) {
            var request = $http({
                method: 'POST',
                url: '../ObjetivosEspecificos/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);