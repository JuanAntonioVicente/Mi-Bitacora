import "./Summary.css";

function Summary({ listas, entradas, mes, onSeleccionar }) {
    const actual = mes.getFullYear() + "-" + String(mes.getMonth() + 1).padStart(2, "0");
    return (
        <>
            {entradas.length > 0 && (
                <>
                    <div className="summary-titulo">Todas las entradas</div>
                    <div className="summary-grid">
                        {listas.map((lista) => {
                            const total = entradas.filter((entrada) => entrada.listaId === lista.id).length;
                            return (
                                <div className="summary-card" key={lista.id} onClick={() => onSeleccionar(lista.id)}>
                                    <div className="summary-nombre">{lista.nombre}</div>
                                    <div className="summary-total" style={{ color: lista.color }}>{total}</div>
                                </div>
                            );
                        })}
                    </div >
                    <div className="summary-titulo">Resumen {mes.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</div>
                    <div className="summary-grid">
                        {listas.map((lista) => {
                            const total = entradas.filter((entrada) => entrada.listaId === lista.id && entrada.fecha.slice(0, 7) === actual).length;
                            return (
                                <div className="summary-card" key={lista.id} onClick={() => onSeleccionar(lista.id)}>
                                    <div className="summary-nombre">{lista.nombre}</div>
                                    <div className="summary-total" style={{ color: lista.color }}>{total}</div>
                                </div>
                            );
                        })}
                    </div >
                </>
            )}
        </>
    );
}
export default Summary;