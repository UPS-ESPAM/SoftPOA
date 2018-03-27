
angular
  .module('appGestion', [
      'ngRoute',
      'ngAnimate',
      'ngTouch',
      'ngTable',
      'ngCookies',
      'pusher-angular'
  ])

  .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
              controller: 'LoginController'
          })
          .when('/Subsistema', {
            templateUrl: '../../App/Views/subsistema/index.html',
            controller: 'SubsistemasController'
          })
          .when('/Objetivo/Estrategico', {
              templateUrl: '../../App/Views/objetivosestrategicos/index.html',
              controller: 'ObjetivosEstrategicosController'
          })
          .when('/Objetivo/Estrategico/Ejecucion', {
              templateUrl: '../../App/Views/objetivosestrategicos/ejecucion.html',
              controller: 'CumplimientoOEstrategicoController'
          })
          .when('/Objetivo/Especifico', {
              templateUrl: '../../App/Views/objetivoespecificos/index.html',
              controller: 'ObjetivosEspecificosController'
          })
          .when('/Objetivo/Especifico/Asignacion', {
              templateUrl: '../../App/Views/objetivoespecificos/asignacion.html',
              controller: 'ObjetivosEspecificosController'
          })
          .when('/Planificacion/Estrategia', {
              templateUrl: '../../App/Views/estrategias/index.html',
              controller: 'EstrategiasController'
          })
          .when('/Estrategia/Indicadores', {
              templateUrl: '../../App/Views/indicadores/index.html',
              controller: 'IndicadoresController'
          })
          .when('/Metas/Acciones', {
              templateUrl: '../../App/Views/acciones/index.html',
              controller: 'AccionesController'
          })
          .when('/Metas/Planificacion', {
              templateUrl: '../../App/Views/metas/index.html',
              controller: 'MetasController'
          })
          .when('/Metas/Ejecucion', {
              templateUrl: '../../App/Views/metas/ejecucion.html',
              controller: 'MetasController'
          })
          .when('/Metas/Nuevo', {
              templateUrl: '../../App/Views/metas/nuevo.html',
              controller: 'MetasController'
          })
          .when('/Metas/Asignacion', {
              templateUrl: '../../App/Views/metas/asignacion.html',
              controller: 'MetasController'
          })
          .when('/Metas/PEDI', {
              templateUrl: '../../App/Views/metas/pedi.html',
              controller: 'MetasController'
          })
          .when('/Metas/Informacion/Adicional', {
              templateUrl: '../../App/Views/informacion/index.html',
              controller: 'InformacionAdicionalController'
          })
          .when('/Periodicidad', {
              templateUrl: '../../App/Views/periodicidad/index.html',
              controller: 'PeriodicidadController'
          })
          .when('/Planificacion/Alertas', {
              templateUrl: '../../App/Views/alertas/index.html',
              controller: 'AlertasController'
          })
        .otherwise({
          redirectTo: '/'
        });
  });
