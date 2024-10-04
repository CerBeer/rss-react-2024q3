import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Submits from "./pages/submits";
import Regular from "./pages/regular";
import Controlled from "./pages/controlled";
import NotFound from "./pages/notFound";
import "./main.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Submits />} />
      <Route path="/regular" element={<Regular />} />
      <Route path="/controlled" element={<Controlled />} />
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
