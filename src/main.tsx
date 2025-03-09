import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Address from "./pages/Address";
import { StoreProvider } from "./context/Context";
import Account from "./pages/Account";



const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StoreProvider initialState={{ walletAddress: "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23" }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="address" element={<Address />} />
        </Route>
      </Routes>
    </StoreProvider>
  </BrowserRouter>
);
