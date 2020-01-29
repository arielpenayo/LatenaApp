(function() {
    'use strict';

    angular
        .module('latena')
        .controller('loginCtrl', loginCtrl)


    loginCtrl.$inject = ['dataService', 'toastr', '$uibModal', '$state', '$auth','md5', '$filter'];

    function loginCtrl(dataService, toastr, $uibModal, $state, $auth, md5, $filter) {

        var vm = this;
        vm.dataLoading;
        vm.user = {};

        vm.userFields = [{
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: '',
                    placeholder:'correo',
                    required: true
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: '',
                    placeholder: 'contrass',
                    required: true
                }
            }
          
        ];

        vm.login = function(user) {

            var userCopy = angular.copy(user);
            var hash = md5.createHash(userCopy.password);
            userCopy.password = hash;

            //console.log('user: ', user);

            $auth.login(userCopy, {method: 'POST',headers: {'Content-Type': 'application/json'}})
            .then(function (token) {
                // console.log('then',token);
                $auth.setToken(token)
                console.log('Payload: ',$auth.getPayload());
                $state.go('home');
                toastr.success('Usuario logueado', 'Login');
            })
            .catch(function (response) {
                if(response.data === null) {
                    toastr.error('Error de conexion', 'Aviso');
                } else {
                    toastr.error(response.data.message, 'Aviso');
                }
            });
            

        }


    }
})();