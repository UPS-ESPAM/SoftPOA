angular.module('appGestion')
    .factory('IndicadoresServices', ['$http', function ($http) {
        var fact = {};

        fact.getEstrategias = function () {
            return $http.get('../Indicadores/Estrategias');
        }

        fact.getIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Indicadores/Indicadores/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getEstrategiaDetalle = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Indicadores/EstrategiaDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: '../Indicadores/Create',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.updateIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: '../Indicadores/Update',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.deleteIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Indicadores/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getIndicadoresByDepartamento = function () {            
            var request = $http({
                method: 'POST',
                url: '../Indicadores/GetIndicadoresbyDepartament',
                dataType: "json"
            });
            return request;
        }

        fact.getIndicadorDetalle = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Indicadores/IndicadorDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);