// Import React hooks
import { useEffect, useState } from "react";

// Import our reusable components
import PostsControls from "./PostsControls";
import PostCard from "./PostCard";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

function PostsExplorer() {

  // Stores the posts returned by the API
  const [posts, setPosts] = useState([]);

  // Tracks whether the API request is in progress
  const [loading, setLoading] = useState(true);

  // Stores any error message
  const [error, setError] = useState("");

  // Stores the currently selected user
  const [selectedUser, setSelectedUser] = useState("1");

  // Changing this value triggers another API request
  const [refreshCount, setRefreshCount] = useState(0);

  // Fetch posts whenever the selected user or refresh count changes
  useEffect(() => {

    // Create a controller to cancel unfinished requests
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        // Prepare the UI for a new request
        setLoading(true);
        setError("");
        setPosts([]);

        // Request posts belonging to the selected user
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}&_limit=5`,
          { signal: controller.signal }
        );

        // Check whether the request was successful
        if (!response.ok) {
          throw new Error("The server could not load your posts.");
        }

        // Convert the response into JavaScript data
        const data = await response.json();

        // Make sure the API returned an array
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data received from the server.");
        }

        // Save the returned posts
        setPosts(data);

      } catch (err) {

        // Ignore errors caused by cancelling a request
        if (err.name !== "AbortError") {
          console.error("API Error:", err);

          setError(
            "We couldn't load your posts. Check your internet connection and try again."
          );
        }

      } finally {

        // Stop loading if the request wasn't cancelled
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    // Start the API request
    fetchPosts();

    // Cancel the request if the component updates or unmounts
    return () => {
      controller.abort();
    };

  }, [selectedUser, refreshCount]);

  // Function that triggers another API request
  function handleRetry() {
    setRefreshCount((previousCount) => previousCount + 1);
  }

  return (
    <section className="posts-section">

      <h2>API Posts Explorer</h2>

      {/* Pass the state and functions to the controls component */}
<PostsControls
  selectedUser={selectedUser}
  onUserChange={setSelectedUser}
  onRefresh={handleRetry}
/>

      {/* Display the correct UI depending on the request state */}
      {loading ? (
        <LoadingMessage />

      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
        />

      ) : posts.length === 0 ? (
        <EmptyState />

      ) : (

        // Display all returned posts using the reusable PostCard
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

      )}

    </section>
  );
}

export default PostsExplorer;