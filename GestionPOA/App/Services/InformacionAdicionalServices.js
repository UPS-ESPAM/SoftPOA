angular.module('appGestion')
    .factory('InformacionAdicionalServices', ['$http', function ($http) {
        var fact = {};

        fact.getFormulaCalculo = function (id) {
            return $http.get(getBaseUrl() +'/InformacionAdicionals/getInformacionAdicional/'+id);
        }

        fact.addFormulaCalculo = function (informacionadicional) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/InformacionAdicionals/Create',
                data: informacionadicional,
                dataType: "json"
            });
            return request;
        }

        fact.updateFormulaCalculo = function (informacionadicional) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/InformacionAdicionals/Update',
                data: informacionadicional,
                dataType: "json"
            });
            return request;
        }

        fact.deleteFormulaCalculo = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/InformacionAdicionals/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);