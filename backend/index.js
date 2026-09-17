import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("El servidor funciona");
});

app.get("/listas", async (req, res) => {
    const resultado = await pool.query("SELECT * FROM listas");
    res.json(resultado.rows);
});

app.post("/listas", async (req, res) => {
    const nombre = req.body.nombre;
    const color = req.body.color;
    const peticion = await pool.query("INSERT INTO listas (nombre, color) VALUES ($1, $2) RETURNING *",
        [nombre, color]
    );
    res.json(peticion.rows[0]);
});

app.delete("/listas/:id", async (req, res) => {
    const id = req.params.id;
    const borrar = await pool.query("DELETE FROM listas WHERE id = $1 RETURNING *",
        [id]
    )
    res.json(borrar.rows[0]);
});

app.put("/listas/:id", async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const color = req.body.color;
    const modificar = await pool.query("UPDATE listas SET nombre = $1, color = $2 WHERE id = $3 RETURNING *",
        [nombre, color, id]
    );
    res.json(modificar.rows[0])
});

app.get("/entradas", async (req, res) => {
    const resultado = await pool.query(`SELECT id, listaid AS "listaId", 
        TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, nombre, tiempo, puntuacion FROM entradas`);
    res.json(resultado.rows);
});

app.post("/entradas", async (req, res) => {
    const listaid = req.body.listaid;
    const fecha = req.body.fecha;
    const nombre = req.body.nombre;
    const tiempo = req.body.tiempo === "" ? null : req.body.tiempo;
    const puntuacion = req.body.puntuacion === "" ? null : req.body.puntuacion;
    const peticion = await pool.query(`INSERT INTO entradas (listaid, fecha, nombre, tiempo, puntuacion) 
        VALUES ($1, $2, $3, $4, $5) RETURNING id, listaid AS "listaId", 
        TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, nombre, tiempo, puntuacion`,
        [listaid, fecha, nombre, tiempo, puntuacion]
    );
    res.json(peticion.rows[0]);
});

app.delete("/entradas/:id", async (req, res) => {
    const id = req.params.id;
    const borrar = await pool.query("DELETE FROM entradas WHERE id = $1 RETURNING *",
        [id]
    )
    res.json(borrar.rows[0]);
});

app.put("/entradas/:id", async (req, res) => {
    const id = req.params.id;
    const fecha = req.body.fecha;
    const nombre = req.body.nombre;
    const tiempo = req.body.tiempo === "" ? null : req.body.tiempo;
    const puntuacion = req.body.puntuacion === "" ? null : req.body.puntuacion;
    const modificar = await pool.query(`UPDATE entradas SET fecha = $1, nombre = $2, tiempo = $3, puntuacion = $4 WHERE id = $5 
        RETURNING id, listaid AS "listaId", TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, nombre, tiempo, puntuacion`,
        [fecha, nombre, tiempo, puntuacion, id]
    );
    res.json(modificar.rows[0])
});

app.listen(3001, () => {
    console.log("Servidor escuchando en http://localhost:3001");
});