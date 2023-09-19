const { Router } = require("express");
const {
  addNewNoteController,
  getAllNotesController,
  getNoteByIdController,
  deleteNoteController,
  updateNoteController,
} = require("../../controllers/notesController");

const notesRouter = Router();
const { passport, isDeletedJWT } = require('../../middleware/auth')
const logger = require('../../log/log4js')

const adm = true;
// isDeletedJWT, passport.authenticate('jwt', { session: false }), recortado de las rutas

notesRouter.get("/notes", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {
    const notes = await getAllNotesController();
    res.json({ notes });

  } catch (error) {
    logger.error(`Error en la solicitud de notes: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


notesRouter.get("/notes/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req
  const { id } = req.params;

  try {
    const noteById = await getNoteByIdController(id);

    if (noteById) {
      res.json(noteById);
    } else {
      logger.error(`Ruta: ${url}, método: ${method}. No existe la nota:${id}`);
      return res.status(403).json({ result: "error" });
    }

  } catch (error) {
    logger.error(`Error en la solicitud de nota por id: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


notesRouter.post("/notes", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req

  try {

    const { idnota, title, note, fecha, estacion } = req.body;

    const notePost = {
      idnota,
      title,
      note,
      fecha,
      creador: "",
      estacion,
    };

    await addNewNoteController(notePost);
    res.json(notePost);

  } catch (error) {
    logger.error(`Error al crear nota: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


notesRouter.put("/notes/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req

  try {
    if (adm) {
      const { id } = req.params;
      const { title, note } = req.body;

      const noteUpdate = {
        idnota: uuid(),
        title,
        note,
        fecha: moment().format("MMMM Do YYYY, h:mm:ss a"),
        creador: "",
        estacion: id,
      };

      const noteById = await getNoteByIdController(id);

      if (noteById) {
        await updateNoteController(id, noteUpdate);
        res.json(noteUpdate);
      } else {
        logger.error(`Ruta: ${url}, método: ${method}. No existe la nota:${id}`);
        return res.status(403).json({ result: "error" });
      }
    } else {
      logger.error(`Ruta: ${url}, método: ${method}. Usuario no autorizado`);
      return res.status(403).json({ result: "error" });
    }

  } catch (error) {
    logger.error(`Error al actualizar la nota: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


notesRouter.delete("/notes/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req
  const { id } = req.params;

  try {
    const noteById = await getNoteByIdController(id);

    if (noteById) {
      await deleteNoteController(id);
      res.status(200).json({ deleted: true });
    } else {
      logger.error(`Ruta: ${url}, método: ${method}. No existe la nota:${id}`);
      return res.status(403).json({ result: "error" });
    }


  } catch (error) {
    logger.error(`Error al borrar la nota: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


module.exports = notesRouter;
