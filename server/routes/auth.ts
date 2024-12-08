import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { email: string };
    if (user) {
      res.status(200).json({
        success: true,
        user: user.email,
      });
    } else {
      return res.status(404).json({ success: false, user: null });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
