import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website
import Website from "./Website/src/Appweb";

// Admin
import Admin from "./Admin Dashboard/src/Appadmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website */}
        <Route path="/*" element={<Website />} />

        {/* Admin */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;