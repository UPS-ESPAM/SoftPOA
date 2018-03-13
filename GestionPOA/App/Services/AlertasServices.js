angular.module('appGestion')
    .factory('AlertasServices', ['$http', function ($http) {
        var fact = {};

        fact.getCountAlert = function () {
            var request = $http({
                method: 'GET',
                url: '../Alertas/getCountAlert',
                dataType: "json"
            });
            return request;
        }
        fact.getAlertas = function () {
            var request = $http({
                method: 'GET',
                url: '../Alertas/getAlertas',
                dataType: "json"
            });
            return request;
        }

        fact.readAlertas = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Alertas/ReadAlert',
                data: { 'id': id },
                dataType: "json"
            });
            return request;
        }
       
        return fact;
    }]);