import "./App.css";
import { Message } from "./components/Message.js";

const text = "Hello, world!!!";

function App() {
  return (
    <div className="App">
      <Message text={text} />
    </div>
  );
}

export default App;
