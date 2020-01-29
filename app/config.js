(function(){
    'use strict';
    var env = {};
    angular
        .module('latena')
        .run(envConfig)
        .run(headerConfig)
        .run(formlyConfig)
        .constant('config', env);
        function envConfig() {
            if(window){  
                Object.assign(env, window.__env);
            }
        }
        function headerConfig($http) {
            $http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }
        function formlyConfig(formlyConfig) {
            formlyConfig.extras.removeChromeAutoComplete = true;
    
            // Configure custom types
            formlyConfig.setType({
            name: 'ui-select-single',
            extends: 'select',
            templateUrl: 'ui-select-single.html'
            });
        }

}());