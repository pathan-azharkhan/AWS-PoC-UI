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

app.controller("awsCtrl", ['$scope','$state', '$http','NgTableParams',function($scope,$state,$http,NgTableParams) {
	
	/*$scope.$state = $state;*/
	
	var vm=this;	
	
	vm.products = "Basic_products";
	
	vm.dbcondition=false;
	vm.upcondition=false;
       
    $http.get("json/Information.json").then(function (response) {
    	vm.data = response.data;
    	vm.datalength = vm.data.length;
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
    	for(var i=0;i<vm.content.length;i++) {
    		if(vm.content[i].label==label)
    			{
    			vm.content[i].isTrue=true;
    			}
    		else
    			{
    			vm.content[i].isTrue=false;
    			}
    	}
    }
	
	vm.dbconditionfunc = function(){
		vm.dbcondition=true;
		vm.upcondition=false;
	}
	vm.upconditionfunc = function(){
		vm.dbcondition=false;
		vm.upcondition=true;
	}

	vm.dateOptions = {
			    formatYear: 'yy',
			    maxDate: new Date(2100, 5, 22),
			    minDate: new Date(),
			    startingDay: 1
			  };

			  vm.open = function() {
			    vm.popup.opened = true;
			  };

			  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			  vm.format = vm.formats[0];

			  vm.popup = {
			    opened: false
			  };
		  
}]);