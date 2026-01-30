import { arrayMove} from '@dnd-kit/sortable'

export default function listReducer(tasks, action){
    switch (action.type){
      case 'added':{
        return   [...tasks, {id:crypto.randomUUID(), task:action.text, completed:false}]

      }

      case 'completed':{

        const newList = tasks.map((item)=>{
          if(item.id === action.id){
              return {...item, completed : !item.completed}
            }
          else{
              return item
            }
          })

        return newList
      
      }
      case 'deleted':{
        return tasks.filter((item) =>item.id !== action.id)
      }

      
      case 'reordered':{
       

        const oldIndex = tasks.findIndex(item=>item.id === action.activeId);
        const newIndex = tasks.findIndex(item=> item.id === action.overId);
          
        return arrayMove(tasks, oldIndex, newIndex);
    
      }
      case 'clearCompleted':{
        return tasks.filter(item=>!item.completed)
      }

      default:{
        throw Error('Unkown action' + action.type)
      }
    }

  }