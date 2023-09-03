import { useEffect, useReducer } from "react";
import Header from "./Header";
import Error from "./Error";
import Main from "./Main";
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload };
    case "dataFailed":
      return { ...state, status: action.payload };
    default:
      break;
  }
}
const initialState = { questions: [], status: "loading" };
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (res.ok) throw new Error(<Error />);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
