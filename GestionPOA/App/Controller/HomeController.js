angular.module('appGestion')
    .controller('HomeController', function (AlertasServices, $pusher) {
        var vn = this;
        countAlertas();
        function countAlertas() {
            AlertasServices.getCountAlert().then(function (response) {
                vn.alertsCounts = response.data.alertsCounts;
            })
        }

        var client = new Pusher('2d3d0104ac56bd6b98b9', {
            cluster: 'us2',
            encrypted: true
        });
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('my-channel');
        my_channel.bind('my-event', function (data) {
            vn.alertsCounts = data.message;
        });


    });