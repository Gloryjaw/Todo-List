import bgMobileLight from '@/assets/bg-mobile-light.jpg'
import bgMobileDark from '@/assets/bg-mobile-dark.jpg'
import bgDesktopLight from '@/assets/bg-desktop-light.jpg'
import bgDesktopDark from '@/assets/bg-desktop-dark.jpg'

import styles from './HeroSection.module.css'

export default function HeroSection({lightTheme, children}){

  
  return (
    <div className={`${styles.background} ${lightTheme ? '' : styles.dark}`}>
      <picture className={styles.heroParent}>

          <source media="(min-width: 601px)" srcSet={bgDesktopDark}/>

          <img className={styles.heroImage} src={bgMobileDark} alt="Hero image"/>
        
          
      </picture>
      <picture className={styles.heroParent}>

          <source media="(min-width: 601px)" srcSet={bgDesktopLight}/>

          <img className={`${styles.heroImage} ${lightTheme ? '' : styles.dark}`} src={bgMobileLight} alt="Hero image"/>
        
          
      </picture>
      <div className={styles.dataSection}>
        {children}
      </div>
      


    </div>


  )
}