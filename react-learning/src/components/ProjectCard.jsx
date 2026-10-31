// Import useState from React.
// We need it to store information that can change.
import { useState } from "react";

// This component receives information through props.
function ProjectCard({
  number,
  title,
  description,
  technologies,
  liveUrl,
  githubUrl
}) {

  // Create a state variable called isExpanded.
  // Each card starts with its details hidden.
  const [isExpanded, setIsExpanded] = useState(false);

  // This function switches between expanded and collapsed.
  function toggleDetails() {
    setIsExpanded((currentState) => !currentState);
  }

  return (
    <article className="project-card">

      {/* Project number */}
      <div className="project-number">
        PROJECT {number}
      </div>

      {/* Project title */}
      <h3>{title}</h3>

      {/* Project description */}
      <p>{description}</p>

      {/* Button for showing or hiding details */}
      <button
        type="button"
        className="details-toggle"
        onClick={toggleDetails}
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Show less ↑" : "View details ↓"}
      </button>

      {/* Only display this section when expanded */}
      {isExpanded && (
        <div className="project-details">

          {/* Display the technologies used */}
          <div className="tech-list">
            {technologies.map((technology) => (
              <span key={technology} className="tech-tag">
                {technology}
              </span>
            ))}
          </div>

          {/* Links to the project and source code */}
          <div className="project-links">

            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo ↗
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

          </div>

        </div>
      )}

    </article>
  );
}

// Make this component available to other files.
export default ProjectCard;