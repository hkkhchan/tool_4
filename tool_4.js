/*test*/
var app= angular.module('toolApp',[]).controller('toolCtrl',function($scope){
	$scope.mode=2;
	$scope.rows=[{id: 0,show:true,name:'',value:''}];
	$scope.is_selected=function(d){return d==$scope.mode?'active':'';}
	$scope.set_selected=function(d){$scope.mode=d;}
	$scope.add=function(){
		obj={
			id: $scope.rows.length,
			show: true,
			name: '',
			value: ''};
		$scope.rows.push(obj);
	}
	$scope.hide=function(d){
		$scope.rows[d].show=false;
	}
});
