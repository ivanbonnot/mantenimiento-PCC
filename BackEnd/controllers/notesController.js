const { getAllNotesDTO, getNoteByIdDTO, deleteNoteDTO, addNewNoteDTO, updateNoteDTO } = require('../DTO/notesDTO')


const addNewNoteController = (NoteToAdd) => addNewNoteDTO(NoteToAdd)

const getAllNotesController = () => getAllNotesDTO()

const getNoteByIdController = (id) => getNoteByIdDTO(id)

const updateNoteController = (id, NoteToUpdate) => updateNoteDTO(id, NoteToUpdate)

const deleteNoteController = (id) => deleteNoteDTO(id)


module.exports = { addNewNoteController, getAllNotesController, getNoteByIdController, deleteNoteController, updateNoteController }