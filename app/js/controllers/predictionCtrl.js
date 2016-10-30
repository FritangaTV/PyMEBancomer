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

	$scope.$watch('today', function() {
        	if(typeof $scope.today !== 'undefined'){
                angular.forEach($scope.predicciones, function(value, key) {
                    var tips = [];
                    // Clima
                    var today_weather = $scope.predicciones[key].weather;
                    var meta = $scope.predicciones[key].meta;
                    //Temperatura
                    if(today_weather.mean_temp > 29){ // Día caluroso
                        tips.push({
                            desc:"Día caluroso. Contempla tu suministro de alimentos refrescantes",
                            img:"bebida_refrescante.jpeg"
                        });
                    }else if(today_weather.mean_temp < 20){ // Día frio
                        tips.push({
                            desc:"Día frío. Contempla tu suministro de alimentos calientitos",
                            img:"bebida_calientita.jpg"
                        });
                    }
                    // Viento
                    if(today_weather.mean_speed > 12){ // Día con viento
                        tips.push({
                            desc:"Día con viento. Contempla tu áreas al aire libre",
                            img:"viento.jpeg"
                        });
                    }
                    // Quincena
                    if(meta.day_num == "01" || meta.day_num == "02" || meta.day_num == "03" || meta.day_num == "04"
                        || meta.day_num == "15" || meta.day_num == "16" || meta.day_num == "17" || meta.day_num == "18  "){ // Inicio de Quincena
                        tips.push({
                            desc:"Inicio de quincena",
                            img:"inicio_quincena.jpg"
                        });
                    }else if(meta.day_num == "12" || meta.day_num == "13" || meta.day_num == "14"
                        || meta.day_num == "28" || meta.day_num == "29" || meta.day_num == "30" || meta.day_num == "31"){
                        tips.push({
                            desc:"Fin de quincena",
                            img:"fin_quincena.jpg"
                        });
                    }
                    // Semana
                    if(meta.weekday == "Saturday" || meta.weekday == "Sunday"  || meta.weekday == "Friday"){
                        tips.push({
                            desc:"Fin de semana (o viernes)",
                            img:"fin_semana.jpg"
                        });
                    }else{
                        tips.push({
                            desc:"Entre semana",
                            img:"entre_semana.jpg"
                        });
                    }
                    
                    // feriado
                    if(meta.feriado != "no" ){
                        tips.push({
                            desc:"Se acerca un día feriado",
                            img:"feriado.jpg"
                        });
                    }
                    
                    // Futbol
                    if(meta.partidoImportante == "yes" ){
                        tips.push({
                            desc:"Hoy hay partido de Futbol importante",
                            img:"futbol.jpg"
                        });
                    }
                    $scope.predicciones[key].tips = tips;
                });
        	}
    	});
}]);