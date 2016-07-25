<?php
$b=(object)[
	'd'=>'d1',
	'e'=>'e2'
	];
$a=[];
$a[]='a';
$a[]='b';
$b->a=$a;
$b->c='c';
echo json_encode($b);
?>