import { Router } from "express";
import { getInfo, getInfoSinLog } from "../services/info.js";

const infoRouter = Router();

infoRouter.get("/infoSinLog", getInfoSinLog);
infoRouter.get("/info", getInfo);

export default infoRouter;
