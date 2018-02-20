
angular
  .module('appGestion', [
      'ngRoute',
      'ngAnimate',
      'ngTouch',
      'ngTable',
      'ngCookies'
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
              controller: 'SubsistemasController'
          })
          .when('/Objetivo/Especifico', {
              templateUrl: '../../App/Views/objetivoespecificos/index.html',
              controller: 'ObjetivosEspecificosController'
          })
          .when('/Planificacion', {
              templateUrl: '../../App/Views/planificacion/index.html',
              controller: 'PlanificacionController'
          })
          .when('/Estrategia/Indicadores', {
              templateUrl: '../../App/Views/indicadores/index.html',
              controller: 'IndicadoresController'
          })
          .when('/Metas/Acciones', {
              templateUrl: '../../App/Views/acciones/index.html',
              controller: 'AccionesController'
          })
        .otherwise({
          redirectTo: '/'
        });
  });
