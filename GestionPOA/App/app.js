﻿
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
          .when('/Metas/Nuevo', {
              templateUrl: '../../App/Views/metas/nuevo.html',
              controller: 'MetasController'
          })

        .otherwise({
          redirectTo: '/'
        });
  });
