import "./App.scss";
import { Message } from "./components/Message.js";
import { MessageList } from "./components/MessageList.js";

const text = "Hello, world!!!";

function App() {
  return (
    <div className="App">
      <Message text={text} />
      <MessageList />
    </div>
  );
}

export default App;
