pymeapp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.client = '3328';
        /*Afiliados con MEJORES ventas:
        * 3339, 3328, 3600, 3328 // los primeros 2 comparten cp 06700
        * Con PEORES ventas:
        * 3583, 3522, 3573 (casualmente vende poco pero son muchas transacciones)
        */

        //43552
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

        $scope.dataSamples = [
            {
                "url": "/json/samples/sample1/output.json",
                "client": 6996,
                "client_name": "Fonda Juanita",
                "initDate": "2015-12-01",
                "endDate" : "2016-03-01",
                "logo" : "/images/logos/juanita.jpg"
            },
            {
                "url": "/json/samples/sample1/buena.json",
                "client": 3328,
                "client_name": "Buena onda",
                "initDate": "2015-12-01",
                "endDate" : "2016-03-01",
                "logo" : "/images/logos/goodVibes.jpg"
            },
            {
                "url": "/json/samples/sample1/promedio.json",
                "client": 3600,
                "client_name": "El regular",
                "initDate": "2015-12-01",
                "endDate" : "2016-06-10",
                "logo" : "/images/logos/regular.jpg"
            }
        ];

        $scope.predicciones = [];
        $scope.selectedSample = $scope.dataSamples[0];

        $scope.$watchCollection('selectedSample', function() {
            getPredicciones($scope.selectedSample.url);
        });


   

        function getPredicciones(urlGet){
            $http({
              method: 'GET',
              url: urlGet
            }).then(function successCallback(response) {
                $scope.predicciones = response.data;
                $scope.today = $scope.predicciones.shift();
            }, function errorCallback(response) {

            });
        };
    }
]);