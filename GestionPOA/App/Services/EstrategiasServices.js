angular.module('appGestion')
    .factory('EstrategiasServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEspecificosAsignados = function () {
            return $http.get('../ObjetivosEspecificos/getObjetivosEspecificosByDepartamento');
        }

        fact.getOEstrategiasPeriodoActual = function (id) {
            return $http.get('../Estrategias/GetEstrategiasbyObjetivoPeriodoActual/'+id);
        }

        fact.getEstrategias = function (id) {
                
            var request = $http({
                method: 'POST',
                url: '../Estrategias/GetEstrategiasbyObjetivo/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addEstrategia = function (estrategia) {            
            var request = $http({
                method: 'POST',
                url: '../Estrategias/Create',
                data: estrategia,
                dataType: "json"
            });
            return request;
        }

        fact.updateEstrategia = function (estrategia) {
            var request = $http({
                method: 'POST',
                url: '../Estrategias/Update',
                data: estrategia,
                dataType: "json"
            });
            return request;
        }

        fact.deleteEstrategia = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Estrategias/Delete/' + id,
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);