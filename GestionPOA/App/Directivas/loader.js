(function () {
    'use strict';
    angular
        .module('appGestion')
        .directive('loader', loader);

    /**
     * Defines loading spinner behaviour
     *
     * @param {obj} $http
     * @returns {{restrict: string, link: Function}}
     */
    function loader($http) {
        return {
            restrict: 'A',
            template: 'Cargando &nbsp;&nbsp; &nbsp;&nbsp;<img src="/Content/img/ajax-loader.gif" style="height:25px; width:25px;" />',
            link: function (scope, element, attributes) {
                scope.$watch(function () {
                    return $http.pendingRequests.length;
                }, function (isLoading) {
                    if (isLoading) {
                        $(element).show();
                    } else {
                        $(element).hide();
                    }
                });
            }
        };
    }
})();