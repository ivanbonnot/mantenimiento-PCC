import React from 'react'
import './DeleteNoteLoader.css'

function DeleteNoteLoader() {
  return (
    <div className="app__notes-delete">
    <h1 className="p__cormorant loading-animation">Notas Eliminadas</h1>
    <table className="app__notes-delete_table-loading">
              <thead>
                <tr>
                  <th className="p__opensans loading-animation">Nota</th>
                  <th className="title p__opensans loading-animation">Título</th>
                  <th className="author p__opensans loading-animation">Fecha</th>
                  <th className="date p__opensans loading-animation">Autor</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className="p__opensans"></td>
                    <td className="p__opensans"></td>
                    <td className="p__opensans"></td>
                    <td className="p__opensans"></td>
                  </tr>
              </tbody>
            </table>
            </div>
  )
}

export default DeleteNoteLoader