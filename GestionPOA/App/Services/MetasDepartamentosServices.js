angular.module('appGestion')
    .factory('MetasDepartamentosServices', ['$http', function ($http) {
        var fact = {};

        fact.getMetasDepartamentos = function () {
            return $http.get('../MetasDepartamentoes/MetasAsignadas');
        }       

        fact.addMetasDepartamentos = function (metaid, departamentoid) {
            debugger
            var request = $http({
                method: 'POST',
                url: '../MetasDepartamentoes/Create',
                data: { '_MetasId': metaid, '_DepartamentoID': departamentoid },
                dataType: "json"
            });
            return request;
        }


        fact.updateMetasDepartamentos = function (id, metaid) {
            var request = $http({
                method: 'POST',
                url: '../MetasDepartamentoes/Update',
                data: { 'id': id, '_MetasId': metaid },
                dataType: "json"
            });
            return request;
        }


        fact.deleteMetasDepartamentos = function (id) {
            var request = $http({
                method: 'POST',
                url: '../MetasDepartamentoes/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        return fact;
    }]);