angular.module('appGestion')
    .factory('DepartamentosServices', ['$http', function ($http) {
        var fact = {};

        fact.getDepartamentos = function () {
            return $http.get('../Departamentoes/Departamentos');
        }
        return fact;
    }]);