import { html } from "hono/html";

export function UploadButton(props: {
  cssId: string;
  label: string;
  accepts: string;
  formName: string;
}) {
  const { cssId, label, accepts, formName } = props;
  const labelClass = `${cssId}-label`;
  return (
    <>
      <label for={cssId} id={labelClass}>
        <i class="fa fa-upload" />
        {label}
      </label>
      <input type="file" id={cssId} name={formName} accepts={accepts} />
      {html`
        <script>
          document.getElementById("${cssId}").onchange = () => {
            const val =
              document.getElementById("${cssId}")?.files[0]?.name ?? "";
            console.log(val);
            document.getElementById("${labelClass}").childNodes[1].textContent =
              val === "" ? "${label}" : val;
          };
        </script>
      `}
    </>
  );
}
