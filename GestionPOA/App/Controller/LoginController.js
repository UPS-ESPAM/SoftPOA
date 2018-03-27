angular.module('appGestion')
    .controller('LoginController', function (LoginServices, $cookies, $location, PeriodicidadServices) {
        var vm = this;
        vm.login = {};  
        cargarPeriocidad();
        vm.arrOption = [];
        cargarTipoPlanificacion();
        vm.arrOptionTP = [];
        $cookies.deparmentID = $("#myDivDepartmentID").data('value');
        $cookies.rol = $("#myDivDepartmentID").data('strol');
        $cookies.status = $("#status").data('status');
        vm.rol = $cookies.rol;
        vm.status = $cookies.status;
        vm.verifylogin = function () {
            var requestResponse = LoginServices.verifysLogin(vm.login.usuario, vm.login.password);
            requestResponse.then(function successCallback(response) {
                if ((response.data.rol == "Existe") && (response.data.tipo == 'Usuario')){
                    window.location.href = '/Admin/Index';
                } else if ((response.data.rol == "Existe") && (response.data.tipo == 'Administrador')) {
                    $("#myModalPOAPEDI").modal("show");
                } else if ((response.data.rol == "No Existe") && (response.data.tipo == 'Administrador')) {
                    debugger
                    window.location.href = '/Admin/Index';
                }else {
                    $("#myModalss").modal("show");
                }
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
        function cargarPeriocidad() {
            PeriodicidadServices.getPeriocidad().then(function (d) {
                vm.arrOption = [];
                angular.forEach(d.data.listperiocidiades, function (value, key) {
                    vm.arrOption.push(value);
                });
            })
        }
        function cargarTipoPlanificacion() {
            PeriodicidadServices.getTipoPlanificacion().then(function (d) {
                vm.arrOptionTP = [];
                angular.forEach(d.data.listTipoPlanificacion, function (value, key) {
                    vm.arrOptionTP.push(value);
                });
            })
        }
        vm.logout = function () {
            var requestResponse = LoginServices.logout();
            requestResponse.then(function successCallback(response) {
                $cookies.remove('deparmentID');
                $cookies.remove('rol');
                window.location.href = '/';
            });
        }
        vm.registerPlanificacion = function () {
            var requestResponse = PeriodicidadServices.addPlanificacion(vm.TipoPlanificacion, vm.Planificacionperiodo);
            requestResponse.then(function successCallback(response) {
                window.location.href = '/Admin/Index';
                swal({
                      title: 'Correcto!',
                      text: response.data.mensaje,
                      type: 'success',
                      confirmButtonClass: "btn btn-success",
                      buttonsStyling: false
                });
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: 'Error',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
        }
        vm.SingInToPOAorPedi = function () {
            var requestResponse = LoginServices.POAorPEDI(vm.POAorPEDi);
            requestResponse.then(function successCallback(response) {
                window.location.href = '/Admin/Index';
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: response.data.msj,
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
        }
    })
    .run(function ($rootScope, LoginServices, $location) {
        $rootScope.$on('$routeChangeStart', function () {
            LoginServices.checkStatus();
        })
    });
