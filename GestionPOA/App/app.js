
angular
  .module('appGestion', [
      'ngRoute',
      'ngAnimate',
      'ngTouch',
      'ngTable',
      'ngCookies',
      'pusher-angular',
      'ui.utils.masks'
  ])

  .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
              controller: 'LoginController'
          })
          .when('/Subsistema', {
              templateUrl: getBaseUrl()  +'/App/Views/subsistema/index.html',
            controller: 'SubsistemasController'
          })
          .when('/Objetivo/Estrategico', {
              templateUrl: getBaseUrl() +'/App/Views/objetivosestrategicos/index.html',
              controller: 'ObjetivosEstrategicosController'
          })
          .when('/Objetivo/Estrategico/Ejecucion', {
              templateUrl: getBaseUrl() +'/App/Views/objetivosestrategicos/ejecucion.html',
              controller: 'CumplimientoOEstrategicoController'
          })
          .when('/Objetivo/Especifico', {
              templateUrl: getBaseUrl() +'/App/Views/objetivoespecificos/index.html',
              controller: 'ObjetivosEspecificosController'
          })
          .when('/Objetivo/Especifico/Asignacion', {
              templateUrl: getBaseUrl() +'/App/Views/objetivoespecificos/asignacion.html',
              controller: 'ObjetivosEspecificosController'
          })
          .when('/Planificacion/Estrategia', {
              templateUrl: getBaseUrl() +'/App/Views/estrategias/index.html',
              controller: 'EstrategiasController'
          })
          .when('/Estrategia/Indicadores', {
              templateUrl: getBaseUrl() +'/App/Views/indicadores/index.html',
              controller: 'IndicadoresController'
          })
          .when('/Metas/Acciones', {
              templateUrl: getBaseUrl() +'/App/Views/acciones/index.html',
              controller: 'AccionesController'
          })
          .when('/Metas/Planificacion', {
              templateUrl: getBaseUrl() +'/App/Views/metas/index.html',
              controller: 'MetasController'
          })
          .when('/Metas/Ejecucion', {
              templateUrl: getBaseUrl() +'/App/Views/metas/ejecucion.html',
              controller: 'MetasController'
          })
          .when('/Metas/Nuevo', {
              templateUrl: getBaseUrl() +'/App/Views/metas/nuevo.html',
              controller: 'MetasController'
          })
          .when('/Metas/Asignacion', {
              templateUrl: getBaseUrl() +'/App/Views/metas/asignacion.html',
              controller: 'MetasController'
          })
          .when('/Metas/PEDI', {
              templateUrl: getBaseUrl() +'/App/Views/metas/pedi.html',
              controller: 'MetasController'
          })
          .when('/Metas/Informacion/Adicional', {
              templateUrl: getBaseUrl() +'/App/Views/informacion/index.html',
              controller: 'InformacionAdicionalController'
          })
          .when('/Periodicidad', {
              templateUrl: getBaseUrl() +'/App/Views/periodicidad/index.html',
              controller: 'PeriodicidadController'
          })
          .when('/Periodo', {
              templateUrl: '../../App/Views/periodo/index.html',
              controller: 'PeriodosController'
          })
          .when('/Planificacion/Alertas', {
              templateUrl: getBaseUrl() +'/App/Views/alertas/index.html',
              controller: 'AlertasController'
          })
        .otherwise({
          redirectTo: '/'
        });
  });
