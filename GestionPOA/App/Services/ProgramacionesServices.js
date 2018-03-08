angular.module('appGestion')
    .factory('ProgramacionesServices', ['$http', function ($http) {
        var fact = {};

        fact.getCumplimiento = function (idmeta) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/getCumplimiento',
                data: { 'idmeta': idmeta },
                dataType: "json"
            });
            return request;
        }

        fact.getObservacion = function (metaid, id) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/getObservacion',
                data: { 'metaid': metaid, 'id': id },
                dataType: "json"
            });
            return request;
        }
        fact.updateProgramacionesPEDI = function (programacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePEDI',
                data: programacion,
                dataType: "json"
            });
            return request;
        }

        fact.updateEjecucionPEDI = function (programacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/EjecucionUpdatePEDI',
                data: programacion,
                dataType: "json"
            });
            return request;
        }

        fact.getTrismetrePlanificiacion = function (idmeta, id) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/planificacion',
                data: { 'idmeta': idmeta, 'id': id },
                dataType: "json"
            });
            return request;
        }

        fact.updateProgramacionesPOA = function (programacion, id, valor) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePOA',
                data: { 'programacion': programacion, 'id': id, 'valor': valor },
                dataType: "json"
            });
            return request;
        }
        fact.updatePresupuesto = function ( MetasID, presupuesto) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/UpdatePresupuesto',
                data: { 'MetasID': MetasID, 'presupuesto': presupuesto  },
                dataType: "json"
            });
            return request;
        }
        fact.updateEjecucionPOA = function (id, MetasID, valor, observacion) {
            var request = $http({
                method: 'POST',
                url: '../Programacions/EjecucionUpdatePOA',
                data: { 'id': id, 'MetasID': MetasID, 'valor': valor, 'observacion': observacion },
                dataType: "json"
            });
            return request;
        }
        return fact;
    }]);