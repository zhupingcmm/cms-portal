import { render } from "react-dom";
import "./style/index.scss";
import "antd/dist/antd.css";
import { AppProviders } from "@src/context";
import { App } from "@src/app";

render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
