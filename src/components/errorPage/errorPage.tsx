import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  // const error = useRouteError() as RouteError;
  // eslint-disable-next-line no-console
  // console.error(error);

  return (
    <div id="error-page">
      <h1>404</h1>
      <h2>Oops!</h2>
      <p>Sorry, the page is not found.</p>
      <button type="button" onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    </div>
  );
}
