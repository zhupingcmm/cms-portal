import { render } from "react-dom";
import "./style/index.scss";
import "antd/dist/antd.css";
import { UnauthenticatedApp } from "@src/unauthenticated-app";
const App = () => {
  console.log(process.env.REACT_APP_API_URL);
  return <UnauthenticatedApp />;
};

render(<App />, document.getElementById("root"));
