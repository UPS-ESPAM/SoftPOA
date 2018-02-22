angular.module('appGestion')
    .factory('IntervalosServices', ['$http', function ($http) {
        var fact = {};

        fact.getIntervalos = function () {
            return $http.get('../Intervalos/Intervalos');
        }

       
        return fact;
    }]);