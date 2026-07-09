import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

window.app.initialized().then((client) => {
  const container = document.getElementById("root");
  if (!container) return;

  createRoot(container).render(
    <StrictMode>
      <App client={client} />
    </StrictMode>,
  );
  client.instance.resize({ height: "400px" });
});
