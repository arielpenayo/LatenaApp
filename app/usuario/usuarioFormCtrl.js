(function(){
    'use strict';

    angular
        .module('latena')
        .controller('usuarioFormCtrl', usuarioFormCtrl)

    usuarioFormCtrl.$inject = ['dataService', '$state', '$stateParams'];

    function usuarioFormCtrl(dataService, $state, $stateParams) {
        var vm = this;
        vm.usuario = {};
        
        // etc
        vm.dataSaving = false;
        vm.hide = true;
        vm.editMode = false;

        activate();

        vm.cancelar = function() {
            $state.go('usuario');
        }

        vm.grabar = function(usuario) {
            let data = {
                username: usuario.username,
                password: usuario.password,
                email: usuario.email,
                rol: usuario.rol,
            }

            if($stateParams.id) {
                // Editar
                dataService.update('users', $stateParams.id, data)
                .then(function(result) {
                    if(result.success) {
                        $state.go('usuario');
                    }
                })
                .catch(function(error) {
                    return error
                })
                .finally(function() {
                    vm.dataSaving = false;
                });
            } else {
                console.log('data :', data);
                // Registrar
                dataService.create('users', data)
                        .then(function(result) {
                            if (result.success) {
                                $state.go('usuario');
                            }
                        })
                        .catch(function(error) {
                            return error;
                        })
                        .finally(function() {
                            vm.dataSaving = false;
                        });
            }

        }
        // Buscar por Id para rellenar los campos
        function getById() {
            return dataService.findById('users', $stateParams.id)
            .then(function(result) {

                return result;
            })
            .finally(function() {
                vm.dataLoading = false;
            });
        }
    
        function activate() {
            // Verifica si esta en editar o registrar y oculta campos con el hideExpression
            if($state.current.name === 'usuario-editar') {
                vm.editMode = true;
            }
            
            vm.usuarioFields = [{
                className: 'row',
                fieldGroup: [
                    {
                        className: 'col-md-6',
                        key: "username",
                        type: "input",
                        templateOptions: {
                            type: "input",
                            label: "Nombre de Usuario",
                            placeholder: "Nombre de Usuario",
                            required: true
                        },
                        hideExpression: `${vm.editMode}`
                    },
                    {
                        className: 'col-md-6',
                        key: "email",
                        type: "input",
                        templateOptions: {
                            type: "input",
                            label: "Email",
                            notNull: true,
                            placeholder: "Email",
                            required: true
                        },
                        hideExpression: `${vm.editMode}`
                    },
                    {
                        className: 'col-md-6',
                        key: "password",
                        type: "input",
                        templateOptions: {
                            type: "input",
                            label: "Contraseña",
                            placeholder: "Contraseña",
                            notNull: true,
                            required: true
                        }
                    },
                   
                    {
                        className: 'col-md-6',
                        key: "rol",
                        type: "select",
                        templateOptions: {
                            label: "Tipo de Usuario",
                            placeholder: "Tipo de Usuario",
                            notNull: true,
                            required: true,
                            options: [
                                {name: 'CHOFER', value: 0},
                                {name: 'ADMIN', value: 1},
                            ]
                        }
                    },
                ]
            }];

            if($stateParams.id) {
                getById()
                .then(function(result) {
                    vm.usuario.username = result.data.username;
                    vm.usuario.password = result.data.password;
                    vm.usuario.email = result.data.email;
                    vm.usuario.rol = result.data.rol;
                });
            } else {
                vm.dataLoading = false;
            }
        }
    }

})();