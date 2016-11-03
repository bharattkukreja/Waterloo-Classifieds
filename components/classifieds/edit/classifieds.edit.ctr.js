(function() {

	'use strict';

	angular
		.module('waterlooClassifieds')
		.controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog,
			 																				  classifiedsFactory) {

			var vm = this;
			vm.classifieds = classifiedsFactory.ref;

			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;

			vm.sidebarTitle = 'Edit Classified';

			vm.classified = vm.classifieds.$getRecord($state.params.id);

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
				console.log('I am called!');
				// $mdSidenav('left').close();
				vm.classified = {};
				vm.sidenavOpen = false;
			}

			function saveEdit() {
				vm.classifieds.$save(vm.classified).then(function() {
					$scope.$emit('editSaved', 'Edit Saved!');
					vm.sidenavOpen = false;
				});
			}

		});

})();
