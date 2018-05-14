angular.module('appGestion')
    .factory('PeriodicidadServices', ['$http', function ($http) {
        var fact = {};

        fact.getPeriocidad = function () {
            return $http.get(getBaseUrl() +'/Periocidades/GetPeriocidades');
        }

        fact.getTipoPlanificacion = function () {
            return $http.get(getBaseUrl() +'/Periocidades/GetTipoPlanificacion');
        }
        fact.addPeriocidad = function (periodo) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Periocidades/Create',
                data: { 'periodo': periodo},
                dataType: "json"
            });
            return request;
        }
        fact.UpdateEstado = function (estado) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() +'/Periocidades/UpdateEstado',
                data: { 'estado': estado },
                dataType: "json"
            });
            return request;
        }
        fact.addPlanificacion = function () {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() +'/Planificacions/Create',
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);