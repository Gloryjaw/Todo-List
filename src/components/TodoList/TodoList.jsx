import checkedImage from '@/assets/icon-check.svg'
import crossImage from '@/assets/icon-cross.svg'
import styles from './TodoList.module.css'

import { motion, AnimatePresence } from 'framer-motion';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
 
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';




export default function TodoList({displayList, handleComplete, onDelete, onReorder}){
    const sensors = useSensors( 
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    })
  );

    const idList = displayList.map((item) =>item.id)
    const todoList = displayList.map((item)=>{    
        
        return (
            <TodoItems 
                key={item.id} 
                id={item.id}
                item={item} 
                handleComplete={handleComplete} 
                onDelete={onDelete}

            />
    )})

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            onReorder(active, over)
        }
    }

    return(
        
        <section className={styles.listSection}>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >

                <SortableContext 
                    items={idList}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className={styles.listContainer}>
                        <AnimatePresence>
                            {todoList}
                        </AnimatePresence>
                        
                    </ul>
                </SortableContext>

            </DndContext>
        </section>
    )
}



function TodoItems({item, handleComplete, onDelete, id}){

    const completedStyle = item.completed ? styles.active : '';
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: id});

    const style = {transform: CSS.Transform.toString(transform), transition};

    return(

            <li 
            ref={setNodeRef} 
            style={style}
            >           
                <motion.div
                    className={styles.listItems}
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    exit={{scale : 0}}
                >

                    <button 
                        onClick={() => handleComplete(item.id)} 
                        className={`${styles.checkbox} ${completedStyle}`}   
                    >   
                    <img className={`${styles.checkedImage} ${completedStyle}`} src={checkedImage} alt='checked image'/>
                    </button>
                    
                    <p {...attributes} {...listeners} className={`${styles.itemText} ${completedStyle}` }>

                    {item.task}
                    </p> 

                    <button 
                        className={styles.crossButton}
                        onClick={() => onDelete(item.id)}
                    >
                        <img className={styles.crossImage} src={crossImage}/>
                    </button>
                
                </motion.div>
            </li>
        
    )
}