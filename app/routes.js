(function(){
    'use strict';

    angular
    .module('latena')
    .config(routeConfig)

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];//, 'config'

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/reports');

        $stateProvider
        // reports
        .state('reports', {
            url: '/reports',
            templateUrl: 'app/reports/reports.html',
            controller: 'reportsCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })
        //  // reports Ver
        //  .state('reports-ver', {
        //     url: '/reports-ver/:id',
        //     templateUrl: 'app/reports/reports-form.html',
        //     controller: 'reportsFormCtrl',
        //     controllerAs: 'vm',
        //     onEnter: function($rootScope) {
        //         $rootScope.isLogin = false;
        //     }
        // })
        .state('reports-registrar', {
            url: '/reports-registrar',
            templateUrl: 'app/reports/reports-form.html',
            controller: 'reportsFormCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })
        // Usuario
        .state('usuario', {
            url: '/usuario',
            templateUrl: 'app/usuario/usuario.html',
            controller: 'usuarioCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })

        .state('usuario-registrar', {
            url: '/usuario-registrar',
            templateUrl: 'app/usuario/usuario-form.html',
            controller: 'usuarioFormCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })
        .state('usuario-editar', {
            url: '/usuario-editar/:id',
            templateUrl: 'app/usuario/usuario-form.html',
            controller: 'usuarioFormCtrl',
            controllerAs: 'vm',
            onEnter: function($rootScope) {
                $rootScope.isLogin = false;
            }
        })
       
    }

}());