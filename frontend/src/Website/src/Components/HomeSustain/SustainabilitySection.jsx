import React from "react";
import "./SustainabilitySection.css";
import { Leaf, Users, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Environment",
    desc: "Eco-friendly materials & green practices",
  },
  {
    icon: Users,
    title: "Social",
    desc: "Empowering communities & creating impact",
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    desc: "Ethical practices & transparent governance",
  },
];

const SustainabilitySection = () => {
  return (
    <section className="rk-sus-section">

      <div className="rk-sus-left">

        <div className="rk-sus-header">
          <span className="rk-sus-subtitle">SUSTAINABILITY &amp; CSR</span>
          <h2>Building a Better Future</h2>
        </div>

        <div className="rk-sus-row">

          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="rk-sus-item" key={index}>
                <Icon size={28} className="rk-sus-icon" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            );
          })}

        </div>

      </div>

      <div className="rk-sus-right">
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop"
          alt="Sustainability"
        />
      </div>

    </section>
  );
};

export default SustainabilitySection;