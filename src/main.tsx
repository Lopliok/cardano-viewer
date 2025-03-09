import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Home";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Address from "./pages/Address";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="address" element={<Address />} />
      </Route>


    </Routes>
  </BrowserRouter>
);
