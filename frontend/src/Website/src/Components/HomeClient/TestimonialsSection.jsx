import React, { useState, useEffect } from "react";
import "./TestimonialsSection.css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Ravi Mehta", role: "The Royal Palace, Lucknow", quote: "Kaden Kopper Group delivered beyond our expectations. Their professionalism and commitment to quality is truly remarkable.", rating: 5, img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Neha Singh", role: "Heritage Banquet, Jaipur", quote: "Excellent teamwork, timely delivery and attention to detail. We highly recommend their services.", rating: 5, img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Arjun Malhotra", role: "Kaden Industries, Delhi", quote: "A trusted partner for our growth journey. Their expertise in construction and management is unmatched.", rating: 5, img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Priya Nair", role: "Grand Vista Resorts, Goa", quote: "From planning to execution, every step felt effortless. The results speak for themselves.", rating: 5, img: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Sanjay Kapoor", role: "Kapoor Estates, Mumbai", quote: "Outstanding craftsmanship and attention to every detail. A truly premium experience.", rating: 5, img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Anita Desai", role: "Desai Residences, Pune", quote: "Professional, punctual, and passionate about quality. Highly recommended.", rating: 5, img: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Rohit Sharma", role: "Sharma Group, Indore", quote: "They turned our vision into reality with precision and care.", rating: 5, img: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "Kavita Rao", role: "Rao Interiors, Hyderabad", quote: "Excellent communication throughout the project. Very happy with the outcome.", rating: 5, img: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Vikram Chauhan", role: "Chauhan Builders, Chandigarh", quote: "A team that genuinely cares about delivering excellence.", rating: 5, img: "https://randomuser.me/api/portraits/men/9.jpg" },
  { name: "Meera Iyer", role: "Iyer Constructions, Chennai", quote: "Reliable and consistent quality across every phase of the project.", rating: 5, img: "https://randomuser.me/api/portraits/women/10.jpg" },
  { name: "Aditya Verma", role: "Verma Hospitality, Jaipur", quote: "One of the best contracting experiences we've had. Truly professional.", rating: 5, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Sneha Joshi", role: "Joshi Homes, Nagpur", quote: "They exceeded our expectations at every step.", rating: 5, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Karan Malhotra", role: "Malhotra Realty, Delhi", quote: "Transparent process and top-notch execution.", rating: 5, img: "https://randomuser.me/api/portraits/men/13.jpg" },
  { name: "Divya Menon", role: "Menon Villas, Kochi", quote: "Best decision we made for our project. Highly skilled team.", rating: 5, img: "https://randomuser.me/api/portraits/women/14.jpg" },
  { name: "Manish Agarwal", role: "Agarwal Group, Kolkata", quote: "Great value for money and superior quality of work.", rating: 5, img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Pooja Bhatt", role: "Bhatt Estates, Ahmedabad", quote: "Impressed by their dedication and craftsmanship.", rating: 5, img: "https://randomuser.me/api/portraits/women/16.jpg" },
  { name: "Ramesh Iyer", role: "Iyer Group, Bangalore", quote: "A seamless experience from start to finish.", rating: 5, img: "https://randomuser.me/api/portraits/men/17.jpg" },
  { name: "Shalini Reddy", role: "Reddy Homes, Hyderabad", quote: "Truly a royal experience, matching their name.", rating: 5, img: "https://randomuser.me/api/portraits/women/18.jpg" },
  { name: "Nitin Khanna", role: "Khanna Constructions, Delhi", quote: "Reliable partners for large scale projects.", rating: 5, img: "https://randomuser.me/api/portraits/men/19.jpg" },
  { name: "Ritu Saxena", role: "Saxena Interiors, Lucknow", quote: "Beautiful design work, exceeded our vision.", rating: 5, img: "https://randomuser.me/api/portraits/women/20.jpg" },
  { name: "Arvind Pillai", role: "Pillai Group, Chennai", quote: "Excellent quality control throughout construction.", rating: 5, img: "https://randomuser.me/api/portraits/men/21.jpg" },
  { name: "Nisha Kulkarni", role: "Kulkarni Estates, Pune", quote: "Attention to detail was outstanding.", rating: 5, img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Suresh Nair", role: "Nair Builders, Kochi", quote: "A trustworthy team with great craftsmanship.", rating: 5, img: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Anjali Mishra", role: "Mishra Residences, Bhopal", quote: "Delivered exactly what was promised, on time.", rating: 5, img: "https://randomuser.me/api/portraits/women/24.jpg" },
  { name: "Deepak Bansal", role: "Bansal Group, Delhi", quote: "Very professional and easy to work with.", rating: 5, img: "https://randomuser.me/api/portraits/men/25.jpg" },
  { name: "Swati Kapoor", role: "Kapoor Villas, Gurgaon", quote: "The finish quality is unmatched in the industry.", rating: 5, img: "https://randomuser.me/api/portraits/women/26.jpg" },
  { name: "Rajeev Chandra", role: "Chandra Infra, Noida", quote: "Excellent project management and communication.", rating: 5, img: "https://randomuser.me/api/portraits/men/27.jpg" },
  { name: "Priyanka Rao", role: "Rao Estates, Vizag", quote: "A luxurious feel to every finished detail.", rating: 5, img: "https://randomuser.me/api/portraits/women/28.jpg" },
  { name: "Anil Kumar", role: "Kumar Group, Patna", quote: "Great support team, very responsive.", rating: 5, img: "https://randomuser.me/api/portraits/men/29.jpg" },
  { name: "Geeta Sharma", role: "Sharma Homes, Jaipur", quote: "Professional finish and timely delivery.", rating: 5, img: "https://randomuser.me/api/portraits/women/30.jpg" },
  { name: "Harish Patel", role: "Patel Constructions, Surat", quote: "Impressed with their engineering expertise.", rating: 5, img: "https://randomuser.me/api/portraits/men/31.jpg" },
  { name: "Isha Chatterjee", role: "Chatterjee Interiors, Kolkata", quote: "Beautiful design sensibility, very talented team.", rating: 5, img: "https://randomuser.me/api/portraits/women/32.jpg" },
  { name: "Manoj Tiwari", role: "Tiwari Group, Lucknow", quote: "A team that delivers on their promises.", rating: 5, img: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Reena Gupta", role: "Gupta Estates, Delhi", quote: "Would definitely work with them again.", rating: 5, img: "https://randomuser.me/api/portraits/women/34.jpg" },
  { name: "Ashok Reddy", role: "Reddy Constructions, Hyderabad", quote: "Excellent execution across multiple sites.", rating: 5, img: "https://randomuser.me/api/portraits/men/35.jpg" },
  { name: "Tanvi Shah", role: "Shah Interiors, Ahmedabad", quote: "Loved working with such a dedicated team.", rating: 5, img: "https://randomuser.me/api/portraits/women/36.jpg" },
  { name: "Sameer Khan", role: "Khan Builders, Bhopal", quote: "Impressive craftsmanship and design work.", rating: 5, img: "https://randomuser.me/api/portraits/men/37.jpg" },
  { name: "Vidya Menon", role: "Menon Group, Kochi", quote: "Every detail was handled with great care.", rating: 5, img: "https://randomuser.me/api/portraits/women/38.jpg" },
  { name: "Rakesh Yadav", role: "Yadav Realty, Kanpur", quote: "A dependable and skilled team of professionals.", rating: 5, img: "https://randomuser.me/api/portraits/men/39.jpg" },
  { name: "Namrata Joshi", role: "Joshi Estates, Nagpur", quote: "Great finish and timely project completion.", rating: 5, img: "https://randomuser.me/api/portraits/women/40.jpg" },
  { name: "Vivek Anand", role: "Anand Group, Chennai", quote: "The team's expertise made all the difference.", rating: 5, img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Kiran Bose", role: "Bose Interiors, Kolkata", quote: "Highly satisfied with the overall experience.", rating: 5, img: "https://randomuser.me/api/portraits/women/42.jpg" },
  { name: "Yogesh Pandey", role: "Pandey Constructions, Varanasi", quote: "Delivered a truly premium result.", rating: 5, img: "https://randomuser.me/api/portraits/men/43.jpg" },
  { name: "Alka Verma", role: "Verma Estates, Lucknow", quote: "Professional team with great attention to detail.", rating: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Pradeep Singh", role: "Singh Group, Jaipur", quote: "Reliable partners from concept to completion.", rating: 5, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Shruti Malhotra", role: "Malhotra Homes, Delhi", quote: "Great communication and consistent quality.", rating: 5, img: "https://randomuser.me/api/portraits/women/46.jpg" },
  { name: "Naveen Kumar", role: "Kumar Constructions, Bangalore", quote: "A team that truly understands luxury design.", rating: 5, img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "Payal Agarwal", role: "Agarwal Interiors, Indore", quote: "Exceptional service and beautiful results.", rating: 5, img: "https://randomuser.me/api/portraits/women/48.jpg" },
  { name: "Girish Rao", role: "Rao Builders, Mysore", quote: "Consistent quality across every project phase.", rating: 5, img: "https://randomuser.me/api/portraits/men/49.jpg" },
  { name: "Simran Kaur", role: "Kaur Estates, Chandigarh", quote: "A truly professional and skilled team.", rating: 5, img: "https://randomuser.me/api/portraits/women/50.jpg" },
];

const TestimonialsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCount = 3;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(testimonials[(startIndex + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="rk-ts-section">

      <div className="rk-ts-header">
        <span className="rk-ts-subtitle">CLIENT TESTIMONIALS</span>
        <h2>What Our Clients Say</h2>
      </div>

      <div
        className="rk-ts-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        <button className="rk-ts-arrow rk-ts-arrow-left" onClick={handlePrev}>
          <ChevronLeft size={20} />
        </button>

        <div className="rk-ts-row">

          {getVisible().map((item, index) => (
            <div
              className={`rk-ts-card ${index === 1 ? "rk-ts-card-active" : ""}`}
              key={`${item.name}-${index}`}
            >
              <div className="rk-ts-quote-mark">&ldquo;</div>

              <p className="rk-ts-quote">{item.quote}</p>

              <div className="rk-ts-profile">

                <img
                  className="rk-ts-avatar"
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                />

                <div className="rk-ts-profile-text">
                  <h4 className="rk-ts-name">{item.name}</h4>
                  <p className="rk-ts-role">{item.role}</p>
                </div>

              </div>

              <div className="rk-ts-stars">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#C89A2B" stroke="#C89A2B" />
                ))}
              </div>

            </div>
          ))}

        </div>

        <button className="rk-ts-arrow rk-ts-arrow-right" onClick={handleNext}>
          <ChevronRight size={20} />
        </button>

      </div>

      

    </section>
  );
};

export default TestimonialsSection;