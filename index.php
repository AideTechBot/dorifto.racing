<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
	<title>DORIFTO - eurobeat generator</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

	<!-- Custom Fonts -->
	<script src="https://use.fontawesome.com/983a5a1741.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

  </head>
  <body>
  	<!--google analytics-->
  	<?php include_once("analyticstracking.php") ?>
	<div class="col-sm-3"></div>
	<div class="col-sm-6" id="main-col">
		<div class="row header-row">
  			<img src="img/header.png" class="text-center header-dorifto">
			<h5 class="text-center">
				<i class="fa fa-github"></i>&nbsp;<a href="https://github.com/AideTechBot">Github</a>
				&nbsp;-&nbsp;
				<i class="fa fa-twitter"></i>&nbsp;<a href="https://twitter.com/AideTechBot">Twitter</a>
			</h5> 
		</div>
		<hr>
		<div class="row content-row">	
			<h3 class="text-center">Overlay your favorite eurobeat onto videos!</h3>
			<form class="text-center" action="upload.php" method="post" enctype="multipart/form-data">
			    <h4>Select a video to upload:</h4>
			    <input type="file" name="movie" id="fileUpload">
			    <h4>Select a song or upload your own.</h4>
				<select name="song" id="songSelect">
					<option value="1">DEJA VU</option>
					<option value="2">RUNNING IN THE 90S</option>
					<option value="3">NIGHT OF FIRE</option>
					<option value="4">BACK ON THE ROCKS</option>
					<option value="5">DANCING (COOL VIBRATIONS)</option>
					<option value="6">DOGFIGHT</option>
					<option value="7">HEARTBEAT</option>
					<option value="8">I NEED YOUR LOVE</option>
					<option value="9">LOVE IS IN DANGER</option>
					<option value="10">NO ONE SLEEP IN TOKYO</option>
					<option value="11">RAGE YOUR DREAMS</option>
					<option value="12">REMEMBER ME</option>
					<option value="13">OTHER</option>
				</select>
				<br>
				<input type="file" name="audio" id="songUpload" style="display:none">
			    <h4 class="songUP" style="display:none">At what time does the song climax?</h4>
				<input type="number" name="songdrop" min="1" class="songUP" style="display:none">
				<h4>At what time (in seconds) do you want the song to climax in the video?</h4>
			    <input type="number" name="quantity" min="1"><br>
			    <input type="submit" value="NANI? PANDA TRUENO??" name="submit">
			</form>
			<?php
			if (isset($_GET['error'])) {
                if ($_GET['error'] == 1) {
                    echo '<p class="error">Error while processing request.</p>';
                }
				if ($_GET['error'] == 2) { 
					echo '<p class="error">Only mp3, wav, gif, mp4, mov and avi formats allowed.</p>';
				}
				if ($_GET['error'] == 3) {
					echo '<p class="error">You need to wait 10 minutes before uploading another.</p>';
				}
            }	
			?>
			<script>
				function getElementsByClass( searchClass, domNode, tagName) { 
					if (domNode == null) domNode = document;
					if (tagName == null) tagName = '*';
					var el = new Array();
					var tags = domNode.getElementsByTagName(tagName);
					var tcl = " "+searchClass+" ";
					for(i=0,j=0; i<tags.length; i++) { 
						var test = " " + tags[i].className + " ";
						if (test.indexOf(tcl) != -1) 
							el[j++] = tags[i];
					} 
					return el;
				} 


				document.getElementById("songSelect").onchange = function () {
					document.getElementById("songUpload").style.display = "none";
					getElementsByClass('songUP')[0].style.display = "none";
					getElementsByClass('songUP')[1].style.display = "none";
					if (this.value == '13')
					{
						document.getElementById("songUpload").style.display = "block";
						getElementsByClass('songUP')[0].style.display = "block";
						getElementsByClass('songUP')[1].style.display = "block";
					}	
				};
			</script>
		</div>
		<!--
		<hr>
		<div class="row content-row">	
			<h1 class="text-center">I am still updating...</h1>
			<p class="text-center">The rest of my projects will come soon.</p>
		</div>-->
		<br>
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
		  (adsbygoogle = window.adsbygoogle || []).push({
		    google_ad_client: "ca-pub-5131845440627870",
		    enable_page_level_ads: true
		  });
		</script>
		<br>
		<img id="eurobeat"  src="img/eurobeat.png">
		<br>
		<p class="text-center text-muted small">This website has no affiliation with the Initial D brand nor any of the artists of the songs. I do not own the songs and they are used for the purpose of parody.</p>
	</div>
	<div class="col-sm-3"></div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
