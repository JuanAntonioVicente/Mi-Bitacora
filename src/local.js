function leerListas() {
    const listasGuardadas = localStorage.getItem("listas");
    return listasGuardadas ? JSON.parse(listasGuardadas) : [];
}

function leerEntradas() {
    const entradasGuardadas = localStorage.getItem("entradas");
    return entradasGuardadas ? JSON.parse(entradasGuardadas) : [];
}

function guardarListas(listas) {
    localStorage.setItem("listas", JSON.stringify(listas));
}

function guardarEntradas(entradas) {
    localStorage.setItem("entradas", JSON.stringify(entradas));
}

export function obtenerListas() {
    return Promise.resolve(leerListas());
}

export function obtenerEntradas() {
    return Promise.resolve(leerEntradas());
}

export function apiCrearLista(nombre, color) {
    const listas = leerListas();
    const nuevaLista = {
        id: Date.now(),
        nombre: nombre,
        color: color
    }
    const arrayListas = [...listas, nuevaLista]
    guardarListas(arrayListas);
    return Promise.resolve(nuevaLista);
}

export function apiCrearEntrada(listaId, fecha, nombre, tiempo, puntuacion) {
    const entradas = leerEntradas();
    const nuevaEntrada = {
        id: Date.now(),
        listaId: listaId,
        fecha: fecha,
        nombre: nombre,
        tiempo: tiempo,
        puntuacion: puntuacion
    }
    const arrayEntradas = [...entradas, nuevaEntrada]
    guardarEntradas(arrayEntradas);
    return Promise.resolve(nuevaEntrada);
}

export function apiBorrarLista(id) {
    const listas = leerListas();
    const listasFiltradas = listas.filter((lista) => lista.id !== id);
    guardarListas(listasFiltradas);
    const entradas = leerEntradas();
    const entradasFiltradas = entradas.filter((entrada) => entrada.listaId !== id);
    guardarEntradas(entradasFiltradas);
    return Promise.resolve();
}

export function apiBorrarEntrada(id) {
    const entradas = leerEntradas();
    const entradasFiltradas = entradas.filter((entrada) => entrada.id !== id);
    guardarEntradas(entradasFiltradas);
    return Promise.resolve();
}

export function apiEditarLista(id, nuevoNombre, nuevoColor) {
    const listas = leerListas();
    const listasEditadas = listas.map((lista) => {
        if (lista.id === id) {
            return { ...lista, nombre: nuevoNombre, color: nuevoColor };
        }
        return lista;
    })
    guardarListas(listasEditadas);
    return Promise.resolve(listasEditadas.find((lista) => lista.id === id));
}

export function apiEditarEntradas(id, nuevaFecha, nuevoNombre, nuevoTiempo, nuevaPuntuacion) {
    const entradas = leerEntradas();
    const entradasEditadas = entradas.map((entrada) => {
        if (entrada.id === id) {
            return { ...entrada, fecha: nuevaFecha, nombre: nuevoNombre, tiempo: nuevoTiempo, puntuacion: nuevaPuntuacion };
        }
        return entrada;
    })
    guardarEntradas(entradasEditadas);
    return Promise.resolve(entradasEditadas.find((entrada) => entrada.id === id));
}