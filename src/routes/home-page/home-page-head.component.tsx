export function HomePageHead(props: { title: string }) {
  const { title } = props;
  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{title}</title>

      <link href="styles/style.css" rel="stylesheet" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
  );
}
