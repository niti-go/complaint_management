import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Submit from "./pages/Submit";
import Admin from "./pages/Admin";
import Test from "./pages/Test";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/submit" element={<Submit />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
