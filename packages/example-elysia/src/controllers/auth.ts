import { Elysia, t } from "elysia";

import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AuthModel } from "@/models/auth";

export const authController = new Elysia().group("/auth", (app) =>
  app.use(AuthModel).post(
    "/login",
    async ({ body, error }) => {
      const data = await db.query.user.findMany({
        where: eq(user.username, body.username),
      });
      if (data.length === 0) {
        error(400, { message: "用户不存在" });
      }
      if (data[0].password !== body.password) {
        error(400, { message: "密码错误" });
      }
      return { success: true, data: data[0] };
    },
    {
      body: "auth.login.dto",
      detail: { description: "登录", tags: ["Auth"] },
      response: {
        200: "auth.login.response",
        400: "common.badRequest",
      },
    }
  )
);
