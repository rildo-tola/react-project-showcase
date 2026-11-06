// Receives one post through props
function PostCard({ post }) {
  return (
    <article className="post-card">
      {/* Display the post's ID */}
      <span className="post-number">
        Post #{post.id}
      </span>

      {/* Display the post title */}
      <h3>{post.title}</h3>

      {/* Display the post content */}
      <p>{post.body}</p>
    </article>
  );
}

export default PostCard;

