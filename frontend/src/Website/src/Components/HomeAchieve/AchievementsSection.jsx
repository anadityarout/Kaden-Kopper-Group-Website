import React from "react";
import "./AchievementsSection.css";
import {
  Building2,
  CalendarCheck,
  Users,
  Trophy,
  Landmark,
} from "lucide-react";

const achievements = [
  { icon: Building2, value: "15+", label: "Cities" },
  { icon: CalendarCheck, value: "100+", label: "Projects Completed" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Trophy, value: "25+", label: "Awards Won" },
  { icon: Landmark, value: "10M+", label: "Sq. Ft. Delivered" },
];

const AchievementsSection = () => {
  return (
    <section className="rk-ach-section">

      <div className="rk-ach-header">
        <span className="rk-ach-subtitle">— OUR ACHIEVEMENTS —</span>
      </div>

      <div className="rk-ach-row">

        {achievements.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="rk-ach-item" key={index}>
              <Icon size={30} className="rk-ach-icon" />
              <div className="rk-ach-text">
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default AchievementsSection;