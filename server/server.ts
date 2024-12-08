import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import passport from "passport";
import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import "./utils/passport";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//Routes
app.use("/api/signup", signupRoute);
app.use("/api/signin", signinRoute);

app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: express.NextFunction) => {
    try {
      const user = req.user as { email: string };
      res.status(200).json({
        success: true,
        user: user.email, 
      });
    } catch (error) {
      next(error); 
    }
  }
);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
