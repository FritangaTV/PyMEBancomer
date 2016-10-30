pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.client = '3328';
        /*Afiliados con MEJORES ventas:
        * 3339, 3328, 3600, 3328 // los primeros 2 comparten cp 06700
        * Con PEORES ventas:
        * 3583, 3522, 3573 (casualmente vende poco pero son muchas transacciones)
        */

        43552
        $scope.initDate = '2016-03-02';
        /*Mejores fechas para mostrar:
        * 3600 
        * 2016-03-02
        */
        $scope.endDate = '2016-03-08';
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
		  url: 'json/output.json'
		}).then(function successCallback(response) {
			$scope.predicciones = response.data;
	  	}, function errorCallback(response) {

	  	});
    }
]);