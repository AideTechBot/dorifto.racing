export function HomePageHead(props: { title: string; description: string }) {
  const { title, description } = props;
  return (
    <head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <script src="https://unpkg.com/htmx.org@1.9.5" />

      <link href="styles/style.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
  );
}
