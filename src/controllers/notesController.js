import createHttpError from "http-errors"
import { Note } from "../models/note.js"

export const getAllNotes = async (req, res, _next) => {
    const { page = 1, perPage = 10, search, tag } = req.query
    const notesQuery = Note.find()
    // 3 * 12 = 36 - 12
    const skip = page * perPage - perPage

    if (tag) {
        notesQuery.where({ tag: { $eq: tag } })
        // notesQuery.where(tag).equals(tag)
    }

    if (search) {
        notesQuery.where({ $text: { $search: search } })
    }

    const [totalNotes, notes] = await Promise.all([
        notesQuery.clone().countDocuments(),
        notesQuery.skip(skip).limit(perPage)
    ])

    const totalPages = Math.ceil(totalNotes / perPage)

    res.status(200).json({
        page,
        perPage,
        totalNotes,
        totalPages,
        notes
    })
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