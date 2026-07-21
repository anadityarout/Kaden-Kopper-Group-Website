 import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Homeslider from "./Components/Home/Homeslider";
import Counting from "./Components/Counting/Counting";
import Companies from "./Components/Company/Company";
import Project from "./Components/Catagory/Project";
import About from "./Components/About/About";
import Industries from "./Components/Industries/Industries";
import CompanyPage from "./Components/Companypage/CompanyPage";
import ProjectDetails from "./Components/Projects/ProjectDetails";
import Career from "./Components/CareerPage/Career";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

function Home() {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <>
      <Homeslider setIsVideo={setIsVideo} />
      <Counting isVideo={isVideo} />
      <Companies />
      <Project />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/industries" element={<Industries />} />

        <Route path="/companies" element={<CompanyPage />} />

        {/* Project Details */}
        <Route path="/projects" element={<ProjectDetails />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
            <Footer />

    </>
  );
}

export default App;