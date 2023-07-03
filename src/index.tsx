import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider } from "./Example";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider />
  </React.StrictMode>
);