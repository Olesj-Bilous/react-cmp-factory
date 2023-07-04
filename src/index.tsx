import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxExample } from "./ReduxExample";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxExample />
  </React.StrictMode>
);