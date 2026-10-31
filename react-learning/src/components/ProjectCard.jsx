// This component displays one project card.

// We receive information from App.jsx through props.
function ProjectCard({
  number,
  title,
  description,
  technologies,
  liveUrl,
  githubUrl
}) {
  return (
    // article represents one independent project.
    <article className="project-card">

      <div className="project-number">
        PROJECT {number}
      </div>

      {/* Project title */}
      <h3>{title}</h3>

      {/* Short project description */}
      <p>{description}</p>

      {/* Display the technologies used */}
      <div className="tech-list">
        {technologies.map((technology) => (
          <span key={technology} className="tech-tag">
            {technology}
          </span>
        ))}
      </div>

      {/* Links to the deployed project and source code */}
      <div className="project-links">

        <a href={liveUrl} target="_blank" rel="noreferrer">
          Live Demo ↗
        </a>

        <a href={githubUrl} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>

      </div>

    </article>
  );
}

// Make the component available to other files.
export default ProjectCard;