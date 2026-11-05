
// Import the React Hooks we need.
import { useState, useEffect } from "react";
import "./App.css";
import ProjectCard from "./components/ProjectCard";

// Store all the project information.
const projects = [
  {
    id: 1,
    number: "01",
    title: "Weather App",
    category: "Weather",

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
    category: "Productivity",

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
    category: "Portfolio",

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

function App() {

  // Store what the user is currently typing.
  const [searchInput, setSearchInput] = useState("");

  // Store the search term after the form is submitted.
  const [searchTerm, setSearchTerm] = useState("");

  // Store the selected project category.
  const [selectedCategory, setSelectedCategory] = useState("All");

// Store the posts received from the API.
const [posts, setPosts] = useState([]);

// Track whether the API request is still running.
const [loading, setLoading] = useState(true);

// Store any error message if the request fails.
const [error, setError] = useState("");


// Fetch sample posts when the component loads.
useEffect(() => {

  // Create a controller that lets us cancel the request.
  const controller = new AbortController();

  // Create an asynchronous function for fetching posts.
  async function fetchPosts() {

    try {

      // Show the loading state.
      setLoading(true);

      // Clear any previous error message.
      setError("");

      // Send a request to the API.
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
        {
          signal: controller.signal
        }
      );

      // Check whether the request was successful.
      if (!response.ok) {
        throw new Error("Failed to retrieve posts.");
      }

      // Convert the response into JSON.
      const data = await response.json();

      // Save the received posts in React state.
      setPosts(data);

    } catch (err) {

      // Ignore errors caused by cancelling the request.
      if (err.name !== "AbortError") {
        setError(err.message);
      }

    } finally {

      // Stop the loading indicator if the request wasn't cancelled.
      if (!controller.signal.aborted) {
        setLoading(false);
      }

    }
  }

  // Run the function.
  fetchPosts();

  // Cancel the request if the component is removed.
  return () => {
    controller.abort();
  };

}, []); // Empty array: fetch on initial mount.


  // Update the search input whenever the user types.
  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  // Update the selected category.
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Handle form submission.
  function handleSearchSubmit(event) {

    // Stop the browser from reloading the page.
    event.preventDefault();

    // Apply the search term after removing extra spaces.
    setSearchTerm(searchInput.trim());
  }

  // Clear all search and filter selections.
  function handleClearFilters() {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory("All");
  }

  // Filter projects based on the search and category.
  const filteredProjects = projects.filter((project) => {

    // Combine the searchable project information.
    const searchableContent = `
      ${project.title}
      ${project.description}
      ${project.technologies.join(" ")}
    `.toLowerCase();

    // Check whether the search term exists in the project.
    const matchesSearch = searchableContent.includes(
      searchTerm.toLowerCase()
    );

    // Check whether the project belongs to the selected category.
    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    // A project must satisfy both conditions.
    return matchesSearch && matchesCategory;
  });

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

      <main>

        {/* Introduction */}
        <section className="hero">
          <p className="eyebrow">
            COMPUTER ENGINEERING STUDENT
          </p>

          <h1>
            Building things for the <span>web.</span>
          </h1>

          <p className="hero-description">
            I'm an aspiring frontend developer focused on
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
              {projects.length} PROJECTS
            </p>
          </div>

          {/* Search and filter form */}
          <form
            className="project-filters"
            onSubmit={handleSearchSubmit}
          >

            {/* Search input */}
            <div className="filter-field">
              <label htmlFor="project-search">
                Search projects
              </label>

              <input
                id="project-search"
                type="search"
                placeholder="Search by name or technology..."
                value={searchInput}
                onChange={handleSearchInput}
              />
            </div>

            {/* Category selection */}
            <div className="filter-field">
              <label htmlFor="project-category">
                Category
              </label>

              <select
                id="project-category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All projects</option>
                <option value="Weather">Weather</option>
                <option value="Productivity">Productivity</option>
                <option value="Portfolio">Portfolio</option>
              </select>
            </div>

            {/* Submit search */}
            <button
              type="submit"
              className="filter-button"
            >
              Search
            </button>

            {/* Reset search and category */}
            <button
              type="button"
              className="clear-button"
              onClick={handleClearFilters}
            >
              Clear
            </button>

          </form>

          {/* Display how many projects match */}
          <p className="results-count">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>

          {/* Display the filtered project cards */}
          <div className="projects-grid">

            {filteredProjects.length > 0 ? (

              filteredProjects.map((project) => (

                <ProjectCard
                  key={project.id}
                  number={project.number}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />

              ))

            ) : (

              <p className="empty-state">
                No projects found. Try another search or clear your filters.
              </p>

            )}

          </div>

        </section>


{/* API integration section */}
<section className="posts-section">

  <div className="section-heading">
    <div>
      <p className="eyebrow">API INTEGRATION</p>
      <h2>Latest Community Posts</h2>
    </div>
  </div>

  {/* Show loading message while fetching */}
  {loading && (
    <p className="api-message">
      Loading posts...
    </p>
  )}

  {/* Show an error if the request fails */}
  {error && (
    <p className="api-error">
      {error}
    </p>
  )}

  {/* Display posts after successful fetching */}
  {!loading && !error && (

    <div className="posts-grid">

      {posts.map((post) => (

        <article className="post-card" key={post.id}>

          <p className="post-number">
            POST #{post.id}
          </p>

          <h3>{post.title}</h3>

          <p>{post.body}</p>

        </article>

      ))}

    </div>

  )}

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
