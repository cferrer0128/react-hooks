import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



export default function App() {
  
  
  const [selectValue, setSelectValue] = useState('');

  const [todoItems, setTodoItems] = useState([])

  const [hospiItems, sethospiItems] = useState([])
 
  let [todoAllItems, setAllTodoItems] = useState([])

  useEffect(async () => {

    //GetHospital
    const fetchDataGroup = async () => {
      const result = await axios.get('/api/GetHospital');
      let hospiData=[];
      for(var key in result.data){
       
        hospiData.push({
          'bloodGroupName':result.data[key].bloodGroupName,
          'unit':result.data[key].unit,
          'id':result.data[key].id,
          'itemName':result.data[key].itemName
        })
      }//for
      sethospiItems(hospiData)
    }

    // Your code here
    const fetchData = async () => {
      const result = await axios.get('/api');
     
      let arrData=[];

      for(var key in result.data){
        //console.log(`data from e ${result.data[key].bloodGroupName}`);
        arrData.push({
          'bloodGroupName':result.data[key].bloodGroupName,
          'unit':result.data[key].unit,
          'id':result.data[key].id,
          'itemName':result.data[key].itemName
        })
      }//for
      //set data
      setAllTodoItems(arrData);
      setTodoItems(arrData);
      setSelectValue('Select one')

    };
    fetchData();
    fetchDataGroup();
   
  },[]);



  function TagsTodo({todo , index}){

    return  <option  key={index} value={todo.itemName}>{todo.itemName}
    </option>
    
  }

  function Todo ({ todo, index }) {
    
    return <tr>
    
     <td>{todo.bloodGroupName}</td>
     <td>{todo.unit}</td>
    
    
    </tr>;

  }
  
  const deleteTodo = index =>{
    const newTodo = [...todoItems];
    newTodo.splice(index,1);
    setTodoItems(newTodo);
  }
  const completeTodo = index =>{
    const newTodo = [...todoItems];
    
  }

  const selectTodo = event =>{
    const newTodo = [];
    todoAllItems.forEach(e =>{
     
      if(e.itemName == event) newTodo.push(e);
    });
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

        <select  value={selectValue}  onChange={(e) =>selectTodo(e.target.value)}>
          <option value={selectValue}></option>
            {hospiItems.map((todo, index) => (
                <TagsTodo
                  key={index}
                  index={index}
                  todo={todo}
                />
              ))}

        </select>
      
        <div className="todo-list">
          <table>
            <tr>
              <th>Group Name</th>
              <th>Unit</th>
             
            </tr>
                      
              {todoItems.map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                />
              ))}

        </table>
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


