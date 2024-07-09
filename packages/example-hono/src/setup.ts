import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { HTTPException } from "hono/http-exception";

import { z } from "zod";
import { errorMap } from "./utils/validation";

export const bootstrap = (app: OpenAPIHono) => {
  // 设置中文错误信息
  z.setErrorMap(errorMap);

  app.onError((err, c) => {
    console.log("错误了:", err);
    if (err instanceof HTTPException) {
      return err.getResponse();
    } else {
      return c.text("服务器错误", 500);
    }
  });

  app.doc("/doc", {
    openapi: "3.0.0",
    info: { version: "1.0.0", title: "My API" },
  });

  app.get("/ui", swaggerUI({ url: "/doc" }));

  app.get(
    "/reference",
    apiReference({
      spec: { url: "/doc" },
      theme: "deepSpace",
      // hiddenClients: true,
      authentication: {
        http: {
          bearer: { token: "abctoken" },
          basic: { username: "admin", password: "123456" },
        },
      },
    })
  );
};
