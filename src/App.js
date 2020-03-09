import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [todoItems, setTodoItems] = useState([
    { name: "Learn about React", isComplete:false},
    { name: "Meet friend for lunch", isComplete:false },
    { name: "Build really cool todo app", isComplete:false }
  ])

  function Todo ({ todo, index }) {
    
    return <div style={{textDecoration:todo.isComplete ? 'line-through': ''}} className="todo">{todo.name}

    <div>
      <button onClick={() =>deleteTodo(index)}>X</button>
    </div>

    <div>
      <button onClick={() =>completeTodo(index)}>Complete</button>
    </div>

    </div>;

  }
  
  const deleteTodo = index =>{
    const newTodo = [...todoItems];
    newTodo.splice(index,1);
    setTodoItems(newTodo);
  }
  const completeTodo = index =>{
    const newTodo = [...todoItems];
    newTodo[index].isComplete = true;
    setTodoItems(newTodo);
  }

  const addTodo = name =>{
    const newTodo = [...todoItems, {name}];
    setTodoItems(newTodo);
  }
  function TodoForm({addTodo}){
    const [value, setValue] = useState('');

    const handleSubmit = e =>{
      e.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue('')
    }
    return (
      <form onSubmit={handleSubmit}>

        <input type="text" 
        className="input"
        placeholder="Add Item"
        value={value} onChange={e => setValue(e.target.value)} />

      </form>
    )
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p  className="App-link">
          Todos in your list: {todoItems.length}
        </p>
       
        <div className="todo-list">
        {todoItems.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


