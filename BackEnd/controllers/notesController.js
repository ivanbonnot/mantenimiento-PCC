const { getAllNotesDTO, getNoteByIdDTO, addResolvedNoteDTO, getResolvedNotesDTO, deleteNoteDTO, addNewNoteDTO, updateNoteDTO } = require('../DTO/notesDTO')


const addNewNoteController = (NoteToAdd) => addNewNoteDTO(NoteToAdd)

const getAllNotesController = () => getAllNotesDTO()

const addResolvedNoteController = (NoteToAdd) => addResolvedNoteDTO(NoteToAdd)

const getResolvedNotesController = () => getResolvedNotesDTO()

const getNoteByIdController = (id) => getNoteByIdDTO(id)

const updateNoteController = (id, NoteToUpdate) => updateNoteDTO(id, NoteToUpdate)

const deleteNoteController = (id) => deleteNoteDTO(id)


module.exports = { addNewNoteController, getAllNotesController, addResolvedNoteController, getResolvedNotesController, getNoteByIdController, deleteNoteController, updateNoteController }