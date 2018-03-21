angular.module('appGestion')
    .factory('LoginServices', ['$http', '$cookies', '$cookieStore','$location', function ($http, $cookies,$cookieStore,$location) {
        var fact = {};
    
        fact.verifysLogin = function (user, password) {
            var request = $http({
                method: 'POST',
                url: '../Admin/Logearse/',
                dataType: "json",
                data: { 'usuario': user,'password': password}
            });
            return request;
        }
        fact.POAorPEDI = function (singIN) {
            var request = $http({
                method: 'POST',
                url: '../Admin/POAorPEDI/',
                dataType: "json",
                data: { 'singIN': singIN }
            });
            return request;
        }
        
        fact.logout = function () {
            var request = $http({
                method: 'POST',
                url: '../Admin/Logout/',
                dataType: "json"
            });
            return request;
        }

        fact.checkStatus = function () {
            if ($cookies.rol != 'Administrador') {
                var rutasPrivadas = ["/Subsistema", "/Periodicidad","/Planificacion/Alertas", "/Metas/Informacion/Adicional","/Metas/Asignacion","/Objetivo/Estrategico", "/Objetivo/Estrategico/Ejecucion", "/Objetivo/Especifico","/Objetivo/Especifico/Asignacion"];
            }
            if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.username) == "undefined") {
                $location.path("/");
            }
            if (this.in_array("/login", rutasPrivadas) && typeof ($cookies.username) != "undefined") {
                $location.path("/");
            }
        }
        fact.in_array = function (needle, haystack) {
            var key = '';
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
        
        return fact;
    }]);