

export function getInitials(full_name){
    if(!full_name) return
    
    const names = full_name.trim().split(" ").filter(Boolean)
    if(names.length === 1) {
        return names[0][0].toUpperCase()
    }
    return names[0][0].toUpperCase() + names[1][0].toUpperCase()
}