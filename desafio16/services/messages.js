import MensajesRepo from "../repos/mensajesRepo.js";

const mensajesR = new MensajesRepo();

export async function getMensajes(req, res) {
  try {
    const mensajes = await mensajesR.getAll();
    res.send(mensajes.map((m) => m.verMensaje()));
  } catch (error) {
    req.logError(error);
  }
}
