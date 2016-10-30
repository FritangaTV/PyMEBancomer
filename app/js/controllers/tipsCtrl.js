pymeapp.controller('tipsCtrl', ['$scope', function ($scope) {
        $scope.tips = [];
        $scope.$watch('today', function() {
        	if(typeof $scope.today !== 'undefined'){
                $scope.tips = [];
        		// Clima
        		var today_weather = $scope.today.weather;
        		var meta = $scope.today.meta;
        		//Temperatura
        		if(today_weather.mean_temp > 29){ // Día caluroso
        			$scope.tips.push({
        				desc:"Día caluroso. Contempla tu suministro de alimentos refrescantes",
        				img:"bebida_refrescante.jpeg"
        			});
        		}else if(today_weather.mean_temp < 20){ // Día frio
        			$scope.tips.push({
        				desc:"Día frío. Contempla tu suministro de alimentos calientitos",
        				img:"bebida_calientita.jpg"
        			});
        		}
        		// Viento
        		if(today_weather.mean_speed > 12){ // Día con viento
        			$scope.tips.push({
        				desc:"Día con viento. Contempla tu áreas al aire libre",
        				img:"viento.jpeg"
        			});
        		}
        		// Quincena
        		if(meta.day_num == "01" || meta.day_num == "02" || meta.day_num == "03" || meta.day_num == "04"
        			|| meta.day_num == "15" || meta.day_num == "16" || meta.day_num == "17" || meta.day_num == "18	"){ // Inicio de Quincena
        			$scope.tips.push({
        				desc:"Inicio de quincena",
        				img:"inicio_quincena.jpg"
        			});
        		}else if(meta.day_num == "12" || meta.day_num == "13" || meta.day_num == "14"
        			|| meta.day_num == "28" || meta.day_num == "29" || meta.day_num == "30" || meta.day_num == "31"){
        			$scope.tips.push({
        				desc:"Fin de quincena",
        				img:"fin_quincena.jpg"
        			});
        		}
        		// Semana
        		if(meta.weekday == "Saturday" || meta.weekday == "Sunday"  || meta.weekday == "Friday"){
        			$scope.tips.push({
        				desc:"Fin de semana (o viernes)",
        				img:"fin_semana.jpg"
        			});
        		}else{
        			$scope.tips.push({
        				desc:"Entre semana",
        				img:"entre_semana.jpg"
        			});
        		}
                
                // feriado
                if(meta.feriado != "no" ){
                    $scope.tips.push({
                        desc:"Se acerca un día feriado",
                        img:"feriado.jpg"
                    });
                }
        		
        		// Futbol
        		if(meta.partido_seleccion != "no" ){
        			$scope.tips.push({
        				desc:"Hoy hay partido de Futbol importante",
        				img:"futbol.jpg"
        			});
        		}
        		

        	}
    	});
    }
]);