import express from "express";
import passport from "passport";
import authRoute from "./routes/auth";
import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import protectedRoute from "./routes/protected";
import tasksRoute from "./routes/tasks";
import { errorHandler } from "./middleware/error_handler";
import "./utils/passport";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//Routes
app.use(
  "/api/auth",
  passport.authenticate("jwt", { session: false }),
  authRoute
);
app.use(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  protectedRoute
);
app.use("/api/signup", signupRoute);
app.use("/api/signin", signinRoute);
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  tasksRoute
);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
