import Elysia, { t } from "elysia";

import { SetErrorFunction } from "@sinclair/typebox/errors";
import { ChineseErrorFunction } from "./libs/validation-cn";
import swagger from "@elysiajs/swagger";

SetErrorFunction((error) => {
  return ChineseErrorFunction(error);
});

export const app = new Elysia()
  .onError(({ code, error }) => {
    console.log("全局错误", code);
    if (code === "VALIDATION") {
      // const err = error.validator.Errors(error.value).First();
      // return err.path.replace("/", "") + ": " + err.message;
      const errs = error.validator.Errors(error.value);
      const msg: string[] = [];
      for (let err of errs) {
        msg.push(err.path.replace("/", "") + " " + err.message);
      }
      return {
        name: "校验错误",
        messgae: msg.join("，"),
      };
    }
  })
  .trace(async ({ handle, set }) => {
    const { time, end } = await handle;
    set.headers["Server-Timing"] = `handle;dur=${(await end) - time}`;
  })
  .use(
    swagger({
      // provider: "swagger-ui",
      provider: "scalar",
      documentation: {
        tags: [
          { name: "App", description: "App模块" },
          { name: "User", description: "用户模块" },
        ],
      },
    })
  );
