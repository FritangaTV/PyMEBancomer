pymeapp.controller('tipsCtrl', ['$scope', function ($scope) {
        $scope.tips = [];
        $scope.$watch('predicciones', function() {
        	if(typeof $scope.predicciones[0] !== 'undefined'){
        		// Clima
        		var today_weather = $scope.predicciones[0].weather;
        		var meta = $scope.predicciones[0].meta;
        		//Temperatura
        		if(today_weather.mean_temp > 29){ // Día caluroso
        			$scope.tips.push({
        				desc:"Día caluroso. Contempla tu suministro de alimentos refrescantes"
        			});
        		}else if(today_weather.mean_temp < 20){ // Día frio
        			$scope.tips.push({
        				desc:"Día frío. Contempla tu suministro de alimentos calientitos"
        			});
        		}
        		// Viento
        		if(today_weather.mean_speed > 12){ // Día con viento
        			$scope.tips.push({
        				desc:"Día con viento. Contempla tu áreas al aire libre"
        			});
        		}
        		// Quincena
        		if(meta.day_num == "01" || meta.day_num == "02"  || meta.day_num == "03"
        			|| meta.day_num == "15" || meta.day_num == "16" || meta.day_num == "17"){ // Inicio de Quincena
        			$scope.tips.push({
        				desc:"Inicio de quincena"
        			});
        		}else if(meta.day_num == "12" || meta.day_num == "13" || meta.day_num == "14"
        			|| meta.day_num == "28" || meta.day_num == "29" || meta.day_num == "30" || meta.day_num == "31"){
        			$scope.tips.push({
        				desc:"Fin de quincena"
        			});
        		}
        		// Semana
        		if(meta.weekday == "Saturday" || meta.weekday == "Sunday"){
        			$scope.tips.push({
        				desc:"Fin de semana"
        			});
        		}else{
        			$scope.tips.push({
        				desc:"Entre semana"
        			});
        		}
        		
        		// feriado
        		if(meta.feriado != "no" ){
        			$scope.tips.push({
        				desc:"Se acerca un día feriado" 
        			});
        		}
        		

        	}
    	});
    }
]);