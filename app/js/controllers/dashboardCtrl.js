pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.prediccion = [];

        $http({
		  method: 'GET',
		  url: 'json/output.json'
		}).then(function successCallback(response) {
			$scope.prediccion = response.data;
	  	}, function errorCallback(response) {

	  	});
    }
]);