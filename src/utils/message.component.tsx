export function MessageComponent(props: {
  message: string;
  linkTitle?: string;
}) {
  const { message, linkTitle = "Try again." } = props;
  return (
    <>
      <h2>{message}</h2>
      <h3 hx-boost="true">
        <a href="/">{linkTitle}</a>
      </h3>
    </>
  );
}
