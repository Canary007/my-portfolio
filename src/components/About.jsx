import { useEffect, useRef } from "react";

const skills = [
  "UI Architecture",
  "TDD Practices",
  "Code Reviews",
  "REST API Integration",
  "CI/CD Pipelines",
  "Team Mentorship",
  "Accessibility",
  "Performance Tuning",
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          min-height: 100vh;
          background-color: #f0ece3;
          padding: 80px 60px;
          font-family: 'DM Sans', sans-serif;
          color: #2c2c2c;
          box-sizing: border-box;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 60px;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* LEFT COLUMN */
        .about-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7a7a6a;
          margin-bottom: 18px;
        }

        .about-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.15;
          color: #1e1e14;
          margin: 0 0 36px 0;
        }

        .about-heading em {
          font-style: italic;
          color: #5a7a3a;
        }

        .about-body p {
          font-size: 15px;
          line-height: 1.8;
          color: #3e3e30;
          margin: 0 0 20px 0;
          font-weight: 300;
        }

        .about-body strong {
          font-weight: 500;
          color: #1e1e14;
        }

        .about-quote {
          border-left: 3px solid #b5cc94;
          background: #e8f0d8;
          padding: 18px 24px;
          margin: 28px 0;
          border-radius: 0 6px 6px 0;
        }

        .about-quote p {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 15px;
          color: #4a6030;
          margin: 0;
          line-height: 1.7;
        }

        /* RIGHT COLUMN */
        .about-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card {
          background: #faf8f3;
          border: 1px solid #e0dbd0;
          border-radius: 10px;
          padding: 22px 24px;
        }

        .card-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9a9a88;
          margin-bottom: 12px;
        }

        /* Contact card */
        .contact-email {
          font-size: 14px;
          color: #5a7a3a;
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }

        .contact-location {
          font-size: 13px;
          color: #6e6e5e;
        }

        /* Skills card */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: #3e3e30;
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #5a7a3a;
          flex-shrink: 0;
        }

        /* Education card */
        .edu-inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .edu-icon {
          width: 38px;
          height: 38px;
          background: #e8f0d8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .edu-text {
          flex: 1;
        }

        .edu-degree {
          font-size: 14px;
          font-weight: 500;
          color: #1e1e14;
          margin-bottom: 3px;
        }

        .edu-college {
          font-size: 12px;
          color: #7a7a6a;
        }

        .edu-badge {
          font-size: 11px;
          font-weight: 500;
          background: #eaf2d8;
          color: #4a6a28;
          border: 1px solid #c4da98;
          border-radius: 20px;
          padding: 3px 10px;
          white-space: nowrap;
          align-self: center;
        }

        /* Currently card */
        .currently-text {
          font-size: 14px;
          color: #2c2c2c;
          line-height: 1.5;
        }

        /* Fade-up animation */
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up:nth-child(2) { transition-delay: 0.1s; }
        .fade-up:nth-child(3) { transition-delay: 0.2s; }
        .fade-up:nth-child(4) { transition-delay: 0.3s; }

        .card.fade-up:nth-child(1) { transition-delay: 0.05s; }
        .card.fade-up:nth-child(2) { transition-delay: 0.15s; }
        .card.fade-up:nth-child(3) { transition-delay: 0.25s; }
        .card.fade-up:nth-child(4) { transition-delay: 0.35s; }

        @media (max-width: 860px) {
          .about-section {
            padding: 60px 28px;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>
        <div className="about-grid">
          {/* LEFT COLUMN */}
          <div className="about-left">
            <p className="about-label fade-up">About Me</p>

            <h1 className="about-heading fade-up">
              Crafting interfaces
              <br />
              that <em>perform &amp; endure</em>
            </h1>

            <div className="about-body">
              <p className="fade-up">
                I'm a <strong>Senior Frontend Developer and AngularJS Lead</strong> based in
                Hyderabad, India, with over 5 years of experience building scalable,
                high-performance web applications that users actually enjoy using.
              </p>

              <p className="fade-up">
                My work sits at the intersection of clean architecture and thoughtful UX —
                I care deeply about modular component design, maintainability, and delivering
                pixel-perfect interfaces that are also fast and accessible.
              </p>

              <div className="about-quote fade-up">
                <p>
                  "I believe great frontend engineering is invisible — when it works
                  perfectly, users never notice it."
                </p>
              </div>

              <p className="fade-up">
                I've led frontend teams at <strong>IPAC</strong>, built AI-powered CMS
                platforms at <strong>Lolly.com</strong>, and mentored junior developers along
                the way. I thrive in Agile environments where collaboration, code quality,
                and continuous improvement are non-negotiable.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="about-cards">
            {/* Contact */}
            <div className="card fade-up">
              <p className="card-label">Contact</p>
              <span className="contact-email">debleenabose03@gmail.com</span>
              <span className="contact-location">+91 7890739909 · Hyderabad, India</span>
            </div>

            {/* Skills */}
            <div className="card fade-up">
              <p className="card-label">What I Bring to a Team</p>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="skill-dot" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card fade-up">
              <div className="edu-inner">
                <div className="edu-icon">🎓</div>
                <div className="edu-text">
                  <div className="edu-degree">B.Tech in Computer Science</div>
                  <div className="edu-college">
                    Jalpaiguri Government Engineering College · 2016–2019
                  </div>
                </div>
                <span className="edu-badge">CGPA 6.81</span>
              </div>
            </div>

            {/* Currently */}
            <div className="card fade-up">
              <p className="card-label">Currently</p>
              <p className="currently-text">
                AngularJS Lead at Indian Political Action Committee (IPAC)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
