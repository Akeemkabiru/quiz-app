// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Question from "./Question";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";
export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          point:
            action.payload === question.correctOption
              ? state.point + 1
              : state.point,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finished":
        return { ...state };
      default:
        break;
    }
  }
  const initialState = {
    questions: [],
    //loading, error, ready, active, finished
    status: "loading",
    answer: null,
    index: 0,
    point: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, point } = state;
  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce(
    (acc, curr) => acc.points + curr.points
  );
  // const maxPossiblePoint = 15;
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={numQuestions}
              index={index}
              point={point}
              maxPossiblePoint={maxPossiblePoint}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestion={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && <FinishedQuiz points={point} />}
      </Main>
    </div>
  );
}
