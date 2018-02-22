angular.module('appGestion')
    .factory('ProgramacionesServices', ['$http', function ($http) {
        var fact = {};
        
        fact.updateProgramaciones = function (programacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/Update',
                data: programacion,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);