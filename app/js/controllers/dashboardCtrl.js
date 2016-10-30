pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.prediccion = [];
        $scope.client = '6996';
        $scope.initDate = '2015-12-01';
        $scope.endDate = '2016-03-01';
        $scope.voodoMagic = function(){
        	console.log('doing Magic!');
        	$http({
        		method: 'GET',
        		url:'http://localhost:1337/t',
        		params: {
        			"client": $scope.client,
        			"initDate": $scope.initDate,
        			"endDate": $scope.endDate
        		}
        	}).then(function(res){
        		console.log(res.data);
        	})
        }
      
        jQuery('#initDate').datetimepicker({
        	format: 'YYYY-MM-DD'
        });
        
        jQuery('#endDate').datetimepicker({
        	format: 'YYYY-MM-DD'
        });

        $http({
		  method: 'GET',
		  url: 'json/output.json'
		}).then(function successCallback(response) {
			$scope.prediccion = response.data;
	  	}, function errorCallback(response) {

	  	});
    }
]);