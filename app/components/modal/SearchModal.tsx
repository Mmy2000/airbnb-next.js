'use client'

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"



const SearchModal = ()=>{
    let content = (<></>)
    const searchModal = useSearchModal();
    return (
        <>
        <Modal isOpen={searchModal.isOpen} close={searchModal.close} content={content} label="Search" />
        </>
    )
}

export default SearchModal;