angular.module('appGestion')
    .factory('MetasServices', ['$http', function ($http) {
        var fact = {};
        
        fact.getMetas = function () {
            return $http.get('../Metas/Metas');
        }

        fact.getDetalleMeta = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Metas/MetaDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getMetasProgramacion = function () {
            return $http.get('../Metas/Programacion');
        }

        return fact;
    }]);