<?php
$target_dir = "../upload/";
$uploadOk = 1;
// Check if it got submit
if(isset($_POST["submit"]) && isset($_POST["song"]) && isset($_POST["quantity"])) {

	$ext = end((explode(".", $_FILES["movie"]["name"])));
	$ext2 = end((explode(".", $_FILES["audio"]["name"])));
	//limit file type
    if(($ext != "mp4" && $ext != "gif" && $ext != "mov" && $ext != "avi") || (($ext2 != "mp3" && $ext2 != "wav") && ($_POST["song"] == 13))) {
		header('Location: index.php?error=2');
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["movie"]["size"] > 100000000 || $_FILES["audio"]["size"] > 100000000) {
    	header('Location: index.php?error=1');
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
			$target_file = $target_dir . $count . '.'  . $ext;
		}
		$audio_file =  $target_dir . $count . '.' . $ext2;
		$m = move_uploaded_file($_FILES["movie"]["tmp_name"], $target_file);
		$a = move_uploaded_file($_FILES["audio"]["tmp_name"], $audio_file);
		$t = ($_POST["song"] == 13);
		if (($m && !$t) || ($m && $a))
		{
			$songs = array(64,24,41,27,30,6,74,32,38,154,31,28);
			$flag = 0;
			$flag2 = 0;
			$startpoint = intval($songs[$_POST["song"]-1]) - intval($_POST["quantity"]);
			if($_POST["song"] != 13)
			{
				$audio_file = "../songs/" . $_POST["song"] . ".mp3";
				$ext2 = "mp3";
			}
			else
			{
				$x = intval($_POST["songdrop"]);
				$y = intval($_POST["quantity"]);
				$startpoint = $x - $y;	
			}

			$output = "";
			$output2 = "";
			/*RUN THE VIDEO EDIT*/
			exec("ffmpeg -ss " . escapeshellarg($startpoint) . " -i " . escapeshellarg($audio_file) . " " . $target_dir . "temp" . $count . "." . escapeshellarg($ext2) , $output, $flag);
			exec("ffmpeg -i ". escapeshellarg($target_file) ."  -i ". $target_dir . "temp" . $count . "." . escapeshellarg($ext2) ." -shortest -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 done/output". $count .".mp4",$output2,$flag2);
			if(file_exists($target_file)) { unlink($target_file); }
			if(file_exists($target_dir . "temp" . $count . "." . $ext2))
			{ unlink($target_dir . "temp" . $count . "." . $ext2); }
			if(file_exists($audio_file) && $_POST["song"] == 13) { unlink($audio_file); }
			if($flag != 0 && $flag2 != 0)
			{
				header('Location: index.php?error=3');	
	    	}
			else
			{
				header("Content-Type: video/mp4");
				header("Content-Transfer-Encoding: Binary");
				header("Content-disposition: attachment; filename=\"output". $count .".mp4\""); 
				echo readfile("done/output". $count .".mp4");
				if(file_exists("done/output". $count .".mp4")) { unlink("done/output". $count .".mp4"); }
			}
			
		} else {
			if(file_exists($target_file)) { unlink($target_file); }
			if(file_exists($audio_file)) { unlink($audio_file); } 
	        header('Location: index.php?error=4');
	    }
	}
}
else {
	header('Location: index.php');
}
?>
