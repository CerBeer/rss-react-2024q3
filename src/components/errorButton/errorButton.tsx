import { useEffect, useState } from "react";

function ErrorButton() {
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error("Something went wrong...");
    }
  }, [error]);

  return (
    <button type="button" className="button-throw-error" onClick={handleClick}>
      Throw Error
    </button>
  );
}

export default ErrorButton;
