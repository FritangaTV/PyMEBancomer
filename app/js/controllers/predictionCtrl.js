pymeapp.controller('predictionCtrl', ['$scope', function ($scope) {
	$scope.clima = function(inputTemp){
		var temp = parseInt(inputTemp);
		var climaString = '';
		if( temp < 20 ){
			climaString = "penguin.png";
		} else if ( temp >= 20 && temp < 29 ){
			climaString = "not_bad.jpg";
		} else {
			climaString = "this_is_fine.png";
		};
		return climaString;
	}
	$scope.climaClass = function(inputTemp){
		var temp = parseInt(inputTemp);
		var climaString = '';
		if( temp < 20 ){
			climaString = "cold";
		} else if ( temp >= 20 && temp < 29 ){
			climaString = "cool";
		} else {
			climaString = "hot";
		};
		return climaString;
	}
}]);