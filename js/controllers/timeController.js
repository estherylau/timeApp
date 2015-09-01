app.controller('timeController', ['$scope', '$interval', function($scope, $interval) {
	$scope.message = "Hello";
	$scope.date = '';
	$scope.milisecond = {point: 0, zero: 0};
	$scope.second = {point: 0, zero: 0};
	$scope.minute = {point: 0, zero: 0};

	// Time
	$scope.dateTime = $interval(function() {
		$scope.date = new Date();
	}, 1000);

	$scope.stopTime = function() {
		if(angular.isDefined($scope.dateTime)) {
			$interval.cancel($scope.dateTime);
		}
	};

	$scope.$on('$destroy', function() {
		$interval.cancel($scope.dateTime);
	});

	// Stopwatch
	$scope.startWatch =function() {
		s = $interval(function() {
			$scope.milisecond.point < 99 ? $scope.milisecond.point++ : $scope.milisecond.point = 0;

			if($scope.milisecond.point == 0) {
				$scope.second.point < 59 ? $scope.second.point++ : $scope.second.point = 0;
				if($scope.second.point == 0) {
					$scope.minute.point++;
				}
			}

			// add zero in front if needed
			$scope.milisecond.point < 10 ? $scope.milisecond.zero = 0 : $scope.milisecond.zero = "";
			$scope.second.point < 10 ? $scope.second.zero = 0 : $scope.second.zero = "";
			$scope.minute.point < 10 ? $scope.minute.zero = 0 : $scope.minute.zero = "";

		}, 10);
		//$scope.timer = $scope.date.getMinutes() + ':' + $scope.date.getSeconds();
	};

	$scope.stopWatch = function() {
		$interval.cancel(s);
	};

	$scope.resetWatch = function() {
		// set everything back to 0
		$scope.milisecond.point = 0;
		$scope.milisecond.zero = 0;
		$scope.second.point = 0;
		$scope.second.zero = 0;
		$scope.minute.point = 0;
		$scope.minute.zero = 0;
	};

	// Timer
	$scope.startTimer = function() {
		//$scope.timerHr = 0;

		// timer interval every 1 sec
		t = $interval(function() {
			if($scope.timerSec > 0) {
				$scope.timerSec--;
			}
			else {
				$scope.timerSec = 59;
			}

			//$scope.timerSec > 0 ? $scope.timerSec-- : $scope.timerSec = 59;
			if($scope.timerHr == 0 && $scope.timerMin == 0 && $scope.timerSec == 0) {
				$interval.cancel(t);
			}
			else {
				if($scope.timerMin == 0 && $scope.timerSec == 0) {
					//$interval.cancel(t);
					console.log('cancel');
					if($scope.timerHr > 0) {
						$scope.timerHr--;
						$scope.timerMin = 0;
						if($scope.timerSec == 59) {
							
							if($scope.timerMin > 0) {
								$scope.timerMin--;
							}
						}
					}
					else { // hr is 0
						console.log('yes');
					}
				}
				else {
					console.log('c');
					/*
					if($scope.timerMin == 1 && $scope.timerSec == 0) {
						$scope.timerMin = 0;
					}
					*/
					if($scope.timerSec == 59) {
						if($scope.timerMin > 0) {
							$scope.timerMin--;
						}
						else {
							$scope.timerMin = 59;
						}
					}

				}
			}

		}, 1000);
	};

	$scope.stopTimer = function() {
		$interval.cancel(t);
	}

	/*
	$scope.$on('$destroy', function() {
		if(angular.isDefined($scope.date)) {
			$interval.cancel($scope.date);
		}
	});
*/

}]);

app.directive('test', [function() {
	return {
		restrict: 'AEC',
		link: function(scope, el, attrs) {
			scope.myTest = "World";
			//scope.message = "Yeah";
		},
		template: "This is cool {{myTest}}, {{message}}"
		/*templateUrl: 'test.html'*/
	}
}]);

app.directive('digit', function() {
	return {
		restrict: 'AEC',
		scope: {
			zeroInfo: '=info'
		},
		link: function(scope, el, attrs) {
			scope.mss = attrs.message;
			scope.message = "Yeah";
			scope.point = 2;
			/*
			if(scope.point < 10) {
				scope.zero = "1";
			}
			else {
				scope.zero = "";
			}
			*/
		},
		/*
		transclude: true,
		*/
		template: "{{zeroInfo.zero}}{{zeroInfo.point}}"
	}
});