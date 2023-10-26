
import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);

  // Function to add a new todo item
  const addTodo = () => {
    if (toDo.trim() !== '') {
      // Check if the to-do item already exists in the list
      const isDuplicate = toDos.some((todo) => todo.text === toDo);

      if (!isDuplicate) {
        setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      }

      setToDo('');
    }
  };

  // Function to handle the checkbox toggle
  const toggleTodoStatus = (id) => {
    const updatedTodos = toDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    const updatedTodos = toDos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Monday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((todo) => (
          <div className={`todo ${todo.status ? 'completed' : ''}`} key={todo.id}>
            <div className="left">
              <input
                onChange={() => toggleTodoStatus(todo.id)}
                checked={todo.status}
                type="checkbox"
                name=""
                id=""
              />
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) =>
                    setTodos(
                      toDos.map((t) =>
                        t.id === todo.id ? { ...t, text: e.target.value } : t
                      )
                    )
                  }
                  onBlur={() => setEditTodoId(null)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setEditTodoId(null);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <p className={todo.status ? 'completed' : ''}>{todo.text}</p>
              )}
            </div>
            <div className="right">
              <i onClick={() => deleteTodo(todo.id)} className="fas fa-times"></i>
              <i onClick={() => setEditTodoId(todo.id)} className="fas fa-edit"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
