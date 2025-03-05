import styles from './SearchBox.module.css'

function SearchBox({className}){
    return (
        <div className={`${styles.search} ${className}`}>
            <img src="./icons/search-interface-symbol.png" alt=""  className={styles.searchIcon}/>
            <input type="text" className={styles.searchInput} placeholder='search'/>
        </div>
    )
}
export default SearchBox                                                                 