var app= angular.module('toolApp',[]).controller('toolCtrl',function($scope,$http,$sce){
	$scope.method=2;
	$scope.layout=1;
	$scope.res_text=$scope.res_html=$scope.res_json='';
	$scope.rows=[{id: 0,show:true,name:'',value:''}];
	$scope.is_selected=function(d,k){return d==$scope[k]?'active':'';}
	$scope.set_selected=function(d,k){$scope[k]=d;}
	$scope.add=function(){
		obj={
			id: $scope.rows.length,
			show: true,
			name: '',
			value: ''};
		$scope.rows.push(obj);
	}
	$scope.hide=function(d){
		var showNum=0;
		for (i in $scope.rows){
			showNum+= $scope.rows[i].show?1:0;
		}
		if (showNum > 1) $scope.rows[d].show=false;
	}
	$scope.go=function(){
		$scope.res_text=$scope.res_html=$scope.res_json='';
		var parms = {
			url: $scope.url,
			method: $scope.method==1?'GET':'POST'
		};
		var data=new Object;
		angular.forEach($scope.rows,function(value,key){
			if (value.name!='') data[value.name]=value.value;
		});
		parms['data']=data;
		$http({
			method: 'POST',
			url:  	'ajax.php',
			data: 	parms
		}).then(function success(d){
			switch($scope.layout){
				case 1:
					$scope.res_text='<pre>'+d.data+'</pre>';
					break;
				case 2:
					$scope.res_html=d.data;
					break;
				case 3:
					$scope.res='function developing';
					break;
			}
		},function error(d){
			console.log('err:'+d);
		});
	}
	$scope.reset=function(){
		$scope.layout=1;
		$scope.method=2;
		$scope.rows=[{id: 0,show:true,name:'',value:''}];
		$scope.res_text=$scope.res_html=$scope.res_json='';
	}
	$scope.toTrustedHTML = function(html){
		return $sce.trustAsHtml(html);
	}
});