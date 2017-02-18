<?php
$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES["fileUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if it got submit
if(isset($_POST["submit"]) && isset($_POST["song"]) && isset($_POST["quantity"])) {

	//limit file type
    if($imageFileType != "mp4" && $imageFileType != "gif" && $imageFileType != "mov" && $imageFileType != "avi") {
		echo "Sorry, only mp4, avi, mov and gif allowed.";
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["fileToUpload"]["size"] > 1000000000) {
    	echo "Sorry, your file is too large.";
    	$uploadOk = 0;
	}

	//upload the file
	if(!$uploadOk) {
		if (move_uploaded_file($_FILES["fileUpload"]["tmp_name"], $target_file)) {
	        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
	    } else {
	        echo "Sorry, there was an error uploading your file.";
	    }
	}
}
else {
	echo "Invalid post.";
}
?>