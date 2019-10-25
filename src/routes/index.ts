import { NextFunction } from "connect";
import { Request, Response, Router } from "express";

const router: Router = Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Irashaimase!!!" });
});

export default router;
