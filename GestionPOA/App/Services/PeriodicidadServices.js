angular.module('appGestion')
    .factory('PeriodicidadServices', ['$http', function ($http) {
        var fact = {};

        fact.getPeriocidad = function () {
            return $http.get('../Periocidades/GetPeriocidades');
        }

        fact.getTipoPlanificacion = function () {
            return $http.get('../Periocidades/GetTipoPlanificacion');
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
        fact.addPlanificacion = function (idtipoplanificacion, idperiocidad) {
            var request = $http({
                method: 'POST',
                url: '../Planificacions/Create',
                data: { 'idtipoplanificacion': idtipoplanificacion, 'idperiocidad': idperiocidad },
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);