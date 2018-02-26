angular.module('appGestion')
    .service('EvidenciasServices', ['$http', "$q", function ($http, $q) {
        this.uploadFile = function (file, id, IntervaloID) {
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("id", id);
            formData.append("IntervaloID", IntervaloID);
            formData.append("file", file);
            return $http({
                method: 'POST',
                url: '../Evidencias/upload',
                dataType: "json",
                data: formData,
                headers: { "Content-type": undefined },
                transformRequest: angular.identity
            }).then(function successCallback(res) {
                deferred.resolve(res);
                return deferred.promise;
              
            }, function errorCallback(msg) {
                deferred.reject(msg);
                return deferred.promise;
               
            });
               
           // return deferred.promise;
        }	
    }]);