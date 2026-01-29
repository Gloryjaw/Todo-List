import styles from './FilterList.module.css'

export default function FilterList({displayStateChange, displayState, displayList, handleDelete}){


    return (
        <section>
            <UtilitySection displayList={displayList} handleDelete={handleDelete}>
                <div className={styles.filterButtonList}>
                    <FilterButton 
                        buttonState={'all'} 
                        displayState={displayState} 
                        displayStateChange={displayStateChange}
                    >
                        All
                    </FilterButton>

                    <FilterButton 
                        buttonState={'active'} 
                        displayState={displayState} 
                        displayStateChange={displayStateChange}
                    >
                        Active
                    </FilterButton>

                    <FilterButton 
                        buttonState={'completed'} 
                        displayState={displayState} 
                        displayStateChange={displayStateChange}
                    >
                        Completed
                    </FilterButton>
                </div>
          </UtilitySection>
           
            <p className={styles.instruction}>Drag and drop to reorder list</p> 
        </section>
    )
}

function FilterButton({children, buttonState, displayState, displayStateChange}){
    return (
        <button 
            className={`${styles.stateButtons} ${displayState === buttonState ? styles.active : ''}`}
            onClick={()=> displayStateChange(buttonState)}
        >
        {children}
        </button>
    )
}

function UtilitySection({children, displayList, handleDelete}){
    const count = displayList.filter(item => !item.completed).length;


    return(
        <div className={styles.utilitySection}>
            <p>{`${count} items left`}</p>
            {children}
            <button onClick={()=>{
                for (let i = 0; i<displayList.length; i++){
                    if(displayList[i].completed){
                        handleDelete(displayList[i].id)
                    }
                    
                }
            }}>Clear completed</button>
        </div>
    )
}