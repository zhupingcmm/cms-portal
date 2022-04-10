import { render } from "react-dom";
import "./style/index.scss";
import "antd/dist/antd.css";
import { AppProviders } from "@src/context";
import { App } from "@src/app";
import { ErrorBoundary } from "./components/error-boundary";
import { ErrorPage } from "./components/screens/error-page";
import { Profiler } from "./components/profiler";

render(
  <AppProviders>
    <ErrorBoundary fallbackRender={ErrorPage}>
      <App />
    </ErrorBoundary>
  </AppProviders>,
  document.getElementById("root")
);
