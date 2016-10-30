pymeapp.controller('todayCtrl', ['$scope', function ($scope) {
		$scope.getIconToprediction = function(){
			if(typeof $scope.today !== 'undefined'){
				var prom = ($scope.today.aff_im_txn_min + $scope.today.aff_im_txn_max) / 2;
	        	if(prom > ($scope.today.aff_im_mL7D * 1.15) ){
	        		return 'bueno';
	        	}else if(prom < ($scope.today.aff_im_mL7D * 0.85)){
	        		return 'malo';
	        	}else{
	        		return 'normal';
	        	}
        	}
        };        
    }
]);