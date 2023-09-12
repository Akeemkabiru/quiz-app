function Progress({ numQuestion, index, point, maxPossiblePoint }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index} />
      <p>
        Question <strong>{index + 1}/</strong>
        {numQuestion}
      </p>
      {/* <p>
        <strong>{point}/</strong>
        {maxPossiblePoint}
      </p> */}
    </header>
  );
}

export default Progress;
