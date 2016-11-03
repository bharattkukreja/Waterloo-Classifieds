(function () {
	'use strict';

	angular
		.module('waterlooClassifieds')
		.controller('classifiedsCtrl', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast,
																						$mdDialog) {

			var vm = this;

			vm.openSidebar = openSidebar;
			vm.closeSidebar = closeSidebar;
			vm.editClassified = editClassified;
			vm.deleteClassified = deleteClassified;

			vm.classifieds;
			vm.categories;
			vm.editing;
			vm.classified;
			vm.sidebarTitle;

			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds) {
				vm.categories = getCategories(classifieds);
			});
			
			// This is for getting local data

			// classifiedsFactory.getClassifieds().then(function(classifieds) {
			// 	vm.classifieds = classifieds.data;
			// 	vm.categories = getCategories(vm.classifieds);
			// });

			$scope.$on('newClassified', function(event, classified) {
				vm.classifieds.$add(classified);
				showToast('Classified Saved!');
			});

			$scope.$on('editSaved', function(event, message) {
				showToast(message)
			});

			function openSidebar() {
				vm.sidebarTitle = 'Add a Classified';
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

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
					vm.classifieds.$remove(classified);
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

			function getCategories(classifieds) {
				var categories = [];

				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category) {
						categories.push(category)
					});
				});

				return _.uniq(categories);
			}

		});

})();
