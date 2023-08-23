import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {et, set} from '../../constants/stations.js'; // Ajusta la ruta según la ubicación de tu archivo de datos

const Notes = () => {
  const { id } = useParams();

  useEffect(() => {
    return () => {
      console.log(id)
    }
  }, [id])
  
  // Buscar el objeto en las listas "et" y "set" que coincida con el ID
  const note = [...et, ...set].find(item => item.id === id);
  console.log(note)
  console.log(...et)

  return (
    <div>
        {console.log(note)}
      {note ? (
        <div>
          <h2>Note ID: {id}</h2>
          <h3>Title: {note.title}</h3>
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
