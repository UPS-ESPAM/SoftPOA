angular.module('appGestion')
    .factory('MetasServices', ['$http', function ($http) {
        var fact = {};
        
        fact.getMetas = function () {
            return $http.get('../Metas/Metas');
        }

        fact.getMetasObservacion = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Metas/Observacion/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getDetalleMeta = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Metas/MetaDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.updateObservacionMeta= function (id, observacion) {
            var request = $http({
                method: 'POST',
                url: '../Metas/ObservacionUpdate/',
                data: {'id':id, 'observacion':observacion},
                dataType: "json"
            });
            return request;
        }

        fact.getMetasProgramacion = function () {
            return $http.get('../Metas/Programacion');
        }

        fact.getMetasEjecucion = function () {
            return $http.get('../Metas/Ejecucion');
        }

        return fact;
    }]);