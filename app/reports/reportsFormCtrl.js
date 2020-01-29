(function(){
    'use strict';

    angular
        .module('latena')
        .controller('reportsFormCtrl', reportsFormCtrl)

    reportsFormCtrl.$inject = ['$state','dataService','$scope','uiGridConstants', '$stateParams'];

    function reportsFormCtrl($state,dataService,$scope,uiGridConstants,$stateParams) {
        var vm = this;
        vm.reports = {};
        
        vm.dataSaving = false;
        vm.hide = true;
        vm.editMode = false;

        vm.options = {
            formState: {
                readOnly: false
            }
        };
        if ($state.current.name === 'reports-ver') {
            vm.options.formState.readOnly = true;
        }
        let opcion1 = [
            {name:'LAMBARE-SAJONIA-ARTIGAS-YG',value:1},
            {name:'CAPIATA-SAN LORENZO-LUQUE-YG',value:2},
            {name:'CAPIATA-LUQUE-YG',value:3},
            {name:'SAN ANTONIO',value:4},
            {name:'SL-CENTRO-YG',value:5},
        ]
        let opcion2 = [
            {name:'Benjamin Aceval – Planta Villa Hayes',value:0},
        ]

        activate();
        vm.reportsFields = [{
            className: 'row',
            fieldGroup: [
                {
                    className: 'col-md-6',
                    key: "reportId",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Id Reporte",
                        placeholder: "Id",
                        required: true
                    }
                },
                {
                    "className": 'hidden',
                    "type": "input",
                    "key": "soloLectura",
                    "defaultValue": vm.options.formState.readOnly,
                    "templateOptions": {
                      "type": "hidden",
                      "label": "Hidden Type"
                    }
                },
                {
                    className: 'col-md-6',
                    key: "userId",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Id Usuario",
                        placeholder: "Id",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "nombrePasajero",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Nombre del Pasajero",
                        placeholder: "Nombre del Pasajero",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "chofer",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Chofer",
                        placeholder: "Chofer",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "detalles",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Detalles",
                        placeholder: "Detalles",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "modo",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Modo",
                        placeholder: "Modo",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "llegada",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Llegada",
                        placeholder: "Llegada",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "primerPasajero",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Primer Pasajero",
                        placeholder: "Primer Pasajero",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "cantidadPasajeros",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Cantidad de Pasajeros",
                        placeholder: "Cantidad de Pasajeros",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "turno",
                    type: "input",
                    templateOptions: {
                        type: "input",
                        label: "Turno",
                        placeholder: "Turno",
                        required: true
                    }
                },
                {
                    className: 'col-md-6',
                    key: "region",
                    type: "select",
                    templateOptions: {
                        label: "Region",
                        placeholder: "Region",
                        notNull: true,
                        required: true,
                        options: [
                            {name: 'Oriental', value: '0'},
                            {name: 'Chaco', value: '1'},
                        ]
                    }
                },
                {
                    className: 'col-md-6',
                    key: "itinerario",
                    type: "select",
                    //defaultValue: '1',
                    templateOptions: {
                        label: "Itinerario",
                        placeholder: "Itinerario",
                        required: true,
                        options: []
                    },
                    controller: function($scope, dataService) {
                        $scope.$watch('model.region', function(newValue, oldValue, theScope) {
                            if (newValue !== oldValue) {
                                if (newValue != undefined) {
                                    // Oriental
                                    if (newValue == 0) {
                                        $scope.to.options = opcion1
                                    }
                                    //Chaco
                                    if (newValue == 1) {
                                        $scope.to.options = opcion2
                                    }
                                }
                            }
                        });
                    }
                },
                {
                    className: 'col-md-6',
                    key: "fechaDeServicio",
                    type: "input",
                    defaultValue:(moment().format("DD/MM/YYYY")).toString(),
                    templateOptions: {
                    label: 'Fecha de Servicio',
                    type: 'input',
                    // datepickerPopup: 'dd-MM-yyyy',
                    required: true,
                    
                    disabled:true
                    }
                },
                
            ]
        }];
        
        vm.cancelar = function() {
            $state.go('reports');
        }

        vm.grabar = function(reports) {
            let data = {
                reportId: reports.reportId,
                userId: reports.userId,
                nombrePasajero: reports.nombrePasajero,
                chofer: reports.chofer,
                detalles: reports.detalles,
                modo: reports.modo,
                llegada: reports.llegada,
                primerPasajero: reports.primerPasajero,
                cantidadPasajeros: reports.cantidadPasajeros,
                turno: reports.turno,
                region: reports.region,
                itinerario: reports.itinerario,
                fechaDeServicio: reports.fechaDeServicio
            }

            vm.dataSaving = true;

            if($stateParams.id) {
                dataService.update('reports', $stateParams.id, data)
                .then(function(result) {
                    if(result.success) {
                        $state.go('reports');
                    }
                })
                .catch(function(error) {
                    return error
                })
                .finally(function() {
                    vm.dataSaving = false;
                });
            } else {
                dataService.create('reports', data)
                    .then(function(result) {
                        if (result.success) {
                            $state.go('reports');
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

        function getById() {
            return dataService.findById('reports', $stateParams.id)
            .then(function(result) {
                return result;
            })
            .finally(function() {
                vm.dataLoading = false;
            });
        }

        function activate() {

            

            if($stateParams.id) {
                $state.go('reports');
                toastr.error('Error,Ya existia', 'Aviso');
                // getById()
                // .then(function(result) {
                //     vm.reports.reportId = result.data.reportId;
                //     vm.reports.userId = result.data.userId;
                //     vm.reports.nombrePasajero = result.data.nombrePasajero;
                //     vm.reports.chofer = result.data.chofer;
                //     vm.reports.detalles = result.data.detalles;
                //     vm.reports.modo = result.data.modo;
                //     vm.reports.llegada = result.data.llegada;
                //     vm.reports.primerPasajero = result.data.primerPasajero;
                //     vm.reports.cantidadPasajeros = result.data.cantidadPasajeros;
                //     vm.reports.turno = result.data.turno;
                //     vm.reports.region = result.data.region;
                //     vm.reports.itinerario = result.data.itinerario;
                //     vm.reports.fechaDeServicio = result.data.fechaDeServicio;
                // });
            } else {
                vm.dataLoading = false;
            }
        }
    }
})();