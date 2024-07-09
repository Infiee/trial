import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

const user = {
  username: "admin",
  password: "123456",
};

// Protect Route for Authenticated Users
export const protect = async (c: Context, next: Next) => {
  let token;

  if (
    c.req.header("Authorization") &&
    c.req.header("Authorization")?.startsWith("Bearer")
  ) {
    try {
      token = c.req.header("Authorization")?.replace(/Bearer\s+/i, "");
      if (!token) {
        return c.json({ message: "Not authorized to access this route" });
      }
      console.log('token--',token)

      const { id } = await Jwt.verify(token, Bun.env.JWT_SECRET || "mySecretKey");
      c.set("user", user);

      await next();
    } catch (err) {
      return c.json({ message: "登录token无效" }, 401);
    }
  }

  if (!token) {
    return c.json({ message: "登录没发现token" }, 401);
  }
};

// Check if user is admin
export const isAdmin = async (c: Context, next: Next) => {
  const user = c.get("user");

  if (user && user.isAdmin) {
    await next();
  } else {
    // c.status(401);
    // throw new Error("Not authorized as an admin!");
    return c.json({ message: "需要管理员才能操作" }, 401);
  }
};
