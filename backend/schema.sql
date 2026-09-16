CREATE TABLE listas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  color TEXT NOT NULL
);

CREATE TABLE entradas (
  id SERIAL PRIMARY KEY,
  listaid INTEGER NOT NULL REFERENCES listas(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  nombre TEXT NOT NULL,
  tiempo INTEGER,
  puntuacion INTEGER
);