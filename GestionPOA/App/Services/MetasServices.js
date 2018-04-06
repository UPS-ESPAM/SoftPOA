angular.module('appGestion')
    .factory('MetasServices', ['$http', function ($http) {
        var fact = {};
        
        fact.getMetas = function () {
            return $http.get(getBaseUrl() +'/Metas/Metas');
        }

        fact.getMetasObservacion = function (id) {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Metas/Observacion/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getDetalleMeta = function (id) {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Metas/MetaDetalle/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.updateObservacionMeta= function (id, observacion) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Metas/ObservacionUpdate/',
                data: {'id':id, 'observacion':observacion},
                dataType: "json"
            });
            return request;
        }

        fact.getMetasProgramacion = function () {
            return $http.get(getBaseUrl() +'/Metas/Programacion');
        }

        fact.getMetasbyIndicador = function (id) {
            var request = $http({
                method: 'GET',
                url: getBaseUrl() + '/Metas/MetasbyIndicador/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addMetas = function (metas) {
            debugger
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Metas/Create',
                data: metas,
                dataType: "json"
            });
            return request;
        }

        fact.updateMetas = function (id, descripcion, tipo) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Metas/Update',
                data: { 'id': id, 'descripcion': descripcion, 'idtipo': tipo},
                dataType: "json"
            });
            return request;
        }

        fact.deleteMetas = function (id) {
            var request = $http({
                method: 'POST',
                url: getBaseUrl() + '/Metas/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getMetasEjecucion = function () {
            return $http.get(getBaseUrl() +'/Metas/Ejecucion');
        }

        fact.getMetasEjecucionPEDI = function () {
            return $http.get(getBaseUrl() +'/Metas/EjecucionPEDI');
        }

        fact.getMetasPlanificacion = function () {
            return $http.get(getBaseUrl() +'/Metas/MetasPlanificacion');
        }
        return fact;
    }]);