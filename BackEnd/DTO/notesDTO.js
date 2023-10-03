const factoryDAO = require('../DAO/factory')

const notes = factoryDAO()


const addNewNoteDTO = async (note) => await notes.saveNote(note)

const getAllNotesDTO = async () => await notes.getNotes()

const addResolvedNoteDTO = async (note) => await notes.saveResolvedNote(note)

const getResolvedNotesDTO = async () => await notes.getResolvedNotes()

const getNoteByIdDTO = async (id) => await notes.getNoteById(id)

const updateNoteDTO = async (id, noteToUpdate) => await notes.updateNote(id, noteToUpdate)

const deleteNoteDTO = async (id) => await notes.deleteNote(id)

const deleteAllNotesDTO = async () => await notes.deleteAllNotes()



module.exports = { getAllNotesDTO, getNoteByIdDTO, addResolvedNoteDTO, getResolvedNotesDTO, deleteNoteDTO, deleteAllNotesDTO, addNewNoteDTO, updateNoteDTO }

