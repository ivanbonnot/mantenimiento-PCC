import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { et, set } from "../../constants/stations.js";

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]); // Estado para almacenar los datos de la nota

  // Buscar el objeto en las listas "et" y "set" que coincida con el ID
  const note = [...et, ...set].find((item) => item.id === id);
  console.log(note); //aca devuelve objeto con title e id, el que seleccione

  useEffect(() => {
    // Realizar la solicitud para cargar los datos de notes.json
    axios
      .get("./notes.json") // Reemplaza 'ruta-a-tu-notes.json' con la ruta correcta
      .then((res) => setNoteData(res));
      console.log(noteData)
      .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
    
  }, []);

  useEffect(() => {
    // Mover la lógica que depende de noteData aquí
    console.log(noteData);
  }, [noteData]);

  return (
    <div>
      {console.log(noteData)}
      {note ? (
        <div>{/* Resto del contenido del componente */}</div>
      ) : (
        <div>
          <h2>Note not found</h2>
        </div>
      )}
    </div>
  );
};

export default Notes;
