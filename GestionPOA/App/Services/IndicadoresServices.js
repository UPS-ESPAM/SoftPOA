angular.module('appGestion')
    .factory('IndicadoresServices', ['$http', function ($http) {
        var fact = {};

        fact.getEstrategias = function () {
            return $http.get('Indicadores/Estrategias');
        }

        fact.getIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: 'Indicadores/Indicadores/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: 'Indicadores/Create',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.updateIndicadores = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: 'Indicadores/Update',
                data: indicadores,
                dataType: "json"
            });
            return request;
        }

        fact.deleteIndicadores = function (id) {
            var request = $http({
                method: 'POST',
                url: 'Indicadores/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);