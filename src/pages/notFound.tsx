import { useNavigate } from "react-router-dom";
import Wrapper from "../wrapper";
import "./notFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="not-found">
        <h1>404</h1>
        <h2>Oops!</h2>
        <h3>Sorry, the page is not found.</h3>
        <p>
          <button type="button" onClick={() => navigate(`/`)}>
            &larr; Go home
          </button>
        </p>
      </div>
    </Wrapper>
  );
}
