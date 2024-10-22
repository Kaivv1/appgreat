import { useEffect, useState } from "react";
import { getNotes, Note } from "../api/notes";
import { returnErrObj } from "../utils/error";

export function useGetNotes() {
    const [notes, setNotes] = useState<Note[]>([])
 
    useEffect(() => {
        async function fetchNotes() {
        try {
            const notes = await getNotes()
            setNotes(notes)
        } catch (error) {
           const {code, msg} =  returnErrObj(error)
           window.alert(`Error code: ${code} and the message: ${msg}`)
        }    
        }
        fetchNotes()
    }, [])
    return {notes}
}