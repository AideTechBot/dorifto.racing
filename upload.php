<?php
$target_dir = "../upload/";
$uploadOk = 1;
// Check if it got submit
if(isset($_POST["submit"]) && isset($_POST["song"]) && isset($_POST["quantity"])) {

	$ext = end((explode(".", $_FILES["movie"]["name"])));
	//limit file type
    if($ext != "mp4" && $ext != "gif" && $ext != "mov" && $ext != "avi") {
		header('Location: ../index.php?error=2');
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["movie"]["size"] > 100000000) {
    	header('Location: ../index.php?error=1');
    	$uploadOk = 0;
	}

	//upload the file
	if($uploadOk) {
		$count = 0;
		$target_file = $target_dir . $count . '.' . $ext;
		while(true) {
			if(!file_exists($target_file)) {
				break;
			}
			$count++;
			error_log($count);
			$target = $target_dir . $count . '.'  . $ext;
		}

		if (move_uploaded_file($_FILES["movie"]["tmp_name"], $target_file)) {
			header('Location: ../index.php');
	    } else {
	        header('Location: ../index.php?error=1');
	    }
	}
}
else {
	echo "Invalid post.";
}
?>
