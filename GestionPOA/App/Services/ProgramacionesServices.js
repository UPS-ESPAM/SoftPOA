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

        fact.updateProgramacionesPOA = function (programacion, id, valor) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePOA',
                data: { 'programacion': programacion, 'id': id, 'valor': valor },
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);