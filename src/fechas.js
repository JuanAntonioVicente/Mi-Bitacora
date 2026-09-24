export function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

export function fechaHoy() {
  const hoy = new Date();
  const yearHoy = hoy.getFullYear();
  const mesHoy = String(hoy.getMonth() + 1).padStart(2, "0");
  const diaHoy = String(hoy.getDate()).padStart(2, "0");
  return yearHoy + "-" + mesHoy + "-" + diaHoy;
}