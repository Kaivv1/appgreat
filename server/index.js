import express from "express"
import morgan from "morgan"
import cors from "cors"
import { notesArr } from "./db.js"
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: "http://localhost:3000"
}))
app.listen(port, () => console.log("We live"))


// app.use("/notes", notesRouter)

app.get("/notes", (req,res, next) => {
    res.status(200).json(notesArr)
})
app.post("/notes", (req, res, next) => {
    const {note} = req.body;
    if (!note) return next({msg: "No note provided", code: 404})
    const newNote = { id: uuidv4(), note }
    notesArr.push(newNote)
    return res.status(201).json(notesArr)
})

app.get("/notes/:id", (req, res, next) => {
   const {id} = req.params;
   const note = notesArr.find(note => note.id === id)
   if(!note) return next({msg: "Cannot find note with that id", code: 404})
   return res.status(200).json({ ...note })
})

app.put("/notes/:id", (req, res, next) => {
    const {id} = req.params;
    const {newNote} = req.body;
    if(!newNote) return next({msg: "No new note was provided in the req body", code: 404})
    const note = notesArr.find(note => note.id === id)
    console.log(note)
    if(!note) return next({msg: "Cannot find note with that id", code: 404})
    note.note = newNote;
    return res.status(204).json(...note)
})

app.delete("/notes/:id", (req, res, next) => {
    const {id} = req.params;
    const note = notesArr.find(note => note.id === id)
    if(!note) return next({msg: "Cannot find note with that id", code: 404})
    const newNotesArr = notesArr.filter(note => note.id != id)    
    
    return res.status(200).json(newNotesArr)
})

app.get("/", (req,res) => {
    res.status(200).json({msg: "we in here"})
})

app.use((err, req, res, next) => {
    if (err) {
        const { msg, code} = err
        return res.status(code).json({msg})
    }
})


