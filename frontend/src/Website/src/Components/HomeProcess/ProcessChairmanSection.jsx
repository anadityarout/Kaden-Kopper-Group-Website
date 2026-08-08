import React from "react";
import "./ProcessChairmanSection.css";
import founderImage from "../../assets/founder.png";

const steps = [
  {
    number: "01",
    title: "Plan",
    desc: "Understanding needs",
  },
  {
    number: "02",
    title: "Design",
    desc: "Conceptualization & planning",
  },
  {
    number: "03",
    title: "Engineer",
    desc: "Detailed engineering & approvals",
  },
  {
    number: "04",
    title: "Build",
    desc: "Construction with precision",
  },
  {
    number: "05",
    title: "Deliver",
    desc: "Quality delivery & support",
  },
];

const ProcessChairmanSection = () => {
  return (
    <section className="rk-pc-section">

      {/* LEFT: OUR PROCESS */}
      <div className="rk-pc-process">

        <span className="rk-pc-subtitle">
          OUR PROCESS
        </span>

        <div className="rk-pc-steps">

          {steps.map((step, index) => (
            <React.Fragment key={index}>

              <div className="rk-pc-step">

                <div className="rk-pc-circle">
                  {step.number}
                </div>

                <h4>
                  {step.title}
                </h4>

                <p>
                  {step.desc}
                </p>

              </div>

              {index < steps.length - 1 && (
                <div className="rk-pc-dots"></div>
              )}

            </React.Fragment>
          ))}

        </div>

      </div>


      {/* RIGHT: CHAIRMAN'S MESSAGE */}
      <div className="rk-pc-chairman">

        <div className="rk-pc-chairman-text">

          <span className="rk-pc-subtitle">
            CHAIRMAN'S MESSAGE
          </span>

          <div className="rk-pc-quote-mark">
            "
          </div>

          <p className="rk-pc-quote">
            At Kaden Kopper Group, we don't just build structures;
            we build trust, relationships and a legacy of excellence.
            Our vision is to create sustainable spaces that inspire
            generations to come.
          </p>

         

          <h4 className="rk-pc-name">
            Mr Vinay Gupta
          </h4>

          <p className="rk-pc-role">
            Managing Director, Kaden Kopper Group
          </p>

        </div>


        {/* FOUNDER IMAGE */}
        <div className="rk-pc-chairman-photo">

          <img
            src={founderImage}
            alt="Mr Vinay Gupta"
          />

        </div>

      </div>

    </section>
  );
};

export default ProcessChairmanSection;