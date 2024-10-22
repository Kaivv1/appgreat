import axios from "axios";

export interface Note {
    id: string
    note: string
}


export async function getNotes() {
    return axios.get<Note[]>("http://localhost:8080/notes").then(res => res.data).catch(err => {
        throw err
    })
}

export async function createNote(note:string) {
    return axios.post<{msg:string}>("http://localhost:8080/notes", {note}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function updateNote({id, newNote}: {id:string, newNote: string}) {
    return axios.put<{msg: string}>(`http://localhost:8080/notes`, { newNote }, {
        params: id,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.data).catch(err => {
        throw err
    })
}

export async function deleteNote(id:string){
    return axios.delete<{msg: string}>("http://localhost:8080/notes", {
        params: id
    }).then(res => res.data).catch(err => {
        throw err
    })
}