import { Router } from "express";
import prodRouter from "./products.js";
import cartRouter from "./cart.js";
import userRouter from "./user.js";

export const router = Router();

router.use("/productos", prodRouter);
router.use("/carrito", cartRouter);
router.use("/usuario", userRouter);
