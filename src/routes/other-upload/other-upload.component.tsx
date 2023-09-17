export function OtherUpload() {
  return (
    <>
      <label for="song-upload">
        <i class="fa fa-upload" />
        Select a song to upload
      </label>
      <input
        type="file"
        name="audio"
        id="song-upload"
        class="song-upload-form"
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
