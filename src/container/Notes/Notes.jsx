import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import stations from "../../constants/stations";

function Notes() {

    const { id } = useParams()
    const [places, setPlaces] = useState([])

    useEffect(() => {
       
      }, [id]);

      useEffect(() => {
        fetch(stations)
          .then((response) => {
            return response.json()
          })
          .then((places) => {
            setPlaces(places)
          })
      }, [id])

  return (
    <div>Notes</div>
  )
}

export default Notes