import { useState } from 'react'

import { useReducer } from 'react';
import {AddTodo, FilterList, TodoList, HeroSection} from './components'
import {listReducer} from './reducers'

const initialList = [
  {id:0, task:"Complete online Javascript course", completed:true},
  {id:1, task: "Jog around the park 3x", completed:false},
  {id:2, task: "10 minutes meditation", completed:false},
  {id:3, task: "Read for 1 hour", completed:false},
  {id:4, task: "Pick up groceries", completed:false},
  {id:5, task: "Complete Todo App on Frontend Mentor", completed:false}
]


function App() {

  const [list, dispatch] = useReducer(listReducer, initialList);
  const [displayState, setDisplayState] = useState('all');
  const [lightTheme, setLightTheme] = useState(false);

  const displayList = list.filter((item)=>{
    if(displayState == 'active') return !item.completed;
    if(displayState == 'completed') return item.completed;
    return true;

  })
  

  function handleAdd(text){
    if(!text.trim()){
      return;
    }
    dispatch({
      type:'added',
      text: text,
    })  
  }

  function handleComplete(id){
    dispatch({
      type:'completed',
      id:id,
    })
 

  }

  function handleDelete(id){
    dispatch({
      type:'deleted',
      id:id
    })
  
  }

  function handleDisplayStateChange(displayStateValue){
    setDisplayState(displayStateValue)
  }

  function handleThemeChange(){
    setLightTheme(!lightTheme)
  } 

  function handleReorder(active, over){

    dispatch({
      type:'reordered',
      activeId:active.id,
      overId:over.id
    })

  }

  function handleClearCompleted(){

    dispatch({
      type:'clearCompleted',
    })

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
          displayList={list}
          />
    
    </HeroSection>
    
  )
}



export default App
