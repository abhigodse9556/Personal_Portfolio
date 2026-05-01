"use client";

import { useEffect, useMemo, useState } from "react";

const sections = ["Home", "About", "Resume", "Experience", "Contact"];
const profileImages = [
  "/images/Photo/Abhi.jpg",
  "/images/Photo/Abhi_home.jpg",
  "/images/Photo/Abhi_office.jpg",
  "/images/Photo/Abhi_formals.jpg",
];
const roles = [
  "Full Stack Developer.",
  "Front End Developer.",
  "Back End Developer.",
  "Cloud Engineer.",
];
const certificateIcon = "/images/icon/certification.png";

const certificates = [
  {
    category: "web",
    issuer: "LetsUpgrade",
    name: "HTML CSS Bootcamp",
    href: "https://verify.letsupgrade.in/certificate/LUEHTMLJUL1241390",
  },
  {
    category: "programming",
    issuer: "LetsUpgrade",
    name: "Python Project Bootcamp",
    href: "https://verify.letsupgrade.in/certificate/LUEPYTJUL124784",
  },
  {
    category: "web",
    issuer: "LetsUpgrade",
    name: "JavaScript Bootcamp",
    href: "https://verify.letsupgrade.in/certificate/LUEJSJUL124381",
  },
  {
    category: "programming",
    issuer: "LetsUpgrade",
    name: "Java Project Bootcamp",
    href: "https://verify.letsupgrade.in/certificate/LUEJAVAJUL124241",
  },
  {
    category: "programming",
    issuer: "Postman",
    name: "Postman API Fundamentals",
    href: "https://api.badgr.io/public/assertions/KXMVxCpiQhKNFF2ZOmEC0g",
  },
  {
    category: "cloud",
    issuer: "Infosys Springboard",
    name: "Azure DevOps",
    href: "https://drive.google.com/file/d/143hKajmo-WjBGoZot9SM0NIEuZNCbyWn/view?usp=sharing",
  },
  {
    category: "generic",
    issuer: "Cisco",
    name: "Cyber Threat Management",
    href: "https://www.credly.com/badges/56c08cbb-797e-4feb-9b36-2dc6716b0194/linked_in_profile",
  },
  {
    category: "generic",
    issuer: "Infosys Springboard",
    name: "Windows Powershell",
    href: "https://drive.google.com/file/d/1FPeWgYApVhGVJAqWMlN2NyzZg4WBS-Is/view?usp=sharing",
  },
  {
    category: "cloud",
    issuer: "Skillsoft",
    name: "Azure Developer: Cloud Solutions",
    href: "https://skillsoft.digitalbadges.skillsoft.com/baf57489-9fa5-4b9a-8eb9-401514f7caa1",
  },
  {
    category: "cloud",
    issuer: "AWS",
    name: "AWS Educate: Cloud 101",
    href: "https://www.credly.com/badges/c8443ad0-6d44-4f59-ba2b-01c34b8c4eba/linked_in_profile",
  },
  {
    category: "cloud",
    issuer: "AWS",
    name: "AWS Knowledge: Cloud Essentials",
    href: "https://www.credly.com/badges/bb7ca894-21a6-44d4-947a-ace2a0caa2d8/linked_in_profile",
  },
  {
    category: "generic",
    issuer: "TCS iON",
    name: "Bussiness Etiquette",
    href: "https://drive.google.com/file/d/10ZyfTn3nJCTqwNH4VPf0gax58hVR4neS/view?usp=drive_link",
  },
  {
    category: "programming",
    issuer: "Cisco",
    name: "Python Essentials 1",
    href: "https://www.credly.com/badges/7386447b-d284-4bbe-851b-06f38f3b8ed1/linked_in_profile",
  },
  {
    category: "generic",
    issuer: "ICTSS",
    name: "Certificate Course in Hardware A+",
    href: "https://drive.google.com/file/d/1i1qGnZZka_wQXtBXs-B2Sped7VX-08cE/view?usp=sharing",
  },
];

