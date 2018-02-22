angular.module('appGestion')
    .directive('decimalOnly', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                var validateNumber = function (inputValue) {
                    var maxLength = 11;
                    if (attrs.max) {
                        maxLength = attrs.max;
                    }
                    if (inputValue === undefined) {
                        return '';
                    }
                    var transformedInput = inputValue.replace(/[a-zA-Z áéíóúÁÉÍÓÚñÑ]|\./g, '');
                    if (transformedInput !== inputValue) {
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();

                        $.notify({
                            icon: "notifications",
                            message: "<b>Error: </b> Solo"
                        }, {
                                type: 'danger',
                                timer: 10,
                                placement: {
                                    from: 'top',
                                    align: 'right'
                                }
                            });

                    }
                    if (transformedInput.length > maxLength) {
                        transformedInput = transformedInput.substring(0, maxLength);
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();
                    }
                    var isNotEmpty = (transformedInput.length === 0) ? true : false;
                    ctrl.$setValidity('notEmpty', isNotEmpty);
                    return transformedInput;
                };

                ctrl.$parsers.unshift(validateNumber);
                ctrl.$parsers.push(validateNumber);
                attrs.$observe('notEmpty', function () {
                    validateNumber(ctrl.$viewValue);
                });
            }
        };
    });