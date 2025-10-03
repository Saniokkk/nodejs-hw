import createHttpError from "http-errors"
import { Note } from "../models/note.js"

export const getAllNotes = async (req, res, _next) => {
    const notes = await Note.find()
    res.status(200).json(notes)
}

export const getNoteById = async (req, res, _next) => {
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    if (!note) {
        throw createHttpError(404, "Note not found")
    }
    res.status(200).json(note)
}

export const createNote = async (req, res, _next) => {
    const body = req.body
    const note = await Note.create(body)
    res.status(201).json(note)
}

export const deleteNote = async (req, res, _next) => {
    const { noteId } = req.params
    const note = await Note.findOneAndDelete(noteId)
    if (!note) {
        throw createHttpError(404, "Note not found")
    }
    res.status(200).json(note)
}

export const updateNote = async (req, res, _next) => {
    const { noteId } = req.params
    const body = req.body
    const note = await Note.findOneAndUpdate({ _id: noteId }, body, { new: true })
    console.log('note: ', note);
    if (!note) {
        throw createHttpError(404, "Note not found")
    }
    res.status(200).json(note)
}