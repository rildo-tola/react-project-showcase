// Import the React hooks we need
import { useEffect, useState } from "react";

// Custom hook for fetching posts from the API
function usePosts(selectedUser, refreshCount) {

  // Stores the posts returned by the API
  const [posts, setPosts] = useState([]);

  // Tracks whether the API request is loading
  const [loading, setLoading] = useState(true);

  // Stores any error message
  const [error, setError] = useState("");

  // Fetch posts whenever the selected user or refresh count changes
  useEffect(() => {

    // Allows us to cancel unfinished requests
    const controller = new AbortController();

    // Function responsible for fetching the posts
    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");
        setPosts([]);

        // Request posts belonging to the selected user
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}&_limit=5`,
          { signal: controller.signal }
        );

        // Check whether the request succeeded
        if (!response.ok) {
          throw new Error("The server could not load your posts.");
        }

        // Convert the response into JavaScript data
        const data = await response.json();

        // Check that the returned data is an array
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data received from the server.");
        }

        // Store the returned posts
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

    // Start the request
    fetchPosts();

    // Cancel unfinished requests when dependencies change
    return () => {
      controller.abort();
    };

  }, [selectedUser, refreshCount]);

  // Return the data and states so components can use them
  return {
    posts,
    loading,
    error
  };
}

// Make the custom hook available to other files
export default usePosts;