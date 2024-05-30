import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Aside from "./components/Aside";
import Index from "./pages/Table/Index";
import Graph from "./pages/Graph/Graph";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  axios.defaults.baseURL = `http://localhost:4000`;
  axios.defaults.withCredentials = true;
  const location = useLocation().pathname;
  return (
    <main>
      {location === "/" || location === "/signup" ? null : <Aside />}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Index />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </main>
  );
}

export default App;
