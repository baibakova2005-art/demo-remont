import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/onest";
import "./index.css";

// Одна точка запуска для всех страниц многостраничного сайта.
export default function boot(Page) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
