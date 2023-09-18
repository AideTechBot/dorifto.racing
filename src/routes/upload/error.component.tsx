export function ErrorComponent(props: { message: string }) {
  const { message } = props;
  return (
    <>
      <h2>{message}</h2>
      <h3>
        <a href="/">Try again.</a>
      </h3>
    </>
  );
}
