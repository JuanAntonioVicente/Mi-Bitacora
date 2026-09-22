import { useState } from "react";
import "./EntryCard.css";

function EntryCard({ entrada, onBorrar, onEditar, entradaEnEdicion, setEntradaEnEdicion }) {
  const [fechaEditada, setFechaEditada] = useState(entrada.fecha);
  const [nombreEditado, setNombreEditado] = useState(entrada.nombre);
  const [tiempoEditado, setTiempoEditado] = useState(entrada.tiempo);
  const [puntuacionEditada, setPuntuacionEditada] = useState(entrada.puntuacion);
  const [confirmar, setConfirmar] = useState(false);
  const [error, setError] = useState("");
  const editar = entradaEnEdicion === entrada.id;
  return (
    <div className="entrada-fila">
      {editar ? (
        <span className="entrada-editando">
          <input
            className="entrada-input"
            type="date"
            value={fechaEditada}
            onChange={(e) => setFechaEditada(e.target.value)}
          />
          <input
            className="entrada-input"
            type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
          />
          <input
            className="entrada-input entrada-input-tiempo"
            placeholder="Horas"
            type="number"
            min="0"
            value={tiempoEditado}
            onChange={(e) => setTiempoEditado(e.target.value)}
          />
          <input
            className="entrada-input entrada-input-puntuacion"
            placeholder="0 - 10"
            type="number"
            min="0" max="10"
            value={puntuacionEditada}
            onChange={(e) => setPuntuacionEditada(e.target.value)}
          />
        </span>
      ) : (
        <span className="entrada-texto">
          <span className="entrada-fecha">{entrada.fecha}</span>
          <span className="entrada-nombre">{entrada.nombre}</span>
          {entrada.tiempo && (
            <span className="entrada-tiempo">{entrada.tiempo}<span className="entrada-hora">h</span></span>
          )}
          {entrada.puntuacion && (
            <span className="entrada-puntuacion">{entrada.puntuacion}<span className="entrada-estrella">★</span></span>
          )}
        </span>
      )}

      <span className="entrada-derecha">
        {!editar && !confirmar && (
          <button className="entrada-boton" onClick={() => {
            setEntradaEnEdicion(entrada.id);
            setFechaEditada(entrada.fecha);
            setNombreEditado(entrada.nombre);
            setTiempoEditado(entrada.tiempo);
            setPuntuacionEditada(entrada.puntuacion);
          }}>
            Editar
          </button>
        )}
        {editar && !confirmar && (
          <button
            className="entrada-boton entrada-guardar"
            onClick={() => {
              if (fechaEditada === "" || nombreEditado === "" ||
                Number(puntuacionEditada) < 0 || Number(puntuacionEditada) > 10) {
                setError("Debes poner una fecha, nombre y puntuación correctas.");
                return;
              }
              onEditar(entrada.id, fechaEditada, nombreEditado, tiempoEditado, puntuacionEditada);
              setEntradaEnEdicion(null);
              setError("");
            }}>
            Guardar
          </button>
        )}
        {!confirmar && editar && (
          <button className="entrada-borrar" onClick={() => {
            setConfirmar(true);
            setError("");
          }}>
            Borrar
          </button>
        )}
        {editar && !confirmar && (
          <button className="entrada-boton" onClick={() => {
            setFechaEditada(entrada.fecha);
            setNombreEditado(entrada.nombre);
            setTiempoEditado(entrada.tiempo);
            setPuntuacionEditada(entrada.puntuacion);
            setEntradaEnEdicion(null);
            setError("");
          }}>
            Cancelar
          </button>
        )}
        {confirmar && (
          <div className="entrada-confirmar">
            <button
              className="entrada-boton entrada-boton-confirmar"
              onClick={() => {
                onBorrar(entrada.id);
                setConfirmar(false);
              }}>
              Confirmar
            </button>
            <button
              className="entrada-boton"
              onClick={() => {
                setConfirmar(false);
              }}>
              Cancelar
            </button>
          </div>
        )}
      </span>
      {error && <p className="entrada-error">{error}</p>}
    </div>
  );
}

export default EntryCard;
