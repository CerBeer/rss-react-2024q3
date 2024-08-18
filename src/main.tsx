import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Submits from "./pages/submits";
import Regular from "./pages/regular";
import Controlled from "./pages/controlled";
import NotFound from "./pages/notFound";
import "./main.css";

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Submits />} />
          <Route path="/regular" element={<Regular />} />
          <Route path="/controlled" element={<Controlled />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
