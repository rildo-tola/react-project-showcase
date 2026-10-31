// Import our reusable ProjectCard component.
import "./App.css";
import ProjectCard from "./components/ProjectCard";


// Store our project information in an array.
const projects = [
  {
    id: 1,
    number: "01",
    title: "Weather App",

    description:
      "A weather application that allows users to search for locations and view current weather information using the OpenWeather API.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "OpenWeather API"
    ],

    liveUrl: "https://rildo-tola.github.io/weather-app/",

    githubUrl: "https://github.com/rildo-tola/weather-app"
  },

  {
    id: 2,
    number: "02",
    title: "Study Task Tracker",

    description:
      "A productivity application that helps users manage study tasks, track completion, and save their tasks using localStorage.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "localStorage"
    ],

    liveUrl: "https://rildo-tola.github.io/study-task-tracker/",

    githubUrl: "https://github.com/rildo-tola/study-task-tracker"
  },

  {
    id: 3,
    number: "03",
    title: "Personal Portfolio",

    description:
      "A responsive personal portfolio website designed to introduce me and showcase my web development projects.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],

    liveUrl: "https://rildo-tola.github.io/phase-1-portfolio/",

    githubUrl: "https://github.com/rildo-tola/phase-1-portfolio"
  }
];

// Main application component.
function App() {
  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <a href="#" className="logo">
          RT<span>.</span>
        </a>

        <a href="#projects" className="nav-link">
          My Projects ↗
        </a>
      </header>

      {/* Introduction section */}
      <main>

        <section className="hero">
          <p className="eyebrow">
            COMPUTER ENGINEERING STUDENT
          </p>

          <h1>
            Building things for the <span>web.</span>
          </h1>

          <p className="hero-description">
            I'm an aspiring frontend/software developer focused on
            creating useful, responsive and user-friendly
            web experiences.
          </p>

          <a href="#projects" className="hero-button">
            Explore my work ↓
          </a>
        </section>

        {/* Projects section */}
        <section className="projects-section" id="projects">

          <div className="section-heading">
            <div>
              <p className="eyebrow">MY WORK</p>
              <h2>Selected Projects</h2>
            </div>

            <p className="project-count">
              03 PROJECTS
            </p>
          </div>

          {/* Create a card for every project in the array */}
          <div className="projects-grid">

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                number={project.number}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            ))}

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Designed and built with React.</p>
        <p>© 2026 Rildo Tola</p>
      </footer>

    </div>
  );
}

export default App;