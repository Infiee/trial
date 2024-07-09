import { Context, Env } from "hono";
import { Hook } from "@hono/zod-openapi";

// Error Handler
export const errorHandler = (c: Context) => {
  console.log(c.res.status)

  return c.json({
    success: false,
    message: c.error?.message,
    stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
  })
}

// Not Found Handler
export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  })
}

export const openApiHookHandler: Hook<any, Env, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: false,
        message: result.error.errors[0].message,
      },
      422
    );
  }
};