import { z, createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { openApiHookHandler } from "../middlewares/error";
import { decode, sign } from "hono/jwt";

const app = new OpenAPIHono({
  defaultHook: openApiHookHandler,
});

const jwtGenerator = async (username: string) => {
  const payload = {
    username: username,
    // Token expires in 5 minutes
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
  };
  const secret = "mySecretKey";
  return sign(payload, secret);
};

const UserSchema = z
  .object({
    id: z.number().openapi({
      example: 10,
    }),
    username: z.string().openapi({
      example: "xiao huang",
    }),
    password: z.string().openapi({
      example: "123456",
    }),
  })
  .openapi("User");

const login = createRoute({
  method: "post",
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema.omit({ password: true }),
        },
      },
      description: "用户登录",
    },
  },
  tags: ["Users"],
  description: "获取用户数据",
});

app.openapi(login, async (c) => {
  const user = c.req.valid("json");
  const token = await jwtGenerator(user.username);
  // c.header("Authorization", "Bearer " + ());
  return c.json({
    id: 1,
    ...user,
    token
  });
});

export default app;
