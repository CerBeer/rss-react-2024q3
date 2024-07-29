import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import App from "./App";
import Card from "./components/card/card";
import ErrorPage from "./components/errorPage/errorPage";
import "./index.css";

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page?" element={<App />}>
            <Route path="card/:elementId" element={<Card />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
