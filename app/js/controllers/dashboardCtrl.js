pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.predicciones = [];

        $http({
		  method: 'GET',
		  url: 'json/output.json'
		}).then(function successCallback(response) {
			$scope.predicciones = response.data;
	  	}, function errorCallback(response) {

	  	});
    }
]);