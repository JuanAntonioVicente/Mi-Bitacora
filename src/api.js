const API = import.meta.env.VITE_API_URL;

export function obtenerListas() {
    return fetch(API + "/listas").then((res) => res.json());
}

export function obtenerEntradas() {
    return fetch(API + "/entradas").then((res) => res.json());
}

export function apiCrearLista(nombre, color) {
    return fetch(API + "/listas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, color: color })
    }).then((res) => res.json());
}

export function apiCrearEntrada(listaid, fecha, nombre, tiempo, puntuacion) {
    return fetch(API + "/entradas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listaid: listaid, fecha: fecha, nombre: nombre, tiempo: tiempo, puntuacion: puntuacion })
    })
        .then((res) => res.json());
}

export function apiBorrarLista(id) {
    return fetch(API + "/listas/" + id, {
        method: "DELETE"
    })
        .then((res) => res.json());
}

export function apiBorrarEntrada(id) {
    return fetch(API + "/entradas/" + id, {
        method: "DELETE"
    })
        .then((res) => res.json());
}

export function apiEditarLista(id, nuevoNombre, nuevoColor) {
    return fetch(API + "/listas/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre, color: nuevoColor })
    })
        .then((res) => res.json());
}

export function apiEditarEntradas(id, nuevaFecha, nuevoNombre, nuevoTiempo, nuevaPuntuacion) {
    return fetch(API + "/entradas/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha: nuevaFecha, nombre: nuevoNombre, tiempo: nuevoTiempo, puntuacion: nuevaPuntuacion })
    })
        .then((res) => res.json());
}