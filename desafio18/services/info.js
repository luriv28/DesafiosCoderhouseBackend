import { args, PORT } from "../server.js";
import { cpus } from "os";

export function getInfoSinLog(req, res) {
  res.send(`<h2>Argumentos de entrada: ${args}</h2>
    <h2>Sistema Operativo: ${process.platform}</h2>
    <h2>Version de Node: ${process.version}</h2>
    <h2>Memoria total reservada: ${process.memoryUsage().heapUsed}</h2>
    <h2>Path de Ejecucion: ${process.cwd()}</h2>
    <h2>Process ID: ${process.pid}</h2>
    <h2>Servidor escuchando en ${PORT} con Process id de ${
    process.pid
  } - ${new Date().toLocaleString()}</h2>
    <h2>Process ID: ${cpus().length}</h2>  
    <h2>Carpeta del proyecto: ${process.cwd().split("\\").pop()}</h2>`);
}

// ------------- INFO

export function getInfo(req, res) {
  console.log("test");
  res.send(`<h2>Argumentos de entrada: ${args}</h2>
    <h2>Sistema Operativo: ${process.platform}</h2>
    <h2>Version de Node: ${process.version}</h2>
    <h2>Memoria total reservada: ${process.memoryUsage().heapUsed}</h2>
    <h2>Path de Ejecucion: ${process.cwd()}</h2>
    <h2>Process ID: ${process.pid}</h2>
    <h2>Servidor escuchando en ${PORT} con Process id de ${
    process.pid
  } - ${new Date().toLocaleString()}</h2>
    <h2>Process ID: ${cpus().length}</h2>  
    <h2>Carpeta del proyecto: ${process.cwd().split("\\").pop()}</h2>`);
}
