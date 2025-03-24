import { useNavigate } from 'react-router-dom'
import styles from './User.module.css'
import { useUI } from '../../context/UI-Context'
import { useState } from 'react'
function User(){
    const {isdarkmode} = useUI()
    const navigate = useNavigate()
    
    return(
        <>
        <div className={styles.userContainer}>
            {/* <img 
                       onClick={() => {
                        
                       }}
                       role="button" 
                       src="./avatar/avatar.svg" 
                       alt="avatar-icon" 
                       className={`${styles.avatar} ${isdarkmode ? 'dark-avatar'  : ''}`}  /> */}
            <p
            onClick={() => navigate('/account')}
            >Log Out</p>
            <p>help & support</p>
        </div>
        </>
    )
}

export default User