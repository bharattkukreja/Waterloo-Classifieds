(function() {

	'use strict';

	angular
		.module('waterlooClassifieds')
		.directive('classifiedCard', function() {
			return {
				templateUrl: 'components/classifieds/card/classified-card.tpl.html',
				scope: {
					classifieds: '=classifieds',
					classifiedsFilter: '=classifiedsFilter',
					category: '=category'
				},
				controller: classifiedCardController,
				controllerAs: 'vm'
			}

			function classifiedCardController($scope, $state, $mdDialog, $mdToast) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;

				function editClassified(classified) {
					vm.editing = true;
	        vm.sidebarTitle = 'Edit Classified';
	        vm.classified = classified;
					$state.go('classifieds.edit', {
						id: classified.$id
					});
				}

				function deleteClassified(event, classified) {
					var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete ' + classified.title + '?')
						.ok('Yes')
						.cancel('No')
						.targetEvent(event);

					$mdDialog.show(confirm).then(function() {
						$scope.classifieds.$remove(classified);
						showToast('Classified Deleted!');
					}, function() {

					});
				}

				function showToast(message) {
					$mdToast.show(
						$mdToast.simple()
							.content(message)
							.position('top, right')
							.hideDelay(3000)
					);
				}

			}
		})

})();
