angular.module('appGestion')
    .factory('DepartamentosServices', ['$http', function ($http) {
        var fact = {};

        fact.getDepartamentos = function () {
            return $http.get(getBaseUrl() +'/Departamentoes/Departamentos');
        }
        return fact;
    }]);