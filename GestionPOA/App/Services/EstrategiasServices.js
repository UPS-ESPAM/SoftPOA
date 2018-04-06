angular.module('appGestion')
    .factory('EstrategiasServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEspecificosAsignados = function () {
            return $http.get(getBaseUrl() +'/ObjetivosEspecificos/getObjetivosEspecificosByDepartamento');
        }

        fact.getOEstrategiasPeriodoActual = function (id) {
            return $http.get(getBaseUrl() +'/Estrategias/GetEstrategiasbyObjetivoPeriodoActual/'+id);
        }

        fact.getEstrategias = function (id) {
                
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Estrategias/GetEstrategiasbyObjetivo/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addEstrategia = function (estrategia) {            
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Estrategias/Create',
                data: estrategia,
                dataType: "json"
            });
            return request;
        }

        fact.updateEstrategia = function (estrategia) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Estrategias/Update',
                data: estrategia,
                dataType: "json"
            });
            return request;
        }

        fact.deleteEstrategia = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Estrategias/Delete/' + id,
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);