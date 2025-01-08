import React from "react";
import TodoList from "./presentation/components/TodoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./style.css";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <TodoList />
      </div>
    </DndProvider>
  );
};

export default App;
