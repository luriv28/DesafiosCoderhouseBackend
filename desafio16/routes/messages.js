import { Router } from "express";
import { getMensajes } from "../services/messages.js";
import { isAuth } from "./middlewares/authMiddleware.js";

const messagesRouter = Router();

messagesRouter.get("/mensajes", isAuth, getMensajes);

export default messagesRouter;
