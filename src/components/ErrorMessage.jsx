// Receives an error message and a retry function
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="api-error" role="alert">

      {/* Display the error */}
      <p>{message}</p>

      {/* Call the retry function when clicked */}
      <button onClick={onRetry}>
        Try Again
      </button>

    </div>
  );
}

export default ErrorMessage;