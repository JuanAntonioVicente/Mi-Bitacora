import "./Summary.css";
import { fechaHoy, claveMes } from "../fechas";

function Summary({ listas, entradas, mes, onSeleccionar }) {
    return (
        <>
            {entradas.length > 0 && (
                <>
                    <div className="summary-titulo">Todas las entradas</div>
                    <div className="summary-grid">
                        {listas.map((lista) => {
                            const total = entradas.filter((entrada) => entrada.listaId === lista.id).length;
                            return (
                                <div className="summary-card" key={lista.id} onClick={() => onSeleccionar(lista.id, "todas")}>
                                    <div className="summary-nombre">{lista.nombre}</div>
                                    <div className="summary-total" style={{ color: lista.color }}>{total}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="summary-titulo">Próximamente</div>
                    <div className="summary-grid">
                        {listas.map((lista) => {
                            const total = entradas.filter((entrada) => entrada.listaId === lista.id && entrada.fecha > fechaHoy()).length;
                            return (
                                <div className="summary-card" key={lista.id} onClick={() => onSeleccionar(lista.id, "proximamente")}>
                                    <div className="summary-nombre">{lista.nombre}</div>
                                    <div className="summary-total" style={{ color: lista.color }}>{total}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="summary-titulo">Resumen {mes.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</div>
                    <div className="summary-grid">
                        {listas.map((lista) => {
                            const total = entradas.filter((entrada) => entrada.listaId === lista.id && entrada.fecha.slice(0, 7) === claveMes(mes)).length;
                            return (
                                <div className="summary-card" key={lista.id} onClick={() => onSeleccionar(lista.id, "mes")}>
                                    <div className="summary-nombre">{lista.nombre}</div>
                                    <div className="summary-total" style={{ color: lista.color }}>{total}</div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
}
export default Summary;