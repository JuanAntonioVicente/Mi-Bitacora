import { useState } from "react";
import "./Calendar.css";

function Calendar({ listas, entradas, mes, setMes }) {
    function mesAnterior() {
        setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))
    }
    function mesSiguiente() {
        setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))
    }
    const year = mes.getFullYear();
    const numeroMes = mes.getMonth();
    const hoy = new Date();
    const yearHoy = hoy.getFullYear();
    const mesHoy = hoy.getMonth();
    const diaHoy = hoy.getDate();
    const diasDelMes = new Date(year, numeroMes + 1, 0).getDate()
    const dias = [];
    const [entradaMostrada, setEntradaMostrada] = useState(null);
    for (let i = 1; i <= diasDelMes; i++) {
        dias.push(i);
    }
    const empezarMes = new Date(year, numeroMes, 1).getDay()
    let huecos;
    if (empezarMes === 0) {
        huecos = 6
    } else {
        huecos = empezarMes - 1
    }
    const celdasVacias = [];
    for (let i = 0; i < huecos; i++) {
        celdasVacias.push(i)
    }
    return (
        <div>
            <div className="calendar-cabecera">
                <span className="calendar-mes">
                    {mes.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                </span>
                <span>
                    <button className="calendar-nav" onClick={mesAnterior}>‹</button>
                    <button className="calendar-nav" onClick={mesSiguiente}>›</button>
                </span>
            </div>
            <div className="calendar-semana">
                <div className="calendar-inicial">L</div>
                <div className="calendar-inicial">M</div>
                <div className="calendar-inicial">X</div>
                <div className="calendar-inicial">J</div>
                <div className="calendar-inicial">V</div>
                <div className="calendar-inicial">S</div>
                <div className="calendar-inicial">D</div>
            </div>
            <div className="calendar-grid">
                {celdasVacias.map((huecosPintados) => (
                    <div key={huecosPintados} className="calendar-celda-vacia"></div>
                ))}
                {dias.map((dia) => {
                    const fecha = year + "-" + String(numeroMes + 1).padStart(2, "0") + "-" + String(dia).padStart(2, "0");
                    const encontrarEntradas = entradas.filter((mismaEntrada) => mismaEntrada.fecha === fecha);
                    const esHoy = year === yearHoy && numeroMes === mesHoy && dia === diaHoy;
                    return (
                        <div className={"calendar-celda" + (esHoy ? "calendar-celda-hoy" : "")} key={dia}>
                            <div className="calendar-dia">{dia}</div>
                            {encontrarEntradas.map((entradaDelDia) => {
                                const laLista = listas.find((lista) => lista.id === entradaDelDia.listaId);
                                return (
                                    <div className="calendar-marca-contenedor" key={entradaDelDia.id}>
                                        {entradaMostrada && entradaMostrada.id === entradaDelDia.id && (
                                            <div className="calendar-tooltip">
                                                <span className="calendar-entrada-fecha">{entradaMostrada.fecha}</span>
                                                <span className="calendar-entrada-nombre">{entradaMostrada.nombre}</span>
                                                {entradaMostrada.tiempo && (
                                                    <span className="calendar-entrada-tiempo">{entradaMostrada.tiempo}
                                                        <span className="calendar-hora">h</span>
                                                    </span>
                                                )}
                                                {entradaMostrada.puntuacion && (
                                                    <span className="calendar-entrada-puntuacion">{entradaMostrada.puntuacion}
                                                        <span className="calendar-estrella">★</span>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className="calendar-marca"
                                            onMouseEnter={() => setEntradaMostrada(entradaDelDia)}
                                            onMouseLeave={() => setEntradaMostrada(null)}
                                            style={{ backgroundColor: laLista.color }}></div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Calendar;