import { Elysia, t } from "elysia";
import { db } from "@/db/db";
import { user } from "@/db/schema";
import { UserModel } from "@/models/user";
import { eq } from "drizzle-orm";

export const userController = new Elysia().group("/user", (app) =>
  app
    .use(UserModel)
    .post(
      "",
      async ({ body, error }) => {
        const userInfo = await db
          .select()
          .from(user)
          .where(eq(user.username, body.username));
        if (userInfo.length > 0) {
          return error(400, { message: "用户名已存在" });
        }
        const data = await db.insert(user).values(body).returning();
        return { success: true, data: data[0] };
      },
      {
        body: "user.create.dto",
        detail: {
          description: "创建用户",
          tags: ["User"],
          // requestBody: {
          //   content: {
          //     "application/json": {
          //       example: {
          //         username: "admin",
          //         password: "123456",
          //       },
          //     },
          //   },
          // },
        },
        response: {
          200: "user.create.response",
          400: "common.badRequest",
        },
      }
    )
    .get(
      "all",
      async ({ query }) => {
        const { page = 1, limit = 10 } = query;
        const data = await db
          .select()
          .from(user)
          .limit(limit)
          .offset((page - 1) * limit);
        return { success: true, data };
      },
      {
        query: "user.findAll.query",
        detail: {
          description: "获取所有用户",
          tags: ["User"],
          parameters: [
            {
              name: "page",
              in: "query",
              required: true,
              schema: {
                type: "number",
                default: 1,
              },
            },
            {
              name: "limit",
              in: "query",
              required: true,
              schema: {
                type: "number",
                default: 5,
              },
            },
          ],
          // requestBody: {
          //   content: {
          //     "application/json": {
          //       example: {
          //         page: 1,
          //         limit: 5,
          //       },
          //     },
          //   },
          // },
        },
        // response: "user.findAll.response",
        response: {
          200: t.Object(
            {
              success: t.Boolean(),
              data: t.Array(
                t.Object({
                  id: t.Number(),
                  username: t.String({ default: "admin" }),
                  password: t.String({ default: "123456" }),
                })
              ),
            },
            { description: "用户成功响应" }
          ),
          400: "common.badRequest",
        },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        const data = await db.select().from(user).where(eq(user.id, params.id));
        if (data.length === 0) {
          return error(400, { message: "用户不存在" });
        }
        return { success: true, data: data[0] };
      },
      {
        params: t.Object({
          id: t.Numeric({ minimum: 1, default: 2 }),
        }),
        detail: { description: "获取某个用户", tags: ["User"] },
        response: {
          200: "user.create.response",
          400: "common.badRequest",
        },
      }
    )
);
