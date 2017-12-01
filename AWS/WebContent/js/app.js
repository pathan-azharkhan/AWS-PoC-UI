
(function() {
  "use strict";
  
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

app.factory("awsService", ['$http','$q',function($http,$q){
	
	return {
		fetchDetails: function() {
			
	        var deferred = $q.defer();
	        
	        $http.get("json/Information.json").then(function(response){
	           deferred.resolve(response.data);
	        }).catch(function(response){
	          deferred.reject(response);
	        });
	        
	        return deferred.promise;
	    },
	    getCtrlData: function(selectedDate) {
			
	        var deferred = $q.defer();
	        
	        $http.get("/dashboard-data?selectedDate="+selectedDate).then(function(response){
	           deferred.resolve(response.data);
	        }).catch(function(response){
	          deferred.reject(response);
	        });
	        
	        return deferred.promise;
	    }
	  }
 
}]);

app.controller("awsCtrl", ['$scope','$state', '$http','NgTableParams','awsService',function($scope,$state,$http,NgTableParams,awsService) {
	
	var vm=this;
	
	vm.products = "Basic_products";
	
	vm.dbcondition=true;
	vm.upcondition=false;
	
    vm.init= function(){ 
    	
    	 awsService.fetchDetails().then(function(data){
        	vm.users = data;
        	
       	    vm.tableParams = new NgTableParams({
       	        page: 1,
       	        count: 5
       	    }, {
       	        total: vm.users.length, 
       	        getData: function ($defer, params) {
       	        	vm.data = vm.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
       	            $defer.resolve(vm.data);
       	        }
       	   });
         })
         .catch(function(response){
            console.log(response.status);
         });
    	 
    }    
    vm.init();
    
    vm.submit= function(selectedDate){ 
    	
    	awsService.getCtrlData(selectedDate).then(function(data){
        	vm.ctrlData = data;
         })
         .catch(function(response){
            console.log(response.status);
         });
    }
    
    
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

			  vm.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
			  vm.format = vm.formats[1];

			  vm.popup = {
			    opened: false
			  };
		  
}]);
})();