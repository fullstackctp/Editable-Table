import logo from "./logo.svg";
import "./App.css";
import User from "./components/User";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App" style={{ marginTop: "20px" }}>
      <User />
      <Toaster toastOptions={{ className: "react-hot-toast" }} />
    </div>
  );
}

export default App;
