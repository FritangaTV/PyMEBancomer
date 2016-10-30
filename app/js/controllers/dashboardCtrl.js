pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.client = '6996';
        $scope.initDate = '2015-12-01';
        $scope.endDate = '2016-03-01';
        $scope.voodoMagic = function(){
        	console.log('doing Magic!');
        	$http({
        		method: 'GET',
        		url:'http://localhost:1337/t',
        		params: {
        			"client": jQuery('#client').val(),
        			"initDate": jQuery('#initDate').val(),
        			"endDate": jQuery('#endDate').val()
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

        $scope.predicciones = [];

        $http({
		  method: 'GET',
		  url: '/json/samples/sample1/output.json'
		}).then(function successCallback(response) {
			$scope.predicciones = response.data;
	  	}, function errorCallback(response) {

	  	});
    }
]);