(function() {

	'use strict';

	angular
		.module('waterlooClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog,
			 																				 classifiedsFactory) {

			var vm = this;

			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;

			vm.sidebarTitle = 'Add a Classifed';

			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen', function(sidenavOpen){
				if(sidenavOpen === false) {
					$mdSidenav('left')
						.close()
						.then(function() {
							$state.go('classifieds');
						});
				}
			});

			function closeSidebar() {
				vm.classified = {};
				vm.sidenavOpen = false;
			}

			function saveClassified(classified) {
				if(classified) {

					classified.contact = {
						name: 'Bharatt',
						phone: '519-781-4052',
						email: 'something@gmail.com'
					}
					/*
					vm.classifieds.push(classified);
					vm.classified = {};
					closeSidebar();
					showToast("Classified Saved!")
					*/

					$scope.$emit('newClassified', classified);
					vm.sidenavOpen = false;
				}
			}

		});

})();
