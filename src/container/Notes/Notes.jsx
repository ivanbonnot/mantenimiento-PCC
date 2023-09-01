import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {et, set} from '../../constants/stations.js'; 


const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState(null); // Estado para almacenar los datos de la nota

  // Buscar el objeto en las listas "et" y "set" que coincida con el ID
  const note = [...et, ...set].find(item => item.id === id);
  console.log(note) //aca devuelve objeto con title e id, el que seleccione

  

  useEffect(() => {
    // Realizar la solicitud para cargar los datos de notes.json
    fetch('./notes.json') // Reemplaza 'ruta-a-tu-notes.json' con la ruta correcta
      .then(response => response.json())
      .then(data => {
        // Filtrar la nota por ID
        const note = data.find(item => item.estacion === id);
        setNoteData(note); // Almacenar la nota en el estado
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);


  return (
    <div>
        {console.log(noteData)}
      {note ? (
        <div>
          
          {/* Resto del contenido del componente */}
        </div>
      ) : (
        <div>
          <h2>Note not found</h2>
        </div>
      )}
    </div>
  );
}

export default Notes;
