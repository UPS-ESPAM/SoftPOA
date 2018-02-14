angular.module('appGestion')
    .controller('IndicadoresController', function ($scope, NgTableParams) {
        var demo = this;
        demo.data = [
            { uid: 'User 11', name: 'Name 11', area: 'Area 1' },
            { uid: 'User 12', name: 'Name 12', area: 'Area 1' },
            { uid: 'User 21', name: 'Name 21', area: 'Area 2' },
            { uid: 'User 22', name: 'Name 22', area: 'Area 2' }
        ];

        demo.tableParams = new NgTableParams({
            // initial grouping
            group: "area"
        }, {
                dataset: demo.data
            });
    });
