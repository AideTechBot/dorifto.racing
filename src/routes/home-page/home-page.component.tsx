import { HomePageHead } from "./home-page-head.component";
import { html } from "hono/html";

const SONG_OPTIONS = [
  "DEJA VU",
  "RUNNING IN THE 90S",
  "NIGHT OF FIRE",
  "BACK ON THE ROCKS",
  "DANCING (COOL VIBRATIONS)",
  "DOGFIGHT",
  "HEARTBEAT",
  "I NEED YOUR LOVE",
  "LOVE IS IN DANGER",
  "NO ONE SLEEP IN TOKYO",
  "RAGE YOUR DREAMS",
  "REMEMBER ME",
  "OTHER",
];

export function HomePage() {
  return (
    <>
      {html`<!doctype html>`}
      <html lang="en">
        <HomePageHead
          title="DORIFTO - eurobeat generator"
          description="Overlay eurobeat over your favorite videos!"
        />
        <body>
          {/* <!--google analytics-->
      <?php include_once("analyticstracking.php") ?>
     */}
          <header>
            <h1>
              <img
                src="img/header.png"
                alt="Dorifto Racing website text logo"
                id="logo"
              />
            </h1>
            <span>
              <h2>
                <i class="fa fa-github"></i>
                <a href="https://github.com/AideTechBot">Github</a>
              </h2>
              <h2>
                <i class="fa fa-twitter"></i>
                <a href="https://twitter.com/AideTechBot">Twitter</a>
              </h2>
              <h2>
                <i class="fa fa-globe"></i>
                <a href="https://mdionne.me">Website</a>
              </h2>
            </span>
          </header>
          <main>
            <h2>Overlay your favorite eurobeat onto videos!</h2>
            <form
              action="upload.php"
              method="post"
              enctype="multipart/form-data"
            >
              <label for="video-upload">
                <i class="fa fa-upload" />
                Select a video to upload
              </label>
              <input
                type="file"
                id="video-upload"
                name="video"
                accepts="video/*"
              />
              <label for="song-select">
                <h3>Select a song or upload your own:</h3>
              </label>
              <select
                name="song"
                id="song-select"
                hx-get="/other-upload"
                hx-target=".song-upload-form"
              >
                {SONG_OPTIONS.map((song, i) => (
                  <option value={i}>{song}</option>
                ))}
              </select>
              <div class="song-upload-form" />
              <label for="climax-time">
                <h3>
                  At what time (in seconds) do you want the song to climax in
                  the video?
                </h3>
              </label>
              <input
                type="number"
                name="climax-time"
                id="climax-time"
                min="1"
              />
              <input
                type="submit"
                value="NANI? PANDA TRUENO??"
                name="submit"
                onclick="getElementsByClass('error')[0].innerHTML = 'Your download should start shortly...';"
              />
            </form>
            {/* <?php
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
        </script> */}
          </main>
          <footer>
            <img
              id="eurobeat-footer"
              src="img/eurobeat.png"
              alt="powered by 'super eurobeat' logo"
            />
            <p id="footer-notice">
              This website has no affiliation with the Initial D brand nor any
              of the artists of the songs. I do not own the songs and they are
              used for the purpose of parody.
            </p>
          </footer>
        </body>
      </html>
    </>
  );
}
