import React, { useEffect, useRef, useState } from "react";
import "./Counting.css";
import {
  Building2,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  UserRound,
} from "lucide-react";

const counterData = [
  {
    id: 1,
    icon: <Building2 size={45} />,
    value: 11,
    suffix: "",
    title: "Companies",
  },
  {
    id: 2,
    icon: <Users size={45} />,
    value: 6,
    suffix: "+",
    title: "Industries",
  },
  {
    id: 3,
    icon: <BriefcaseBusiness size={45} />,
    value: 100,
    suffix: "+",
    title: "Major Projects",
  },
  {
    id: 4,
    icon: <CalendarDays size={45} />,
    value: 10,
    suffix: "+",
    title: "Years of Excellence",
  },
  {
    id: 5,
    icon: <UserRound size={45} />,
    value: 500,
    suffix: "+",
    title: "Experts",
  },
];

const CounterItem = ({ item, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let current = 0;

    const duration = 10000; // 10 seconds
    const increment = item.value / (duration / 30);

    const timer = setInterval(() => {
      current += increment;

      if (current >= item.value) {
        setCount(item.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [item.value, startAnimation]);

  return (
    <div className="counter-item">
      <div className="counter-icon">
        {item.icon}
      </div>

      <div className="counter-text">
        <h2>
          {count}
          {item.suffix}
        </h2>

        <p>{item.title}</p>
      </div>
    </div>
  );
};

const Counting = ({ isVideo }) => {
  const sectionRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`counting-section ${
        isVideo ? "video-counting" : "image-counting"
      }`}
    >
      <div className="counting-container">
        {counterData.map((item) => (
          <CounterItem
            key={item.id}
            item={item}
            startAnimation={startAnimation}
          />
        ))}
      </div>
    </section>
  );
};

export default Counting;