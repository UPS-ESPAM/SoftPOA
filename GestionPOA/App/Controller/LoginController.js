angular.module('appGestion')
    .controller('LoginController', function (LoginServices, $cookies) {
        var vm = this;
        vm.login = {};
        $cookies.username = $("#myDivUser").data('value');
        vm.verifylogin = function () {
            var requestResponse = LoginServices.verifysLogin(vm.login.usuario, vm.login.password);
            requestResponse.then(function successCallback(response) {
                window.location.href = '/Admin/Index'; 
            }, function errorCallback(error) {
                $.notify({
                    icon: "notifications",
                    message: "<b>Error: </b>" + error.statusText
                }, {
                     type: 'danger',
                     timer: 3000,
                     placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
            });
        }

        vm.logout = function () {
            var requestResponse = LoginServices.logout();
            requestResponse.then(function successCallback(response) {
                $cookies.remove('username');
                window.location.href = '/';
            });
        }

    });
