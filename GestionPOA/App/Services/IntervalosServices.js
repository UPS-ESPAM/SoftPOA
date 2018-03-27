angular.module('appGestion')
    .factory('IntervalosServices', ['$http', function ($http) {
        var fact = {};

        fact.getIntervalos = function () {
            return $http.get('../Intervalos/Intervalos');
        }
        fact.getIntervalosPEDI = function () {
            return $http.get('../Intervalos/IntervalosPEDI');
        }

        fact.getIntervalosPeriocidad = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Intervalos/GetIntervalos/' + id,
                dataType: "json"
            });
            return request;
        }
        fact.addIntervalos = function (intervalos) {
            var request = $http({
                method: 'POST',
                url: '../Intervalos/Create',
                data: intervalos,
                dataType: "json"
            });
            return request;
        }
        fact.updateIntervalos = function (id, orden, _intervalo) {
            var request = $http({
                method: 'POST',
                url: '../Intervalos/Update',
                data: { 'id': id, 'orden': orden, '_intervalo': _intervalo},
                dataType: "json"
            });
            return request;
        }
        fact.deleteIntervalos = function (id) {
            debugger
            var request = $http({
                method: 'POST',
                url: '../Intervalos/Delete',
                data: {'id': id},
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);