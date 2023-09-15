function FinishedQuiz({ points, maxPossiblePoint, dispatch }) {
  const percentage = points / maxPossiblePoint;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoint} ({" "}
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedQuiz;
