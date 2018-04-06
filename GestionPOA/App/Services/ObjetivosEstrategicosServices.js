angular.module('appGestion')
    .factory('ObjetivosEstrategicosServices', ['$http', function ($http) {
        var fact = {};

        fact.getObjetivosEstrategicos = function () {
            return $http.get(getBaseUrl() +'/ObjetivosEstrategicos/GetObjetivosEstrategicos');
        }
        fact.getCumplimintnoOEstrategicos = function () {
            return $http.get(getBaseUrl() +'/ObjetivosEstrategicos/GetCumplimientoObjetivosEstrategicos');
        }
        fact.getObjetivosEstrategicosBySubSistema = function (id) {
            return $http.get(getBaseUrl() +'/ObjetivosEstrategicos/GetObjetivosEstrategicosPeriodoActual/'+id);
        }
 
        fact.addObjetivoEstrategico = function (ObjetivoEstrategico) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/ObjetivosEstrategicos/Create',
                data: ObjetivoEstrategico,
                dataType: "json"
            });
            return request;
        }

        fact.updateObjetivoEstrategico = function (ObjetivoEstrategico) {
            
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/ObjetivosEstrategicos/Update',
                data: ObjetivoEstrategico,
                dataType: "json"
            });
            return request;
        }

        fact.deleteObjetivosEstrategicos = function (id) {
            debugger
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/ObjetivosEstrategicos/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);