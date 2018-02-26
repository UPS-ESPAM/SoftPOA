
angular.module('appGestion')
    .directive('fileModel', ['$parse', function ($parse,$scope) {
        return {
            restrict: 'A',
            link: function (scope, iElement, iAttrs) {
                iElement.on("change", function (e) {
                    $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                });
            }
        };
    }])