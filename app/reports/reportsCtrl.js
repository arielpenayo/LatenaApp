(function(){
    'use strict';

    angular
        .module('latena')
        .controller('reportsCtrl', reportsCtrl)

    reportsCtrl.$inject = ['$location','dataService', 'toastr','uiGridConstants','$state','$uibModal','$scope'];

    function reportsCtrl($location,dataService, toastr, uiGridConstants,$state,$uibModal, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.mySelectedRows = [];
        var dialog;
        vm.reports = [];
        vm.dataLoading = false;
        vm.dataSaving = false;

        activate();

        function findAllByFilter() {
            return dataService.findAllByFilter('reports-filter',{fechadeServicio:(moment().format("DD/MM/YYYY")).toString()})
                .then(function(result) {
                    return result;
                })
                .finally(function() {
                    vm.dataLoading = false;
                })
        }

        function activate() {
            vm.dataLoading = true;
            findAllByFilter()
                .then(function(result) {
                    if(result.success) {
                        result.data.forEach(element => {
                            if (element.itinerario == 0) {
                                element.itinerarioDesc = "Benjamin Aceval – Planta Villa Hayes"
                            }
                            if (element.itinerario == 1) {
                                element.itinerarioDesc = "LAMBARE-SAJONIA-ARTIGAS-YG"
                                
                            }
                            if (element.itinerario == 2) {
                                element.itinerarioDesc = "CAPIATA-SAN LORENZO-LUQUE-YG"
                                
                            }
                            if (element.itinerario == 3) {
                                element.itinerarioDesc = "CAPIATA-LUQUE-YG"
                                
                            }
                            if (element.itinerario == 4) {
                                element.itinerarioDesc = "SAN ANTONIO"
                                
                            }
                            if (element.itinerario == 5) {
                                element.itinerarioDesc = "SL-CENTRO-YG"
                                
                            }

                            if (element.region == '0') {
                                element.regionDesc = "Oriental"
                            }
                            if (element.region == '1') {
                                element.regionDesc = "Chaco"
                            }

                            
                        });
                        vm.reports = result.data;
                        console.log('vm.reports :', vm.reports);
                    } else {
                        console.log('Error al obtener reports');
                    }
                })
        }

        
    }
})();