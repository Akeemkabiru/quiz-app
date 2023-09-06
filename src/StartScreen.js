function StartScreen({ questionLength, dispatch }) {
  function handleStatus() {
    dispatch({ type: "start" });
  }
  return (
    <div className="">
      <h2>Welcome to The React Quiz!</h2>
      <p>{questionLength} questions to test your React mastery</p>
      <button className="btn btn-ui" onClick={handleStatus}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
