import { useState, useRef, useEffect } from "react";
import "./App.css";
import Summary from "./components/Summary.jsx";
import ListCard from "./components/ListCard.jsx";
import ListForm from "./components/ListForm.jsx";
import EntryForm from "./components/EntryForm.jsx";
import Calendar from "./components/Calendar.jsx";
import EntryCard from "./components/EntryCard.jsx";
import { obtenerListas, obtenerEntradas, apiCrearLista, apiCrearEntrada, apiBorrarLista, apiBorrarEntrada, apiEditarLista, apiEditarEntradas } from "./api.js"; 
import Logo from "./components/Logo.jsx";

function App() {
  const [listas, setListas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [mes, setMes] = useState(new Date());
  const [entradaEnEdicion, setEntradaEnEdicion] = useState(null);
  const [listaEnEdicion, setListaEnEdicion] = useState(null);
  function agregarLista(nombre, color) {
    apiCrearLista(nombre, color)
      .then((nuevaLista) => setListas([...listas, nuevaLista]));
  }
  function agregarEntrada(fecha, nombre, tiempo, puntuacion) {
    apiCrearEntrada(listaSeleccionada, fecha, nombre, tiempo, puntuacion)
      .then((nuevaEntrada) => setEntradas([...entradas, nuevaEntrada]));
  }
  function borrarEntrada(id) {
    apiBorrarEntrada(id)
      .then(() => {
        setEntradas(entradas.filter((entrada) => entrada.id !== id));
      })
  }
  function borrarLista(id) {
    apiBorrarLista(id)
      .then(() => {
        setListas(listas.filter((lista) => lista.id !== id));
        setEntradas(entradas.filter((entrada) => entrada.listaId !== id));
        if (id === listaSeleccionada) {
          setListaSeleccionada(null);
        }
      })
  }
  const entradasFiltradas = entradas
    .filter((entrada) => entrada.listaId === listaSeleccionada)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  function editarLista(id, nuevoNombre, nuevoColor) {
    apiEditarLista(id, nuevoNombre, nuevoColor)
      .then((listaEditada) =>
        setListas(listas.map((lista) => (lista.id === id ? listaEditada : lista)))
      );
  }
  const listaActual = listas.find((lista) => lista.id === listaSeleccionada);
  function editarEntradas(id, nuevaFecha, nuevoNombre, nuevoTiempo, nuevaPuntuacion) {
    apiEditarEntradas(id, nuevaFecha, nuevoNombre, nuevoTiempo, nuevaPuntuacion)
      .then((entradaEditada) =>
        setEntradas(entradas.map((entrada) => (entrada.id === id ? entradaEditada : entrada)))
      );
  }
  const panelRef = useRef(null);
  function seleccionarYSubir(id) {
    setListaSeleccionada(id)
    panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    obtenerListas().then((datos) => setListas(datos));
    obtenerEntradas().then((datos) => setEntradas(datos));
  }, []);

  return (
    <div className="app">
      <div className="app-cabecera">
        <Logo />
        <h1 className="app-titulo">
          Mi <span className="app-titulo-destacado">Bitácora</span>
        </h1>
      </div>
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
        <div className="entradas-panel" style={{ borderLeft: "3px solid " + listaActual.color }} ref={panelRef}>
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
