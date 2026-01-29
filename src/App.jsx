import { useState } from 'react'
import {AddTodo, FilterList, TodoList, HeroImage} from './components'
import './styles/App.css'

const initialList = [
  {id:0, task:"Complete online Javascript course", completed:true},
  {id:1, task: "Jog around the park 3x", completed:false},
  {id:2, task: "10 minutes meditation", completed:false},
  {id:3, task: "Read for 1 hour", completed:false},
  {id:4, task: "Pick up groceries", completed:false},
  {id:5, task: "Complete Todo App on Frontend Mentor", completed:false}
]
let newId = 6;

function App() {
  const [todoList, setList] = useState(initialList);
  const [displayState, setDisplayState] = useState('all');
  const [lightTheme, setLightTheme] = useState(false);

  let displayList;

  if(displayState === 'all'){
    displayList = todoList
  }

  else if(displayState === 'active'){
    displayList = todoList.filter(item => !item.completed)
  }

  else if(displayState === 'completed'){
    displayList = todoList.filter(item=>item.completed)
  }
  

  function handleAdd(text){
    setList([...todoList, {id:newId++, task:text, completed:false}])
    
  }

  function handleComplete(id){
 
    setList(todoList.map((item)=>{
      if(item.id === id){
        return {...item, completed : !item.completed}
      }
      else{
        return item
      }
    }))
  }

  function handleDelete(id){
    setList(todoList => todoList.filter((item) =>item.id !== id))
  }

  function handleDisplayStateChange(displayStateValue){
    setDisplayState(displayStateValue)
  }

  function handleThemeChange(){
    
    setLightTheme(!lightTheme)
  } 

  return (
    <div className={`background ${lightTheme ? '' : 'dark' }`}>
      <HeroImage lightTheme={lightTheme} />
      <div className='dataSection'>
          <AddTodo
          handleAdd={handleAdd}
          handleThemeChange={handleThemeChange}
          themeValue={lightTheme}
          />

        <TodoList 
          displayList={displayList} 
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          dragList={setList}

        />
        <FilterList
          displayStateChange={handleDisplayStateChange}
          displayState={displayState}
          handleDelete={handleDelete}
          displayList={todoList}
          />
      </div>

    </div>
  )
}



export default App
