import { Router } from "express";
import { getAccidents } from "./accident.controller.js";
import { validateAccidentDate } from "./accident.validation.js";

const router = Router();

router.get("/", validateAccidentDate, getAccidents);

export default router;
