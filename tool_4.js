var app= angular.module('toolApp',['ngSanitize', 'jsonFormatter']).controller('toolCtrl',function($scope,$http,$sce,JSONFormatterConfig){
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
		if ($scope.url.substr(0,4).toLowerCase()=='http'){
			url=$scope.url;
		}
		else if ($scope.url.substr(0,2)=='//'){
			url='http:'+$scope.url;
		}
		else{
			url='http://'+$scope.url;
		}
		$scope.res_text=$scope.res_html=$scope.res_json='';
		link=document.createElement('a');
		link.setAttribute('href',$scope.url);
		var parms = {
			url: url,
			json: $scope.layout==3?true:false,
			port: link.port!=''?link.port:80,
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
			var res='';
			try{
				res=JSON.parse(d.data);
			}
			catch(e){
				res=d.data;
			}
			switch($scope.layout){
				case 1:
					$scope.res_text=res;
					break;
				case 2:
					$scope.res_html=res;
					break;
				case 3:
					$scope.res_json=JSON.parse(res);
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