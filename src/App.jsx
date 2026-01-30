import { useState } from 'react'
import { arrayMove} from '@dnd-kit/sortable'
import {AddTodo, FilterList, TodoList, HeroSection} from './components'

const initialList = [
  {id:0, task:"Complete online Javascript course", completed:true},
  {id:1, task: "Jog around the park 3x", completed:false},
  {id:2, task: "10 minutes meditation", completed:false},
  {id:3, task: "Read for 1 hour", completed:false},
  {id:4, task: "Pick up groceries", completed:false},
  {id:5, task: "Complete Todo App on Frontend Mentor", completed:false}
]


function App() {
  const [todoList, setList] = useState(initialList);
  const [displayState, setDisplayState] = useState('all');
  const [lightTheme, setLightTheme] = useState(false);

  const displayList = todoList.filter((item)=>{
    if(displayState == 'active') return !item.completed;
    if(displayState == 'completed') return item.completed;
    return true;

  })
  

  function handleAdd(text){
    if(!text.trim()){
      return;
    }
    setList([...todoList, {id:crypto.randomUUID(), task:text, completed:false}])
    
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

  function handleReorder(active, over){

    setList((todoList) => {

        const oldIndex = todoList.findIndex(item=>item.id === active.id);
        const newIndex = todoList.findIndex(item=> item.id === over.id);
        
        return arrayMove(todoList, oldIndex, newIndex);
    });

  }

  function handleClearCompleted(){
    setList(todoList.filter(item=>!item.completed))
  }

  return (
   
    <HeroSection lightTheme={lightTheme}>
      
          <AddTodo
          handleAdd={handleAdd}
          handleThemeChange={handleThemeChange}
          themeValue={lightTheme}
          />

        <TodoList 
          displayList={displayList} 
          handleComplete={handleComplete}
          onDelete={handleDelete}
          onReorder={handleReorder}

        />
        <FilterList
          displayStateChange={handleDisplayStateChange}
          displayState={displayState}
          onClearCompleted={handleClearCompleted}
          displayList={todoList}
          />
    
    </HeroSection>
    
  )
}



export default App
