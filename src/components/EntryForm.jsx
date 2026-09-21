import { useState } from "react";
import "./EntryForm.css";

function fechaHoy() {
  const hoy = new Date();
  const yearHoy = hoy.getFullYear();
  const mesHoy = String(hoy.getMonth() + 1).padStart(2, "0");
  const diaHoy = String(hoy.getDate()).padStart(2, "0");
  return yearHoy + "-" + mesHoy + "-" + diaHoy;
}

function EntryForm({ onCrear }) {
    const [fecha, setFecha] = useState(fechaHoy);
    const [nombre, setNombre] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
    const [error, setError] = useState("");
    function handleSubmit() {
        if (fecha === "" || nombre === "" ||
            Number(puntuacion) < 0 || Number(puntuacion) > 10) {
            setError("Debes poner una fecha, nombre y puntuación correctas.");
            return;
        }
        onCrear(fecha, nombre, tiempo, puntuacion);
        setFecha(fechaHoy());
        setNombre("");
        setTiempo("");
        setPuntuacion("");
        setError("");
    }
    return (
        <div className="entry-form">
            <input className="entry-form-input" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            <input className="entry-form-input" type="text"
                placeholder="Nombre de la entrada" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input className="entry-form-input entry-form-tiempo"
                placeholder="Horas" type="number" min="0" value={tiempo}
                onChange={(e) => setTiempo(e.target.value)} />
            <input className="entry-form-input entry-form-puntuacion"
                placeholder="0 - 10" type="number" min="0" max="10" value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)} />
            <button className="entry-form-boton" onClick={handleSubmit}>Añadir entrada</button>
            {error && <p className="entry-form-error">{error}</p>}
        </div>
    )
}
export default EntryForm