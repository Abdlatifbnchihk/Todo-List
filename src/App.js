import logo from "./logo.svg";
import "./App.css";
import TodoList from "./TodoList";
import { ToastProvider } from "./Context/ToastContext";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <TodoList />
      </ToastProvider>
    </div>
  );
}

export default App;
