import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div id="error-page" className="root-theme">
      <h1>404</h1>
      <h2>Oops!</h2>
      <p>Sorry, the page is not found.</p>
      <p>
        <button type="button" onClick={() => navigate(-1)}>
          &larr; Go back
        </button>
      </p>
      <p>
        <button type="button" onClick={() => navigate(`/`)}>
          &larr; Go home
        </button>
      </p>
    </div>
  );
}
