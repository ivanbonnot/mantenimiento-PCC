import React from 'react'
import './NoteLoader.css'
import DeleteNoteLoader from './DeleteNoteLoader'

function NoteLoader() {
  return (
    <div className="app__notes-read loading">
      <div className="app__notes-loading loading">
        <p className="title p__opensans loading-animation"></p>
        <p className="loading p__opensans loading-animation"></p>
        <p className="loading p__opensans loading-animation"> </p>
        <p className="author p__opensans loading-animation"> </p>
        <p className="date p__opensans loading-animation"></p>
        <div>
         <button
         type="button"
         className="delete__button_loading loading-animation"
         >
         </button>
        </div>
      </div>
      <div>
        < DeleteNoteLoader />
      </div>
    </div>
  )
}

export default NoteLoader