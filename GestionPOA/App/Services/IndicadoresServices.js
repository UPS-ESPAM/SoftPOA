angular.module('appGestion')
    .factory('IndicadoresServices', ['$http', function ($http) {
        var fact = {};

        fact.getEstrategias = function () {
            return $http.get(getBaseUrl() +'/Indicadores/Estrategias');
        }

        fact.getIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Indicadores/Indicadores/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getEstrategiaDetalle = function (id) {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Indicadores/EstrategiaDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Indicadores/Create',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.updateIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Indicadores/Update',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.deleteIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Indicadores/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getIndicadoresByDepartamento = function () {            
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Indicadores/GetIndicadoresbyDepartament',
                dataType: "json"
            });
            return request;
        }

        fact.getIndicadorDetalle = function (id) {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Indicadores/IndicadorDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);