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

        fact.getMetasbyIndicador = function (id) {
            var request = $http({
                method: 'GET',
                url: '../Metas/MetasbyIndicador/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.addMetas = function (metas) {
            debugger
            var request = $http({
                method: 'POST',
                url: '../Metas/Create',
                data: metas,
                dataType: "json"
            });
            return request;
        }

        fact.updateMetas = function (id, descripcion, tipo) {
            var request = $http({
                method: 'POST',
                url: '../Metas/Update',
                data: { 'id': id, 'descripcion': descripcion, 'idtipo': tipo},
                dataType: "json"
            });
            return request;
        }

        fact.deleteMetas = function (id) {
            var request = $http({
                method: 'POST',
                url: '../Metas/Delete/' + id,
                dataType: "json"
            });
            return request;
        }

        fact.getMetasEjecucion = function () {
            return $http.get('../Metas/Ejecucion');
        }

        fact.getMetasPlanificacion = function () {
            return $http.get('../Metas/MetasPlanificacion');
        }



        return fact;
    }]);