import { html } from "hono/html";

export function HomePageHead(props: { title: string; description: string }) {
  const { title, description } = props;
  return (
    <head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <script src="https://unpkg.com/htmx.org@1.9.5" />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NRF6E5V374"
      />
      {html`<script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-NRF6E5V374");
      </script>`}

      <link href="styles/style.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
  );
}
