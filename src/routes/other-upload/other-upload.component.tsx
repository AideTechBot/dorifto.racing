import { UploadButton } from "../home-page/upload-button.component";

export function OtherUpload() {
  return (
    <>
      <UploadButton
        label="Select a song to upload"
        cssId="song-upload"
        accepts="audio/*"
        formName="audio"
      />
      <label for="song-drop" class="song-upload-form">
        <h3 id="song-upload-label">At what time does the song climax?</h3>
      </label>
      <input
        type="number"
        name="song-drop"
        id="song-drop"
        min="1"
        class="song-upload-form"
      />
    </>
  );
}
