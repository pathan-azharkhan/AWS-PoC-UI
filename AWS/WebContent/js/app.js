var app = angular.module("aws", ['ui.router','ui.bootstrap','ngTable']); 

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'awsCtrl',
            controllerAs: 'vm'
        })
        .state('upload', {
            url: '/upload',
            templateUrl: 'modules/upload/upload.html',
            controller: 'awsCtrl',
            controllerAs: 'vm'
        });

});

app.controller("awsCtrl", ['$scope','$state', '$http','NgTableParams',function($scope,$state, $http,NgTableParams) {
	
	/*$scope.$state = $state;*/
	
	var vm=this;
	
	
	vm.products = "Basic_products";
       
    $http.get("json/Information.json").then(function (response) {
    	vm.data = response.data;
    },function (error){
        console.log(error, 'can not get data.');
    });
    
    vm.tableParams = new NgTableParams({}, { dataset: vm.data});
    
    
	vm.content = [{
            icon:"fa fa-folder-o",
            isTrue:true,
            label:"Dashboard",
            uisref:"dashboard"
         },
         {
             icon:"fa fa-upload",
             isTrue:false,
             label:"Upload",
             uisref:"upload"
          }];
    
	vm.highlight = function(label){
    	for(var i=0;i<content.length;i++) {
    		if(content[i].label==label)
    			{
    			content[i].isTrue=true;
    			}
    		else
    			{
    			content[i].isTrue=false;
    			}
    	}
    }
		  
}]);