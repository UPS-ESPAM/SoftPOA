angular.module('appGestion')
    .factory('PeriodosServices', ['$http', function ($http) {
        var fact = {};

        //fact.getCountAlert = function () {
        //    var request = $http({
        //        method: 'GET',
        //        url: '../Alertas/getCountAlert',
        //        dataType: "json"
        //    });
        //    return request;
        //}


        return fact;
    }]);