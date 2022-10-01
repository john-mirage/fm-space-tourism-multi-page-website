import Bar from "@components/Bar";
import { FunctionComponent } from "react";
import "./style.css";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Bar className="app__bar" />
    </div>
  );
}

export default App;