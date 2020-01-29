(function(){
    'use strict';

    angular
        .module('latena')
        .service('dataService', dataService)

    dataService.$inject = ['$http','config'];

    function dataService($http,config) {
        
        var headers = {headers: {'Content-Type': 'application/json'}};

        return {
            findAll: findAll,
            findById: findById,
            findAllByFilter: findAllByFilter,
            create: create,
            update: update,
            delete2: deleteObject2,
        };
        function findAll(resource) {
            return $http.get(config.serviceUrl + resource)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }

        function findById(resource, id) {
            return $http.get(config.serviceUrl + resource + '/' + id)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }
        
        function findAllByFilter(resource, data) {
            var dataString = JSON.stringify(data);
            return $http.post(config.serviceUrl + resource, dataString, headers)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }

        function create(resource, data) {
            var dataString = JSON.stringify(data);
            return $http.post(config.serviceUrl + resource, dataString, headers)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }

        function update(resource, id, data) {  
            var dataString = JSON.stringify(data);
            return $http.put(config.serviceUrl + resource + '/' + id, dataString, headers)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }

        function deleteObject2(resource, id, id2) {
            return $http.delete(config.serviceUrl + resource + '/' + id + '/' + id2, headers)
                .then(dataServiceComplete)
                .catch(dataServiceFailed);
        }


        function dataServiceComplete(response) {
            if (!response.data) {
                response.data = [];
            }
            return { success: true, data: response.data };
        }

        function dataServiceFailed(error) {
            if (error.status == -1) {
                return { success: false, message: 'Error de comunicación' };
            } else {
                if (error.status == 404) {
                    return { success: false, message: 'Recurso no encontrado' };
                } if (error.status == 500) {
                    if (error.data.parent) {
                        return { success: false, message: 'Error en base de datos ' + error.data.parent.sqlMessage };
                    } else {
                        return { success: false, message: 'Error en base de datos ' + error.data.errors[0].message };
                    }
                } else {
                    return { success: false, message: 'Error desconocido' };
                }
            }
        }
    }
})();