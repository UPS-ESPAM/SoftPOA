angular.module('appGestion')
    .factory('EstrategiasServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEspecificosAsignados = function () {
            return $http.get('../ObjetivosEspecificos/getObjetivosEspecificosByDepartamento');
        }

        fact.getEstrategias = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Indicadores/Indicadores/' + id,
                dataType: "json"
            });
            return request;
        }

        //fact.addIndicadores = function (indicadores) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Indicadores/Create',
        //        data: indicadores,
        //        dataType: "json"
        //    });
        //    return request;
        //}

        //fact.updateIndicadores = function (indicadores) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Indicadores/Update',
        //        data: indicadores,
        //        dataType: "json"
        //    });
        //    return request;
        //}

        //fact.deleteIndicadores = function (id) {
        //    var request = $http({
        //        method: 'POST',
        //        url: '../Indicadores/Delete/' + id,
        //        dataType: "json"
        //    });
        //    return request;
        //}
        return fact;
    }]);