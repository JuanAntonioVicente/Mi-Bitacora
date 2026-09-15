import { useState, useRef, useEffect } from "react";
import "./App.css";
import Summary from "./components/Summary.jsx";
import ListCard from "./components/ListCard.jsx";
import ListForm from "./components/ListForm.jsx";
import EntryForm from "./components/EntryForm.jsx";
import Calendar from "./components/Calendar.jsx";
import EntryCard from "./components/EntryCard.jsx";
import Logo from "./components/Logo.jsx";

function App() {
  const [listas, setListas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [mes, setMes] = useState(new Date());
  const [entradaEnEdicion, setEntradaEnEdicion] = useState(null);
  const [listaEnEdicion, setListaEnEdicion] = useState(null);
  function agregarLista(nombre, color) {
    fetch("http://localhost:3001/listas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre, color: color })
    })
      .then((res) => res.json())
      .then((nuevaLista) => setListas([...listas, nuevaLista]));
  }
  function agregarEntrada(fecha, nombre, tiempo, puntuacion) {
    fetch("http://localhost:3001/entradas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listaid: listaSeleccionada, fecha: fecha, nombre: nombre, tiempo: tiempo, puntuacion: puntuacion })
    })
      .then((res) => res.json())
      .then((nuevaEntrada) => setEntradas([...entradas, nuevaEntrada]));
  }
  function borrarEntrada(id) {
    fetch("http://localhost:3001/entradas/" + id, {
      method: "DELETE"
    })
    .then(() => {
      setEntradas(entradas.filter((entrada) => entrada.id !== id));
    })
  }
  function borrarLista(id) {
    fetch("http://localhost:3001/listas/" + id, {
      method: "DELETE"
    })
      .then(() => {
        setListas(listas.filter((lista) => lista.id !== id));
        setEntradas(entradas.filter((entrada) => entrada.listaId !== id));
        if (id === listaSeleccionada) {
          setListaSeleccionada(null);
        }
      });
  }
  const entradasFiltradas = entradas
    .filter((entrada) => entrada.listaId === listaSeleccionada)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  function editarLista(id, nuevoNombre, nuevoColor) {
    fetch("http://localhost:3001/listas/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre, color: nuevoColor })
    })
      .then((res) => res.json())
      .then((listaEditada) =>
        setListas(listas.map((lista) => (lista.id === id ? listaEditada : lista)))
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
  function seleccionarYSubir(id) {
    setListaSeleccionada(id)
    panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    fetch("http://localhost:3001/listas")
      .then((res) => res.json())
      .then((datos) => setListas(datos));
    fetch("http://localhost:3001/entradas")
      .then((res) => res.json())
      .then((datos) => setEntradas(datos));
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
