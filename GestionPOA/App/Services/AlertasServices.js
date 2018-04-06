angular.module('appGestion')
    .factory('AlertasServices', ['$http', function ($http) {
        var fact = {};

        fact.getCountAlert = function () {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Alertas/getCountAlert',
                dataType: "json"
            });
            return request;
        }
        fact.getAlertas = function () {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Alertas/getAlertas',
                dataType: "json"
            });
            return request;
        }

        fact.readAlertas = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Alertas/ReadAlert',
                data: { 'id': id },
                dataType: "json"
            });
            return request;
        }
       
        return fact;
    }]);