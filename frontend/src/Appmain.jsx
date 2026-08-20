import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website
import Website from "./Website/src/Appweb";

// Admin
import Admin from "./Admin Dashboard/src/Appadmin";

// Admin Login
import Login from "./Admin Dashboard/src/Components/LoginSignup.jsx/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            ADMIN LOGIN
        ========================= */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            ADMIN DASHBOARD
        ========================= */}
        <Route path="/admin/*" element={<Admin />} />

        {/* =========================
            WEBSITE
        ========================= */}
        <Route path="/*" element={<Website />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;