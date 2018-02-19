angular.module('appGestion')
    .factory('LoginServices', ['$http', function ($http, $cookies,$cookieStore) {
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
        
        fact.logout = function () {
            var request = $http({
                method: 'POST',
                url: '../Admin/Logout/',
                dataType: "json"
            });
            return request;
        }
        
        return fact;
    }]);