function Navbar({ activeSection, setActiveSection }) {
  return (
    <nav className="navbar">
      {sections.map((section) => (
        <li key={section}>
          <button
            type="button"
            className={`nav-items ${activeSection === section ? "active" : ""}`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        </li>
      ))}
    </nav>
  );
}

function Sidebar() {
  const [imageIndex, setImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((current) => (current + 1) % profileImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className={`sidebar ${showContact ? "" : "hide-contact"}`}>
      <div className="info-content">
        <button
          className="show-contact"
          type="button"
          onClick={() => setShowContact((value) => !value)}
        >
          <i className="ri-arrow-down-double-fill" />
        </button>
        <figure className="photo">
          <img
            id="person-img"
            src={profileImages[imageIndex]}
            alt="Abhishek Godse"
          />
        </figure>
        <div className="person">
          <h1 className="name">Abhishek Godse</h1>
          <p className="title">Software Engineer</p>
        </div>
      </div>

      <div className={`sidebar-info_more ${showContact ? "" : "hide-contact"}`}>
        <div className="separator" />
        <ul className="contact-list">
          <li className="contact-items">
            <div className="icon-box">
              <img
                className="icon-img"
                id="mail-icon"
                src="/images/icon/envelope-at-fill.svg"
                alt=""
              />
            </div>
            <div className="contact-info">
              <p className="contact-title">EMAIL</p>
              <a className="contact-link" href="mailto:abhigodse9556@gmail.com">
                abhigodse9556@gmail.com
              </a>
            </div>
          </li>
          <li className="contact-items">
            <div className="icon-box">
              <img
                className="icon-img"
                src="/images/icon/telephone-fill.svg"
                alt=""
              />
            </div>
            <div className="contact-info">
              <p className="contact-title">PHONE</p>
              <a className="contact-link" href="tel:9503194613">
                9503194613
              </a>
            </div>
          </li>
          <li className="contact-items">
            <div className="icon-box">
              <img
                className="icon-img"
                src="/images/icon/calendar-date-fill.svg"
                alt=""
              />
            </div>
            <div className="contact-info">
              <p className="contact-title">BIRTH DATE</p>
              <time dateTime="2000-05-19">19 May, 2000</time>
            </div>
          </li>
          <li className="contact-items">
            <div className="icon-box">
              <img
                className="icon-img"
                src="/images/icon/geo-alt-fill.svg"
                alt=""
              />
            </div>
            <div className="contact-info">
              <p className="contact-title">LOCATION</p>
              <address>Mumbai, Maharashtra, India</address>
            </div>
          </li>
        </ul>
        <ul className="social-list">
          <li className="social-item">
            <a href="https://www.instagram.com/a_.b._.h._.i/" target="_blank">
              <img src="/images/icon/instagram.svg" alt="Instagram" />
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://www.facebook.com/abhishek.godse.735/"
              target="_blank"
            >
              <img src="/images/icon/facebook.svg" alt="Facebook" />
            </a>
          </li>
          <li className="social-item">
            <a href="https://github.com/abhigodse9556" target="_blank">
              <img src="/images/icon/github.svg" alt="GitHub" />
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/abhishek-godse-89bb9a1a0/"
              target="_blank"
            >
              <img src="/images/icon/linkedin.svg" alt="LinkedIn" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="home">
      <h3 className="home-title">Hello, It's me</h3>
      <h1 className="my-name">Abhishek Godse</h1>
      <h3 className="home-title">
        And I'm a{" "}
        <em id="element" className="text">
          {roles[roleIndex]}
        </em>
      </h3>
      <p className="home-text">
        Motivated and detail-oriented Software Developer with hands-on
        experience in developing dynamic web and mobile applications. Proficient
        in modern frameworks and languages including React.js, React Native,
        JavaScript, Node.js, and SQL, with additional expertise in API
        integration and version control using GitLab. Demonstrated ability to
        design user-friendly interfaces and solve complex bugs while working
        collaboratively in team-driven environments. Adept at problem-solving
        and consistently seeking opportunities for growth and learning.
      </p>
      <a
        href="https://drive.google.com/file/d/1btQd8Z4VA3cc0gTaoq4eO3_yvjKpcHsU/view?usp=sharing"
        target="_blank"
      >
        <div className="download">
          Download CV{" "}
          <img
            className="icon-img"
            src="/images/icon/cloud-arrow-down.svg"
            alt=""
          />
        </div>
      </a>
    </article>
  );
}

function About() {
  const services = [
    [
      "web-design.png",
      "Front End Development",
      "Skilled in designing and developing intuitive UI/UX for web and mobile applications. Proficient in modern web technologies, including React, Next.js, React Native, and HTML/CSS, to create responsive and user-friendly interfaces.",
    ],
    [
      "front-end.png",
      "Back End Development",
      "Proficient in backend development using Java, Python, Node.js, and .NET. Experienced in working with frameworks such as Spring, Hibernate, Django, and .NET MVC to build scalable, secure, and high-performance applications",
    ],
    [
      "relational.png",
      "Database Management",
      "Proficient in database management using SQL, PostgreSQL, MongoDB, and MySQL. Skilled in designing and optimizing relational databases (RDBMS) to efficiently store, manage, and secure data while ensuring consistency and performance.",
    ],
    [
      "server.png",
      "Cloud Computing",
      "Familiar with applying engineering disciplines to cloud computing to build, maintain, and optimize cloud systems. Capable for all the technical aspects of cloud computing.",
    ],
  ];

  return (
    <article className="about">
      <h3 className="about-title">About Me</h3>
      <p className="about-text">
        An IT professional working as a Software Engineer in a reputed IT
        company. I hold a postgraduate degree in MCA with a specialization in
        Cloud Technology. With expertise in developing web and mobile
        applications, I am proficient in modern frameworks, backend
        technologies, and cloud computing, consistently striving to build
        efficient and scalable solutions.
        <br />
        <br />
        Throughout my academic and professional journey, I have completed
        numerous projects, including dynamic websites and interactive web
        applications, showcasing my ability to translate design concepts into
        functional code. Known for my creativity and attention to detail, I am
        eager to contribute to innovative projects and continue growing in a
        collaborative team environment.
      </p>
      <h3 className="about-title">What I can Do</h3>
      <div className="doing-list">
        {services.map(([icon, title, text]) => (
          <div className="doing" key={title}>
            <div className="doing-icon">
              <img src={`/images/icon/${icon}`} alt="" />
            </div>
            <div className="doing-content">
              <h3 className="doing-title">{title}</h3>
              <p className="doing-text">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function Resume() {
  const [widePanel, setWidePanel] = useState("education");
  const [certFilter, setCertFilter] = useState("all");
  const filteredCertificates = useMemo(
    () =>
      certFilter === "all"
        ? certificates
        : certificates.filter(
            (certificate) => certificate.category === certFilter,
          ),
    [certFilter],
  );

  return (
    <>
      <h3 className="resume-title">Resume</h3>
      <article className="resume">
        <div
          className={`resume-panel ${widePanel === "education" ? "wide" : ""}`}
          onClick={() => setWidePanel("education")}
        >
          <div id="edu-narrow" className="narrow-panel">
            {"EDUCATION".split("").map((letter, index) => (
              <h1 key={`${letter}-${index}`}>{letter}</h1>
            ))}
          </div>
          <div id="edu-wide" className="wide-panel">
            <div className="resume-subtitle">
              <h3 className="title-head">Education</h3>
            </div>
            {[
              [
                "Aug 2022 - May 2024",
                "MCA - Cloud Technology",
                "Ajeenkya D Y Patil University, Pune",
                "75%",
              ],
              [
                "Jun 2019 - May 2022",
                "B.Sc. - Computer Science",
                "SGM College, Karad",
                "83.29%",
              ],
              [
                "Jun 2016 - Feb 2018",
                "Higher Secondary Certificate(HSC) - PCM",
                "LP Junior College of Science, Karad",
                "70.92%",
              ],
              [
                "Jun 2011 - Mar 2016",
                "Secondary School Certificate(SSC)",
                "Chh. Shivaji Maharaj Highschool, Vaduj",
                "95.80%",
              ],
            ].map(([duration, degree, college, cgpa]) => (
              <div key={degree}>
                <div className="edu-content">
                  <div className="duration">
                    <p>{duration}</p>
                  </div>
                  <div className="school">
                    <h4 className="degree">{degree}</h4>
                    <p className="college">{college}</p>
                  </div>
                  <div className="cgpa">
                    <p>{cgpa}</p>
                  </div>
                </div>
                <div className="separator" />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`resume-panel ${widePanel === "skills" ? "wide" : ""}`}
          onClick={() => setWidePanel("skills")}
        >
          <div id="skill-narrow" className="narrow-panel">
            {"SKILLS".split("").map((letter, index) => (
              <h1 key={`${letter}-${index}`}>{letter}</h1>
            ))}
          </div>
          <div id="skill-wide" className="wide-panel">
            <div className="resume-subtitle">
              <h3 className="title-head">Skills</h3>
            </div>
            <div className="skill-content">
              {[
                ["Programming Languages", ["Java", "Python", "C", "C++"]],
                ["Web Technology", ["HTML", "HTML5", "CSS", "JavaScript"]],
                ["Frameworks", ["Spring", "Spring Boot", "Django", "jQuery"]],
                ["Database Management", ["SQL", "MySQL", "MangoDB", "PL/SQL"]],
                [
                  "Tools",
                  [
                    "Oracle SQL+",
                    "MySQL Workbench",
                    "Apache Netbeans",
                    "Eclipse",
                    "VScode",
                  ],
                ],
                ["Cloud Technology", ["AWS", "Azure", "DevOps", "Powershell"]],
              ].map(([title, items]) => (
                <div className="skill-items" key={title}>
                  <details>
                    <summary>{title}</summary>
                    <ul>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`resume-panel ${widePanel === "certificates" ? "wide" : ""}`}
          onClick={() => setWidePanel("certificates")}
        >
          <div id="crtf-narrow" className="narrow-panel">
            {"CERTIFICATES".split("").map((letter, index) => (
              <h1 key={`${letter}-${index}`}>{letter}</h1>
            ))}
          </div>
          <div id="crtf-wide" className="wide-panel">
            <div className="resume-subtitle">
              <h3 className="title-head">Certificates</h3>
            </div>
            <div id={`crtf-${certFilter}`} className="crtf-content">
              <div className="crtf-nav">
                {[
                  ["all", "All"],
                  ["programming", "Programming"],
                  ["web", "Web Tech"],
                  ["cloud", "Cloud Tech"],
                  ["generic", "Generic"],
                ].map(([filter, label]) => (
                  <button
                    key={filter}
                    type="button"
                    className={`crtf-type ${certFilter === filter ? "active" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCertFilter(filter);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="crtf-list">
                {filteredCertificates.map((certificate) => (
                  <a
                    className="crtf-items"
                    href={certificate.href}
                    target="_blank"
                    key={`${certificate.issuer}-${certificate.name}`}
                  >
                    <img src={certificateIcon} alt="" />
                    <div className="crtf-desc">
                      <p className="crtf-issuer">{certificate.issuer}</p>
                      <p className="crtf-name">{certificate.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function Experience() {
  return (
    <article className="work-article">
      <div className="work-content">
        <div className="work-items">
          <p className="work-company">Instint Innovations Pvt. Ltd.</p>
          <div className="work-details">
            <p className="work-title">Software Engineer</p>
            <p className="work-duration">Sep 2024 - Present</p>
          </div>
        </div>
        <div className="experience-text">
          <p>
            Developed and maintained a web-based pharmacy management appcation
            using React.js, delivering over 6+ feature-rich screens and
            resolving numerous bugs to enhance system performance and user
            experience.
          </p>
          <p>
            Took complete ownership of frontend development for a supplementary
            application, ensuring seamless integration with the main product.
          </p>
          <p>
            Currently working on frontend development of a mobile application
            using React Native, expanding product capabilities to mobile
            platforms.
          </p>
          <p>
            Hands-on experience in API integrations, working with CoffeeScript
            and Node.js for backend interactions.
          </p>
          <p>
            Proficient in GitLab for version control, collaborating effectively
            with cross-functional teams to manage codebase and deployment
            workflows.
          </p>
          <p>
            Demonstrated strong teamwork, problem-solving, and time management
            skills by consistently meeting project deadlines under pressure.
          </p>
        </div>
      </div>
    </article>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact/zoho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    setStatus(
      response.ok ? "Message sent successfully!" : "Failed to send message.",
    );
    if (response.ok) form.reset();
  }

  return (
    <>
      <h3 className="con-title">Contact Me</h3>
      <article>
        <form id="contact-form" onSubmit={handleSubmit}>
          <fieldset className="contact-form">
            <legend className="form-header">Send me your message here</legend>
            <div className="form-item">
              <i className="ri-user-fill input-icon" />
              <input
                name="name"
                className="form-input"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="form-item">
              <i className="ri-phone-fill input-icon" />
              <input
                name="phone"
                className="form-input"
                type="number"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-item">
              <i className="ri-mail-fill input-icon" />
              <input
                name="email"
                className="form-input"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-item">
              <i className="ri-message-3-fill input-icon" />
              <textarea
                name="message"
                className="form-input"
                rows="5"
                placeholder="Message......"
                required
              />
            </div>
            <div className="form-item">
              <i id="btn-icon" className="ri-send-plane-fill input-icon" />
              <input
                className="form-input btn"
                type="submit"
                value="Send Message"
              />
            </div>
            {status && <p className="form-status">{status}</p>}
          </fieldset>
        </form>
      </article>
    </>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");

  const content = {
    Home: <Home />,
    About: <About />,
    Resume: <Resume />,
    Experience: <Experience />,
    Contact: <Contact />,
  };

  return (
    <main>
      <Sidebar />
      {sections.map((section) => (
        <section
          key={section}
          id={`${section.toLowerCase()}-content`}
          className="main-content"
          style={{ display: activeSection === section ? "flex" : "none" }}
        >
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          {content[section]}
        </section>
      ))}
    </main>
  );
}
