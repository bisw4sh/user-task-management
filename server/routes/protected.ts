import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { email: string };
    console.log("from api/protected ", user);
    res.status(200).json({
      success: true,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
