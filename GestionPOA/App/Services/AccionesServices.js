angular.module('appGestion')
    .factory('AccionesServices', ['$http', function ($http) {
        var fact = {};
        
        fact.getAcciones = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Acciones/Acciones/' + id,
                dataType: "json"
            });
            return request;
        }
        
        fact.addAcciones = function (accion) {
            var request = $http({
                method: 'POST',
                url: '../Acciones/Create',
                data: accion,
                dataType: "json"
            });
            return request;
        }

        fact.updateAcciones = function (accion) {
            var request = $http({
                method: 'POST',
                url: '../Acciones/Update',
                data: accion,
                dataType: "json"
            });
            return request;
        }

        fact.deleteAcciones = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Acciones/Delete/' + id,
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);