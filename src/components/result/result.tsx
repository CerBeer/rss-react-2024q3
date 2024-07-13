import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { People } from "../../api/swapiTypes";
import ErrorPage from "../../routes/errorPage";
import Cards from "../../routes/cards";
import SwapiCard, { loader as characterLoader } from "../swapiCard/swapiCard";

interface Props {
  people: People;
}

function Result({ people }: Props) {
  function loader(): People {
    return people;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Cards />,
      errorElement: <ErrorPage />,
      loader,
      children: [
        {
          path: "character/:id",
          element: <SwapiCard />,
          loader: characterLoader,
        },
      ],
    },
  ]);

  const peopleNow = people;
  if (!peopleNow.length)
    return (
      <div className="search-result">
        <div className="cart">
          <b>Result is empty</b>
        </div>
      </div>
    );
  return (
    <div className="search-result">
      <RouterProvider router={router} />
    </div>
  );
}

export default Result;
