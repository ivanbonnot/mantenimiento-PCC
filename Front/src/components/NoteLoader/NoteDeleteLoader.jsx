import React, { useEffect, useState} from 'react'
import './NoteDeleteLoader.css'

function NoteDeleteLoader() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    // Limpieza del event listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <>
     <h1 className="p__cormorant">Notas Eliminadas</h1>
     {windowWidth > 768 ? (
      <table className="app__notes-delete_table-loading">
              <thead>
                <tr>
                  <th className="p__opensans loading-animation"></th>
                  <th className="title p__opensans loading-animation"></th>
                  <th className="author p__opensans loading-animation"></th>
                  <th className="date p__opensans loading-animation"></th>
                </tr>
              </thead>
            </table>
      ) : (
        <div className="app__notes-loading loading">
        <p className="author p__opensans loading-animation"> </p>
        <p className="date p__opensans loading-animation"></p>
      </div>
        )
        }
    </>
  )
}

export default NoteDeleteLoader