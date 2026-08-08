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
import IndustriesSection from "./Components/HomeIndustries/IndustriesSection";
import AchievementsSection from "./Components/HomeAchieve/AchievementsSection";
import WhyChooseSection from "./Components/HomeWhyChoose/WhyChooseSection";
import ProcessChairmanSection from "./Components/HomeProcess/ProcessChairmanSection";
import PartnersSection from "./Components/Client/PartnersSection";
import JurneySection from "./Components/HomeJourney/JourneySection";
import PresenceSection from "./Components/HomePresence/PresenceSection";
import TestimonialsSection from "./Components/HomeClient/TestimonialsSection";
import AwardsSection from "./Components/Awards/AwardsSection";
import SustainabilitySection from "./Components/HomeSustain/SustainabilitySection";
import CtaSection from "./Components/HomeCta/CtaSection";
import Service from "./Components/Service/Service";
import { useState } from "react";

function Home() {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <>
      <Homeslider setIsVideo={setIsVideo} />
      <Counting isVideo={isVideo} />
      <Companies />
      <IndustriesSection />
      <Project />
      <WhyChooseSection />
      <ProcessChairmanSection />
            <AchievementsSection />
            <JurneySection />
            <PresenceSection />
            <AwardsSection />
            <TestimonialsSection />
            <SustainabilitySection />
            <PartnersSection />
            <CtaSection />

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
        <Route path="/services" element={<Service />} />

      </Routes>
            <Footer />

    </>
  );
}

export default App;