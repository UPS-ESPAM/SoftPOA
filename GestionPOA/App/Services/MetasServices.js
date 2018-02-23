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

        fact.updateMetas = function (indicadores) {
            var request = $http({
                method: 'POST',
                url: '../Metas/Update',
                data: indicadores,
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

        return fact;
    }]);