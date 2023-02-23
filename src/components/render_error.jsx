export default function RenderError({ errorMessage }) {
  if (errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Error!</strong> {errorMessage}.
      </div>
    );
  }
  return <></>;
}
