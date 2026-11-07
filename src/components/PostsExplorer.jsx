// Import React hooks
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";


// Import our reusable components
import PostsControls from "./PostsControls";
import PostCard from "./PostCard";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

function PostsExplorer() {

  // Stores the currently selected user
  const [selectedUser, setSelectedUser] = useState("1");

  // Changing this value triggers another API request
  const [refreshCount, setRefreshCount] = useState(0);

// Get the API data and request states from our custom hook
const { posts, loading, error } = usePosts(
  selectedUser,
  refreshCount
);

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