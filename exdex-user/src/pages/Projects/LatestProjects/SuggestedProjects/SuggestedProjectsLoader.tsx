

import React from 'react'
import styles from './SuggestedProjects.module.scss'
import ProjectCardLoader from '../../ProjectCard/ProjectCardLoader'

const SuggestedProjectsLoader = () => {
  return (
    <div className={styles.suggestedProjectsLoader}> 
    <div style={{width : "100%", marginBottom : "16px"}} >
    <ProjectCardLoader/>
    </div>

     <div className={styles.cardsLoader}>
     <ProjectCardLoader/>
     </div>
     <div className={styles.cardsLoader}>
     <ProjectCardLoader/>
     </div>
     <div className={styles.cardsLoader}>
     <ProjectCardLoader/>
     </div>
     <div className={styles.cardsLoader}>
     <ProjectCardLoader/>
     </div>

    </div>
  )
}

export default SuggestedProjectsLoader