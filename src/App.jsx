import { useState, useRef } from "react";
import "./App.css";
import Summary from "./components/Summary.jsx";
import ListCard from "./components/ListCard.jsx";
import ListForm from "./components/ListForm.jsx";
import EntryForm from "./components/EntryForm.jsx";
import Calendar from "./components/Calendar.jsx";
import EntryCard from "./components/EntryCard.jsx";

function App() {
  const [listas, setListas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [mes, setMes] = useState(new Date());
  const [entradaEnEdicion, setEntradaEnEdicion] = useState(null);
  const [listaEnEdicion, setListaEnEdicion] = useState(null);
  function agregarLista(nombre, color) {
    const nuevaLista = {
      id: Date.now(),
      nombre: nombre,
      color: color,
    };
    setListas([...listas, nuevaLista]);
  }
  function agregarEntrada(fecha, nombre, tiempo, puntuacion) {
    const nuevaEntrada = {
      id: Date.now(),
      listaId: listaSeleccionada,
      fecha: fecha,
      nombre: nombre,
      tiempo: tiempo,
      puntuacion: puntuacion,
    };
    setEntradas([...entradas, nuevaEntrada]);
  }
  function borrarEntrada(id) {
    setEntradas(entradas.filter((entrada) => entrada.id !== id));
  }
  function borrarLista(id) {
    setListas(listas.filter((lista) => lista.id !== id));
    setEntradas(entradas.filter((entrada) => entrada.listaId !== id));
    if (id === listaSeleccionada) {
      setListaSeleccionada(null);
    }
  }
  const entradasFiltradas = entradas
    .filter((entrada) => entrada.listaId === listaSeleccionada)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  function editarLista(id, nuevoNombre) {
    setListas(
      listas.map((lista) => {
        if (lista.id === id) {
          return { ...lista, nombre: nuevoNombre };
        }
        return lista;
      })
    );
  }
  const listaActual = listas.find((lista) => lista.id === listaSeleccionada);
  function editarEntradas(id, nuevaFecha, nuevoNombre, nuevoTiempo, nuevaPuntuacion) {
    setEntradas(
      entradas.map((entrada) => {
        if (entrada.id === id) {
          return {
            ...entrada,
            fecha: nuevaFecha,
            nombre: nuevoNombre,
            tiempo: nuevoTiempo,
            puntuacion: nuevaPuntuacion,
          };
        }
        return entrada;
      })
    );
  }
  const panelRef = useRef(null);
  function seleccionarYSubir (id) {
    setListaSeleccionada(id)
    panelRef.current.scrollIntoView({ behavior: "smooth", block:"center" });
  }

  return (
    <div className="app">
      <h1 className="app-titulo">Is She Right?</h1>
      {listas.length > 0 ? (
        <p className="app-subtitulo">
          Tienes {listas.length} {listas.length === 1 ? "lista" : "listas"}
        </p>
      ) : (
        <p className="app-vacio">No tienes ninguna lista...</p>
      )}
      <div className="app-listas">
        {listas.map((lista) => (
          <ListCard
            key={lista.id}
            lista={lista}
            entradas={entradas}
            onSeleccionar={setListaSeleccionada}
            listaSeleccionada={listaSeleccionada}
            onBorrar={borrarLista}
            onEditar={editarLista}
            listaEnEdicion={listaEnEdicion}
            setListaEnEdicion={setListaEnEdicion}
          />
        ))}
      </div>
      <ListForm onCrear={agregarLista} />
      {listaSeleccionada ? (
        <div className="entradas-panel" style={{ borderLeft: "3px solid" + listaActual.color }} ref={panelRef}>
          <div className="entradas-titulo">Entradas de {listaActual.nombre}</div>
          {entradasFiltradas.map((entrada) => (
            <EntryCard key={entrada.id} entrada={entrada} onBorrar={borrarEntrada}
              onEditar={editarEntradas} entradaEnEdicion={entradaEnEdicion} setEntradaEnEdicion={setEntradaEnEdicion} />
          ))}
          <EntryForm onCrear={agregarEntrada} />
        </div>
      ) : (
        listas.length > 0 && (
          <p className="app-sin-seleccion">Selecciona una lista para ver y añadir entradas</p>
        )
      )}
      <Summary listas={listas} entradas={entradas} mes={mes} onSeleccionar={seleccionarYSubir} />
      <Calendar listas={listas} entradas={entradas} mes={mes} setMes={setMes} />
    </div>
  );
}
export default App;
