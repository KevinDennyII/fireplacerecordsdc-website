import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mailingListRouter from "./mailingList";
import pageViewsRouter from "./pageViews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(mailingListRouter);
router.use(pageViewsRouter);

export default router;
