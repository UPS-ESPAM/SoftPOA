angular.module('appGestion')
    .factory('ProgramacionesServices', ['$http', function ($http) {
        var fact = {};
        
        fact.updateProgramacionesPEDI = function (programacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePEDI',
                data: programacion,
                dataType: "json"
            });
            return request;
        }

        fact.updateEjecucionPEDI = function (programacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/EjecucionUpdatePEDI',
                data: programacion,
                dataType: "json"
            });
            return request;
        }

        fact.updateProgramacionesPOA = function (programacion, id, valor) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePOA',
                data: { 'programacion': programacion, 'id': id, 'valor': valor },
                dataType: "json"
            });
            return request;
        }

        fact.updateEjecucionPOA = function (programacion, id, valor) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/EjecucionUpdatePOA',
                data: { 'programacion': programacion, 'id': id, 'valor': valor },
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);