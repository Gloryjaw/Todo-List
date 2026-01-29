import { useState } from 'react'
import styles from './AddTodo.module.css'
import sunImage from '@/assets/icon-sun.svg'
import moonImage from '@/assets/icon-moon.svg'


export default function AddTodo({handleAdd, handleThemeChange, themeValue}){
    const [text, setText] = useState('')
    return(
    <section>
        <div className={styles.headingSection}>
            <h1>TODO</h1>
            <button className={styles.themeButton} onClick={handleThemeChange}>
                <img className ={styles.themeImage} 
                
                src={themeValue ? moonImage :sunImage} />
            </button>
        </div>

        <form onSubmit={(e)=>{
            e.preventDefault();
            handleAdd(text);
            setText('')

        }} className={styles.itemForm} >
            <button className={styles.submitButton} ></button>
            <input className={styles.itemInput} onChange={(e)=>{setText(e.target.value)}} value={text} type="text" placeholder='Create a new todo...' />
        </form>

    </section>    
        
    )
}



