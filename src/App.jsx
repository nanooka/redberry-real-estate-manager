import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
