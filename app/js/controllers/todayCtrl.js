pymeapp.controller('todayCtrl', ['$scope', function ($scope) {
		$scope.getIconToprediction = function(){
			if(typeof $scope.predicciones[0] !== 'undefined'){
				var prom = ($scope.predicciones[0].aff_im_txn_min + $scope.predicciones[0].aff_im_txn_max) / 2;
	        	if(prom > ($scope.predicciones[0].aff_im_mL7D * 1.15) ){
	        		return 'bueno';
	        	}else if(prom < ($scope.predicciones[0].aff_im_mL7D * 0.85)){
	        		return 'malo';
	        	}else{
	        		return 'normal';
	        	}
        	}
        };        
    }
]);