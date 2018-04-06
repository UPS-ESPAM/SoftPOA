angular.module('appGestion')
    .factory('PeriodosServices', ['$http', function ($http) {
        var fact = {};

        fact.addPeriodos = function (descripcion, inicio, fin) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Periodos/create',
                data: { 'descripcion': descripcion, 'inicio': inicio, 'fin': fin },
                dataType: "json"
            });
            return request;
        }
        fact.SelectPeriodos = function () {
            return $http.get(getBaseUrl() +'/Periodos/SelectPeriodos');
        }
        fact.getPeriodos = function () {
            return $http.get(getBaseUrl() +'/Periodos/getPeriodos');
        }
        fact.updatePeriodos = function (periodo) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Periodos/Update',
                data: periodo,
                dataType: "json"
            });
            return request;
        }

        fact.deletePeriodos = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Periodos/Delete/' + id,
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);