import React, { useEffect, useState } from "react";
import "./Contact.css";
import contactImage from "../../assets/contact.jpg";
const Contact = () => {

  const [contactHero, setContactHero] = useState({
    subtitle: "CONTACT US",
    title1: "Let's Build",
    title2: "Something",
    highlight: "Great.",
    description:
      "Have a project in mind or need more information about our services? Our team is ready to assist you.",
    image: "",
  });

  const [contactBanner, setContactBanner] = useState({
    title1: "We're Just a",
    highlight1: "Call",
    title2: "or Message",
    highlight2: "Away.",
    description:
      "Whether you have a question, need a consultation, or want to collaborate, we're here to help.",
    image: "",
    features: [
      {
        icon: "🎧",
        title: "Quick Response",
        description: "We value your time and respond quickly."
      },
      {
        icon: "🛡️",
        title: "Confidential & Secure",
        description: "Your information is safe with us."
      },
      {
        icon: "👥",
        title: "Expert Assistance",
        description: "Our team of experts is always ready to help."
      },
      {
        icon: "🤝",
        title: "Long Term Partnership",
        description: "We believe in building lasting relationships."
      }
    ]
  });

  const [locations] = useState([
    {
      city: "GURUGRAM",
      company: "KADEN KOPPERS",
      address: [
        "Plot No. 187, Om Vihar-II,",
        "Sector 23A,",
        "Gurugram - 122017",
      ],
    },
    {
      city: "NOIDA",
      company: "KADEN KOPPERS",
      address: [
        "A8, 1004, Nirala Aspire,",
        "Sector 16, Noida West,",
        "Noida - 201305",
      ],
    },
    {
      city: "GHAZIABAD",
      company: "KADEN KOPPERS",
      address: [
        "Plot No. 660, Shakti Khand,",
        "Indirapuram,",
        "Ghaziabad - 201014",
      ],
    },
    {
      city: "LUCKNOW",
      company: "KADEN KOPPERS",
      address: [
        "Plot No. 133, Janakipuram,",
        "Lucknow",
        "Uttar Pradesh - 226021",
      ],
    },
    {
      city: "VARANASI",
      company: "KADEN KOPPERS",
      address: [
        "Plot No. 5, Street No. 5,",
        "Mahmoorganj",
        "Varanasi - 221010",
      ],
    },
    {
      city: "SAHARANPUR",
      company: "KADEN KOPPERS",
      address: [
        "Kali Mandir Chowk",
        "Saharanpur",
        "Uttar Pradesh - 247001",
      ],
    },
    {
      city: "JAIPUR",
      company: "KADEN KOPPERS",
      address: [
        "Plot No. 26, Street No. 83",
        "Tonk Road",
        "Rajasthan - 302018",
      ],
    },
    {
      city: "CHANDIGARH",
      company: "KADEN KOPPERS",
      address: [
        "House No.336/12",
        "Sector 8, Panchkula",
        "Haryana - 134109",
      ],
    },
    {
      city: "BANGALORE",
      company: "KADEN KOPPERS",
      address: [
        "No.10, Maruthi Arcade",
        "Krishna Layout",
        "Karnataka - 560076",
      ],
    },
    {
      city: "MUMBAI",
      company: "KADEN KOPPERS",
      address: [
        "9, Near Shelter Builders",
        "Sector 15, Nerul",
        "Maharashtra - 400706",
      ],
    },
  ]);

  useEffect(() => {

    const savedHero = JSON.parse(localStorage.getItem("contactHero"));

    if (savedHero) {
      setContactHero(savedHero);
    }

    const savedBanner = JSON.parse(localStorage.getItem("contactBanner"));

    if (savedBanner) {
      setContactBanner(savedBanner);
    }

  }, []);

  return (
  <div className="contact-page">

    {/* ================= HERO ================= */}

     <section className="contact-hero">

  <img
    src={contactImage}
    alt="Contact"
    className="contact-bg"
  />

</section>

    {/* ================= CONTACT SECTION ================= */}

    <section className="contact-section">

      {/* LEFT */}

      <div className="contact-info">

        <h2>Get in Touch</h2>

        <div className="section-line"></div>

        <p>
          Reach out to us through any of the following channels.
        </p>

        <div className="info-grid">

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+91 9876543210</p>
            <p>+91 9876543211</p>
          </div>

          <div className="info-card">
            <div className="info-icon">✉️</div>
            <h3>Email</h3>
            <p>info@company.com</p>
            <p>support@company.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Head Office</h3>
            <p>
              123 Business Park
              <br />
              Sector 62
              <br />
              Noida
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🕒</div>
            <h3>Business Hours</h3>
            <p>Mon - Sat</p>
            <p>9:30 AM - 6:30 PM</p>
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="contact-form">

        <div className="contact-form-box">

          <h2>Send us a Message</h2>

          <p>
            Fill out the form and our team will get back to you shortly.
          </p>

          <form>

            <div className="row">

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Your Email"
              />

            </div>

            <select>

              <option>Subject / Department</option>
              <option>Sales</option>
              <option>Support</option>
              <option>HR</option>

            </select>

            <input
              type="text"
              placeholder="Phone Number"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">
              SEND MESSAGE
            </button>

          </form>

        </div>

      </div>

    </section>
        {/* ================= SECONDARY LOCATIONS ================= */}

    <section className="locations-section">

      <div className="locations-header">

        <h2>Our Secondary Locations</h2>

      </div>

      <div className="locations-grid">

        {locations.map((location, index) => (

          <div
            className="location-card"
            key={index}
          >

            <div className="location-city">

              {location.city}

            </div>

            <h4>{location.company}</h4>

            {location.address.map((line, i) => (

              <p key={i}>{line}</p>

            ))}

          </div>

        ))}

      </div>

    </section>

    {/* ================= CONTACT BANNER ================= */}

   <section className="contact-banner">

  <div className="contact-banner-content">

    {/* LEFT */}

    <div className="banner-left">

      <h2>
        {contactBanner.title1}
        <span> {contactBanner.highlight1}</span>
        <br />
        {contactBanner.title2}
        <span> {contactBanner.highlight2}</span>
      </h2>

      <p>{contactBanner.description}</p>

    </div>

    {/* CENTER LINE */}

    <div className="banner-divider"></div>

    {/* RIGHT */}

    <div className="banner-right">

      {contactBanner.features.map((item, index) => (

        <div className="banner-item" key={index}>

          <div className="banner-icon">
            {item.icon}
          </div>

          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>

        </div>

      ))}

    </div>

  </div>

</section>

  </div>
);

};

export default Contact;