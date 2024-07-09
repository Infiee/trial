import { z, createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { openApiHookHandler } from "../middlewares/error";
import { isAdmin, protect } from "../middlewares/auth";

const app = new OpenAPIHono({
  defaultHook: openApiHookHandler,
});

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

const UserSchema = z
  .object({
    id: z.number().openapi({
      example: 10,
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi("User");

const getUser = createRoute({
  middleware: [protect],
  security: [{ Bearer: [] }],
  method: "get",
  path: "/{id}",
  request: {
    headers: z.object({
      authorization: z.string().optional(),
    }),
    params: z.object({
      id: z.coerce
        .number()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          default: 2,
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "用户详情",
    },
    400: {
      description: "校验失败",
    },
  },
  tags: ["Users"],
  description: "获取用户数据",
});

const createUser = createRoute({
  middleware: [protect, isAdmin],
  security: [{ Bearer: [] }],
  method: "post",
  path: "/",
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
          schema: UserSchema,
        },
      },
      description: "创建用户",
    },
  },
  tags: ["Users"],
  description: "创建用户数据",
});

app.openapi(getUser, (c) => {
  const { id } = c.req.valid("param");
  if (id > 100) {
    return c.json({ message: "校验失败" }, 400);
  }
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

app.openapi(createUser, (c) => {
  const user = c.req.valid("json");
  return c.json({
    id: 1,
    ...user,
  });
});

export default app;
