import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

import "./css/responsive.css";

try {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    </StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  document.getElementById("root").innerHTML = `<div style="color: red; padding: 20px; font-family: monospace; white-space: pre-wrap;"><h1>Error:</h1><pre>${error.toString()}\n\n${error.stack}</pre></div>`;
}
