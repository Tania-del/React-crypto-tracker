'use client'
 const useCustomSearchParams = () => {
const searchParams = new URLSearchParams(window.location.search)
    
    return searchParams
    
}

export default useCustomSearchParams;