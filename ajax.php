<?php
	$parms=json_decode(file_get_contents('php://input'));
	$ch = curl_init();
	if ($parms->method=='POST'){
		$options = array(
			CURLOPT_URL => $parms->url,
			CURLOPT_HEADER=>0,
			CURLOPT_VERBOSE=>0,
			CURLOPT_RETURNTRANSFER=>true,
			CURLOPT_USERAGENT=>'Mozilla/4.0 (compatible;)',
			CURLOPT_POST=>true,
			CURLOPT_POSTFIELDS=>http_build_query($parms->data)
		);
		curl_setopt_array($ch,$options);
	}
	else{
		$url=$parms->url.'?';
		foreach($parms->data as $key=>$data){
			$url.=$key.'='.$data.'&';
		}
		$url=rtrim($url,'&');
		curl_setopt($ch,CURLOPT_URL,$url);
	}
	$res= curl_exec($ch);
	curl_close($ch);
	echo $res;
?>