<?php 
	$file_path = '../zpimages/';
	$file_up = $file_path.basename($_FILES['upload']['name']);
	if(move_uploaded_file($_FILES['upload']['tmp_name'],$file_up)){
		echo 'success';	
	}else{
		echo 'fail';	
	}
	if(!empty($_FILES["magfile"]))  {
    $uploaddir = $_SERVER['DOCUMENT_ROOT']."/uploads/";
    $uploaddir.="test.jpg";
    if(move_uploaded_file($_FILES["magfile"]["tmp_name"], $uploaddir)) {
      echo "上传成功!";
    }else{
      print_r($_FILES);
    }
?>