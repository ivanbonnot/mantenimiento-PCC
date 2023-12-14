import React from 'react'
import './NoteLoader.css'

function NoteLoader() {
  return (
    <>
    <h1 className="p__cormorant">Notas</h1>
      <div className="app__notes-loading loading">
        <p className="title p__opensans loading-animation"></p>
        <p className="loading p__opensans loading-animation"></p>
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
      </>
  )
}

export default NoteLoader