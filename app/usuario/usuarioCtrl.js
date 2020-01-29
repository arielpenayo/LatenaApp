(function(){
    'use strict';

    angular
        .module('latena')
        .controller('usuarioCtrl', usuarioCtrl)

    usuarioCtrl.$inject = ['dataService', '$uibModal', 'toastr'];

    function usuarioCtrl(dataService, $uibModal, toastr) {
        var vm = this;
        var dialog;
        vm.dataLoading = false;
        
        vm.usuarios = [];

        activate();

        // vm.cambiarEstado = function(id, operacion) {
        //     var datos = {
        //         id: id,
        //         operacion: operacion
        //     }
        //     dialog = $uibModal.open({
        //         templateUrl: 'app/modal/modal.html',
        //         controller: ['entidad', activateModalCtrl],
        //         controllerAs: 'vm',
        //         resolve: { entidad: function() { return datos; } }
        //     });
        // }

        // function activateModalCtrl(datos) {
        //     var vm = this;                                                              
        //     var mensaje = datos.operacion === "anular" ? "Registro anulado con éxito!" : "Registro aprobado con éxito!";
        //     vm.confirmar = confirmar;
        //     var actualizacion;

        //     vm.titulo = 'Pedido de confirmación';
        //     if (datos.operacion === "anular") {
        //         vm.mensaje = 'Deseas anular este registro?';
        //         actualizacion = { appuserEstado: 0 }
				
        //     } else if (datos.operacion === "aprobar") {
        //         vm.mensaje = 'Deseas aprobar este registro?';
        //         actualizacion = { appuserEstado: 1 }  
        //     }


        //     function confirmar() {
        //         return dataService.update('appuser', datos.id, actualizacion)
        //             .then(function(result) {
        //                 if (result.success) {
        //                     activate();
        //                     dialog.close();
        //                     toastr.success(mensaje, 'Aviso');
        //                 } else {
        //                     dialog.close();
        //                     toastr.error(result.message);
        //                 }
        //             });
        //     }
        // }

        function findAll() {
            return dataService.findAll('users')
                .then(function(result) {
                    return result;
                })
                .finally(function() {
                    vm.dataLoading = false;
                })
        }

        function activate() {
            vm.dataLoading = true;
            findAll()
                .then(function(result) {
                    if(result.success) {
                        result.data.forEach(element => {
                            if (element.rol == 1) {
                                element.rolDesc = "ADMIN"
                            }
                            if (element.rol == 0) {
                                element.rolDesc = "CHOFER"
                            }
                        });
                        vm.usuarios = result.data;
                    } else {
                        console.log('Error al obtener Usuarios');
                    }
                })
        }

    }
})();