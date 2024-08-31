import { SONGS } from "utils/constants";
import { HomePageHead } from "./home-page-head.component";
import { html } from "hono/html";
import { UploadButton } from "./upload-button.component";

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
                <a href="https://mdionne.me?utm_source=dorifto.racing&utm_medium=Index&utm_campaign=Aug2024">
                  Website
                </a>
              </h2>
            </span>
          </header>
          <main>
            <div class="loading-modal htmx-indicator">
              <div>
                <div class="uploading-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <h2>Overlay your favorite eurobeat onto videos!</h2>
            <form
              hx-post="/upload"
              hx-target="main"
              hx-indicator='.loading-modal, main form > input[type="submit"]'
              method="post"
              enctype="multipart/form-data"
            >
              <UploadButton
                label="Select a video to upload"
                cssId="video-upload"
                formName="video"
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
                {SONGS.map((song, i) => (
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
              <input type="submit" value="NANI? PANDA TRUENO??" name="submit" />
            </form>
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
