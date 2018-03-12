angular.module('appGestion')
    .factory('AlertasServices', ['$http', function ($http) {
        var fact = {};

        //fact.getAcciones = function (id) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Acciones/Acciones/' + id,
        //        dataType: "json"
        //    });
        //    return request;
        }

       
        return fact;
    }]);