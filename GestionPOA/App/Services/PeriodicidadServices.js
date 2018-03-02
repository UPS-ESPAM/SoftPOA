angular.module('appGestion')
    .factory('PeriodicidadServices', ['$http', function ($http) {
        var fact = {};

        fact.getPeriocidad = function () {
            return $http.get('../Periocidades/GetPeriocidades');
        }
       
        fact.addPeriocidad = function (periodo) {
            var request = $http({
                method: 'POST',
                url: '../Periocidades/Create',
                data: { 'periodo': periodo},
                dataType: "json"
            });
            return request;
        }

        //fact.updateSubsistemas = function (subsistema) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Subsistemas/Update',
        //        data: subsistema,
        //        dataType: "json"
        //    });
        //    return request;
        //}

        //fact.deleteSubsistemas = function (id) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Subsistemas/Delete/' + id,
        //        dataType: "json"
        //    });
        //    return request;
        //}

        return fact;
    }]);