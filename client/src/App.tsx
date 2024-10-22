import { useState } from "react"
import { useGetNotes } from "./hooks/useGetNotes"
import { createNote, deleteNote, updateNote } from "./api/notes";
import { returnErrObj } from "./utils/error";

function App() {
  const [noteToSend, setNoteToSend] = useState<string>("")
  const [newNote, setNewNote] = useState<string>("")
  const [isEdit, setIsEdit] = useState(false);
  const {notes} = useGetNotes()

return <div>
  <form>
      <label htmlFor="sendNote">Enter a note</label>
      <input id="sendNote" type="text" value={noteToSend} onChange={({target}) => setNoteToSend(target.value)}/>
      <button onClick={async () => await createNote(noteToSend).then((res) => window.alert(res.data.msg)).catch(err => {
           const {code, msg} =  returnErrObj(err)
           window.alert(`Error code: ${code} and the message: ${msg}`)
        })}>Create</button>
  </form>
  <div>
    {
      notes?.map(({note, id}) => <div key={id}>
        {isEdit ? <><p>{note}</p>
        <button onClick={() => setIsEdit(prev => !prev)}>Edit</button>
        <button onClick={async () => await deleteNote(id).then(({msg}) => window.alert(msg)).catch(err => {
           const {code, msg} =  returnErrObj(err)
           window.alert(`Error code: ${code} and the message: ${msg}`)
        })}>delete</button></> : <>
        <input type="text" value={newNote} onChange={({target}) => setNewNote(target.value)}/>
        <button onClick={async () => await updateNote({id, newNote}).then(({msg}) => window.alert(msg)).catch(err => {
          const {code, msg} =  returnErrObj(err)
          window.alert(`Error code: ${code} and the message: ${msg}`)
        })}>Update</button>
        </>}
      </div>)
    }
  </div>
 
</div>
}

export default App
