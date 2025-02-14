import styles from './Header.module.css'
import { useLocation } from 'react-router-dom'
import { mainPages } from '../../../public/project-data-files/MainPages'
function Header( {className}){
    const location = useLocation()
    const pageTitle = mainPages[location.pathname] || ''
    return(
        
        <header className={className}>
            <p>Rolling Cargo Shipping Company</p>
            {pageTitle && <h2>{pageTitle}</h2>}
            <p>Search Bar</p>
            <p>Settings</p>
            <p>notifications</p>
            <p>profile</p>
        </header>
    )
}
export default Header