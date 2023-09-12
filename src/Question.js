function Question({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
