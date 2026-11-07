// Component responsible for displaying the API controls
function PostsControls({
  selectedUser,
  onUserChange,
  onRefresh
}) {
  return (
    <div className="api-controls">

      {/* Display the user selection label */}
      <label htmlFor="user-select">
        Choose a user:
      </label>

      {/* Dropdown for selecting a user */}
      <select
        id="user-select"
        value={selectedUser}
        onChange={(event) => onUserChange(event.target.value)}
      >
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
      </select>

      {/* Calls the refresh function supplied by the parent */}
      <button onClick={onRefresh}>
        Refresh Posts
      </button>

    </div>
  );
}

export default PostsControls;