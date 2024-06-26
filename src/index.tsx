import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import HeaderProvider from "./providers/HeaderProvider";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </Provider>
  </BrowserRouter>
);
