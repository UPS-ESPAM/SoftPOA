angular.module('appGestion')
    .factory('ObjetivosEspecificosServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEspecificos = function () {
            return $http.get(getBaseUrl() +'/ObjetivosEspecificos/getObjetivosEspecificos');
        }

        fact.getObjetivosEspecificosPeriodoActual = function (id) {
            return $http.get(getBaseUrl() +'/ObjetivosEspecificos/getObjetivosEspecificosbyObjEstrategicoPeriodoActual/'+id);
        }

        fact.addObjetivosEspecificos = function (objetivosEspecificos) {
            var request = $http({
                method: 'POST',
               url: getBaseUrl() + '/ObjetivosEspecificos/Create',
                data: objetivosEspecificos,
                dataType: "json"
            });
            return request;
        }

        fact.updateObjetivosEspecificos = function (objetivosEspecificos) {
            var request = $http({
                method: 'POST',
               url: getBaseUrl() + '/ObjetivosEspecificos/Update',
                data: objetivosEspecificos,
                dataType: "json"
            });
            return request;
        }

        fact.deleteObjetivosEspecificos = function (id) {
            var request = $http({
                method: 'POST',
               url: getBaseUrl() + '/ObjetivosEspecificos/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);