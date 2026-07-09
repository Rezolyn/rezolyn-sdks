import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const client = window.ZAFClient.init();
const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App client={client} />
    </StrictMode>,
  );
}
