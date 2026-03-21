import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mailingListRouter from "./mailingList";

const router: IRouter = Router();

router.use(healthRouter);
router.use(mailingListRouter);

export default router;
