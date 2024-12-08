import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { email: string };
    if (!user) {
      return res.status(404).json({ success: false, email: null });
    } else {
      res.status(200).json({
        success: true,
        email: user.email,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
