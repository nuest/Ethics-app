var app = angular.module("ethics-app");


// Document delete controller
app.controller("documentDeleteController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };

    /**
     * [deleteDocument description]
     * @return {[type]} [description]
     */
    $scope.delete = function(){
        $scope.$parent.loading = { status: true, message: $filter('translate')('DELETING_DOCUMENT') };

        $documentService.delete($documentService.getId())
        .then(function onSuccess(response) {
            // Reset
            $documentService.set();

            // Update navbar
            $rootScope.$broadcast('resetNavbar');

            $scope.redirect("/");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_DOCUMENT') };
    $scope.input = "";
    $scope.document = $documentService.get();
    $scope.$parent.loading = { status: false, message: "" };

});
