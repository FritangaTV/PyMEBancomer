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

        $scope.selectedSample = $scope.dataSamples[0];
        $scope.$watchCollection('selectedSample', function() {
            console.log($scope.selectedSample);
            getPredicciones($scope.selectedSample.url);
        });


        $scope.predicciones = [];


        function getPredicciones(urlGet){
            $http({
              method: 'GET',
              url: urlGet
            }).then(function successCallback(response) {
                $scope.predicciones = response.data;
            }, function errorCallback(response) {

            });
        };
    }
]);