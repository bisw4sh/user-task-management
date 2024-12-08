import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { prisma } from "./db";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  "jwt",
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { email: payload.email },
        select: {
          email: true,
        },
      });

      if (user) {
        console.log("from passport", user.email);
        return done(null, user); // Pass user object to the next middleware
      } else {
        return done(null, false); // No user found, authentication fails
      }
    } catch (error) {
      return done(error, false); // Handle error cases
    }
  })
);

export default passport;
