angular.module('appGestion')
    .factory('SubsistemasServices', ['$http', function ($http) {
        var fact = {};

        fact.getSubsistemas = function () {
            return $http.get(getBaseUrl() +'/Subsistemas/GetSubsistema');
        }
        fact.getSubsistemasPeriodo = function () {
            return $http.get(getBaseUrl() +'/Subsistemas/GetSubsistemaPeriodoActual');
        }
        fact.addSubsistemas = function (subsistema) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Subsistemas/Create',
                data: subsistema,
                dataType: "json"
            });
            return request;  
        }

        fact.updateSubsistemas = function (subsistema) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Subsistemas/Update',
                data: subsistema,
                dataType: "json"
            });
            return request;
        }

        fact.deleteSubsistemas = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Subsistemas/Delete/'+id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);