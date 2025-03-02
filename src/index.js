import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./Css/base/media.css";
import "./Css/component/form.css";
import WindowContext from "./Context/WindowContext";
import CartChangerContext from "./Context/CartChangerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <CartChangerContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartChangerContext>
    </WindowContext>
  </React.StrictMode>
);
